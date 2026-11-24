"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { simplexNoise3D } from "./glsl";
import { useThreeScene, type SceneContext, type SceneHandle } from "./use-three-scene";

/* ── Liquid orb: a sphere whose surface flows with 3D noise ─────────────── */
const orbVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;
${simplexNoise3D}

float field(vec3 p) {
  return snoise(p * 0.85 + vec3(uTime * 0.2)) * uAmp
       + snoise(p * 1.9 - vec3(uTime * 0.14)) * uAmp * 0.18;
}

vec3 displace(vec3 p) {
  return p + normalize(p) * field(p);
}

void main() {
  vec3 n = normalize(position);
  vec3 t = normalize(cross(n, abs(n.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0)));
  vec3 b = normalize(cross(n, t));
  float e = 0.015;

  vec3 p0 = displace(position);
  vec3 p1 = displace(position + t * e);
  vec3 p2 = displace(position + b * e);
  vec3 dn = normalize(cross(p1 - p0, p2 - p0));
  if (dot(dn, n) < 0.0) dn = -dn;

  vNoise = field(position);
  vNormal = normalize(normalMatrix * dn);
  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const orbFragment = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uBlue;
uniform vec3 uCyan;
uniform vec3 uViolet;
varying vec3 vNormal;
varying vec3 vView;
varying float vNoise;

void main() {
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vView);
  float facing = max(dot(n, v), 0.0);
  float fresnel = pow(1.0 - facing, 2.2);

  // Iridescent colour that shifts with the surface flow and viewing angle.
  float t = clamp(vNoise * 1.6 + 0.5 + n.y * 0.35, 0.0, 1.0);
  vec3 col = mix(uDeep, uBlue, smoothstep(0.0, 0.55, t));
  col = mix(col, uCyan, smoothstep(0.45, 1.0, t));
  col = mix(col, uViolet, smoothstep(0.35, 1.0, -n.x * 0.6 + fresnel * 0.5) * 0.55);

  vec3 l1 = normalize(vec3(-0.5, 0.85, 0.6));
  vec3 l2 = normalize(vec3(0.8, -0.3, 0.5));
  float diff = max(dot(n, l1), 0.0);
  float spec = pow(max(dot(reflect(-l1, n), v), 0.0), 40.0);
  float spec2 = pow(max(dot(reflect(-l2, n), v), 0.0), 18.0);

  col *= 0.5 + diff * 0.65;
  col += spec * 0.85 + spec2 * uCyan * 0.35;
  col += fresnel * mix(uCyan, vec3(1.0), 0.45) * 0.95;
  gl_FragColor = vec4(col, 1.0);
}
`;

/* ── Particle shell around the orb ──────────────────────────────────────── */
const dotsVertex = /* glsl */ `
uniform float uTime;
uniform float uSize;
attribute float aRand;
varying float vAlpha;
varying float vMix;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float twinkle = 0.55 + 0.45 * sin(uTime * (0.6 + aRand * 1.6) + aRand * 40.0);
  vAlpha = twinkle * smoothstep(-14.0, -5.0, mv.z);
  vMix = aRand;
  gl_PointSize = uSize * (0.5 + aRand) * (8.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const dotsFragment = /* glsl */ `
uniform vec3 uA;
uniform vec3 uB;
uniform float uOpacity;
varying float vAlpha;
varying float vMix;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.1, d);
  gl_FragColor = vec4(mix(uA, uB, vMix), a * vAlpha * uOpacity);
}
`;

function setupHeroOrb({ THREE, isMobile, pixelRatio }: SceneContext): SceneHandle {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const world = new THREE.Group();
  scene.add(world);

  // Orb
  const orbGeo = new THREE.IcosahedronGeometry(1, isMobile ? 24 : 56);
  const orbMat = new THREE.ShaderMaterial({
    vertexShader: orbVertex,
    fragmentShader: orbFragment,
    uniforms: {
      uTime: { value: 0 },
      uAmp: { value: 0.16 },
      uDeep: { value: new THREE.Color("#142055") },
      uBlue: { value: new THREE.Color("#1d52f0") },
      uCyan: { value: new THREE.Color("#22d3ee") },
      uViolet: { value: new THREE.Color("#8b5cf6") },
    },
  });
  const orb = new THREE.Mesh(orbGeo, orbMat);
  orb.position.set(1.4, 0.95, -0.5);
  orb.scale.setScalar(isMobile ? 0.85 : 1);
  world.add(orb);

  // Orbit rings with small "satellites"
  const ringMat = new THREE.MeshBasicMaterial({ color: "#3371fb", transparent: true, opacity: 0.28, depthWrite: false });
  const satMat = new THREE.MeshBasicMaterial({ color: "#22d3ee" });
  const satGeo = new THREE.SphereGeometry(0.055, 16, 16);
  const rings = [
    { radius: 2.9, tilt: [1.25, 0.25, 0.1], speed: 0.35 },
    { radius: 3.4, tilt: [1.9, -0.55, 0.3], speed: -0.25 },
  ].map(({ radius, tilt, speed }) => {
    const ringGeo = new THREE.TorusGeometry(radius, 0.007, 6, 260);
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.set(tilt[0], tilt[1], tilt[2]);
    const sat = new THREE.Mesh(satGeo, satMat);
    ring.add(sat);
    world.add(ring);
    return { ring, ringGeo, sat, radius, speed };
  });

  // Particle shell
  const count = isMobile ? 450 : 1300;
  const positions = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const r = 3 + Math.random() * 1.6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.8;
    positions[i * 3 + 2] = r * Math.cos(phi);
    rand[i] = Math.random();
  }
  const dotsGeo = new THREE.BufferGeometry();
  dotsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  dotsGeo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
  const dotsMat = new THREE.ShaderMaterial({
    vertexShader: dotsVertex,
    fragmentShader: dotsFragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 4.2 * pixelRatio },
      uOpacity: { value: 0.75 },
      uA: { value: new THREE.Color("#1d52f0") },
      uB: { value: new THREE.Color("#06b6d4") },
    },
  });
  const dots = new THREE.Points(dotsGeo, dotsMat);
  world.add(dots);

  return {
    scene,
    camera,
    update(time, pointer) {
      // Scrolling down lifts, grows and spins the whole scene for a parallax feel.
      const s = Math.min(window.scrollY / 700, 1);
      orbMat.uniforms.uTime.value = time;
      orbMat.uniforms.uAmp.value = 0.16 + s * 0.12;
      dotsMat.uniforms.uTime.value = time;
      orb.rotation.y = time * 0.12;
      orb.rotation.z = Math.sin(time * 0.3) * 0.15;
      orb.position.y = 0.95 + Math.sin(time * 0.8) * 0.08;
      dots.rotation.y = time * 0.04 + s * 1.2;
      world.position.y = s * 1.6;
      world.scale.setScalar(1 + s * 0.3);
      for (const r of rings) {
        const a = time * r.speed;
        r.sat.position.set(Math.cos(a) * r.radius, Math.sin(a) * r.radius, 0);
        r.ring.rotation.z += r.speed * 0.002;
      }
      world.rotation.y += (pointer.x * 0.35 - world.rotation.y) * 0.08;
      world.rotation.x += (-pointer.y * 0.22 - world.rotation.x) * 0.08;
    },
    dispose() {
      orbGeo.dispose();
      orbMat.dispose();
      ringMat.dispose();
      satMat.dispose();
      satGeo.dispose();
      rings.forEach((r) => r.ringGeo.dispose());
      dotsGeo.dispose();
      dotsMat.dispose();
    },
  };
}

/** Animated 3D orb, orbit rings and particles that sit behind the hero mockup. */
export function HeroOrb({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useThreeScene(ref, setupHeroOrb);
  return <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute", className)} />;
}
