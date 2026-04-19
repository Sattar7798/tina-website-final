// src/utils/three-utils.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * Creates a basic Three.js scene
 * @param {HTMLElement} container - Container element for the scene
 * @param {Object} options - Scene options
 * @returns {Object} - Scene, camera, renderer, and controls
 */
export const createScene = (container, options = {}) => {
  const defaults = {
    cameraPosition: [0, 0, 5],
    backgroundColor: 0x121212,
    ambientLightColor: 0xffffff,
    ambientLightIntensity: 0.5,
    directionalLightColor: 0xffffff,
    directionalLightIntensity: 1,
    directionalLightPosition: [5, 5, 5],
    enableControls: true,
    controlsTarget: [0, 0, 0]
  };

  const settings = { ...defaults, ...options };

  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(settings.backgroundColor);

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(...settings.cameraPosition);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Add lights
  const ambientLight = new THREE.AmbientLight(
    settings.ambientLightColor,
    settings.ambientLightIntensity
  );
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(
    settings.directionalLightColor,
    settings.directionalLightIntensity
  );
  directionalLight.position.set(...settings.directionalLightPosition);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  // Set up shadow properties
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;

  // Add controls if enabled
  let controls = null;
  if (settings.enableControls) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...settings.controlsTarget);
    controls.update();
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
  }

  // Handle window resize
  const handleResize = () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', handleResize);

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    if (controls) controls.update();
    renderer.render(scene, camera);
  };

  animate();

  // Return objects and cleanup function
  return {
    scene,
    camera,
    renderer,
    controls,
    cleanup: () => {
      window.removeEventListener('resize', handleResize);
      if (controls) controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    }
  };
};

/**
 * Loads a GLTF model
 * @param {String} url - URL of the model to load
 * @param {Function} onProgress - Progress callback
 * @returns {Promise} - Promise that resolves with the loaded model
 */
export const loadModel = (url, onProgress = null) => {
  const loader = new GLTFLoader();
  
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      (gltf) => {
        resolve(gltf);
      },
      onProgress ? 
        (xhr) => onProgress(xhr.loaded / xhr.total) : 
        undefined,
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * Creates a custom shader material
 * @param {Object} options - Shader options
 * @returns {THREE.ShaderMaterial} - Shader material
 */
export const createShaderMaterial = (options = {}) => {
  const defaults = {
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color(0x0088ff) }
    },
    vertexShader: `
      uniform float time;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(color, 1.0);
      }
    `
  };

  const settings = { ...defaults, ...options };
  
  return new THREE.ShaderMaterial({
    uniforms: settings.uniforms,
    vertexShader: settings.vertexShader,
    fragmentShader: settings.fragmentShader,
    transparent: true
  });
};

/**
 * Creates a parametric mesh
 * @param {Function} parametricFunction - Parametric function (u, v, target)
 * @param {Object} options - Mesh options
 * @returns {THREE.Mesh} - Parametric mesh
 */
export const createParametricMesh = (parametricFunction, options = {}) => {
  const defaults = {
    slices: 64,
    stacks: 64,
    material: new THREE.MeshPhongMaterial({
      color: 0x0088ff,
      side: THREE.DoubleSide,
      flatShading: false
    })
  };

  const settings = { ...defaults, ...options };
  
  const geometry = new THREE.ParametricGeometry(
    parametricFunction,
    settings.slices,
    settings.stacks
  );
  
  return new THREE.Mesh(geometry, settings.material);
};

/**
 * Creates an interactive outline effect for an object
 * @param {THREE.Object3D} object - Object to outline
 * @param {THREE.Scene} scene - Scene to add outline to
 * @param {Object} options - Outline options
 * @returns {Function} - Function to update outline
 */
export const createObjectOutline = (object, scene, options = {}) => {
  const defaults = {
    edgeColor: 0xffffff,
    edgeThickness: 1.5,
    pulseSpeed: 0.5,
    pulseMin: 0.5,
    pulseMax: 1.5
  };

  const settings = { ...defaults, ...options };
  
  // Create outline geometry
  const outlineMaterial = new THREE.MeshBasicMaterial({
    color: settings.edgeColor,
    transparent: true,
    side: THREE.BackSide
  });
  
  const outlineMesh = new THREE.Mesh(
    object.geometry.clone(),
    outlineMaterial
  );
  
  outlineMesh.scale.multiplyScalar(1.05);
  outlineMesh.position.copy(object.position);
  outlineMesh.quaternion.copy(object.quaternion);
  scene.add(outlineMesh);
  
  // Animation function
  const updateOutline = (time) => {
    const pulse = settings.pulseMin + 
      (Math.sin(time * settings.pulseSpeed) * 0.5 + 0.5) * 
      (settings.pulseMax - settings.pulseMin);
    
    outlineMaterial.opacity = pulse;
  };
  
  return updateOutline;
};

/**
 * Creates an exploded view of an object with its children
 * @param {THREE.Object3D} object - Parent object to explode
 * @param {Object} options - Explosion options
 * @returns {Function} - Function to update explosion
 */
export const createExplodedView = (object, options = {}) => {
  const defaults = {
    duration: 1.5,
    maxDistance: 2,
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t // Easing function
  };

  const settings = { ...defaults, ...options };
  
  // Store original positions
  const originalPositions = [];
  const directions = [];
  
  object.traverse((child) => {
    if (child.isMesh) {
      originalPositions.push({
        object: child,
        position: child.position.clone()
      });
      
      // Calculate direction from center (object's position)
      const direction = child.position.clone().sub(object.position).normalize();
      directions.push(direction);
    }
  });
  
  // Animation function
  let progress = 0;
  let exploding = false;
  let lastTime = 0;
  
  const updateExplosion = (time, explode = null) => {
    // Calculate delta time
    const delta = lastTime === 0 ? 0 : (time - lastTime) / 1000;
    lastTime = time;
    
    // Update exploding state if provided
    if (explode !== null) {
      exploding = explode;
    }
    
    // Update progress
    if (exploding) {
      progress = Math.min(progress + delta / settings.duration, 1);
    } else {
      progress = Math.max(progress - delta / settings.duration, 0);
    }
    
    // Apply easing
    const easedProgress = settings.easing(progress);
    
    // Update positions
    originalPositions.forEach((item, index) => {
      const { object, position } = item;
      const direction = directions[index];
      
      object.position.copy(position).add(
        direction.clone().multiplyScalar(settings.maxDistance * easedProgress)
      );
    });
    
    return progress;
  };
  
  return updateExplosion;
};

export default {
  createScene,
  loadModel,
  createShaderMaterial,
  createParametricMesh,
  createObjectOutline,
  createExplodedView
};