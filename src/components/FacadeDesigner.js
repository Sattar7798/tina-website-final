// src/components/FacadeDesigner.js
import React, { useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Material maps for different facade materials
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
    reflectivity: 0.8
  },
  wood: {
    color: '#7d5a4f',
    roughness: 0.7,
    metalness: 0
  },
  brick: {
    color: '#c2574a',
    roughness: 0.8,
    metalness: 0
  },
  stone: {
    color: '#a8a8a8',
    roughness: 0.8,
    metalness: 0.1
  },
  metal: {
    color: '#8a8a8a',
    roughness: 0.3,
    metalness: 0.8
  },
  terracotta: {
    color: '#d95f43',
    roughness: 0.8,
    metalness: 0
  }
};

// Default material when textures aren't loaded yet
const createDefaultMaterial = (config, color) => {
  return new THREE.MeshStandardMaterial({
    color: color || config.color,
    roughness: config.roughness || 0.5,
    metalness: config.metalness || 0,
    transparent: config.transmission ? true : false,
    transmission: config.transmission || 0,
    clearcoat: config.clearcoat || 0,
    clearcoatRoughness: config.clearcoatRoughness || 0,
    ior: config.ior || 1.5
  });
};

const FacadeDesigner = forwardRef(({ config }, ref) => {
  const groupRef = useRef();
  const facadeRef = useRef();
  const windowsRef = useRef([]);
  const doorsRef = useRef([]);
  const balconyRef = useRef();
  const roofRef = useRef();
  
  // Materials refs
  const materials = useRef({
    primary: null,
    secondary: null,
    accent: null,
    trim: null
  });
  
  useImperativeHandle(ref, () => ({
    getSnapshot: () => {
      // This could be expanded to return a snapshot of the current state
      return { config };
    }
  }));
  
  // Update building dimensions whenever config changes
  useEffect(() => {
    if (facadeRef.current) {
      const { width, height, depth } = config.dimensions;
      facadeRef.current.scale.set(width, height, depth);
    }
    
    // Update materials
    updateMaterials();
    
    // Update window configuration
    updateWindows();
    
    // Update door configuration
    updateDoors();
    
    // Update balcony if enabled
    updateBalcony();
    
    // Update roof style
    updateRoof();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);
  
  const updateMaterials = () => {
    const { colorScheme, materials: materialTypes } = config;
    
    // Update primary material
    if (materials.current.primary) {
      materials.current.primary.color.set(colorScheme.primary);
    }
    
    // Update secondary material
    if (materials.current.secondary) {
      materials.current.secondary.color.set(colorScheme.secondary);
      // Adjust transparency for glass
      if (materialTypes.secondary === 'glass') {
        materials.current.secondary.transparent = true;
        materials.current.secondary.transmission = 0.9;
        materials.current.secondary.roughness = 0.1;
      }
    }
    
    // Update accent material
    if (materials.current.accent) {
      materials.current.accent.color.set(colorScheme.accent);
    }
    
    // Update trim material
    if (materials.current.trim) {
      materials.current.trim.color.set(colorScheme.trim);
    }
  };
  
  const updateWindows = () => {
    const { windows } = config.elements;
    
    windowsRef.current.forEach((windowRef, index) => {
      if (windowRef && index < windows.count) {
        // Make window visible
        windowRef.visible = true;
        
        // Position windows based on pattern
        const row = Math.floor(index / 3);
        const col = index % 3;
        
        switch (windows.pattern) {
          case 'grid':
            windowRef.position.set(
              (col - 1) * 2.5,
              (row - 1) * 2 + 1,
              3.1
            );
            break;
          case 'asymmetric':
            windowRef.position.set(
              (col - 1) * 2.5 + (row % 2) * 0.8,
              (row - 1) * 2 + 1.2,
              3.1
            );
            break;
          case 'ribbon':
            windowRef.position.set(
              (col - 1) * 3.5,
              row,
              3.1
            );
            windowRef.scale.set(3, 0.8, 1);
            break;
          case 'scattered':
            windowRef.position.set(
              (col - 1) * 3 + Math.sin(index) * 0.5,
              (row - 1) * 3 + Math.cos(index) * 0.5 + 1,
              3.1
            );
            break;
          default:
            windowRef.position.set(
              (col - 1) * 2.5,
              (row - 1) * 2 + 1,
              3.1
            );
        }
        
        // Style windows based on window style
        switch (windows.style) {
          case 'large':
            windowRef.scale.set(2, 2, 1);
            break;
          case 'grid':
            windowRef.scale.set(1.8, 1.8, 1);
            break;
          case 'arched':
            windowRef.scale.set(1.5, 2, 1);
            break;
          case 'circular':
            windowRef.scale.set(1.2, 1.2, 1);
            break;
          case 'horizontal':
            windowRef.scale.set(2.5, 1, 1);
            break;
          default:
            windowRef.scale.set(1.8, 1.8, 1);
        }
      } else if (windowRef) {
        // Hide windows that exceed the count
        windowRef.visible = false;
      }
    });
  };
  
  const updateDoors = () => {
    const { doors } = config.elements;
    
    doorsRef.current.forEach((doorRef, index) => {
      if (doorRef && index < doors.count) {
        doorRef.visible = true;
        
        // Position door at bottom center
        doorRef.position.set(
          index * 4 - (doors.count - 1) * 2,
          -3,
          3.1
        );
        
        // Style door based on type
        switch (doors.style) {
          case 'sliding':
            doorRef.scale.set(2, 2.5, 1);
            break;
          case 'double':
            doorRef.scale.set(3, 2.5, 1);
            break;
          case 'revolving':
            doorRef.scale.set(2, 2.5, 1);
            break;
          case 'folding':
            doorRef.scale.set(3, 2.5, 1);
            break;
          default:
            doorRef.scale.set(1.8, 2.2, 1);
        }
      } else if (doorRef) {
        doorRef.visible = false;
      }
    });
  };
  
  const updateBalcony = () => {
    const { balcony } = config.elements;
    
    if (balconyRef.current) {
      balconyRef.current.visible = balcony.enabled;
      
      if (balcony.enabled) {
        // Position balcony based on style
        switch (balcony.style) {
          case 'cantilever':
            balconyRef.current.position.set(0, 0, 4);
            balconyRef.current.scale.set(6, 1, 3);
            break;
          case 'recessed':
            balconyRef.current.position.set(0, 0, 2);
            balconyRef.current.scale.set(4, 1, 1.5);
            break;
          case 'corner':
            balconyRef.current.position.set(4, 0, 4);
            balconyRef.current.scale.set(4, 1, 4);
            break;
          case 'wrapped':
            balconyRef.current.position.set(0, 0, 4);
            balconyRef.current.scale.set(8, 1, 3);
            break;
          default:
            balconyRef.current.position.set(0, 0, 4);
            balconyRef.current.scale.set(5, 1, 2);
        }
      }
    }
  };
  
  const updateRoof = () => {
    const { roof } = config.elements;
    
    if (roofRef.current) {
      // Position and style roof based on type
      switch (roof.style) {
        case 'flat':
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.scale.set(6, 0.2, 5);
          break;
        case 'sloped':
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.rotation.x = Math.PI * 0.1;
          roofRef.current.scale.set(6, 0.2, 5.5);
          break;
        case 'pitched':
          roofRef.current.position.set(0, 4.5, 0);
          roofRef.current.scale.set(6, 1, 5);
          break;
        case 'curved':
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.scale.set(6, 0.5, 5);
          break;
        case 'green':
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.scale.set(6, 0.4, 5);
          break;
        default:
          roofRef.current.position.set(0, 4, 0);
          roofRef.current.scale.set(6, 0.2, 5);
      }
    }
  };
  
  // Create a simple building structure that will update based on config
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
        >
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={materials.current.primary} attach="material" />
        </mesh>
        
        {/* Windows - placeholders that would be replaced with actual window models */}
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={`window-${i}`}
            ref={el => windowsRef.current[i] = el}
            position={[0, 0, 3.1]}
            scale={[1.8, 1.8, 0.1]}
          >
            <planeGeometry args={[1, 1]} />
            <primitive object={materials.current.secondary} attach="material" />
          </mesh>
        ))}
        
        {/* Doors - placeholders */}
        {Array.from({ length: 3 }).map((_, i) => (
          <mesh
            key={`door-${i}`}
            ref={el => doorsRef.current[i] = el}
            position={[0, -3, 3.1]}
            scale={[1.8, 2.2, 0.1]}
          >
            <planeGeometry args={[1, 1]} />
            <primitive object={materials.current.secondary} attach="material" />
          </mesh>
        ))}
        
        {/* Balcony */}
        <mesh
          ref={balconyRef}
          position={[0, 0, 4]}
          scale={[5, 1, 2]}
          visible={config.elements.balcony.enabled}
        >
          <boxGeometry args={[1, 0.1, 1]} />
          <primitive object={materials.current.trim} attach="material" />
        </mesh>
        
        {/* Roof */}
        <mesh
          ref={roofRef}
          position={[0, 4, 0]}
          scale={[6, 0.2, 5]}
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

export default FacadeDesigner; 