import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './BuildingAnatomy.css';

const BuildingAnatomy = () => {
  const mountRef = useRef(null);
  const [activeLayer, setActiveLayer] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  
  const layers = [
    { id: 'structure', name: 'Structure', color: '#1a2a3a' },
    { id: 'environmental', name: 'Environmental', color: '#1b4d5f' },
    { id: 'spatial', name: 'Spatial', color: '#167053' },
    { id: 'material', name: 'Material', color: '#b06543' },
    { id: 'all', name: 'All Layers', color: '#f8f9fa' }
  ];

  useEffect(() => {
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1622);
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Add OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    // Building base dimensions
    const width = 10;
    const height = 7;
    const depth = 6;
    
    // Create building layers
    const structureLayer = createStructureLayer(width, height, depth);
    const environmentalLayer = createEnvironmentalLayer(width, height, depth);
    const spatialLayer = createSpatialLayer(width, height, depth);
    const materialLayer = createMaterialLayer(width, height, depth);
    
    // Add layers to the scene
    scene.add(structureLayer);
    scene.add(environmentalLayer);
    scene.add(spatialLayer);
    scene.add(materialLayer);
    
    // Manage layer visibility
    const updateLayerVisibility = (layerId) => {
      structureLayer.visible = layerId === 'structure' || layerId === 'all';
      environmentalLayer.visible = layerId === 'environmental' || layerId === 'all';
      spatialLayer.visible = layerId === 'spatial' || layerId === 'all';
      materialLayer.visible = layerId === 'material' || layerId === 'all';
      
      // Position layers for exploded view
      if (layerId === 'all') {
        structureLayer.position.set(0, 0, 0);
        environmentalLayer.position.set(0, 0, 0);
        spatialLayer.position.set(0, 0, 0);
        materialLayer.position.set(0, 0, 0);
      } else {
        const offset = 2;
        
        if (layerId === 'structure') {
          structureLayer.position.set(0, 0, 0);
          environmentalLayer.position.set(offset, 0, 0);
          spatialLayer.position.set(0, offset, 0);
          materialLayer.position.set(0, 0, offset);
        } else if (layerId === 'environmental') {
          structureLayer.position.set(-offset, 0, 0);
          environmentalLayer.position.set(0, 0, 0);
          spatialLayer.position.set(0, offset, 0);
          materialLayer.position.set(0, 0, offset);
        } else if (layerId === 'spatial') {
          structureLayer.position.set(0, -offset, 0);
          environmentalLayer.position.set(0, -offset, 0);
          spatialLayer.position.set(0, 0, 0);
          materialLayer.position.set(0, 0, offset);
        } else if (layerId === 'material') {
          structureLayer.position.set(0, 0, -offset);
          environmentalLayer.position.set(0, 0, -offset);
          spatialLayer.position.set(0, 0, -offset);
          materialLayer.position.set(0, 0, 0);
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    // Initial setup
    updateLayerVisibility(activeLayer);
    animate();
    setIsLoading(false);
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Watch for activeLayer changes
    const unsubscribe = watchActiveLayer((layerId) => {
      updateLayerVisibility(layerId);
    });
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
      mountRef.current && mountRef.current.removeChild(renderer.domElement);
      scene.remove(structureLayer);
      scene.remove(environmentalLayer);
      scene.remove(spatialLayer);
      scene.remove(materialLayer);
      renderer.dispose();
    };
  }, []);
  
  // Watch for activeLayer changes
  useEffect(() => {
    const watchActiveLayer = (callback) => {
      callback(activeLayer);
    };
    watchActiveLayer((layerId) => {
      setActiveLayer(layerId);
    });
  }, [activeLayer]);
  
  // Layer creation functions
  const createStructureLayer = (width, height, depth) => {
    const group = new THREE.Group();
    
    // Structural frame
    const frameGeometry = new THREE.BoxGeometry(width, height, depth);
    const frameMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a2a3a,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    group.add(frame);
    
    // Columns
    const columnGeometry = new THREE.CylinderGeometry(0.3, 0.3, height, 8);
    const columnMaterial = new THREE.MeshPhongMaterial({ color: 0x2d3e50 });
    
    const columnPositions = [
      [-width/2 + 1, -height/2, -depth/2 + 1],
      [width/2 - 1, -height/2, -depth/2 + 1],
      [-width/2 + 1, -height/2, depth/2 - 1],
      [width/2 - 1, -height/2, depth/2 - 1]
    ];
    
    columnPositions.forEach(position => {
      const column = new THREE.Mesh(columnGeometry, columnMaterial);
      column.position.set(position[0], position[1] + height/2, position[2]);
      group.add(column);
    });
    
    // Foundation
    const foundationGeometry = new THREE.BoxGeometry(width, 0.5, depth);
    const foundationMaterial = new THREE.MeshPhongMaterial({ color: 0x2d3e50 });
    const foundation = new THREE.Mesh(foundationGeometry, foundationMaterial);
    foundation.position.y = -height/2 - 0.25;
    group.add(foundation);
    
    return group;
  };
  
  const createEnvironmentalLayer = (width, height, depth) => {
    const group = new THREE.Group();
    
    // HVAC system (simplified)
    const hvacGeometry = new THREE.BoxGeometry(width - 1, 0.5, depth - 1);
    const hvacMaterial = new THREE.MeshPhongMaterial({ color: 0x1b4d5f });
    const hvac = new THREE.Mesh(hvacGeometry, hvacMaterial);
    hvac.position.y = height/2 - 0.5;
    group.add(hvac);
    
    // Pipes
    const pipeGeometry = new THREE.CylinderGeometry(0.1, 0.1, height - 2, 8);
    const pipeMaterial = new THREE.MeshPhongMaterial({ color: 0x2d7d93 });
    
    const pipePositions = [
      [-width/2 + 2, 0, -depth/2 + 2],
      [width/2 - 2, 0, -depth/2 + 2],
      [-width/2 + 2, 0, depth/2 - 2],
      [width/2 - 2, 0, depth/2 - 2]
    ];
    
    pipePositions.forEach(position => {
      const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
      pipe.position.set(...position);
      group.add(pipe);
    });
    
    // Windows (for natural light)
    const windowGeometry = new THREE.PlaneGeometry(1.5, 1.5);
    const windowMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2d7d93,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    
    // Front windows
    for (let i = -1; i <= 1; i += 2) {
      const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
      window1.position.set(i * 2, 0, depth/2 + 0.01);
      window1.rotation.y = Math.PI;
      group.add(window1);
    }
    
    // Back windows
    for (let i = -1; i <= 1; i += 2) {
      const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
      window2.position.set(i * 2, 0, -depth/2 - 0.01);
      group.add(window2);
    }
    
    return group;
  };
  
  const createSpatialLayer = (width, height, depth) => {
    const group = new THREE.Group();
    
    // Floors
    const floorGeometry = new THREE.BoxGeometry(width - 0.5, 0.2, depth - 0.5);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x167053 });
    
    // Multiple floors
    for (let i = -1; i <= 1; i++) {
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.position.y = i * 2;
      group.add(floor);
    }
    
    // Interior walls
    const wallGeometry = new THREE.BoxGeometry(0.2, height - 2, depth - 1);
    const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x25a87d });
    
    // Central dividing wall
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.x = -1;
    group.add(wall);
    
    // Stairs (simplified)
    const stairsGeometry = new THREE.BoxGeometry(2, height - 2, 1);
    const stairsMaterial = new THREE.MeshPhongMaterial({ color: 0x25a87d });
    const stairs = new THREE.Mesh(stairsGeometry, stairsMaterial);
    stairs.position.set(3, 0, 0);
    group.add(stairs);
    
    return group;
  };
  
  const createMaterialLayer = (width, height, depth) => {
    const group = new THREE.Group();
    
    // Facade panels
    const panelGeometry = new THREE.PlaneGeometry(1, 1);
    const panelMaterials = [
      new THREE.MeshPhongMaterial({ color: 0xb06543 }),
      new THREE.MeshPhongMaterial({ color: 0xdd8f6e })
    ];
    
    // Front facade
    for (let x = -4; x <= 4; x += 1) {
      for (let y = -3; y <= 3; y += 1) {
        const panelMaterial = panelMaterials[(x + y) % 2];
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(x, y, depth/2 + 0.02);
        panel.rotation.y = Math.PI;
        group.add(panel);
      }
    }
    
    // Side facades
    for (let z = -2; z <= 2; z += 1) {
      for (let y = -3; y <= 3; y += 1) {
        const panelMaterial = panelMaterials[(z + y) % 2];
        
        // Left facade
        const leftPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        leftPanel.position.set(-width/2 - 0.02, y, z);
        leftPanel.rotation.y = -Math.PI / 2;
        group.add(leftPanel);
        
        // Right facade
        const rightPanel = new THREE.Mesh(panelGeometry, panelMaterial);
        rightPanel.position.set(width/2 + 0.02, y, z);
        rightPanel.rotation.y = Math.PI / 2;
        group.add(rightPanel);
      }
    }
    
    // Roof material
    const roofGeometry = new THREE.BoxGeometry(width, 0.3, depth);
    const roofMaterial = new THREE.MeshPhongMaterial({ color: 0xb06543 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = height/2 + 0.15;
    group.add(roof);
    
    return group;
  };
  
  // Watch active layer function
  const watchActiveLayer = (callback) => {
    // In a real app, this might be a subscription to state changes
    return () => {}; // Cleanup function
  };
  
  const handleLayerChange = (layerId) => {
    setActiveLayer(layerId);
  };
  
  return (
    <div className="building-anatomy">
      <div className="building-controls">
        {layers.map(layer => (
          <button 
            key={layer.id}
            className={`layer-button ${activeLayer === layer.id ? 'active' : ''}`}
            style={{ 
              backgroundColor: activeLayer === layer.id ? layer.color : 'transparent',
              borderColor: layer.color 
            }}
            onClick={() => handleLayerChange(layer.id)}
          >
            {layer.name}
          </button>
        ))}
      </div>
      
      <div className="building-viewport" ref={mountRef}>
        {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading 3D Model...</p>
          </div>
        )}
      </div>
      
      <div className="building-info">
        <h3>Interactive Building Anatomy</h3>
        <p>Explore the different layers of architectural engineering by selecting a layer from the controls above. Drag to rotate the model and scroll to zoom.</p>
        {activeLayer !== 'all' && (
          <div className="active-layer-info">
            <h4>{layers.find(l => l.id === activeLayer)?.name} Layer</h4>
            <p>
              {activeLayer === 'structure' && 'The structural system provides the building\'s primary load-bearing framework, transferring forces to the foundation.'}
              {activeLayer === 'environmental' && 'Environmental systems manage airflow, temperature, and energy efficiency throughout the building.'}
              {activeLayer === 'spatial' && 'Spatial organization determines how people move through and use the spaces within the building.'}
              {activeLayer === 'material' && 'Material selection impacts aesthetics, performance, sustainability, and occupant experience.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingAnatomy;