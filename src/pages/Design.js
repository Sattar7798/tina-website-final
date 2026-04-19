import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PresentationControls, Environment, ContactShadows } from '@react-three/drei';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SimpleFacadeDesigner from '../components/SimpleFacadeDesigner';
import MaterialPanel from '../components/MaterialPanel';
import StylePanel from '../components/StylePanel';
import ElementsPanel from '../components/ElementsPanel';
import SavePanel from '../components/SavePanel';

// Styles
import './Design.css';

const Design = () => {
  const [activeTab, setActiveTab] = useState('style');
  const [facadeConfig, setFacadeConfig] = useState({
    style: 'modern',
    materials: {
      primary: 'concrete',
      secondary: 'glass',
      accent: 'wood',
      trim: 'metal'
    },
    elements: {
      windows: {
        style: 'large',
        pattern: 'grid',
        frames: 'minimal',
        count: 6,
        positions: Array(6).fill().map(() => ({ x: 0, y: 0 }))
      },
      doors: {
        style: 'sliding',
        material: 'glass',
        count: 1,
        positions: [{ x: 0, y: 0 }]
      },
      balcony: {
        enabled: true,
        style: 'cantilever',
        railing: 'glass',
        position: { x: 0, y: 0 }
      },
      roof: {
        style: 'flat',
        material: 'concrete',
        overhang: 'minimal'
      },
      lighting: {
        style: 'recessed',
        color: 'warm',
        placement: 'even'
      },
      landscaping: {
        style: 'minimal',
        elements: ['planters']
      }
    },
    dimensions: {
      width: 12,
      height: 8,
      depth: 10
    },
    colorScheme: {
      primary: '#e0e0e0',
      secondary: '#a3d9ff',
      accent: '#7d5a4f',
      trim: '#8a8a8a'
    }
  });
  
  const [designHistory, setDesignHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const canvasRef = useRef();
  const designerRef = useRef();
  
  // Save snapshot to history when configuration changes
  useEffect(() => {
    // Only save if this isn't a history navigation
    if (currentHistoryIndex !== designHistory.length - 1 || designHistory.length === 0) {
      const newHistory = designHistory.slice(0, currentHistoryIndex + 1);
      newHistory.push({...facadeConfig});
      setDesignHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facadeConfig]);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  const updateFacadeConfig = (section, key, value) => {
    setFacadeConfig(prev => {
      const newConfig = {...prev};
      
      if (section) {
        if (typeof key === 'object') {
          // Handle nested updates
          newConfig[section] = {
            ...newConfig[section],
            ...key
          };
        } else {
          // Handle direct property updates
          newConfig[section][key] = value;
        }
      } else {
        // Update top-level property
        newConfig[key] = value;
      }
      
      return newConfig;
    });
  };
  
  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const captureDesign = () => {
    return new Promise((resolve) => {
      if (canvasRef.current) {
        // Render the canvas to a data URL
        const dataUrl = canvasRef.current.toDataURL('image/png');
        resolve(dataUrl);
      } else {
        resolve(null);
      }
    });
  };
  
  const handleSaveDesign = async () => {
    const designImage = await captureDesign();
    
    // Create design data
    const designData = {
      config: facadeConfig,
      image: designImage,
      userInfo: userInfo,
      timestamp: new Date().toISOString()
    };
    
    // Send to backend API
    try {
      const response = await fetch('/api/save-design', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData),
      });
      
      if (response.ok) {
        alert('Your design has been saved and sent successfully!');
      } else {
        throw new Error('Failed to save design');
      }
    } catch (error) {
      console.error('Error saving design:', error);
      
      // Fallback to email if API fails
      const subject = encodeURIComponent('Facade Design Submission');
      const body = encodeURIComponent(
        `Name: ${userInfo.name}\nEmail: ${userInfo.email}\nMessage: ${userInfo.message}\n\nConfiguration Data:\n${JSON.stringify(facadeConfig, null, 2)}`
      );
      
      window.open(`mailto:your-email@example.com?subject=${subject}&body=${body}`);
    }
  };
  
  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setFacadeConfig(designHistory[currentHistoryIndex - 1]);
    }
  };
  
  const handleRedo = () => {
    if (currentHistoryIndex < designHistory.length - 1) {
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setFacadeConfig(designHistory[currentHistoryIndex + 1]);
    }
  };
  
  const handleRandomize = () => {
    // Generate a randomized configuration
    const styles = ['modern', 'minimalist', 'industrial', 'traditional', 'biophilic'];
    const materials = ['concrete', 'glass', 'wood', 'brick', 'stone', 'metal', 'terracotta'];
    const windowStyles = ['large', 'grid', 'horizontal', 'arched', 'circular', 'irregular'];
    const balconyStyles = ['cantilever', 'recessed', 'stacked', 'corner', 'wrapped'];
    const roofStyles = ['flat', 'sloped', 'pitched', 'curved', 'green'];
    
    const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
    const getRandomColor = () => {
      const colors = [
        // Modern neutrals
        ['#e0e0e0', '#a3d9ff', '#7d5a4f', '#8a8a8a'],
        // Warm earth tones
        ['#d7ccc8', '#ffccbc', '#8d6e63', '#a1887f'],
        // Cool minimal
        ['#eceff1', '#90caf9', '#546e7a', '#78909c'],
        // Bold contemporary
        ['#f5f5f5', '#80deea', '#ff8a65', '#9e9e9e'],
        // Natural biophilic
        ['#e8f5e9', '#c8e6c9', '#795548', '#9e9d24']
      ];
      
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    const randomColors = getRandomColor();
    
    setFacadeConfig(prev => ({
      ...prev,
      style: getRandomItem(styles),
      materials: {
        primary: getRandomItem(materials),
        secondary: getRandomItem(materials),
        accent: getRandomItem(materials),
        trim: getRandomItem(materials)
      },
      elements: {
        ...prev.elements,
        windows: {
          ...prev.elements.windows,
          style: getRandomItem(windowStyles),
          pattern: getRandomItem(['grid', 'asymmetric', 'ribbon', 'scattered']),
          count: 3 + Math.floor(Math.random() * 8)
        },
        balcony: {
          ...prev.elements.balcony,
          enabled: Math.random() > 0.3,
          style: getRandomItem(balconyStyles)
        },
        roof: {
          ...prev.elements.roof,
          style: getRandomItem(roofStyles)
        }
      },
      colorScheme: {
        primary: randomColors[0],
        secondary: randomColors[1],
        accent: randomColors[2],
        trim: randomColors[3]
      }
    }));
  };
  
  return (
    <div className="design-page">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="design-hero">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="design-title">Facade Designer</h1>
            <p className="design-subtitle">
              Create, customize, and visualize your dream building facade in 3D
            </p>
          </motion.div>
        </section>
        
        {/* Design Studio */}
        <section className="design-studio">
          <div className="design-container">
            {/* Canvas and Controls */}
            <div className="design-viewport">
              <div className="design-canvas">
                <Canvas
                  ref={canvasRef}
                  shadows
                  camera={{ position: [0, 0, 15], fov: 40 }}
                  style={{ background: 'linear-gradient(to bottom, #e0f7fa, #f5f5f5)' }}
                  gl={{ preserveDrawingBuffer: true }}
                >
                  <ambientLight intensity={0.5} />
                  <directionalLight 
                    position={[10, 10, 5]} 
                    intensity={1} 
                    castShadow 
                    shadow-mapSize-width={2048} 
                    shadow-mapSize-height={2048}
                  />
                  
                  <PresentationControls
                    global
                    zoom={1}
                    rotation={[0, -Math.PI / 12, 0]}
                    polar={[-Math.PI / 3, Math.PI / 3]}
                    azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
                  >
                    <SimpleFacadeDesigner 
                      ref={designerRef}
                      config={facadeConfig}
                    />
                  </PresentationControls>
                  
                  <ContactShadows 
                    position={[0, -4.5, 0]} 
                    opacity={0.4} 
                    scale={20} 
                    blur={1.5} 
                    far={4.5}
                  />
                  <Environment preset="sunset" />
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI - Math.PI / 6}
                  />
                </Canvas>
              </div>
              
              <div className="design-controls">
                <div className="control-buttons">
                  <button 
                    className="control-btn"
                    onClick={handleUndo}
                    disabled={currentHistoryIndex <= 0}
                  >
                    <span>Undo</span>
                  </button>
                  <button 
                    className="control-btn"
                    onClick={handleRedo}
                    disabled={currentHistoryIndex >= designHistory.length - 1}
                  >
                    <span>Redo</span>
                  </button>
                  <button 
                    className="control-btn randomize"
                    onClick={handleRandomize}
                  >
                    <span>Randomize</span>
                  </button>
                </div>
                
                <div className="view-controls">
                  <button className="view-btn active">Front</button>
                  <button className="view-btn">Side</button>
                  <button className="view-btn">Top</button>
                  <button className="view-btn">Free</button>
                </div>
              </div>
            </div>
            
            {/* Settings Panel */}
            <div className="design-panel">
              <div className="panel-tabs">
                <button 
                  className={`panel-tab ${activeTab === 'style' ? 'active' : ''}`}
                  onClick={() => handleTabChange('style')}
                >
                  Style
                </button>
                <button 
                  className={`panel-tab ${activeTab === 'materials' ? 'active' : ''}`}
                  onClick={() => handleTabChange('materials')}
                >
                  Materials
                </button>
                <button 
                  className={`panel-tab ${activeTab === 'elements' ? 'active' : ''}`}
                  onClick={() => handleTabChange('elements')}
                >
                  Elements
                </button>
                <button 
                  className={`panel-tab ${activeTab === 'save' ? 'active' : ''}`}
                  onClick={() => handleTabChange('save')}
                >
                  Save & Send
                </button>
              </div>
              
              <div className="panel-content">
                {activeTab === 'style' && (
                  <StylePanel 
                    config={facadeConfig} 
                    updateConfig={updateFacadeConfig} 
                  />
                )}
                
                {activeTab === 'materials' && (
                  <MaterialPanel 
                    config={facadeConfig} 
                    updateConfig={updateFacadeConfig} 
                  />
                )}
                
                {activeTab === 'elements' && (
                  <ElementsPanel 
                    config={facadeConfig} 
                    updateConfig={updateFacadeConfig} 
                  />
                )}
                
                {activeTab === 'save' && (
                  <SavePanel 
                    userInfo={userInfo}
                    onChange={handleUserInfoChange}
                    onSave={handleSaveDesign}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Design Gallery */}
        <section className="design-gallery">
          <div className="container">
            <div className="section-header">
              <h2>Design Inspiration</h2>
              <p>Explore examples of facades created by architects and designers</p>
            </div>
            
            <div className="gallery-grid">
              {[1, 2, 3, 4, 5, 6].map(item => (
                <div key={item} className="gallery-item">
                  <div className="gallery-image" style={{backgroundColor: `hsl(${item * 60}, 70%, 90%)`}}>
                    <div className="image-placeholder">Design Example {item}</div>
                  </div>
                  <div className="gallery-info">
                    <h3>Facade Concept {item}</h3>
                    <p>Designer: Architecture Studio {item}</p>
                    <button className="use-design-btn">Use as Template</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="design-features">
          <div className="container">
            <div className="section-header">
              <h2>Designer Features</h2>
              <p>Powerful tools to help you create stunning architectural designs</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Material Library</h3>
                <p>Choose from dozens of architectural materials including concrete, glass, wood, stone, and metal finishes.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📐</div>
                <h3>Parametric Controls</h3>
                <p>Adjust dimensions, proportions, and patterns with precise numerical controls or intuitive sliders.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💡</div>
                <h3>Lighting Simulation</h3>
                <p>See how your design interacts with natural light at different times of day through advanced lighting simulation.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📷</div>
                <h3>Multi-angle Views</h3>
                <p>Examine your facade design from any angle with our flexible 3D camera controls.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">🌿</div>
                <h3>Biophilic Elements</h3>
                <p>Integrate living walls, planters, and sustainable features into your facade design.</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">💾</div>
                <h3>Save & Share</h3>
                <p>Save your designs, export high-resolution images, and send directly to architects for feedback.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Design; 