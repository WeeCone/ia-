"use client";

import { useEffect, useRef } from "react";

// Same uptrend as the hero demo chart (BTC/USDT 4H, in thousands), so the scene and the cards tell one story.
const CLOSES = [
  62.3, 62.0, 62.4, 62.1, 62.6, 62.9, 62.5, 62.2, 62.7, 63.0, 62.8, 63.1, 63.6, 64.0, 63.9, 63.6, 63.4, 63.3, 63.7, 64.1, 64.0, 64.5, 64.9, 64.6,
  65.0, 65.2, 64.9, 65.1, 64.8, 65.05,
];
const SUPPORT = 63.2;
const RESISTANCE = 65.4;
const BASE = 61.6; // price at ground level
const UNIT = 1.15; // world units per 1 000 USDT
const SPACING = 0.62;

/**
 * Hero backdrop: the demo chart as 3D candles rising from a dark floor, a scan plane sweeping across,
 * then the support and resistance lighting up as planes, while the camera drifts and follows the pointer.
 * three.js is loaded only once the hero is on screen; reduced motion or no WebGL leaves a still frame or nothing.
 */
export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let cleanup = () => {};

    const start = async () => {
      const THREE = await import("three");
      if (disposed) return;

      const canvas = document.createElement("canvas");
      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        return; // no WebGL: the CSS backdrop stays
      }
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1.25 : 1.75));
      renderer.setClearColor(0x000000, 0);
      canvas.className = "h-full w-full";
      host.appendChild(canvas);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x0b0e14, 15, 34);
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);

      scene.add(new THREE.AmbientLight(0x9fb4c8, 0.55));
      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(-4, 9, 7);
      scene.add(key);
      const rim = new THREE.PointLight(0x00d2ff, 18, 22);
      rim.position.set(6, 5, -4);
      scene.add(rim);

      // Floor: a faint price grid.
      const grid = new THREE.GridHelper(40, 40, 0x1f2a36, 0x16202b);
      grid.position.y = 0;
      scene.add(grid);

      // Candles.
      const bull = new THREE.MeshStandardMaterial({ color: 0x00f5a0, emissive: 0x00f5a0, emissiveIntensity: 0.35, roughness: 0.35, metalness: 0.1 });
      const bear = new THREE.MeshStandardMaterial({ color: 0xff4d6d, emissive: 0xff4d6d, emissiveIntensity: 0.3, roughness: 0.35, metalness: 0.1 });
      const body = new THREE.BoxGeometry(0.34, 1, 0.34);
      const wick = new THREE.BoxGeometry(0.05, 1, 0.05);
      const offsetX = -((CLOSES.length - 1) * SPACING) / 2;
      const candles = CLOSES.map((close, index) => {
        const open = index ? CLOSES[index - 1] : 62.5;
        const high = Math.max(open, close) + 0.16 + (index % 3) * 0.07;
        const low = Math.min(open, close) - 0.14 - (index % 4) * 0.05;
        const group = new THREE.Group();
        const material = close >= open ? bull : bear;
        const top = (Math.max(open, close) - BASE) * UNIT;
        const bottom = (Math.min(open, close) - BASE) * UNIT;
        const b = new THREE.Mesh(body, material);
        b.scale.y = Math.max(0.05, top - bottom);
        b.position.y = (top + bottom) / 2;
        const w = new THREE.Mesh(wick, material);
        w.scale.y = (high - low) * UNIT;
        w.position.y = ((high + low) / 2 - BASE) * UNIT;
        group.add(w, b);
        group.position.x = offsetX + index * SPACING;
        group.scale.y = 0.001;
        scene.add(group);
        return group;
      });

      // Support / resistance planes and the scan plane.
      const levelPlane = (price: number, color: number) => {
        const mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(CLOSES.length * SPACING + 2, 3.2),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false }),
        );
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.y = (price - BASE) * UNIT;
        scene.add(mesh);
        const edge = new THREE.Mesh(
          new THREE.BoxGeometry(CLOSES.length * SPACING + 2, 0.03, 0.03),
          new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 }),
        );
        edge.position.set(0, mesh.position.y, 1.6);
        scene.add(edge);
        return [mesh, edge] as const;
      };
      const support = levelPlane(SUPPORT, 0x00f5a0);
      const resistance = levelPlane(RESISTANCE, 0xff4d6d);
      const scan = new THREE.Mesh(
        new THREE.PlaneGeometry(0.06, 7),
        new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0, depthWrite: false }),
      );
      scan.position.y = 3.2;
      scene.add(scan);

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = host;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(host);

      // Pointer parallax (desktop only), eased.
      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (event: PointerEvent) => {
        pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
      };
      if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

      const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
      const span = CLOSES.length * SPACING;

      const frame = (seconds: number) => {
        // 0–2.2 s candles rise in sequence; 2.2–4 s scan sweeps; 3.4 s+ levels light up; afterwards a slow drift.
        candles.forEach((candle, index) => {
          candle.scale.y = 0.001 + easeOut((seconds - index * 0.055) / 0.7) * 0.999;
        });
        const sweep = (seconds - 2.2) / 1.8;
        scan.position.x = offsetX - 0.5 + Math.min(1, Math.max(0, sweep)) * (span + 1);
        (scan.material as import("three").MeshBasicMaterial).opacity = sweep > 0 && sweep < 1 ? 0.85 : 0;
        const glow = easeOut((seconds - 3.4) / 0.8);
        for (const [plane, edge] of [support, resistance]) {
          (plane.material as import("three").MeshBasicMaterial).opacity = glow * 0.1;
          (edge.material as import("three").MeshBasicMaterial).opacity = glow * 0.9;
        }
        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;
        const orbit = Math.sin(seconds * 0.12) * 0.22 + pointer.x * 0.18;
        camera.position.set(Math.sin(orbit) * 19, 2.6 - pointer.y * 0.6, Math.cos(orbit) * 19);
        camera.lookAt(0, -0.6, 0); // aim below the chart so it sits high, behind the title
        renderer.render(scene, camera);
      };

      let raf = 0;
      let running = false;
      let clockStart = performance.now();
      let elapsedBeforePause = 0;
      const loop = (now: number) => {
        frame(elapsedBeforePause + (now - clockStart) / 1000);
        raf = requestAnimationFrame(loop);
      };
      const play = () => {
        if (running || reduceMotion) return;
        running = true;
        clockStart = performance.now();
        raf = requestAnimationFrame(loop);
      };
      const pause = () => {
        if (!running) return;
        running = false;
        elapsedBeforePause += (performance.now() - clockStart) / 1000;
        cancelAnimationFrame(raf);
      };

      if (reduceMotion) frame(8); // still, finished frame
      host.dataset.ready = "1";

      // Only animate while visible and while the tab is shown.
      const visibility = new IntersectionObserver(([entry]) => (entry.isIntersecting && !document.hidden ? play() : pause()));
      visibility.observe(host);
      const onHidden = () => (document.hidden ? pause() : play());
      document.addEventListener("visibilitychange", onHidden);

      cleanup = () => {
        pause();
        visibility.disconnect();
        observer.disconnect();
        document.removeEventListener("visibilitychange", onHidden);
        window.removeEventListener("pointermove", onPointer);
        scene.traverse((object) => {
          const mesh = object as import("three").Mesh;
          mesh.geometry?.dispose();
          const material = mesh.material as import("three").Material | undefined;
          material?.dispose?.();
        });
        renderer.dispose();
        canvas.remove();
      };
    };

    // Let the page settle first: the scene is decoration and must never delay the content.
    const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 200));
    const handle = idle(() => void start());
    return () => {
      disposed = true;
      (window.cancelIdleCallback ?? window.clearTimeout)(handle as number);
      cleanup();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[620px] opacity-0 transition-opacity duration-1000 data-[ready=1]:opacity-45 [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
    />
  );
}
