"use client";

import { useEffect, useRef, type RefObject } from "react";
import type * as ThreeNS from "three";

type Three = typeof ThreeNS;

export interface SceneContext {
  THREE: Three;
  width: number;
  height: number;
  /** Small screens get lighter scenes (fewer particles, simpler geometry). */
  isMobile: boolean;
  /** Renderer pixel ratio — multiply point sizes by this so they look the same on every screen. */
  pixelRatio: number;
  renderer: ThreeNS.WebGLRenderer;
}

export interface SceneHandle {
  scene: ThreeNS.Scene;
  camera: ThreeNS.PerspectiveCamera;
  /**
   * Called every frame. `pointer` is -1..1 across the window (smoothed);
   * `scroll` is how far the scene has travelled through the viewport (0 = entering at the bottom, 1 = leaving at the top).
   */
  update: (time: number, pointer: { x: number; y: number }, scroll: number) => void;
  resize?: (width: number, height: number) => void;
  dispose: () => void;
}

/**
 * Runs a three.js scene inside `containerRef`.
 *
 * - three.js is loaded with a dynamic import, so it never blocks the first paint
 *   and is only downloaded on pages that use a 3D scene.
 * - Rendering pauses while the canvas is off-screen or the tab is hidden.
 * - With "reduce motion" turned on, a single still frame is drawn.
 * - Everything (GPU buffers, listeners, canvas) is cleaned up on unmount.
 */
export function useThreeScene(
  containerRef: RefObject<HTMLDivElement | null>,
  setup: (ctx: SceneContext) => SceneHandle | Promise<SceneHandle>,
) {
  const setupRef = useRef(setup);
  useEffect(() => {
    setupRef.current = setup;
  });

  useEffect(() => {
    const container = containerRef.current;
    // Skip containers hidden with display:none (e.g. desktop-only scenes on phones).
    if (!container || container.getClientRects().length === 0) return;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      // WebGL may be unavailable (old devices, disabled GPU) — just show nothing.
      let renderer: ThreeNS.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return;
      }

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      const canvas = renderer.domElement;
      canvas.setAttribute("aria-hidden", "true");
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease";
      container.appendChild(canvas);

      let width = Math.max(1, container.clientWidth);
      let height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);

      const handle = await setupRef.current({ THREE, width, height, isMobile, pixelRatio: renderer.getPixelRatio(), renderer });
      if (disposed) {
        handle.dispose();
        renderer.dispose();
        canvas.remove();
        return;
      }
      handle.camera.aspect = width / height;
      handle.camera.updateProjectionMatrix();

      // Pointer, smoothed so movement feels weighty rather than twitchy.
      const target = { x: 0, y: 0 };
      const pointer = { x: 0, y: 0 };
      const onPointer = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.y = -((e.clientY / window.innerHeight) * 2 - 1);
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      // Own clock: only advances while visible, so scenes resume smoothly after pausing.
      let elapsed = 0;
      let lastTick = 0;
      let frame = 0;
      let visible = false;
      let running = false;

      const render = () => {
        pointer.x += (target.x - pointer.x) * 0.05;
        pointer.y += (target.y - pointer.y) * 0.05;
        const now = performance.now();
        if (running && lastTick) elapsed += Math.min((now - lastTick) / 1000, 0.05);
        lastTick = now;
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const scroll = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        handle.update(elapsed, pointer, scroll);
        renderer.render(handle.scene, handle.camera);
      };
      const loop = () => {
        render();
        frame = requestAnimationFrame(loop);
      };
      const start = () => {
        if (running || reducedMotion || !visible || document.hidden) return;
        running = true;
        lastTick = 0;
        frame = requestAnimationFrame(loop);
      };
      const stop = () => {
        if (!running) return;
        running = false;
        cancelAnimationFrame(frame);
      };

      const resizeObserver = new ResizeObserver(() => {
        width = Math.max(1, container.clientWidth);
        height = Math.max(1, container.clientHeight);
        renderer.setSize(width, height, false);
        handle.camera.aspect = width / height;
        handle.camera.updateProjectionMatrix();
        handle.resize?.(width, height);
        if (!running) render();
      });
      resizeObserver.observe(container);

      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
          if (visible) start();
          else stop();
        },
        { rootMargin: "100px" },
      );
      io.observe(container);

      const onVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener("visibilitychange", onVisibility);

      // First frame, then fade the canvas in.
      render();
      requestAnimationFrame(() => {
        canvas.style.opacity = "1";
      });

      cleanup = () => {
        stop();
        io.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        window.removeEventListener("pointermove", onPointer);
        handle.dispose();
        renderer.dispose();
        canvas.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [containerRef]);
}
