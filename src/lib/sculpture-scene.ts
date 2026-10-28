import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export async function mountSculpture(
  host: HTMLDivElement,
  finale: boolean,
  onStateChange: (available: boolean) => void,
) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  let renderer: THREE.WebGLRenderer;
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", {
      antialias: !mobile,
      alpha: true,
      powerPreference: "low-power",
      preserveDrawingBuffer: reduced.matches,
    });
    if (!context) return () => {};
    renderer = new THREE.WebGLRenderer({
      canvas,
      context,
      preserveDrawingBuffer: reduced.matches,
      antialias: !mobile,
      alpha: true,
      powerPreference: "low-power",
    });
  } catch {
    return () => {};
  }
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = finale ? 1.55 : 1.35;
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.set(0, 0.4, mobile ? 14 : 13.6);
  camera.lookAt(0, 0, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const env = pmrem.fromScene(room, 0.04);
  scene.environment = env.texture;
  room.dispose();
  pmrem.dispose();

  scene.add(new THREE.HemisphereLight(0xd9edff, 0x162b4a, 3));
  const key = new THREE.DirectionalLight(0xffffff, 5);
  key.position.set(3, 6, 5);
  scene.add(key);
  const blue = new THREE.DirectionalLight(0x4a9fff, finale ? 8 : 4);
  blue.position.set(-5, -1, 3);
  scene.add(blue);
  const rim = new THREE.DirectionalLight(0xffffff, 4);
  rim.position.set(0, 3, -4);
  scene.add(rim);

  const core = new THREE.Group();
  scene.add(core);
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const navy = new THREE.MeshPhysicalMaterial({
    color: 0x0a2850,
    metalness: 0.88,
    roughness: 0.23,
    clearcoat: 1,
    clearcoatRoughness: 0.18,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x67a7ef,
    metalness: 0.55,
    roughness: 0.18,
    clearcoat: 1,
    transparent: true,
    opacity: 0.86,
  });
  const count = mobile ? 112 : 176;
  const solid = new THREE.InstancedMesh(geometry, navy, count);
  const accent = new THREE.InstancedMesh(geometry, glass, count);
  core.add(solid, accent);
  const points: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        (2 + 0.62 * Math.cos(3 * t)) * Math.cos(2 * t),
        (2 + 0.62 * Math.cos(3 * t)) * Math.sin(2 * t),
        0.85 * Math.sin(3 * t),
      ),
    );
  }
  const dummy = new THREE.Object3D();
  const zero = new THREE.Matrix4().makeScale(0, 0, 0);
  for (let i = 0; i < count; i++) {
    dummy.position.copy(points[i]);
    dummy.lookAt(points[(i + 1) % count]);
    dummy.scale.set(0.68, 0.62, mobile ? 0.21 : 0.135);
    dummy.updateMatrix();
    solid.setMatrixAt(i, i % 13 === 0 ? zero : dummy.matrix);
    accent.setMatrixAt(i, i % 13 === 0 ? dummy.matrix : zero);
  }
  solid.instanceMatrix.needsUpdate = true;
  accent.instanceMatrix.needsUpdate = true;

  let frame = 0;
  let visible = true;
  let pointerX = 0;
  let pointerY = 0;
  let rotation = 0;
  let renderCount = 0;
  let previousTime = performance.now();
  let lastRenderTime = 0;
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    renderCount = 0;
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  resize();
  const move = (e: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointerX = (e.clientX - rect.left) / rect.width - 0.5;
    pointerY = (e.clientY - rect.top) / rect.height - 0.5;
  };
  const reset = () => {
    pointerX = 0;
    pointerY = 0;
  };
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerleave", reset);
  const draw = () => {
    frame = requestAnimationFrame(draw);
    if (!visible || document.hidden) return;
    const now = performance.now();
    // Keep a static frame fresh after compositor/viewport changes without motion.
    // Two redraws per second avoid both continuous GPU work and stale surfaces.
    if (reduced.matches && renderCount > 2 && now - lastRenderTime < 500) return;
    if (!reduced.matches && now - lastRenderTime < 1000 / (mobile ? 24 : 40))
      return;
    lastRenderTime = now;
    const delta = Math.min((now - previousTime) / 1000, 0.05);
    previousTime = now;
    const rect = host.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, -rect.top / window.innerHeight));
    if (!reduced.matches) rotation += delta * 0.06;
    const entrance = reduced.matches ? 1 : Math.min(1, renderCount / 45);
    core.rotation.set(
      0.28 + (reduced.matches ? 0 : pointerY * 0.12),
      -0.4 +
        rotation +
        (reduced.matches ? 0 : pointerX * 0.2 + progress * 0.45),
      -0.25,
    );
    core.scale.setScalar(0.91 + entrance * 0.09);
    renderer.render(scene, camera);
    if (renderCount++ === 1) onStateChange(true);
  };
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) renderCount = 0;
    previousTime = performance.now();
  });
  visibility.observe(host);
  draw();
  const contextLost = (event: Event) => {
    event.preventDefault();
    onStateChange(false);
  };
  const resume = () => {
    renderCount = 0;
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  renderer.domElement.addEventListener("webglcontextrestored", resume);
  document.addEventListener("visibilitychange", resume);

  return () => {
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visibility.disconnect();
    host.removeEventListener("pointermove", move);
    host.removeEventListener("pointerleave", reset);
    renderer.domElement.removeEventListener("webglcontextlost", contextLost);
    renderer.domElement.removeEventListener("webglcontextrestored", resume);
    document.removeEventListener("visibilitychange", resume);
    geometry.dispose();
    navy.dispose();
    glass.dispose();
    env.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
