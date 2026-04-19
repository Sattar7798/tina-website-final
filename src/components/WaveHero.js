import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * WaveHero — Parametric Wave Surface in copper/cream palette
 * Uses vanilla Three.js for maximum compatibility
 */
const WaveHero = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene setup ──────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = null; // transparent — CSS handles bg

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    sceneRef.current = { scene, camera, renderer };

    // ── Wave geometry ────────────────────────────────────────
    const SEGMENTS = 80;
    const SIZE = 12;
    const geometry = new THREE.PlaneGeometry(SIZE, SIZE, SEGMENTS, SEGMENTS);
    geometry.rotateX(-Math.PI / 2);

    // Store original positions
    const positions = geometry.attributes.position;
    const originalY = new Float32Array(positions.count);
    for (let i = 0; i < positions.count; i++) {
      originalY[i] = 0;
    }

    // ── Shader-like material (custom) ────────────────────────
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C08552'),
      wireframe: false,
      side: THREE.DoubleSide,
      metalness: 0.15,
      roughness: 0.65,
      transparent: true,
      opacity: 0.92,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay for blueprint aesthetic
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#8C5A3C'),
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    scene.add(wireMesh);

    // Extra — floating particles
    const particleCount = 200;
    const pGeom = new THREE.BufferGeometry();
    const pPositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * 12;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * 4 + 1;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color('#D4A06A'),
      size: 0.04,
      transparent: true,
      opacity: 0.55,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // ── Lighting ─────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xFFF8F0, 0.6);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xD4A06A, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0x8C5A3C, 0.4);
    fillLight.position.set(-5, 2, -5);
    scene.add(fillLight);

    // ── Mouse parallax ───────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Resize ───────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Animation loop ───────────────────────────────────────
    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.012;

      // Animate wave positions
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const z = positions.getZ(i);
        const wave =
          Math.sin(x * 0.8 + t * 1.2) * 0.18 +
          Math.sin(z * 0.6 + t * 0.9) * 0.14 +
          Math.sin((x + z) * 0.4 + t * 0.7) * 0.10 +
          Math.sin(Math.sqrt(x * x + z * z) * 0.5 - t * 1.1) * 0.12;
        positions.setY(i, wave);
      }
      positions.needsUpdate = true;
      geometry.computeVertexNormals();

      // Gentle camera parallax
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.3 + 2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Rotate particles slowly
      particles.rotation.y = t * 0.05;

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      wireMat.dispose();
      pGeom.dispose();
      pMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default WaveHero;
