import React, { Suspense ,useState, useEffect} from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  useProgress,
  Float, 
  PerspectiveCamera, 
  Environment, 
  useGLTF, 
  Stars, 
  Sparkles,
  ContactShadows
} from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';

function Loader() {
  const { progress } = useProgress();
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 1 } }}
      style={{
        position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
        background: '#050505', zIndex: 100, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center'
      }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        style={{ height: '1px', background: '#D4AF37', width: '200px', marginBottom: '20px' }}
      />
      <h3 style={{ fontFamily: 'serif', color: '#D4AF37', letterSpacing: '4px', fontSize: '0.8rem' }}>
        {Math.round(progress)}%
      </h3>
    </motion.div>
  );
}

function Rig() {
  return useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.mouse.x * 1.5, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.mouse.y * 1.5, 0.03);
    state.camera.lookAt(0, 0, 0);
  });
}

function CentralRose() {
  const { scene } = useGLTF('/assets/rose.glb'); 
  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <primitive 
          object={scene} 
          scale={2.4} 
          position={[0, -1.5, 0]} 
          rotation={[0.2, -Math.PI / 4, 0]} 
        />
      </Float>
      {/* Adds a soft, high-end shadow underneath the rose */}
      <ContactShadows opacity={0.4} scale={10} blur={2.5} far={4} color="#000000" />
    </group>
  );
}

export default function App() {
  const { progress } = useProgress();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      // Give it a small extra delay for that "premium" feel
      const timer = setTimeout(() => setActive(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div style={{ height: '100vh', width: '100vw', backgroundColor: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* 1. THE LOADER (Stage Entrance) */}
      <AnimatePresence>
        {active && <Loader />}
      </AnimatePresence>

      {/* 2. THE TEXT (Only shows when loader is done) */}
      <AnimatePresence>
        {!active && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ 
              position: 'absolute', width: '100%', height: '100%', 
              display: 'flex', flexDirection: 'column', justifyContent: 'center', 
              alignItems: 'center', zIndex: 1, pointerEvents: 'none' 
            }}
          >
            <h2 style={{ 
              fontFamily: '"Playfair Display", serif', color: '#D4AF37', 
              fontSize: '1rem', letterSpacing: '8px', marginBottom: '20px', opacity: 0.8
            }}>FEBRUARY 07</h2>
            
            <h1 style={{ 
              fontFamily: '"Playfair Display", serif', color: '#fff', 
              fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: '200', textAlign: 'center', lineHeight: '1', margin: 0
            }}>
              Eternal <br/> <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Rose</span>
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      <Canvas shadows gl={{ antialias: false, stencil: false, depth: true }} dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.2} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={5} color="#ff3333" castShadow />
        <pointLight position={[-5, -2, -2]} color="#D4AF37" intensity={2} />

        <Suspense fallback={null}>
          <CentralRose />
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={6} size={1.5} speed={0.3} color="#D4AF37" />
          <Environment preset="night" />
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
          <Rig />
        </Suspense>
      </Canvas>

      <div style={{ position: 'absolute', bottom: '40px', width: '100%', textAlign: 'center' }}>
          <p style={{ color: '#fff', letterSpacing: '3px', fontSize: '0.7rem', opacity: 0.5 }}>
            I LOVE YOU SO MUCH BABY ❤️
          </p>
      </div>
    </div>
  );
}