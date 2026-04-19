// src/hooks/useThreeJS.js
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Custom hook for managing Three.js scenes
 * @param {Object} options - Configuration options
 * @returns {Object} - Scene objects and utility functions
 */
const useThreeJS = (options = {}) => {
  // References
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const animationFrameRef = useRef(null);
  
  // State
  const [isInitialized, setIsInitialized] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  
  // Default options
  const defaultOptions = {
    antialias: true,
    alpha: false,
    cameraPosition: [0, 0, 5],
    cameraFov: 75,
    controlsEnabled: true,
    backgroundColor: 0x121212,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
    shadows: false,
    autoResize: true
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  // Store animation callback in a ref
  const animationCallback = useRef(null);
  
  // Initialize Three.js scene
  const initialize = () => {
    if (!containerRef.current) return;
    
    // Get container dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    setSize({ width, height });
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: mergedOptions.antialias,
      alpha: mergedOptions.alpha
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(mergedOptions.pixelRatio);
    renderer.shadowMap.enabled = mergedOptions.shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Clear container and append renderer
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(mergedOptions.backgroundColor);
    sceneRef.current = scene;
    
    // Create camera
    const aspectRatio = width / height;
    const camera = new THREE.PerspectiveCamera(
      mergedOptions.cameraFov,
      aspectRatio,
      0.1,
      1000
    );
    camera.position.set(...mergedOptions.cameraPosition);
    cameraRef.current = camera;
    
    // Create controls if enabled
    if (mergedOptions.controlsEnabled) {
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controlsRef.current = controls;
    }
    
    // Set initialized flag
    setIsInitialized(true);
    
    // Start animation loop
    startAnimationLoop();
  };
  
  // Handle window resize
  const handleResize = () => {
    if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    setSize({ width, height });
    
    // Update camera
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    
    // Update renderer
    rendererRef.current.setSize(width, height);
  };
  
  // Animation loop
  const renderFrame = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    // Update controls if enabled
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    
    // Call animation callback if set
    if (animationCallback.current) {
      animationCallback.current({
        renderer: rendererRef.current,
        scene: sceneRef.current,
        camera: cameraRef.current,
        controls: controlsRef.current
      });
    }
    
    // Render frame
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(renderFrame);
  };
  
  // Start animation loop
  const startAnimationLoop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(renderFrame);
  };
  
  // Stop animation loop
  const stopAnimationLoop = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };
  
  // Set animation callback
  const setAnimationCallback = (callback) => {
    animationCallback.current = callback;
  };
  
  // Add an object to the scene
  const addToScene = (object) => {
    if (sceneRef.current) {
      sceneRef.current.add(object);
    }
  };
  
  // Remove an object from the scene
  const removeFromScene = (object) => {
    if (sceneRef.current) {
      sceneRef.current.remove(object);
    }
  };
  
  // Clear scene
  const clearScene = () => {
    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {
        const object = sceneRef.current.children[0];
        
        // Dispose of geometry and materials
        if (object.geometry) {
          object.geometry.dispose();
        }
        
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
        
        sceneRef.current.remove(object);
      }
    }
  };
  
  // Dispose of resources
  const dispose = () => {
    // Stop animation loop
    stopAnimationLoop();
    
    // Clear scene
    clearScene();
    
    // Dispose of controls
    if (controlsRef.current) {
      controlsRef.current.dispose();
      controlsRef.current = null;
    }
    
    // Dispose of renderer
    if (rendererRef.current) {
      rendererRef.current.dispose();
      
      if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
    rendererRef.current = null;
    
    // Reset camera and scene
    cameraRef.current = null;
    sceneRef.current = null;
    
    // Reset initialized flag
    setIsInitialized(false);
  };
  
  // Add default lighting to the scene
  const addDefaultLighting = () => {
    if (!sceneRef.current) return;
    
    // Remove existing lights
    sceneRef.current.children
      .filter(child => 
        child instanceof THREE.AmbientLight || 
        child instanceof THREE.DirectionalLight || 
        child instanceof THREE.PointLight
      )
      .forEach(light => sceneRef.current.remove(light));
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = mergedOptions.shadows;
    
    // Configure shadow properties
    if (mergedOptions.shadows) {
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 50;
      directionalLight.shadow.camera.left = -10;
      directionalLight.shadow.camera.right = 10;
      directionalLight.shadow.camera.top = 10;
      directionalLight.shadow.camera.bottom = -10;
    }
    
    sceneRef.current.add(directionalLight);
    
    return { ambientLight, directionalLight };
  };
  
  // Take a screenshot of the current view
  const takeScreenshot = (options = {}) => {
    if (!rendererRef.current) return null;
    
    const defaultOptions = {
      width: size.width,
      height: size.height,
      mimeType: 'image/png',
      quality: 1
    };
    
    const screenshotOptions = { ...defaultOptions, ...options };
    
    // Preserve current size
    const originalSize = {
      width: rendererRef.current.domElement.width,
      height: rendererRef.current.domElement.height
    };
    
    // Resize renderer if different size requested
    if (screenshotOptions.width !== originalSize.width || 
        screenshotOptions.height !== originalSize.height) {
      rendererRef.current.setSize(screenshotOptions.width, screenshotOptions.height);
      cameraRef.current.aspect = screenshotOptions.width / screenshotOptions.height;
      cameraRef.current.updateProjectionMatrix();
    }
    
    // Render frame
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Get data URL
    const dataURL = rendererRef.current.domElement.toDataURL(
      screenshotOptions.mimeType,
      screenshotOptions.quality
    );
    
    // Restore original size
    if (screenshotOptions.width !== originalSize.width || 
        screenshotOptions.height !== originalSize.height) {
      rendererRef.current.setSize(originalSize.width, originalSize.height);
      cameraRef.current.aspect = originalSize.width / originalSize.height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
    
    return dataURL;
  };
  
  // Initialize on mount and handle resize
  useEffect(() => {
    initialize();
    
    if (mergedOptions.autoResize) {
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (mergedOptions.autoResize) {
        window.removeEventListener('resize', handleResize);
      }
      
      dispose();
    };
  }, []); 
  
  // Return public API
  return {
    containerRef,
    isInitialized,
    size,
    // Refs to Three.js objects
    get renderer() { return rendererRef.current; },
    get scene() { return sceneRef.current; },
    get camera() { return cameraRef.current; },
    get controls() { return controlsRef.current; },
    // Methods
    initialize,
    dispose,
    addToScene,
    removeFromScene,
    clearScene,
    startAnimationLoop,
    stopAnimationLoop,
    setAnimationCallback,
    addDefaultLighting,
    takeScreenshot,
    handleResize
  };
};

  controlsRef.current.dispose();
  controlsRef.current = null;
}

// Dispose of renderer
if (rendererRef.current) {
  rendererRef.current.dispose();
  
  if (containerRef.current && rendererRef.current.domElement.parentNode === containerRef.current) {
    containerRef.current.removeChild(rendererRef.current.domElement);
  }
  
  rendererRef.current = null;
}