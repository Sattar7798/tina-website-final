import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './ResearchWebVisualization.css';

const ResearchWebVisualization = () => {
  const containerRef = useRef(null);
  const threeContainerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [links, setLinks] = useState([]);
  
  // Define research topics
  const researchTopics = [
    {
      id: 'structural',
      name: 'Structural Systems',
      description: 'Research on innovative structural engineering approaches and methodologies',
      color: 'var(--structural-base)',
      size: 25,
      subtopics: [
        {
          id: 'parametric',
          name: 'Parametric Design',
          description: 'Using computational algorithms to generate and optimize structural forms',
          size: 18
        },
        {
          id: 'adaptive',
          name: 'Adaptive Structures',
          description: 'Structures that can respond to changing environmental conditions',
          size: 18
        },
        {
          id: 'seismic',
          name: 'Seismic Engineering',
          description: 'Designing structures resilient to earthquake forces',
          size: 18
        }
      ]
    },
    {
      id: 'environmental',
      name: 'Environmental Systems',
      description: 'Research on sustainable building systems and energy efficiency',
      color: 'var(--systems-base)',
      size: 25,
      subtopics: [
        {
          id: 'passive',
          name: 'Passive Design',
          description: 'Utilizing natural forces for climate control without mechanical systems',
          size: 18
        },
        {
          id: 'renewable',
          name: 'Renewable Energy',
          description: 'Integration of solar, wind, and other renewable sources in buildings',
          size: 18
        },
        {
          id: 'water',
          name: 'Water Systems',
          description: 'Water conservation, harvesting, and treatment in built environments',
          size: 18
        }
      ]
    },
    {
      id: 'spatial',
      name: 'Spatial Design',
      description: 'Research on human-centered spatial organization and experience',
      color: 'var(--sustainability-base)',
      size: 25,
      subtopics: [
        {
          id: 'circulation',
          name: 'Circulation Patterns',
          description: 'Optimal movement flows through architectural spaces',
          size: 18
        },
        {
          id: 'acoustic',
          name: 'Acoustic Design',
          description: 'Sound behavior and control in architectural environments',
          size: 18
        },
        {
          id: 'daylighting',
          name: 'Daylighting',
          description: 'Strategic use of natural light to enhance spatial quality',
          size: 18
        }
      ]
    },
    {
      id: 'material',
      name: 'Material Science',
      description: 'Research on innovative building materials and their properties',
      color: 'var(--experience-base)',
      size: 25,
      subtopics: [
        {
          id: 'composite',
          name: 'Composite Materials',
          description: 'Development of hybrid materials with enhanced properties',
          size: 18
        },
        {
          id: 'biobased',
          name: 'Bio-based Materials',
          description: 'Sustainable materials derived from biological sources',
          size: 18
        },
        {
          id: 'smart',
          name: 'Smart Materials',
          description: 'Materials that respond to environmental stimuli',
          size: 18
        }
      ]
    }
  ];

  // Generate nodes and links
  useEffect(() => {
    let newNodes = [];
    let newLinks = [];
    
    // Add main topics as nodes
    researchTopics.forEach((topic, index) => {
      const angle = (index / researchTopics.length) * Math.PI * 2;
      const radius = 150;
      
      const node = {
        id: topic.id,
        x: Math.cos(angle) * radius + 300,
        y: Math.sin(angle) * radius + 300,
        name: topic.name,
        description: topic.description,
        color: topic.color,
        size: topic.size,
        type: 'main'
      };
      
      newNodes.push(node);
      
      // Add subtopics as nodes
      topic.subtopics.forEach((subtopic, subIndex) => {
        const subAngle = angle + ((subIndex - 1) / topic.subtopics.length) * Math.PI * 0.5;
        const subRadius = 100;
        
        const subNode = {
          id: subtopic.id,
          x: node.x + Math.cos(subAngle) * subRadius,
          y: node.y + Math.sin(subAngle) * subRadius,
          name: subtopic.name,
          description: subtopic.description,
          color: topic.color,
          size: subtopic.size,
          type: 'sub',
          parentId: topic.id
        };
        
        newNodes.push(subNode);
        
        // Add link between main topic and subtopic
        newLinks.push({
          id: `${topic.id}-${subtopic.id}`,
          source: topic.id,
          target: subtopic.id,
          color: topic.color
        });
      });
    });
    
    // Add links between main topics
    for (let i = 0; i < researchTopics.length; i++) {
      const source = researchTopics[i].id;
      const target = researchTopics[(i + 1) % researchTopics.length].id;
      
      newLinks.push({
        id: `${source}-${target}`,
        source,
        target,
        color: 'var(--text-muted)',
        dashed: true
      });
    }
    
    // Add interdisciplinary links
    const interdisciplinaryLinks = [
      { source: 'parametric', target: 'adaptive', color: 'var(--accent-research)' },
      { source: 'passive', target: 'daylighting', color: 'var(--accent-research)' },
      { source: 'biobased', target: 'renewable', color: 'var(--accent-research)' },
      { source: 'smart', target: 'acoustic', color: 'var(--accent-research)' },
      { source: 'seismic', target: 'composite', color: 'var(--accent-research)' },
      { source: 'water', target: 'circulation', color: 'var(--accent-research)' }
    ];
    
    interdisciplinaryLinks.forEach(link => {
      newLinks.push({
        id: `${link.source}-${link.target}`,
        source: link.source,
        target: link.target,
        color: link.color,
        interdisciplinary: true
      });
    });
    
    setNodes(newNodes);
    setLinks(newLinks);
  }, []);

  // 3D Architectural Visualization
  useEffect(() => {
    if (!threeContainerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101820);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    threeContainerRef.current.appendChild(renderer.domElement);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Point lights for dramatic effect
    const colors = [0x4cc9f0, 0x4361ee, 0xb5179e];
    colors.forEach((color, index) => {
      const pointLight = new THREE.PointLight(color, 1, 20);
      const angle = (index / colors.length) * Math.PI * 2;
      pointLight.position.set(Math.cos(angle) * 8, 5, Math.sin(angle) * 8);
      scene.add(pointLight);
    });
    
    // Create architectural model
    const createArchitecturalModel = () => {
      const group = new THREE.Group();
      
      // Ground plane
      const groundGeometry = new THREE.PlaneGeometry(50, 50);
      const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x222222,
        metalness: 0.3,
        roughness: 0.8
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -2;
      ground.receiveShadow = true;
      group.add(ground);
      
      // Create buildings
      for (let i = 0; i < 15; i++) {
        const height = Math.random() * 5 + 2;
        const width = Math.random() * 2 + 1;
        const depth = Math.random() * 2 + 1;
        
        const geometry = new THREE.BoxGeometry(width, height, depth);
        
        // Create gradient material
        const color = new THREE.Color(
          0.1 + Math.random() * 0.1,
          0.3 + Math.random() * 0.3,
          0.5 + Math.random() * 0.3
        );
        
        const material = new THREE.MeshStandardMaterial({
          color: color,
          metalness: 0.3 + Math.random() * 0.5,
          roughness: 0.4 + Math.random() * 0.3,
          emissive: color,
          emissiveIntensity: 0.2
        });
        
        const building = new THREE.Mesh(geometry, material);
        
        // Position in a circular pattern
        const angle = (i / 15) * Math.PI * 2;
        const radius = 5 + Math.random() * 5;
        building.position.set(
          Math.cos(angle) * radius,
          height / 2 - 2,
          Math.sin(angle) * radius
        );
        
        building.castShadow = true;
        building.receiveShadow = true;
        
        group.add(building);
        
        // Add connection lines between buildings
        if (i > 0) {
          const prevBuilding = group.children[group.children.length - 2];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(
              building.position.x,
              building.position.y + height / 2,
              building.position.z
            ),
            new THREE.Vector3(
              prevBuilding.position.x,
              prevBuilding.position.y + prevBuilding.scale.y,
              prevBuilding.position.z
            )
          ]);
          
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x4cc9f0,
            transparent: true,
            opacity: 0.7
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          group.add(line);
        }
      }
      
      return group;
    };
    
    const architecturalModel = createArchitecturalModel();
    scene.add(architecturalModel);
    
    // Particles for atmosphere
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positionArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positionArray[i * 3] = (Math.random() - 0.5) * 30;
      positionArray[i * 3 + 1] = Math.random() * 15;
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      // Scale (for size)
      scaleArray[i] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Animate buildings
      architecturalModel.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh && child.geometry.type === 'BoxGeometry') {
          child.position.y = Math.sin(elapsedTime * 0.3 + index) * 0.2 + child.geometry.parameters.height / 2 - 2;
          child.rotation.y = elapsedTime * 0.05;
        }
      });
      
      // Animate particles
      particles.rotation.y = elapsedTime * 0.05;
      
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(elapsedTime + i * 0.1) * 0.01;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Update controls
      controls.update();
      
      // Render
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!threeContainerRef.current) return;
      
      camera.aspect = threeContainerRef.current.clientWidth / threeContainerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeContainerRef.current.clientWidth, threeContainerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Dispose resources
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material.isMaterial) {
            object.material.dispose();
          } else {
            // Handle array of materials
            for (const material of object.material) {
              material.dispose();
            }
          }
        }
      });
      
      // Remove renderer
      if (threeContainerRef.current) {
        threeContainerRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  // Handle node click
  const handleNodeClick = (nodeId) => {
    setActiveNode(activeNode === nodeId ? null : nodeId);
  };

  // Generate SVG paths for links
  const generatePath = (source, target) => {
    const sourceNode = nodes.find(node => node.id === source);
    const targetNode = nodes.find(node => node.id === target);
    
    if (!sourceNode || !targetNode) return '';
    
    const dx = targetNode.x - sourceNode.x;
    const dy = targetNode.y - sourceNode.y;
    const dr = Math.sqrt(dx * dx + dy * dy) * 2;
    
    return `M${sourceNode.x},${sourceNode.y}A${dr},${dr} 0 0,1 ${targetNode.x},${targetNode.y}`;
  };

  return (
    <div className="research-web-visualization" ref={containerRef}>
      <div className="web-header">
        <h2>Research Focus Areas</h2>
        <p>Exploring the interconnected domains of architectural engineering research</p>
      </div>
      
      {/* 3D Architectural Visualization */}
      <div className="architectural-visualization" ref={threeContainerRef}></div>
      
      <div className="web-container">
        <svg width="600" height="600" viewBox="0 0 600 600">
          {/* Links */}
          {links.map(link => (
            <path
              key={link.id}
              d={generatePath(link.source, link.target)}
              className={`web-link ${link.dashed ? 'dashed' : ''} ${link.interdisciplinary ? 'interdisciplinary' : ''} ${activeNode && (activeNode === link.source || activeNode === link.target) ? 'active' : ''}`}
              style={{ stroke: link.color }}
            />
          ))}
          
          {/* Nodes */}
          {nodes.map(node => (
            <g key={node.id} onClick={() => handleNodeClick(node.id)}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size}
                className={`web-node ${node.type} ${activeNode === node.id ? 'active' : ''}`}
                style={{ fill: node.color }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
              <text
                x={node.x}
                y={node.y + (node.type === 'main' ? 35 : 25)}
                className={`web-node-text ${node.type} ${activeNode === node.id ? 'active' : ''}`}
                textAnchor="middle"
              >
                {node.name}
              </text>
            </g>
          ))}
        </svg>
        
        {/* Node details */}
        {activeNode && (
          <motion.div
            className="node-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{nodes.find(n => n.id === activeNode)?.name}</h3>
            <p>{nodes.find(n => n.id === activeNode)?.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResearchWebVisualization;