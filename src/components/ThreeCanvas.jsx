import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RotateCw, Sparkles, Eye, Sun, Maximize2 } from 'lucide-react';

export default function ThreeCanvas({ activeModel = 'clock', resinColor = '#00f2fe', goldFoil = true }) {
  const mountRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightIntensity, setLightIntensity] = useState(1.5);
  const controlsRef = useRef(null);
  const sceneRef = useRef(null);
  const modelGroupRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 7);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Clear existing canvas children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2.0;
    controlsRef.current = controls;

    // 5. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xfff5e6, lightIntensity * 2);
    mainSpot.position.set(5, 8, 5);
    mainSpot.castShadow = true;
    mainSpot.angle = Math.PI / 4;
    mainSpot.penumbra = 0.8;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0x00f2fe, 1.2);
    rimLight.position.set(-5, 3, -5);
    scene.add(rimLight);

    const warmLight = new THREE.PointLight(0xffd700, 1.5, 10);
    warmLight.position.set(0, 2, 2);
    scene.add(warmLight);

    // 6. Gold Particle Environment Background
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 12;
      particlePositions[i + 1] = Math.random() * 8 - 2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 7. Base Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(2.8, 3.2, 0.2, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      roughness: 0.2,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.6;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Gold accent ring on pedestal
    const ringGeo = new THREE.TorusGeometry(2.85, 0.03, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9, roughness: 0.1 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.5;
    scene.add(ring);

    // Group for active 3D model
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Helper: Build procedural 3D model according to activeModel parameter
    buildModel(modelGroup, activeModel, resinColor, goldFoil);

    // 8. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Floating model effect
      modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      
      // Floating particles rotation
      particles.rotation.y = elapsedTime * 0.03;

      // Animate clock hands if model is clock
      if (activeModel === 'clock' && modelGroup.userData.hands) {
        modelGroup.userData.hands.secondHand.rotation.z = -elapsedTime * 0.5;
        modelGroup.userData.hands.minuteHand.rotation.z = -elapsedTime * 0.05;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Listener
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, [activeModel, resinColor, goldFoil]);

  // Update controls auto rotate dynamically
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div className="relative w-full h-[360px] sm:h-[450px] md:h-[550px] lg:h-[600px] rounded-3xl overflow-hidden glass-panel border border-[var(--border-gold)] shadow-2xl">
      {/* 3D WebGL Mounting Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Control HUD Overlay */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-wrap gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all ${
            autoRotate ? 'bg-[var(--accent-gold)] text-black shadow-lg' : 'bg-black/60 text-white border border-white/20'
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          {autoRotate ? 'Auto Orbiting' : 'Paused Orbit'}
        </button>

        <span className="hidden sm:flex px-3 py-1.5 rounded-full text-xs font-medium bg-black/60 text-[var(--accent-cyan)] border border-cyan-500/30 items-center gap-1">
          <Eye className="w-3.5 h-3.5" /> 3D WebGL Shaded
        </span>
      </div>

      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 text-[10px] sm:text-xs text-white/60 bg-black/70 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full backdrop-blur-md border border-white/10 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-yellow-400 shrink-0" /> Drag to rotate • Pinch/scroll to zoom
      </div>
    </div>
  );
}

// Procedural 3D Model Constructor
function buildModel(group, modelType, colorHex, hasGoldFoil) {
  // Clear previous meshes
  while (group.children.length > 0) {
    group.remove(group.children[0]);
  }

  const primaryColor = new THREE.Color(colorHex);

  if (modelType === 'clock') {
    // --- 3D OCEAN CLOCK MODEL ---
    const clockDiskGeo = new THREE.CylinderGeometry(2, 2, 0.25, 64);
    
    // Create dual resin/sand material
    const resinMat = new THREE.MeshPhysicalMaterial({
      color: primaryColor,
      transmission: 0.6,
      opacity: 0.95,
      transparent: true,
      roughness: 0.1,
      ior: 1.52,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05
    });

    const clockDisk = new THREE.Mesh(clockDiskGeo, resinMat);
    clockDisk.rotation.x = Math.PI / 6;
    clockDisk.castShadow = true;
    group.add(clockDisk);

    // Sand Layer at base of clock
    const sandGeo = new THREE.CylinderGeometry(1.98, 1.98, 0.05, 64, 1, false, 0, Math.PI);
    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xdfb15b,
      roughness: 0.9,
      metalness: 0.1
    });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.y = -0.1;
    clockDisk.add(sandMesh);

    // Foam Wave accent mesh
    const waveGeo = new THREE.TorusGeometry(1.4, 0.1, 16, 50, Math.PI);
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      transparent: true,
      opacity: 0.85
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = Math.PI / 2;
    waveMesh.position.y = 0.13;
    clockDisk.add(waveMesh);

    // Gold Roman Numeral markers around circumference
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.1 });
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const markerGeo = new THREE.BoxGeometry(0.08, 0.05, 0.25);
      const marker = new THREE.Mesh(markerGeo, goldMat);
      marker.position.x = Math.sin(angle) * 1.65;
      marker.position.z = Math.cos(angle) * 1.65;
      marker.position.y = 0.13;
      marker.rotation.y = angle;
      clockDisk.add(marker);
    }

    // Hands
    const handsGroup = new THREE.Group();
    handsGroup.position.y = 0.15;
    
    const centerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 32), goldMat);
    handsGroup.add(centerCap);

    const minuteHand = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.02, 1.2), goldMat);
    minuteHand.position.z = 0.5;
    handsGroup.add(minuteHand);

    const secondHand = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.02, 1.4), new THREE.MeshBasicMaterial({ color: 0xff3366 }));
    secondHand.position.z = 0.6;
    handsGroup.add(secondHand);

    clockDisk.add(handsGroup);
    group.userData.hands = { minuteHand, secondHand };

  } else if (modelType === 'monogram') {
    // --- 3D MONOGRAM "R & S" STAND ---
    const textGroup = new THREE.Group();

    // Custom geometry block simulating resin initial stand
    const createLetterMesh = (xOffset, letterColor) => {
      const boxGeo = new THREE.BoxGeometry(1.1, 1.6, 0.35);
      const resinMat = new THREE.MeshPhysicalMaterial({
        color: letterColor,
        transmission: 0.85,
        transparent: true,
        opacity: 0.9,
        roughness: 0.1,
        ior: 1.5,
        thickness: 0.5
      });
      const letterMesh = new THREE.Mesh(boxGeo, resinMat);
      letterMesh.position.x = xOffset;
      letterMesh.castShadow = true;

      // Add rose petal particles inside
      const petalMat = new THREE.MeshStandardMaterial({ color: 0xcc0044, roughness: 0.3 });
      for (let i = 0; i < 8; i++) {
        const petal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08), petalMat);
        petal.position.set(
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 1.1,
          (Math.random() - 0.5) * 0.2
        );
        letterMesh.add(petal);
      }

      // Add gold leaf inside if enabled
      if (hasGoldFoil) {
        const goldFoilMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.95, roughness: 0.1 });
        for (let j = 0; j < 12; j++) {
          const flake = new THREE.Mesh(new THREE.TetrahedronGeometry(0.04), goldFoilMat);
          flake.position.set(
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 1.2,
            (Math.random() - 0.5) * 0.2
          );
          flake.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
          letterMesh.add(flake);
        }
      }

      return letterMesh;
    };

    const letterR = createLetterMesh(-1.2, primaryColor);
    
    // Heart symbol in middle
    const heartMesh = createLetterMesh(0, new THREE.Color(0xff3366));
    heartMesh.scale.set(0.85, 0.85, 0.85);

    const letterS = createLetterMesh(1.2, primaryColor);

    textGroup.add(letterR);
    textGroup.add(heartMesh);
    textGroup.add(letterS);

    textGroup.rotation.x = Math.PI / 12;
    group.add(textGroup);

  } else if (modelType === 'bangle') {
    // --- 3D FLORAL RESIN BANGLE ---
    const torusGeo = new THREE.TorusGeometry(1.5, 0.45, 32, 100);
    const bangleMat = new THREE.MeshPhysicalMaterial({
      color: primaryColor,
      transmission: 0.9,
      transparent: true,
      opacity: 0.9,
      roughness: 0.05,
      ior: 1.5,
      clearcoat: 1.0
    });
    const bangleMesh = new THREE.Mesh(torusGeo, bangleMat);
    bangleMesh.rotation.x = Math.PI / 3;
    bangleMesh.castShadow = true;

    // Embedded dried flowers inside torus
    const petalMat = new THREE.MeshStandardMaterial({ color: 0x8822aa, roughness: 0.4 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.9 });
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24;
      const petal = new THREE.Mesh(new THREE.DodecahedronGeometry(0.09), petalMat);
      petal.position.x = Math.sin(angle) * 1.5;
      petal.position.y = Math.cos(angle) * 1.5;
      petal.position.z = (Math.random() - 0.5) * 0.2;
      bangleMesh.add(petal);

      if (hasGoldFoil) {
        const flake = new THREE.Mesh(new THREE.TetrahedronGeometry(0.05), goldMat);
        flake.position.x = Math.sin(angle + 0.1) * 1.5;
        flake.position.y = Math.cos(angle + 0.1) * 1.5;
        flake.position.z = (Math.random() - 0.5) * 0.2;
        bangleMesh.add(flake);
      }
    }

    group.add(bangleMesh);

  } else {
    // --- 3D PEARL SCALLOPED PHOTO FRAME ---
    const frameDiskGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.2, 48);
    const pearlMat = new THREE.MeshStandardMaterial({
      color: 0xfff8e7,
      roughness: 0.15,
      metalness: 0.3
    });
    const frameMesh = new THREE.Mesh(frameDiskGeo, pearlMat);
    frameMesh.rotation.x = Math.PI / 4;
    frameMesh.castShadow = true;

    // Outer Scalloped Pearl Beads
    for (let i = 0; i < 18; i++) {
      const angle = (i * Math.PI * 2) / 18;
      const pearlGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      pearl.position.x = Math.sin(angle) * 1.8;
      pearl.position.z = Math.cos(angle) * 1.8;
      pearl.position.y = 0.05;
      frameMesh.add(pearl);
    }

    // Inner Glass Insert
    const innerGlassMat = new THREE.MeshPhysicalMaterial({
      color: primaryColor,
      transmission: 0.8,
      transparent: true,
      roughness: 0.1
    });
    const innerGlass = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 0.1, 32), innerGlassMat);
    innerGlass.position.y = 0.08;
    frameMesh.add(innerGlass);

    group.add(frameMesh);
  }
}
