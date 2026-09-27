import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

const Hero3DCanvas = () => {
  const mountRef = useRef(null);
  const [activeShape, setActiveShape] = useState('crystal'); // 'crystal', 'torus', 'helix', 'sphere'
  const shapeRef = useRef('crystal');
  const isVisibleRef = useRef(true);

  useEffect(() => {
    shapeRef.current = activeShape;
  }, [activeShape]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = currentMount.clientWidth || 450;
    const height = currentMount.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    currentMount.appendChild(renderer.domElement);

    // Subtle Lighting (Lightweight, 2 directional + ambient)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00f0ff, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff007f, 2.2);
    dirLight2.position.set(-5, -5, -2);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0x8a2be2, 1.8);
    dirLight3.position.set(0, 4, -4);
    scene.add(dirLight3);

    // Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Sleek Orbital Rings
    const ringGroup = new THREE.Group();
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const ringGeo1 = new THREE.RingGeometry(2.3, 2.35, 48);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.3;
    ringGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      transparent: true,
      opacity: 0.25
    });
    const ringGeo2 = new THREE.RingGeometry(2.7, 2.73, 48);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 2.8;
    ringMesh2.rotation.y = Math.PI / 6;
    ringGroup.add(ringMesh2);

    // Orbital satellite glowing node
    const satGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const satMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    ringGroup.add(satMesh);

    masterGroup.add(ringGroup);

    // Dynamic Geometry Builders
    let activeMeshGroup = new THREE.Group();
    masterGroup.add(activeMeshGroup);

    const buildShape = (shapeType) => {
      // Clear previous shapes safely
      while (activeMeshGroup.children.length > 0) {
        const obj = activeMeshGroup.children[0];
        activeMeshGroup.remove(obj);
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      }

      if (shapeType === 'crystal') {
        // Futuristic Cyber Crystal / Octahedron
        const outerGeo = new THREE.IcosahedronGeometry(1.6, 1);
        const outerMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          wireframe: true,
          metalness: 0.8,
          roughness: 0.2,
          emissive: 0x004466,
          emissiveIntensity: 0.5
        });
        const outerMesh = new THREE.Mesh(outerGeo, outerMat);

        const innerGeo = new THREE.OctahedronGeometry(1.1, 0);
        const innerMat = new THREE.MeshStandardMaterial({
          color: 0x8a2be2,
          metalness: 0.9,
          roughness: 0.1,
          transparent: true,
          opacity: 0.75,
          emissive: 0x3b0764,
          emissiveIntensity: 0.6
        });
        const innerMesh = new THREE.Mesh(innerGeo, innerMat);

        activeMeshGroup.add(outerMesh);
        activeMeshGroup.add(innerMesh);
      } else if (shapeType === 'torus') {
        // Holographic Torus Knot
        const torusGeo = new THREE.TorusKnotGeometry(1.25, 0.35, 100, 24, 2, 3);
        const torusMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          wireframe: true,
          metalness: 0.85,
          roughness: 0.15,
          emissive: 0x006688,
          emissiveIntensity: 0.4
        });
        const torusMesh = new THREE.Mesh(torusGeo, torusMat);

        const innerTorusGeo = new THREE.TorusKnotGeometry(1.2, 0.2, 60, 16, 2, 3);
        const innerTorusMat = new THREE.MeshBasicMaterial({
          color: 0xff007f,
          transparent: true,
          opacity: 0.3
        });
        const innerTorusMesh = new THREE.Mesh(innerTorusGeo, innerTorusMat);

        activeMeshGroup.add(torusMesh);
        activeMeshGroup.add(innerTorusMesh);
      } else if (shapeType === 'helix') {
        // Quantum Double Helix
        const helixGroup = new THREE.Group();
        const strandCount = 28;
        const radius = 1.1;
        const sphereGeo = new THREE.SphereGeometry(0.08, 10, 10);
        const mat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
        const mat2 = new THREE.MeshBasicMaterial({ color: 0xff007f });
        const barMat = new THREE.MeshBasicMaterial({ color: 0x8a2be2, transparent: true, opacity: 0.45 });
        const barGeo = new THREE.CylinderGeometry(0.018, 0.018, radius * 2, 6);

        for (let i = 0; i < strandCount; i++) {
          const t = (i / strandCount) * Math.PI * 3.5;
          const y = (i / strandCount - 0.5) * 3.6;
          const x1 = Math.cos(t) * radius;
          const z1 = Math.sin(t) * radius;
          const x2 = Math.cos(t + Math.PI) * radius;
          const z2 = Math.sin(t + Math.PI) * radius;

          const node1 = new THREE.Mesh(sphereGeo, mat1);
          node1.position.set(x1, y, z1);
          const node2 = new THREE.Mesh(sphereGeo, mat2);
          node2.position.set(x2, y, z2);

          const bar = new THREE.Mesh(barGeo, barMat);
          bar.position.set(0, y, 0);
          bar.rotation.z = Math.PI / 2;
          bar.rotation.y = -t;

          helixGroup.add(node1);
          helixGroup.add(node2);
          helixGroup.add(bar);
        }
        activeMeshGroup.add(helixGroup);
      } else if (shapeType === 'sphere') {
        // Prismatic Hologram Sphere with Rings
        const sphereGeo = new THREE.SphereGeometry(1.3, 24, 24);
        const sphereMat = new THREE.MeshStandardMaterial({
          color: 0x00f0ff,
          wireframe: true,
          metalness: 0.9,
          roughness: 0.1,
          emissive: 0x0284c7,
          emissiveIntensity: 0.5
        });
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);

        const innerCoreGeo = new THREE.IcosahedronGeometry(0.9, 2);
        const innerCoreMat = new THREE.MeshStandardMaterial({
          color: 0xff007f,
          metalness: 0.8,
          roughness: 0.2,
          transparent: true,
          opacity: 0.6
        });
        const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);

        activeMeshGroup.add(sphereMesh);
        activeMeshGroup.add(innerCoreMesh);
      }
    };

    buildShape(shapeRef.current);

    // Mouse Interaction & Drag rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      targetX = x * 0.7;
      targetY = y * 0.7;

      if (isDragging) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        dragVelocityX = deltaX * 0.008;
        dragVelocityY = deltaY * 0.008;
        masterGroup.rotation.y += dragVelocityX;
        masterGroup.rotation.x += dragVelocityY;
      }
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    };

    const handleMouseDown = (e) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    // Touch Support
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastMouseX;
        const deltaY = e.touches[0].clientY - lastMouseY;
        masterGroup.rotation.y += deltaX * 0.008;
        masterGroup.rotation.x += deltaY * 0.008;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    currentMount.addEventListener('mousemove', handleMouseMove, { passive: true });
    currentMount.addEventListener('mousedown', handleMouseDown);
    currentMount.addEventListener('touchstart', handleTouchStart, { passive: true });
    currentMount.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mouseup', handleMouseUp);

    // Pause rendering when scrolled out of view to save 100% GPU/CPU
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(currentMount);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();
    let currentActiveShape = shapeRef.current;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisibleRef.current) return; // Skip work when offscreen!

      const elapsedTime = clock.getElapsedTime();

      // Check shape update
      if (currentActiveShape !== shapeRef.current) {
        currentActiveShape = shapeRef.current;
        buildShape(currentActiveShape);
      }

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!isDragging) {
        // Inertia decay
        dragVelocityX *= 0.94;
        dragVelocityY *= 0.94;
        masterGroup.rotation.y += dragVelocityX;
        masterGroup.rotation.x += dragVelocityY;

        masterGroup.rotation.y += 0.008;
        masterGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 + mouseY * 0.4;
      }

      // Orbital satellite motion
      const satAngle = elapsedTime * 1.5;
      satMesh.position.x = Math.cos(satAngle) * 2.32;
      satMesh.position.y = Math.sin(satAngle) * 0.9;
      satMesh.position.z = Math.sin(satAngle) * 2.32;

      ringMesh1.rotation.z = elapsedTime * 0.2;
      ringMesh2.rotation.z = -elapsedTime * 0.15;

      // Gentle floating pulse
      const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.02;
      activeMeshGroup.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      currentMount.removeEventListener('mousemove', handleMouseMove);
      currentMount.removeEventListener('mousedown', handleMouseDown);
      currentMount.removeEventListener('touchstart', handleTouchStart);
      currentMount.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleShapeChange = (shape) => {
    soundFx.playClick();
    setActiveShape(shape);
  };

  return (
    <div className="hero-3d-wrapper">
      <div ref={mountRef} className="hero-3d-canvas-container" title="Drag to rotate 3D Artifact" />

      {/* 3D Geometry Selector Controls */}
      <div className="hero-3d-controls">
        <span className="control-label">3D CORE:</span>
        <button
          className={`shape-btn ${activeShape === 'crystal' ? 'active' : ''}`}
          onClick={() => handleShapeChange('crystal')}
          onMouseEnter={() => soundFx.playHover()}
          title="Cyber Crystal"
        >
          💎 Crystal
        </button>
        <button
          className={`shape-btn ${activeShape === 'torus' ? 'active' : ''}`}
          onClick={() => handleShapeChange('torus')}
          onMouseEnter={() => soundFx.playHover()}
          title="Torus Knot"
        >
          🌀 Torus
        </button>
        <button
          className={`shape-btn ${activeShape === 'helix' ? 'active' : ''}`}
          onClick={() => handleShapeChange('helix')}
          onMouseEnter={() => soundFx.playHover()}
          title="Quantum Helix"
        >
          🧬 Helix
        </button>
        <button
          className={`shape-btn ${activeShape === 'sphere' ? 'active' : ''}`}
          onClick={() => handleShapeChange('sphere')}
          onMouseEnter={() => soundFx.playHover()}
          title="Prismatic Core"
        >
          🪐 Sphere
        </button>
      </div>
      <div className="hero-3d-hint">
        <span>✦ Interactive 3D • Drag to Orbit</span>
      </div>
    </div>
  );
};

export default Hero3DCanvas;
