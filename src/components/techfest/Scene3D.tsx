import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Buildings() {
  const group = useRef<THREE.Group>(null);
  const buildings = useMemo(() => {
    const arr: { pos: [number, number, number]; size: [number, number, number]; hue: number }[] = [];
    for (let i = 0; i < 80; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = -Math.random() * 80 - 5;
      const h = 2 + Math.random() * 12;
      const w = 1 + Math.random() * 2.5;
      const d = 1 + Math.random() * 2.5;
      arr.push({ pos: [x, h / 2 - 4, z], size: [w, h, d], hue: Math.random() > 0.5 ? 0 : 1 });
    }
    return arr;
  }, []);

  return (
    <group ref={group}>
      {buildings.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={b.hue ? "#1a0f2e" : "#0f1a2e"}
            emissive={b.hue ? "#ff2bd6" : "#00f0ff"}
            emissiveIntensity={0.15}
            metalness={0.8}
            roughness={0.3}
          />
          {/* window lights */}
          <mesh position={[0, 0, b.size[2] / 2 + 0.01]}>
            <planeGeometry args={[b.size[0] * 0.9, b.size[1] * 0.9]} />
            <meshBasicMaterial
              color={b.hue ? "#ff2bd6" : "#00f0ff"}
              transparent
              opacity={0.25}
              toneMapped={false}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

function GridFloor() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = clock.elapsedTime;
    }
  });
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          varying vec2 vUv;
          void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          void main(){
            vec2 uv = vUv * 40.0;
            uv.y += uTime * 2.0;
            vec2 g = abs(fract(uv) - 0.5);
            float line = smoothstep(0.48, 0.5, max(g.x, g.y));
            vec3 cyan = vec3(0.0, 0.94, 1.0);
            vec3 mag  = vec3(1.0, 0.17, 0.84);
            vec3 col = mix(mag, cyan, vUv.y);
            float fade = smoothstep(0.0, 0.4, vUv.y) * (1.0 - smoothstep(0.85, 1.0, vUv.y));
            gl_FragColor = vec4(col * line, line * fade * 0.9);
          }
        `,
      }),
    []
  );

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, -20]} material={mat}>
      <planeGeometry args={[200, 200, 1, 1]} />
    </mesh>
  );
}

function FloatingShape({
  position,
  color,
  scale = 1,
  geo = "torus",
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  geo?: "torus" | "knot" | "icos" | "octa";
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime * speed;
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;
    ref.current.position.y = position[1] + Math.sin(t) * 0.6;
  });

  const geometry = useMemo(() => {
    switch (geo) {
      case "knot": return new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
      case "icos": return new THREE.IcosahedronGeometry(1, 0);
      case "octa": return new THREE.OctahedronGeometry(1, 0);
      default: return new THREE.TorusGeometry(1, 0.35, 16, 64);
    }
  }, [geo]);

  return (
    <mesh ref={ref} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        metalness={0.7}
        roughness={0.2}
        wireframe={geo === "icos"}
      />
    </mesh>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 80;
      a[i * 3 + 1] = Math.random() * 30 - 4;
      a[i * 3 + 2] = -Math.random() * 80;
    }
    return a;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#00f0ff" transparent opacity={0.8} toneMapped={false} />
    </points>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const scroll = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.current = max > 0 ? window.scrollY / max : 0;
    };
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  useFrame(() => {
    const s = scroll.current;
    // dolly through the city, then rise above
    const targetZ = 14 - s * 30;
    const targetY = 0 + s * 6;
    const targetX = mouse.current.x * 2;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY + mouse.current.y * -1 - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 1 + s * 4, -20);
  });

  return null;
}

export function Scene3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#07060f"]} />
        <fog attach="fog" args={["#07060f", 15, 70]} />
        <ambientLight intensity={0.25} />
        <pointLight position={[0, 8, 5]} intensity={2} color="#ff2bd6" distance={40} />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#00f0ff" distance={40} />
        <pointLight position={[10, 5, -20]} intensity={1.5} color="#7a3bff" distance={50} />

        <CameraRig />
        <GridFloor />
        <Buildings />
        <Particles />

        <FloatingShape position={[-5, 3, -2]} color="#ff2bd6" geo="knot" speed={0.6} />
        <FloatingShape position={[6, 2, -4]} color="#00f0ff" geo="torus" scale={1.2} speed={0.4} />
        <FloatingShape position={[0, 6, -10]} color="#7a3bff" geo="icos" scale={1.8} speed={0.3} />
        <FloatingShape position={[-7, 1, -14]} color="#00f0ff" geo="octa" scale={1.4} speed={0.5} />
        <FloatingShape position={[8, 4, -18]} color="#ff2bd6" geo="torus" scale={0.9} speed={0.7} />
      </Canvas>
    </div>
  );
}
