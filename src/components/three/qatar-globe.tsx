"use client";

import { useRef } from "react";
import type * as ThreeNS from "three";
import { cn } from "@/lib/utils";
import { useThreeScene, type SceneContext, type SceneHandle } from "./use-three-scene";

/** Doha, Qatar. */
const DOHA = { lat: 25.29, lon: 51.53 };

function latLonToVector(THREE: typeof ThreeNS, lat: number, lon: number, radius = 1) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/* Dotted surface — dots fade toward the globe's edge for depth. */
const dotsVertex = /* glsl */ `
uniform float uSize;
uniform float uTime;
attribute float aRand;
varying float vFacing;
varying float vRand;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec3 n = normalize(normalMatrix * position);
  vFacing = dot(n, normalize(-mv.xyz));
  vRand = aRand;
  gl_PointSize = uSize * (7.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;
const dotsFragment = /* glsl */ `
uniform float uTime;
varying float vFacing;
varying float vRand;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.15, d);
  float twinkle = 0.65 + 0.35 * sin(uTime * 1.4 + vRand * 50.0);
  float front = smoothstep(-0.1, 0.6, vFacing);
  vec3 col = mix(vec3(0.16, 0.36, 0.95), vec3(0.45, 0.9, 1.0), vRand * 0.6 + front * 0.3);
  gl_FragColor = vec4(col, a * front * twinkle * 0.9);
}
`;

/* Soft atmospheric glow around the globe. */
const atmoVertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormal = normalize(normalMatrix * normal);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;
const atmoFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uPower;
uniform float uStrength;
uniform float uOuter;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  float d = dot(normalize(vNormal), normalize(vView));
  // Outer halo (back faces): brightest at the globe edge, fading out into space.
  // Inner rim (front faces): classic fresnel edge light.
  float f = uOuter > 0.5 ? pow(clamp(-d, 0.0, 1.0), uPower) : pow(1.0 - abs(d), uPower);
  gl_FragColor = vec4(uColor, f * uStrength);
}
`;

/* Light pulse travelling along each arc. */
const arcVertex = /* glsl */ `
varying float vT;
void main() {
  vT = uv.x;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const arcFragment = /* glsl */ `
uniform float uTime;
uniform float uOffset;
uniform float uSpeed;
varying float vT;
void main() {
  float head = fract(uTime * uSpeed + uOffset) * 1.6 - 0.3;
  float tail = smoothstep(head - 0.35, head, vT) * (1.0 - smoothstep(head, head + 0.02, vT));
  float base = 0.28;
  vec3 col = mix(vec3(0.2, 0.45, 1.0), vec3(0.55, 0.95, 1.0), tail);
  gl_FragColor = vec4(col, base + tail * 0.95);
}
`;

function setupGlobe({ THREE, isMobile, pixelRatio }: SceneContext): SceneHandle {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 5.6);

  const outer = new THREE.Group(); // sways + follows the pointer
  const globe = new THREE.Group(); // fixed so Doha faces the viewer
  outer.add(globe);
  scene.add(outer);

  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(o: T) => (disposables.push(o), o);

  // Dark core so back-side dots are hidden
  const core = new THREE.Mesh(
    track(new THREE.SphereGeometry(0.985, 64, 64)),
    track(new THREE.MeshBasicMaterial({ color: "#071433" })),
  );
  globe.add(core);

  // Fibonacci-distributed dots
  const count = isMobile ? 2600 : 5200;
  const pos = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pos[i * 3] = Math.cos(th) * r;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = Math.sin(th) * r;
    rand[i] = Math.random();
  }
  const dotsGeo = track(new THREE.BufferGeometry());
  dotsGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  dotsGeo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  const dotsMat = track(
    new THREE.ShaderMaterial({
      vertexShader: dotsVertex,
      fragmentShader: dotsFragment,
      transparent: true,
      depthWrite: false,
      uniforms: { uSize: { value: 2.1 * pixelRatio }, uTime: { value: 0 } },
    }),
  );
  globe.add(new THREE.Points(dotsGeo, dotsMat));

  // Latitude / longitude grid
  const gridMat = track(new THREE.LineBasicMaterial({ color: "#3371fb", transparent: true, opacity: 0.12 }));
  for (let lat = -60; lat <= 60; lat += 30) {
    const pts: ThreeNS.Vector3[] = [];
    for (let lon = -180; lon <= 180; lon += 4) pts.push(latLonToVector(THREE, lat, lon, 1.002));
    globe.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(pts)), gridMat));
  }
  for (let lon = -180; lon < 180; lon += 30) {
    const pts: ThreeNS.Vector3[] = [];
    for (let lat = -90; lat <= 90; lat += 4) pts.push(latLonToVector(THREE, lat, lon, 1.002));
    globe.add(new THREE.Line(track(new THREE.BufferGeometry().setFromPoints(pts)), gridMat));
  }

  // Atmosphere (outer glow) and a faint inner rim
  const atmo = new THREE.Mesh(
    track(new THREE.SphereGeometry(1.24, 64, 64)),
    track(
      new THREE.ShaderMaterial({
        vertexShader: atmoVertex,
        fragmentShader: atmoFragment,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color("#2f7bff") }, uPower: { value: 2.4 }, uStrength: { value: 0.95 }, uOuter: { value: 1 } },
      }),
    ),
  );
  scene.add(atmo);
  const rim = new THREE.Mesh(
    track(new THREE.SphereGeometry(1.0, 64, 64)),
    track(
      new THREE.ShaderMaterial({
        vertexShader: atmoVertex,
        fragmentShader: atmoFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uColor: { value: new THREE.Color("#22d3ee") }, uPower: { value: 3 }, uStrength: { value: 0.55 }, uOuter: { value: 0 } },
      }),
    ),
  );
  scene.add(rim);

  // Doha: glowing pin, light beam and pulsing rings
  const doha = latLonToVector(THREE, DOHA.lat, DOHA.lon, 1);
  const pin = new THREE.Mesh(track(new THREE.SphereGeometry(0.028, 24, 24)), track(new THREE.MeshBasicMaterial({ color: "#fbbf24" })));
  pin.position.copy(doha);
  globe.add(pin);

  const beamGeo = track(new THREE.CylinderGeometry(0.004, 0.012, 0.45, 12, 1, true));
  beamGeo.translate(0, 0.225, 0);
  const beam = new THREE.Mesh(
    beamGeo,
    track(new THREE.MeshBasicMaterial({ color: "#fcd34d", transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false })),
  );
  beam.position.copy(doha);
  beam.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), doha.clone().normalize());
  globe.add(beam);

  const ringGeo = track(new THREE.RingGeometry(0.03, 0.038, 48));
  const pulses = [0, 1, 2].map((i) => {
    const mat = track(
      new THREE.MeshBasicMaterial({ color: "#fbbf24", transparent: true, side: THREE.DoubleSide, depthWrite: false }),
    );
    const ring = new THREE.Mesh(ringGeo, mat);
    ring.position.copy(doha.clone().multiplyScalar(1.004));
    ring.lookAt(doha.clone().multiplyScalar(2));
    globe.add(ring);
    return { ring, mat, offset: i / 3 };
  });

  // Arcs from Doha out across the globe, each with a travelling light
  const targets = [
    [51.5, -0.1],
    [40.7, -74],
    [1.35, 103.8],
    [-33.9, 151.2],
    [35.7, 139.7],
    [-1.3, 36.8],
    [48.9, 2.35],
    [19.1, 72.9],
    [-23.5, -46.6],
    [55.8, 37.6],
  ];
  const arcs = targets.slice(0, isMobile ? 6 : targets.length).map(([lat, lon], i) => {
    const end = latLonToVector(THREE, lat, lon, 1);
    const dist = doha.distanceTo(end);
    const mid = doha.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1 + dist * 0.45);
    const c1 = doha.clone().lerp(mid, 0.5).normalize().multiplyScalar(1 + dist * 0.35);
    const c2 = end.clone().lerp(mid, 0.5).normalize().multiplyScalar(1 + dist * 0.35);
    const curve = new THREE.CubicBezierCurve3(doha, c1, c2, end);
    const geo = track(new THREE.TubeGeometry(curve, 96, 0.0065, 6, false));
    const mat = track(
      new THREE.ShaderMaterial({
        vertexShader: arcVertex,
        fragmentShader: arcFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uOffset: { value: i * 0.17 }, uSpeed: { value: 0.22 + (i % 3) * 0.05 } },
      }),
    );
    globe.add(new THREE.Mesh(geo, mat));
    const dot = new THREE.Mesh(track(new THREE.SphereGeometry(0.014, 12, 12)), track(new THREE.MeshBasicMaterial({ color: "#67e8f9" })));
    dot.position.copy(end);
    globe.add(dot);
    return mat;
  });

  // Turn the globe so Doha faces the viewer (slightly above centre).
  globe.quaternion.setFromUnitVectors(doha.clone().normalize(), new THREE.Vector3(0.25, 0.32, 1).normalize());

  // Orbiting ring of small particles around the globe
  const orbitCount = isMobile ? 160 : 320;
  const orbitPos = new Float32Array(orbitCount * 3);
  for (let i = 0; i < orbitCount; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 1.45 + Math.random() * 0.35;
    orbitPos[i * 3] = Math.cos(a) * r;
    orbitPos[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
    orbitPos[i * 3 + 2] = Math.sin(a) * r;
  }
  const orbitGeo = track(new THREE.BufferGeometry());
  orbitGeo.setAttribute("position", new THREE.BufferAttribute(orbitPos, 3));
  const orbit = new THREE.Points(
    orbitGeo,
    track(new THREE.PointsMaterial({ color: "#67e8f9", size: 0.018, transparent: true, opacity: 0.7, depthWrite: false })),
  );
  orbit.rotation.set(1.2, 0, 0.35);
  scene.add(orbit);

  return {
    scene,
    camera,
    update(time, pointer, scroll) {
      dotsMat.uniforms.uTime.value = time;
      for (const m of arcs) m.uniforms.uTime.value = time;
      for (const p of pulses) {
        const t = (time * 0.6 + p.offset) % 1;
        p.ring.scale.setScalar(1 + t * 4.5);
        p.mat.opacity = (1 - t) * 0.85;
      }
      orbit.rotation.y = time * 0.08;
      // Gentle sway around Doha + pointer + scroll parallax.
      const sway = Math.sin(time * 0.25) * 0.35;
      outer.rotation.y += (sway + pointer.x * 0.35 + (scroll - 0.5) * 0.6 - outer.rotation.y) * 0.05;
      outer.rotation.x += (-pointer.y * 0.18 - outer.rotation.x) * 0.05;
    },
    dispose() {
      disposables.forEach((d) => d.dispose());
    },
  };
}

/** Interactive 3D globe with Doha highlighted and light arcs travelling outwards. */
export function QatarGlobe({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useThreeScene(ref, setupGlobe);
  return <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute", className)} />;
}
