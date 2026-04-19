// src/components/SimpleFacadeDesigner.js
import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Material maps for different facade materials with improved properties
const materialConfigs = {
  concrete: {
    color: '#e0e0e0',
    roughness: 0.9,
    metalness: 0.1,
    bumpScale: 0.05
  },
  glass: {
    color: '#a3d9ff',
    transmission: 0.95,
    roughness: 0.1,
    metalness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    ior: 1.5,
    reflectivity: 0.8,
    transparent: true
  },
  wood: {
    color: '#7d5a4f',
    roughness: 0.7,
    metalness: 0,
    bumpScale: 0.1
  },
  brick: {
    color: '#c2574a',
    roughness: 0.8,
    metalness: 0,
    bumpScale: 0.1
  },
  stone: {
    color: '#a8a8a8',
    roughness: 0.8,
    metalness: 0.1,
    bumpScale: 0.15
  },
  metal: {
    color: '#8a8a8a',
    roughness: 0.3,
    metalness: 0.8,
    envMapIntensity: 1.0
  },
  terracotta: {
    color: '#d95f43',
    roughness: 0.8,
    metalness: 0,
    bumpScale: 0.05
  }
};

// Enhanced default material creation function
const createDefaultMaterial = (config, color) => {
  const material = new THREE.MeshStandardMaterial({
    color: color || config.color,
    roughness: config.roughness || 0.5,
    metalness: config.metalness || 0,
    transparent: config.transparent || config.transmission ? true : false,
    transmission: config.transmission || 0,
    clearcoat: config.clearcoat || 0,
    clearcoatRoughness: config.clearcoatRoughness || 0,
    ior: config.ior || 1.5
  });
  
  return material;
};

const SimpleFacadeDesigner = forwardRef(({ config }, ref) => {
  const groupRef = useRef();
  const facadeRef = useRef();
  const windowsRef = useRef([]);
  const doorsRef = useRef([]);
  const balconyRef = useRef();
  const roofRef = useRef();
  const framesRef = useRef([]);
  
  // Materials refs
  const materials = useRef({
    primary: null,
    secondary: null,
    accent: null,
    trim: null
  });
  
  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
      // Return the current state of the facade
      return { config };
    }
  }));
  
  // Update building whenever config changes
  useEffect(() => {
    if (facadeRef.current) {
      const { width, height, depth } = config.dimensions;
      facadeRef.current.scale.set(width, height, depth);
    }
    
    // Update all elements
    updateMaterials();
    updateWindows();
    updateDoors();
    updateBalcony();
    updateRoof();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);
  
  // Improved material update function with better property handling
  const updateMaterials = () => {
    const { colorScheme, materials: materialTypes } = config;
    
    // Update primary material
    if (materials.current.primary) {
      materials.current.primary.color.set(colorScheme.primary);
      
      // Update material properties based on type
      const primaryConfig = materialConfigs[materialTypes.primary];
      materials.current.primary.roughness = primaryConfig.roughness || 0.5;
      materials.current.primary.metalness = primaryConfig.metalness || 0;
      materials.current.primary.clearcoat = primaryConfig.clearcoat || 0;
      materials.current.primary.clearcoatRoughness = primaryConfig.clearcoatRoughness || 0;
      
      // Special handling for transparent materials
      materials.current.primary.transparent = !!primaryConfig.transparent;
      materials.current.primary.transmission = primaryConfig.transmission || 0;
    }
    
    // Update secondary material
    if (materials.current.secondary) {
      materials.current.secondary.color.set(colorScheme.secondary);
      
      // Update properties based on selected material type
      const secondaryConfig = materialConfigs[materialTypes.secondary];
      materials.current.secondary.roughness = secondaryConfig.roughness || 0.5;
      materials.current.secondary.metalness = secondaryConfig.metalness || 0;
      
      // Special handling for glass
      if (materialTypes.secondary === 'glass') {
        materials.current.secondary.transparent = true;
        materials.current.secondary.transmission = 0.9;
        materials.current.secondary.roughness = 0.1;
        materials.current.secondary.ior = 1.5;
        materials.current.secondary.clearcoat = 1;
      }
    }
    
    // Update accent material
    if (materials.current.accent) {
      materials.current.accent.color.set(colorScheme.accent);
      
      const accentConfig = materialConfigs[materialTypes.accent];
      materials.current.accent.roughness = accentConfig.roughness || 0.5;
      materials.current.accent.metalness = accentConfig.metalness || 0;
    }
    
    // Update trim material
    if (materials.current.trim) {
      materials.current.trim.color.set(colorScheme.trim);
      
      const trimConfig = materialConfigs[materialTypes.trim];
      materials.current.trim.roughness = trimConfig.roughness || 0.5;
      materials.current.trim.metalness = trimConfig.metalness || 0;
    }
  };
  
  // Enhanced window update function with position control
  const updateWindows = () => {
    const { windows } = config.elements;
    
    windowsRef.current.forEach((windowRef, index) => {
      if (windowRef && index < windows.count) {
        // Make window visible
        windowRef.visible = true;
        
        // Get position adjustments from config if they exist
        const posX = windows.positions && windows.positions[index] ? 
                     windows.positions[index].x : 0;
        const posY = windows.positions && windows.positions[index] ? 
                     windows.positions[index].y : 0;
        
        // Position windows based on pattern with more precision and user adjustments
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        switch (windows.pattern) {
          case 'grid':
            windowRef.position.set(
              (col - 1) * 2.5 + posX,
              (row - 1) * 2 + 1 + posY,
              3.1
            );
            break;
          case 'asymmetric':
            windowRef.position.set(
              (col - 1) * 2.5 + (row % 2) * 0.8 + posX,
              (row - 1) * 2 + 1.2 + posY,
              3.1
            );
            break;
          case 'ribbon':
            windowRef.position.set(
              (col - 1) * 3.5 + posX,
              row + posY,
              3.1
            );
            windowRef.scale.set(3, 0.8, 1);
            break;
          case 'scattered':
            windowRef.position.set(
              (col - 1) * 3 + Math.sin(index) * 0.5 + posX,
              (row - 1) * 3 + Math.cos(index) * 0.5 + 1 + posY,
              3.1
            );
            break;
          default:
            windowRef.position.set(
              (col - 1) * 2.5 + posX,
              (row - 1) * 2 + 1 + posY,
              3.1
            );
        }
        
        // Style windows based on window style with more variety
        switch (windows.style) {
          case 'large':
            windowRef.scale.set(2, 2, 0.1);
            break;
          case 'grid':
            windowRef.scale.set(1.8, 1.8, 0.1);
            // Add window frame for grid style
            if (framesRef.current[index]) {
              framesRef.current[index].visible = true;
              framesRef.current[index].position.copy(windowRef.position);
              framesRef.current[index].position.z += 0.01;
              framesRef.current[index].scale.set(1.9, 1.9, 0.05);
            }
            break;
          case 'arched':
            windowRef.scale.set(1.5, 2, 0.1);
            windowRef.geometry = new THREE.PlaneGeometry(1, 1, 1, 4);
            // Modify geometry to create arch shape
            if (windowRef.geometry.attributes.position) {
              const positions = windowRef.geometry.attributes.position.array;
              positions[4] = 0.5; // Top middle vertex x
              positions[5] = 1.2; // Top middle vertex y - make it higher for arch
              windowRef.geometry.attributes.position.needsUpdate = true;
            }
            break;
          case 'circular':
            windowRef.geometry = new THREE.CircleGeometry(0.9, 32);
            windowRef.scale.set(1.3, 1.3, 0.1);
            break;
          case 'horizontal':
            windowRef.scale.set(2.5, 1, 0.1);
            break;
          default:
            windowRef.scale.set(1.8, 1.8, 0.1);
        }
      } else if (windowRef) {
        // Hide windows that exceed the count
        windowRef.visible = false;
        
        // Hide window frames too
        if (framesRef.current[index]) {
          framesRef.current[index].visible = false;
        }
      }
    });
  };
  
  // Enhanced door update function with position control
  const updateDoors = () => {
    const { doors } = config.elements;
    
    doorsRef.current.forEach((doorRef, index) => {
      if (doorRef && index < doors.count) {
        doorRef.visible = true;
        
        // Get position adjustments from config if they exist
        const posX = doors.positions && doors.positions[index] ? 
                     doors.positions[index].x : 0;
        const posY = doors.positions && doors.positions[index] ? 
                     doors.positions[index].y : 0;
        
        // Position door at bottom center with better spacing and user adjustments
        doorRef.position.set(
          index * 4 - (doors.count - 1) * 2 + posX,
          -3 + posY,
          3.1
        );
        
        // Style door based on type
        switch (doors.style) {
          case 'sliding':
            doorRef.scale.set(2, 2.5, 0.1);
            // Add sliding door visual elements - horizontal line
            if (doorRef.children[0]) {
              doorRef.children[0].visible = true;
              doorRef.children[0].position.set(0, 0, 0.1);
            }
            break;
          case 'double':
            doorRef.scale.set(3, 2.5, 0.1);
            // Add double door visual element - vertical line
            if (doorRef.children[0]) {
              doorRef.children[0].visible = true;
              doorRef.children[0].position.set(0, 0, 0.1);
              doorRef.children[0].rotation.z = Math.PI / 2;
            }
            break;
          case 'revolving':
            doorRef.scale.set(2, 2.5, 0.1);
            if (doorRef.children[1]) {
              // Add circular elements for revolving door
              doorRef.children[1].visible = true;
              doorRef.children[1].position.set(0, 0, 0.1);
            }
            break;
          case 'folding':
            doorRef.scale.set(3, 2.5, 0.1);
            // Add folding door visual elements - multiple vertical lines
            if (doorRef.children[0] && doorRef.children[2]) {
              doorRef.children[0].visible = true;
              doorRef.children[0].position.set(-0.5, 0, 0.1);
              doorRef.children[0].rotation.z = Math.PI / 2;
              
              doorRef.children[2].visible = true;
              doorRef.children[2].position.set(0.5, 0, 0.1);
              doorRef.children[2].rotation.z = Math.PI / 2;
            }
            break;
          default:
            doorRef.scale.set(1.8, 2.2, 0.1);
            // Hide all door visual elements for standard door
            if (doorRef.children) {
              doorRef.children.forEach(child => {
                child.visible = false;
              });
            }
        }
      } else if (doorRef) {
        doorRef.visible = false;
      }
    });
  };
  
  // Enhanced balcony update function with position control
  const updateBalcony = () => {
    const { balcony } = config.elements;
    
    if (balconyRef.current) {
      balconyRef.current.visible = balcony.enabled;
      
      if (balcony.enabled) {
        // Get position adjustments from config if they exist
        const posX = balcony.position ? balcony.position.x : 0;
        const posY = balcony.position ? balcony.position.y : 0;
        
        // Position and style balcony based on selection and user adjustments
        switch (balcony.style) {
          case 'cantilever':
            balconyRef.current.position.set(0 + posX, 0 + posY, 4);
            balconyRef.current.scale.set(6, 1, 3);
            // Update railing style
            if (balconyRef.current.children[0]) {
              balconyRef.current.children[0].visible = true;
              balconyRef.current.children[0].position.set(0, 0.6, 1.4);
              
              // Update railing material
              if (balcony.railing === 'glass') {
                balconyRef.current.children[0].material = createDefaultMaterial(materialConfigs.glass);
                balconyRef.current.children[0].material.color.set(config.colorScheme.secondary);
              } else if (balcony.railing === 'metal') {
                balconyRef.current.children[0].material = createDefaultMaterial(materialConfigs.metal);
                balconyRef.current.children[0].material.color.set(config.colorScheme.trim);
              }
            }
            break;
          case 'recessed':
            balconyRef.current.position.set(0 + posX, 0 + posY, 2);
            balconyRef.current.scale.set(4, 1, 1.5);
            // Update railing style
            if (balconyRef.current.children[0]) {
              balconyRef.current.children[0].visible = true;
              balconyRef.current.children[0].position.set(0, 0.6, 0.7);
              balconyRef.current.children[0].scale.set(0.7, 1, 1);
            }
            break;
          case 'corner':
            balconyRef.current.position.set(4 + posX, 0 + posY, 4);
            balconyRef.current.scale.set(4, 1, 4);
            // Update railing style
            if (balconyRef.current.children[0]) {
              balconyRef.current.children[0].visible = true;
              balconyRef.current.children[0].position.set(0, 0.6, 0);
              balconyRef.current.children[0].scale.set(1, 1, 1);
            }
            break;
          case 'wrapped':
            balconyRef.current.position.set(0 + posX, 0 + posY, 4);
            balconyRef.current.scale.set(8, 1, 3);
            // Update railing style - make it larger for wrapped
            if (balconyRef.current.children[0]) {
              balconyRef.current.children[0].visible = true;
              balconyRef.current.children[0].position.set(0, 0.6, 1.4);
              balconyRef.current.children[0].scale.set(1.3, 1, 1);
            }
            break;
          default:
            balconyRef.current.position.set(0 + posX, 0 + posY, 4);
            balconyRef.current.scale.set(5, 1, 2);
            if (balconyRef.current.children[0]) {
              balconyRef.current.children[0].visible = true;
              balconyRef.current.children[0].position.set(0, 0.6, 0.9);
            }
        }
      }
    }
  };
  
  // Improved roof update function
  const updateRoof = () => {
    const { roof } = config.elements;
    
    if (roofRef.current) {
      // Update roof material
      if (roofRef.current.material) {
        const roofConfig = materialConfigs[roof.material];
        roofRef.current.material.color.set(config.colorScheme.accent);
        roofRef.current.material.roughness = roofConfig.roughness || 0.5;
        roofRef.current.material.metalness = roofConfig.metalness || 0;
      }
      
      // Position and style roof based on type
      switch (roof.style) {
        case 'flat':
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.rotation.x = 0;
          roofRef.current.scale.set(6, 0.2, 5);
          break;
        case 'sloped':
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.rotation.x = Math.PI * 0.1;
          roofRef.current.scale.set(6, 0.2, 5.5);
          break;
        case 'pitched':
          // Use a custom geometry for pitched roof
          if (roofRef.current.geometry.type !== 'custom pitched') {
            const pitchedGeometry = new THREE.BufferGeometry();
            const vertices = new Float32Array([
              // Front face (triangle)
              -3, 0, 2.5,
              3, 0, 2.5,
              0, 1, 0,
              // Back face (triangle)
              -3, 0, -2.5,
              3, 0, -2.5,
              0, 1, 0,
              // Bottom face (rectangle)
              -3, 0, -2.5,
              -3, 0, 2.5,
              3, 0, 2.5,
              3, 0, -2.5,
              // Left face (triangle)
              -3, 0, -2.5,
              -3, 0, 2.5,
              0, 1, 0,
              // Right face (triangle)
              3, 0, -2.5,
              3, 0, 2.5,
              0, 1, 0
            ]);
            
            const indices = [
              0, 1, 2, // Front
              5, 4, 3, // Back
              6, 7, 8, 8, 9, 6, // Bottom
              10, 11, 12, // Left
              13, 14, 15 // Right
            ];
            
            pitchedGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
            pitchedGeometry.setIndex(indices);
            pitchedGeometry.computeVertexNormals();
            pitchedGeometry.type = 'custom pitched';
            
            roofRef.current.geometry = pitchedGeometry;
          }
          
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.rotation.x = 0;
          roofRef.current.scale.set(1, 1, 1);
          break;
        case 'curved':
          // Use a curved geometry for curved roof
          if (roofRef.current.geometry.type !== 'custom curved') {
            const segments = 12;
            const curvedGeometry = new THREE.BufferGeometry();
            const vertices = [];
            const indices = [];
            
            // Create a half-cylinder like shape
            for (let i = 0; i <= segments; i++) {
              const angle = (i / segments) * Math.PI;
              const x = -3 + (i / segments) * 6;
              const y = Math.sin(angle) * 0.5;
              const z1 = 2.5; // Front
              const z2 = -2.5; // Back
              
              vertices.push(x, y, z1); // Front edge
              vertices.push(x, y, z2); // Back edge
              
              if (i < segments) {
                const index = i * 2;
                // Front face
                indices.push(index, index + 2, index + 3);
                indices.push(index, index + 3, index + 1);
                // Top face
                if (i > 0 && i < segments) {
                  indices.push(index, index - 2, index + 2);
                }
                // Bottom face
                if (i > 0 && i < segments) {
                  indices.push(index + 1, index + 3, index - 1);
                }
              }
            }
            
            curvedGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            curvedGeometry.setIndex(indices);
            curvedGeometry.computeVertexNormals();
            curvedGeometry.type = 'custom curved';
            
            roofRef.current.geometry = curvedGeometry;
          }
          
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.rotation.x = 0;
          roofRef.current.scale.set(1, 1, 1);
          break;
        case 'green':
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.rotation.x = 0;
          roofRef.current.scale.set(6, 0.4, 5);
          
          // Add a green roof texture
          if (roofRef.current.material) {
            roofRef.current.material.color.set('#43a047');
            roofRef.current.material.roughness = 0.9;
            roofRef.current.material.metalness = 0;
          }
          break;
        default:
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.rotation.x = 0;
          roofRef.current.scale.set(6, 0.2, 5);
      }
      
      // Apply overhang
      switch (roof.overhang) {
        case 'large':
          roofRef.current.scale.x *= 1.3;
          roofRef.current.scale.z *= 1.3;
          break;
        case 'medium':
          roofRef.current.scale.x *= 1.15;
          roofRef.current.scale.z *= 1.15;
          break;
        case 'minimal':
        default:
          // No change
          break;
      }
    }
  };
  
  // Create a building structure with more detailed components
  const createBuildingGeometry = () => {
    // Initialize materials
    materials.current = {
      primary: createDefaultMaterial(
        materialConfigs[config.materials.primary],
        config.colorScheme.primary
      ),
      secondary: createDefaultMaterial(
        materialConfigs[config.materials.secondary],
        config.colorScheme.secondary
      ),
      accent: createDefaultMaterial(
        materialConfigs[config.materials.accent],
        config.colorScheme.accent
      ),
      trim: createDefaultMaterial(
        materialConfigs[config.materials.trim],
        config.colorScheme.trim
      )
    };
    
    return (
      <group 
        ref={groupRef} 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]}
      >
        {/* Main Facade Structure */}
        <mesh 
          ref={facadeRef}
          position={[0, 0, 0]}
          scale={[config.dimensions.width, config.dimensions.height, config.dimensions.depth]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={materials.current.primary} attach="material" />
        </mesh>
        
        {/* Enhanced Windows with frames, glass, and depth */}
        {Array.from({ length: 12 }).map((_, i) => (
          <group 
            key={`window-group-${i}`}
            ref={el => windowsRef.current[i] = el}
            position={[0, 0, 3.1]}
            scale={[1.8, 1.8, 1]}
          >
            {/* Window Inset/Depth */}
            <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
              <boxGeometry args={[1, 1, 0.1]} />
              <meshStandardMaterial color="#111111" metalness={0} roughness={0.8} />
            </mesh>
            
            {/* Window Glass */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <planeGeometry args={[0.9, 0.9]} />
              <primitive object={materials.current.secondary} attach="material" />
            </mesh>
            
            {/* Window Frame */}
            <mesh position={[0, 0, 0.01]} castShadow>
              <ringGeometry args={[0.45, 0.5, 4]} />
              <meshStandardMaterial color={config.colorScheme.trim} metalness={0.5} roughness={0.3} />
            </mesh>
            
            {/* Window Dividers for grid style */}
            {config.elements.windows.style === 'grid' && (
              <>
                <mesh position={[0, 0, 0.02]} castShadow>
                  <boxGeometry args={[1, 0.05, 0.01]} />
                  <meshStandardMaterial color={config.colorScheme.trim} metalness={0.5} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0, 0.02]} castShadow>
                  <boxGeometry args={[0.05, 1, 0.01]} />
                  <meshStandardMaterial color={config.colorScheme.trim} metalness={0.5} roughness={0.3} />
                </mesh>
              </>
            )}
          </group>
        ))}
        
        {/* Enhanced Doors with frames, handles, and proper styling */}
        {Array.from({ length: 3 }).map((_, i) => (
          <group 
            key={`door-group-${i}`} 
            ref={el => doorsRef.current[i] = el} 
            position={[0, -3, 3.1]} 
            scale={[1.8, 2.2, 1]}
          >
            {/* Door Inset/Depth */}
            <mesh position={[0, 0, -0.05]} castShadow receiveShadow>
              <boxGeometry args={[1, 1, 0.1]} />
              <meshStandardMaterial color="#111111" metalness={0} roughness={0.8} />
            </mesh>
            
            {/* Door Panel */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <planeGeometry args={[0.9, 0.9]} />
              <primitive object={materials.current.secondary} attach="material" />
            </mesh>
            
            {/* Door Frame */}
            <mesh position={[0, 0, 0.01]} castShadow>
              <boxGeometry args={[1, 1, 0.01]} />
              <meshStandardMaterial 
                color={config.colorScheme.trim} 
                metalness={0.5} 
                roughness={0.3} 
                transparent={true}
                opacity={0.0}
              />
            </mesh>
            
            {/* Door Handle */}
            <mesh position={[0.35, 0, 0.05]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
              <meshStandardMaterial color="#d0d0d0" metalness={0.8} roughness={0.2} />
            </mesh>
            
            {/* Door Type Specific Elements */}
            {config.elements.doors.style === 'sliding' && (
              <mesh position={[0, 0, 0.02]} castShadow>
                <boxGeometry args={[0.9, 0.05, 0.01]} />
                <meshStandardMaterial color={config.colorScheme.trim} metalness={0.8} roughness={0.2} />
              </mesh>
            )}
            
            {config.elements.doors.style === 'double' && (
              <mesh position={[0, 0, 0.02]} castShadow>
                <boxGeometry args={[0.05, 0.9, 0.01]} />
                <meshStandardMaterial color={config.colorScheme.trim} metalness={0.8} roughness={0.2} />
              </mesh>
            )}
            
            {config.elements.doors.style === 'revolving' && (
              <mesh position={[0, 0, 0.02]} castShadow>
                <ringGeometry args={[0.2, 0.25, 32]} />
                <meshStandardMaterial color={config.colorScheme.trim} metalness={0.8} roughness={0.2} />
              </mesh>
            )}
          </group>
        ))}
        
        {/* Enhanced Balcony with railing and detailed structure */}
        <group ref={balconyRef} position={[0, 0, 4]} scale={[5, 1, 2]} visible={config.elements.balcony.enabled}>
          {/* Balcony Base/Floor */}
          <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
            <boxGeometry args={[1, 0.1, 1]} />
            <primitive object={materials.current.trim} attach="material" />
          </mesh>
          
          {/* Balcony Support/Structure */}
          <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.9, 0.5, 0.9]} />
            <meshStandardMaterial color={config.colorScheme.primary} metalness={0.2} roughness={0.7} />
          </mesh>
          
          {/* Balcony Railing */}
          <group position={[0, 0.5, 0]}>
            {/* Railing Posts */}
            {[-0.45, -0.15, 0.15, 0.45].map((x, i) => (
              <mesh key={`post-${i}`} position={[x, 0, 0.45]} castShadow>
                <boxGeometry args={[0.05, 0.5, 0.05]} />
                <meshStandardMaterial color={config.colorScheme.trim} metalness={0.5} roughness={0.3} />
              </mesh>
            ))}
            
            {/* Railing Top */}
            <mesh position={[0, 0.25, 0.45]} castShadow>
              <boxGeometry args={[1, 0.05, 0.05]} />
              <meshStandardMaterial color={config.colorScheme.trim} metalness={0.5} roughness={0.3} />
            </mesh>
            
            {/* Railing Panels - Material based on config */}
            <mesh position={[0, 0, 0.45]} castShadow>
              <boxGeometry args={[0.95, 0.4, 0.02]} />
              <meshStandardMaterial 
                color={config.colorScheme.secondary} 
                transparent={config.elements.balcony.railing === 'glass'}
                transmission={config.elements.balcony.railing === 'glass' ? 0.8 : 0}
                metalness={config.elements.balcony.railing === 'metal' ? 0.8 : 0.2}
                roughness={config.elements.balcony.railing === 'glass' ? 0.1 : 0.5}
              />
            </mesh>
          </group>
        </group>
        
        {/* Enhanced Roof with more detailed structure */}
        <mesh
          ref={roofRef}
          position={[0, 4, 0]}
          scale={[6, 0.2, 5]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={materials.current.accent} attach="material" />
        </mesh>
      </group>
    );
  };
  
  // Simple animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05 * (state.pointer.x * 0.5);
    }
  });
  
  return createBuildingGeometry();
});

export default SimpleFacadeDesigner;