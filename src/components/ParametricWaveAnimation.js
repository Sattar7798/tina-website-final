import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import './ParametricWaveAnimation.css';

const ParametricWaveAnimation = ({ 
  color = 0x4cc9f0, 
  speed = 1.0, 
  amplitude = 1.0,
  colorMode = 'gradient',
  isInteractive = true
}) => {
  const mountRef = useRef(null);
  const animationRef = useRef(null);
  const sceneRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Set negative z-index on mount ref to ensure it stays behind content
    mountRef.current.style.zIndex = '0';
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x101820);
    scene.fog = new THREE.FogExp2(0x101820, 0.035);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x101820, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);
    
    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add multiple point lights with different colors
    const pointLights = [];
    const pointLightColors = [
      new THREE.Color(color),
      new THREE.Color(0xb5179e),
      new THREE.Color(0x480ca8)
    ];
    
    for (let i = 0; i < 3; i++) {
      const light = new THREE.PointLight(pointLightColors[i], 1, 20);
      const angle = (i / 3) * Math.PI * 2;
      const radius = 8;
      light.position.set(
        Math.cos(angle) * radius,
        4,
        Math.sin(angle) * radius
      );
      scene.add(light);
      pointLights.push(light);
    }
    
    // Create architectural elements
    const createArchitecturalElements = () => {
      const group = new THREE.Group();
      
      // Ground plane that represents a blueprint/technical drawing
      const groundGeometry = new THREE.PlaneGeometry(40, 40, 20, 20);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x0a1622,
        metalness: 0.2,
        roughness: 0.8,
        wireframe: true
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2;
      ground.receiveShadow = true;
      group.add(ground);
      
      // Add grid lines to represent architectural blueprint
      const gridHelper = new THREE.GridHelper(40, 40, 0x4cc9f0, 0x1e3a52);
      gridHelper.position.y = -1.9;
      group.add(gridHelper);
      
      return group;
    };
    
    const architecturalElements = createArchitecturalElements();
    scene.add(architecturalElements);
    
    // Wave parameters
    const waveSize = 20;
    const resolution = 80;
    
    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(
      waveSize, 
      waveSize, 
      resolution, 
      resolution
    );
    
    // Material with color based on parameter
    const threeColor = new THREE.Color(color);
    const material = new THREE.MeshStandardMaterial({
      color: threeColor,
      side: THREE.DoubleSide,
      wireframe: true,
      emissive: threeColor,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.85
    });
    
    // Create mesh for parametric wave
    const wave = new THREE.Mesh(geometry, material);
    wave.rotation.x = -Math.PI / 2;
    wave.position.y = 0;
    wave.castShadow = true;
    wave.receiveShadow = true;
    scene.add(wave);
    
    // Create a second wave with different parameters
    const geometry2 = new THREE.PlaneGeometry(
      waveSize * 1.5, 
      waveSize * 1.5, 
      resolution / 2, 
      resolution / 2
    );
    
    const material2 = new THREE.MeshStandardMaterial({
      color: 0x7209b7,
      side: THREE.DoubleSide,
      wireframe: true,
      emissive: 0x7209b7,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.5
    });
    
    const wave2 = new THREE.Mesh(geometry2, material2);
    wave2.rotation.x = -Math.PI / 2;
    wave2.position.y = -1;
    scene.add(wave2);
    
    // Add floating architectural elements
    const createFloatingElements = () => {
      const group = new THREE.Group();
      
      const shapes = [
        // Columns (vertical elements)
        { 
          geometry: new THREE.CylinderGeometry(0.2, 0.2, 4, 8), 
          count: 6, 
          radius: 8,
          yRange: [0, 3],
          material: new THREE.MeshStandardMaterial({
            color: 0x4cc9f0,
            metalness: 0.7,
            roughness: 0.3,
            emissive: 0x4cc9f0,
            emissiveIntensity: 0.2
          })
        },
        // Floor plates (horizontal elements)
        { 
          geometry: new THREE.BoxGeometry(3, 0.2, 3), 
          count: 8, 
          radius: 6,
          yRange: [1, 5],
          material: new THREE.MeshStandardMaterial({
            color: 0xb5179e,
            metalness: 0.5,
            roughness: 0.4,
            emissive: 0xb5179e,
            emissiveIntensity: 0.2,
            transparent: true,
            opacity: 0.8
          })
        },
        // Structural frames (diagonal elements)
        { 
          geometry: new THREE.BoxGeometry(0.1, 4, 0.1), 
          count: 10, 
          radius: 7,
          yRange: [0, 4],
          material: new THREE.MeshStandardMaterial({
            color: 0x480ca8,
            metalness: 0.6,
            roughness: 0.3,
            emissive: 0x480ca8,
            emissiveIntensity: 0.3
          })
        }
      ];
      
      shapes.forEach(shape => {
        for (let i = 0; i < shape.count; i++) {
          const mesh = new THREE.Mesh(shape.geometry, shape.material);
          
          // Position in a circular pattern with random variation
          const angle = (i / shape.count) * Math.PI * 2;
          const radius = shape.radius * (0.8 + Math.random() * 0.4);
          
          mesh.position.set(
            Math.cos(angle) * radius,
            shape.yRange[0] + Math.random() * (shape.yRange[1] - shape.yRange[0]),
            Math.sin(angle) * radius
          );
          
          // Random rotation for more natural appearance
          mesh.rotation.set(
            Math.random() * Math.PI * 0.2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 0.2
          );
          
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          
          // Store original position for animations
          mesh.userData = {
            originalY: mesh.position.y,
            phaseOffset: Math.random() * Math.PI * 2,
            amplitude: 0.3 + Math.random() * 0.5,
            frequency: 0.5 + Math.random() * 1
          };
          
          group.add(mesh);
        }
      });
      
      return group;
    };
    
    const floatingElements = createFloatingElements();
    scene.add(floatingElements);
    
    // Add particles for atmosphere
    const particlesCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      particlesPositions[i3] = (Math.random() - 0.5) * 30;
      particlesPositions[i3 + 1] = Math.random() * 10;
      particlesPositions[i3 + 2] = (Math.random() - 0.5) * 30;
    }
    
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particlesPositions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation variables
    let time = 0;
    const clock = new THREE.Clock();
    
    // Animation function
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      // Get elapsed time
      const elapsedTime = clock.getElapsedTime();
      time = elapsedTime * speed;
      
      // Update wave positions based on time
      const positions = geometry.attributes.position.array;
      const positions2 = geometry2.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        
        // Calculate wave height based on parametric equation with mouse influence
        let y = 0;
        
        // Base waves
        y += Math.sin(x * 0.5 + time) * amplitude * 0.5;
        y += Math.sin(z * 0.3 + time * 0.8) * amplitude * 0.3;
        
        // Add a circular wave originating from mouse position if hovering
        if (isHovering && isInteractive) {
          const dx = x - mousePosition.current.x * 10;
          const dz = z - mousePosition.current.y * 10;
          const distance = Math.sqrt(dx * dx + dz * dz);
          y += Math.sin(distance * 0.3 - time * 2) * amplitude * 1.5 * Math.max(0, 1 - distance * 0.1);
        }
        
        // Add more complex patterns
        y += Math.sin(Math.sqrt(x * x + z * z) * 0.3 + time) * amplitude * 0.2;
        
        positions[i + 1] = y;
      }
      
      // Update second wave with different pattern
      for (let i = 0; i < positions2.length; i += 3) {
        const x = positions2[i];
        const z = positions2[i + 2];
        
        let y = 0;
        y += Math.sin(x * 0.2 + time * 0.6) * amplitude * 0.4;
        y += Math.cos(z * 0.2 + time * 0.7) * amplitude * 0.3;
        y += Math.sin((x * x + z * z) * 0.01 + time * 0.8) * amplitude * 0.2;
        
        positions2[i + 1] = y - 1;  // Position below the first wave
      }
      
      geometry.attributes.position.needsUpdate = true;
      geometry2.attributes.position.needsUpdate = true;
      
      // Update colors based on mode
      if (colorMode === 'dynamic') {
        const colors = [];
        const colors2 = [];
        
        for (let i = 0; i < positions.length; i += 3) {
          const y = positions[i + 1];
          
          // Map height to color
          const normalizedHeight = (y + amplitude) / (2 * amplitude);
          
          // Create a gradient color based on height
          const r = 0.3 + normalizedHeight * 0.3;
          const g = 0.4 + normalizedHeight * 0.4;
          const b = 0.7;
          
          colors.push(r, g, b);
        }
        
        for (let i = 0; i < positions2.length; i += 3) {
          const y = positions2[i + 1];
          
          // Different color pattern for second wave
          const normalizedHeight = (y + amplitude) / (2 * amplitude);
          
          const r = 0.7;
          const g = 0.2 + normalizedHeight * 0.2;
          const b = 0.5 + normalizedHeight * 0.3;
          
          colors2.push(r, g, b);
        }
        
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry2.setAttribute('color', new THREE.Float32BufferAttribute(colors2, 3));
        
        material.vertexColors = true;
        material2.vertexColors = true;
        
        geometry.attributes.color.needsUpdate = true;
        geometry2.attributes.color.needsUpdate = true;
      }
      
      // Animate floating architectural elements
      floatingElements.children.forEach(element => {
        const { originalY, phaseOffset, amplitude: elementAmplitude, frequency } = element.userData;
        
        // Oscillating up and down motion
        element.position.y = originalY + Math.sin(time * frequency + phaseOffset) * elementAmplitude;
        
        // Slight rotation
        element.rotation.y += 0.002;
      });
      
      // Animate point lights
      pointLights.forEach((light, index) => {
        const angle = time * 0.3 + (index * Math.PI * 2 / 3);
        const radius = 8;
        
        light.position.x = Math.cos(angle) * radius;
        light.position.z = Math.sin(angle) * radius;
        
        // Pulsating intensity
        light.intensity = 0.8 + Math.sin(time * 0.5 + index) * 0.2;
      });
      
      // Animate particles
      particles.rotation.y = time * 0.05;
      
      const particlePositions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        particlePositions[i3 + 1] += Math.sin(time + i * 0.1) * 0.01;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Mouse interaction
    const handleMouseMove = (e) => {
      if (!mountRef.current || !isInteractive) return;
      
      // Get normalized device coordinates (-1 to +1)
      const rect = mountRef.current.getBoundingClientRect();
      mousePosition.current.x = ((e.clientX - rect.left) / mountRef.current.clientWidth) * 2 - 1;
      mousePosition.current.y = -((e.clientY - rect.top) / mountRef.current.clientHeight) * 2 + 1;
    };
    
    const handleMouseEnter = () => {
      if (!isInteractive) return;
      
      setIsHovering(true);
      
      // Animate camera closer when mouse enters
      gsap.to(camera.position, {
        z: 8,
        duration: 1,
        ease: 'power2.out'
      });
      
      // Increase wave amplitude
      gsap.to(wave.material, {
        emissiveIntensity: 0.6,
        duration: 1
      });
    };
    
    const handleMouseLeave = () => {
      if (!isInteractive) return;
      
      setIsHovering(false);
      
      // Animate camera back when mouse leaves
      gsap.to(camera.position, {
        z: 10,
        duration: 1,
        ease: 'power2.out'
      });
      
      // Reset wave appearance
      gsap.to(wave.material, {
        emissiveIntensity: 0.3,
        duration: 1
      });
    };
    
    if (isInteractive) {
      mountRef.current.addEventListener('mousemove', handleMouseMove);
      mountRef.current.addEventListener('mouseenter', handleMouseEnter);
      mountRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (isInteractive && mountRef.current) {
        mountRef.current.removeEventListener('mousemove', handleMouseMove);
        mountRef.current.removeEventListener('mouseenter', handleMouseEnter);
        mountRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Dispose of all resources
      if (sceneRef.current) {
        sceneRef.current.traverse(object => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [color, speed, amplitude, colorMode, isInteractive]);
  
  return (
    <div 
      ref={mountRef} 
      className="parametric-wave-animation"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    >
      <div className="wave-overlay-gradient"></div>
    </div>
  );
};

export default ParametricWaveAnimation;