import React, { useState } from 'react';
import './Panel.css';

const ElementsPanel = ({ config, updateConfig }) => {
  const [activeSection, setActiveSection] = useState('windows');
  
  const handleElementUpdate = (elementType, property, value) => {
    updateConfig('elements', {
      ...config.elements,
      [elementType]: {
        ...config.elements[elementType],
        [property]: value
      }
    });
  };
  
  const handleNestedElementUpdate = (elementType, nestedObj) => {
    updateConfig('elements', {
      ...config.elements,
      [elementType]: {
        ...config.elements[elementType],
        ...nestedObj
      }
    });
  };
  
  const renderWindowsSection = () => {
    const { windows } = config.elements;
    
    // Initialize positions array if it doesn't exist
    if (!windows.positions) {
      handleElementUpdate('windows', 'positions', Array(windows.count).fill().map(() => ({ x: 0, y: 0 })));
    }
    
    return (
      <div className="element-section">
        <h3 className="element-title">Windows</h3>
        
        <div className="input-group">
          <label>Window Style</label>
          <select 
            value={windows.style}
            onChange={(e) => handleElementUpdate('windows', 'style', e.target.value)}
          >
            <option value="large">Large Glass</option>
            <option value="grid">Grid Pattern</option>
            <option value="horizontal">Horizontal Ribbon</option>
            <option value="arched">Arched</option>
            <option value="circular">Circular</option>
            <option value="irregular">Irregular Pattern</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Window Pattern</label>
          <select 
            value={windows.pattern}
            onChange={(e) => handleElementUpdate('windows', 'pattern', e.target.value)}
          >
            <option value="grid">Regular Grid</option>
            <option value="asymmetric">Asymmetric</option>
            <option value="ribbon">Ribbon</option>
            <option value="scattered">Scattered</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Window Frames</label>
          <select 
            value={windows.frames}
            onChange={(e) => handleElementUpdate('windows', 'frames', e.target.value)}
          >
            <option value="minimal">Minimal</option>
            <option value="standard">Standard</option>
            <option value="thick">Thick/Bold</option>
            <option value="decorative">Decorative</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Window Count: {windows.count}</label>
          <div className="slider-container">
            <input 
              type="range" 
              min="1" 
              max="12" 
              step="1"
              value={windows.count}
              onChange={(e) => {
                const newCount = parseInt(e.target.value);
                
                // Update positions array when window count changes
                const newPositions = Array(newCount).fill().map((_, i) => {
                  if (windows.positions && windows.positions[i]) {
                    return windows.positions[i];
                  }
                  return { x: 0, y: 0 };
                });
                
                handleNestedElementUpdate('windows', {
                  count: newCount,
                  positions: newPositions
                });
              }}
            />
          </div>
        </div>
        
        {/* Position adjustment for windows */}
        {windows.count > 0 && (
          <div className="position-controls">
            <h4>Window Positions</h4>
            {Array.from({ length: Math.min(windows.count, 12) }).map((_, i) => {
              const position = windows.positions && windows.positions[i] ? windows.positions[i] : { x: 0, y: 0 };
              
              return (
                <div key={`window-pos-${i}`} className="position-group">
                  <label>Window {i + 1}</label>
                  <div className="position-sliders">
                    <div className="slider-with-label">
                      <span>X: {position.x.toFixed(1)}</span>
                      <input 
                        type="range" 
                        min="-3" 
                        max="3" 
                        step="0.1"
                        value={position.x}
                        onChange={(e) => {
                          const newPositions = [...(windows.positions || [])];
                          newPositions[i] = { ...position, x: parseFloat(e.target.value) };
                          handleElementUpdate('windows', 'positions', newPositions);
                        }}
                      />
                    </div>
                    <div className="slider-with-label">
                      <span>Y: {position.y.toFixed(1)}</span>
                      <input 
                        type="range" 
                        min="-3" 
                        max="3" 
                        step="0.1"
                        value={position.y}
                        onChange={(e) => {
                          const newPositions = [...(windows.positions || [])];
                          newPositions[i] = { ...position, y: parseFloat(e.target.value) };
                          handleElementUpdate('windows', 'positions', newPositions);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="element-preview">
          <div className={`window-preview ${windows.style} ${windows.pattern}`}>
            <div className="preview-label">Preview</div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderDoorsSection = () => {
    const { doors } = config.elements;
    
    // Initialize positions array if it doesn't exist
    if (!doors.positions) {
      handleElementUpdate('doors', 'positions', Array(doors.count).fill().map(() => ({ x: 0, y: 0 })));
    }
    
    return (
      <div className="element-section">
        <h3 className="element-title">Doors & Entrances</h3>
        
        <div className="input-group">
          <label>Door Style</label>
          <select 
            value={doors.style}
            onChange={(e) => handleElementUpdate('doors', 'style', e.target.value)}
          >
            <option value="sliding">Sliding Glass</option>
            <option value="double">Double Door</option>
            <option value="revolving">Revolving</option>
            <option value="folding">Folding Glass</option>
            <option value="standard">Standard</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Door Material</label>
          <select 
            value={doors.material}
            onChange={(e) => handleElementUpdate('doors', 'material', e.target.value)}
          >
            <option value="glass">Glass</option>
            <option value="wood">Wood</option>
            <option value="metal">Metal</option>
            <option value="composite">Composite</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Number of Entrances</label>
          <div className="counter-container">
            <button 
              className="counter-btn"
              onClick={() => {
                const newCount = Math.max(1, doors.count - 1);
                
                // Update positions array when door count changes
                const newPositions = Array(newCount).fill().map((_, i) => {
                  if (doors.positions && doors.positions[i]) {
                    return doors.positions[i];
                  }
                  return { x: 0, y: 0 };
                });
                
                handleNestedElementUpdate('doors', {
                  count: newCount,
                  positions: newPositions
                });
              }}
            >−</button>
            <span className="counter-value">{doors.count}</span>
            <button 
              className="counter-btn"
              onClick={() => {
                const newCount = Math.min(3, doors.count + 1);
                
                // Update positions array when door count changes
                const newPositions = Array(newCount).fill().map((_, i) => {
                  if (doors.positions && doors.positions[i]) {
                    return doors.positions[i];
                  }
                  return { x: 0, y: 0 };
                });
                
                handleNestedElementUpdate('doors', {
                  count: newCount,
                  positions: newPositions
                });
              }}
            >+</button>
          </div>
        </div>
        
        {/* Position adjustment for doors */}
        {doors.count > 0 && (
          <div className="position-controls">
            <h4>Door Positions</h4>
            {Array.from({ length: doors.count }).map((_, i) => {
              const position = doors.positions && doors.positions[i] ? doors.positions[i] : { x: 0, y: 0 };
              
              return (
                <div key={`door-pos-${i}`} className="position-group">
                  <label>Door {i + 1}</label>
                  <div className="position-sliders">
                    <div className="slider-with-label">
                      <span>X: {position.x.toFixed(1)}</span>
                      <input 
                        type="range" 
                        min="-4" 
                        max="4" 
                        step="0.1"
                        value={position.x}
                        onChange={(e) => {
                          const newPositions = [...(doors.positions || [])];
                          newPositions[i] = { ...position, x: parseFloat(e.target.value) };
                          handleElementUpdate('doors', 'positions', newPositions);
                        }}
                      />
                    </div>
                    <div className="slider-with-label">
                      <span>Y: {position.y.toFixed(1)}</span>
                      <input 
                        type="range" 
                        min="-2" 
                        max="2" 
                        step="0.1"
                        value={position.y}
                        onChange={(e) => {
                          const newPositions = [...(doors.positions || [])];
                          newPositions[i] = { ...position, y: parseFloat(e.target.value) };
                          handleElementUpdate('doors', 'positions', newPositions);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        <div className="element-preview">
          <div className={`door-preview ${doors.style} ${doors.material}`}>
            <div className="preview-label">Preview</div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderBalconySection = () => {
    const { balcony } = config.elements;
    
    // Initialize position if it doesn't exist
    if (balcony.enabled && !balcony.position) {
      handleElementUpdate('balcony', 'position', { x: 0, y: 0 });
    }
    
    return (
      <div className="element-section">
        <h3 className="element-title">Balcony & Projections</h3>
        
        <div className="input-group toggle">
          <label>Include Balcony</label>
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              id="balcony-toggle" 
              checked={balcony.enabled}
              onChange={(e) => handleElementUpdate('balcony', 'enabled', e.target.checked)}
            />
            <label htmlFor="balcony-toggle"></label>
          </div>
        </div>
        
        {balcony.enabled && (
          <>
            <div className="input-group">
              <label>Balcony Style</label>
              <select 
                value={balcony.style}
                onChange={(e) => handleElementUpdate('balcony', 'style', e.target.value)}
                disabled={!balcony.enabled}
              >
                <option value="cantilever">Cantilever</option>
                <option value="recessed">Recessed</option>
                <option value="stacked">Stacked</option>
                <option value="corner">Corner</option>
                <option value="wrapped">Wrapped</option>
              </select>
            </div>
            
            <div className="input-group">
              <label>Railing Type</label>
              <select 
                value={balcony.railing}
                onChange={(e) => handleElementUpdate('balcony', 'railing', e.target.value)}
                disabled={!balcony.enabled}
              >
                <option value="glass">Glass Panel</option>
                <option value="metal">Metal Rail</option>
                <option value="cable">Cable Rail</option>
                <option value="concrete">Concrete</option>
                <option value="wood">Wood</option>
              </select>
            </div>
            
            {/* Position adjustment for balcony */}
            <div className="position-controls">
              <h4>Balcony Position</h4>
              <div className="position-group">
                <div className="position-sliders">
                  <div className="slider-with-label">
                    <span>X: {(balcony.position?.x || 0).toFixed(1)}</span>
                    <input 
                      type="range" 
                      min="-5" 
                      max="5" 
                      step="0.1"
                      value={balcony.position?.x || 0}
                      onChange={(e) => {
                        const newPosition = { 
                          ...(balcony.position || { x: 0, y: 0 }), 
                          x: parseFloat(e.target.value) 
                        };
                        handleElementUpdate('balcony', 'position', newPosition);
                      }}
                    />
                  </div>
                  <div className="slider-with-label">
                    <span>Y: {(balcony.position?.y || 0).toFixed(1)}</span>
                    <input 
                      type="range" 
                      min="-3" 
                      max="3" 
                      step="0.1"
                      value={balcony.position?.y || 0}
                      onChange={(e) => {
                        const newPosition = { 
                          ...(balcony.position || { x: 0, y: 0 }), 
                          y: parseFloat(e.target.value) 
                        };
                        handleElementUpdate('balcony', 'position', newPosition);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="element-preview">
              <div className={`balcony-preview ${balcony.style} ${balcony.railing}`}>
                <div className="preview-label">Preview</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  
  const renderRoofSection = () => {
    const { roof } = config.elements;
    
    return (
      <div className="element-section">
        <h3 className="element-title">Roof Design</h3>
        
        <div className="input-group">
          <label>Roof Style</label>
          <select 
            value={roof.style}
            onChange={(e) => handleElementUpdate('roof', 'style', e.target.value)}
          >
            <option value="flat">Flat</option>
            <option value="sloped">Sloped</option>
            <option value="pitched">Pitched</option>
            <option value="curved">Curved</option>
            <option value="green">Green Roof</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Roof Material</label>
          <select 
            value={roof.material}
            onChange={(e) => handleElementUpdate('roof', 'material', e.target.value)}
          >
            <option value="concrete">Concrete</option>
            <option value="metal">Metal</option>
            <option value="glass">Glass</option>
            <option value="wood">Wood</option>
            <option value="green">Living Roof</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Roof Overhang</label>
          <select 
            value={roof.overhang}
            onChange={(e) => handleElementUpdate('roof', 'overhang', e.target.value)}
          >
            <option value="minimal">Minimal</option>
            <option value="standard">Standard</option>
            <option value="extended">Extended</option>
            <option value="dramatic">Dramatic</option>
          </select>
        </div>
        
        <div className="element-preview">
          <div className={`roof-preview ${roof.style} ${roof.material}`}>
            <div className="preview-label">Preview</div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderLightingSection = () => {
    const { lighting } = config.elements;
    
    return (
      <div className="element-section">
        <h3 className="element-title">Facade Lighting</h3>
        
        <div className="input-group">
          <label>Lighting Style</label>
          <select 
            value={lighting.style}
            onChange={(e) => handleElementUpdate('lighting', 'style', e.target.value)}
          >
            <option value="recessed">Recessed</option>
            <option value="spotlights">Spotlights</option>
            <option value="linear">Linear Strips</option>
            <option value="feature">Feature Lighting</option>
            <option value="minimal">Minimal</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Light Color</label>
          <select 
            value={lighting.color}
            onChange={(e) => handleElementUpdate('lighting', 'color', e.target.value)}
          >
            <option value="warm">Warm White</option>
            <option value="cool">Cool White</option>
            <option value="neutral">Neutral White</option>
            <option value="rgb">Color Changing</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Placement</label>
          <select 
            value={lighting.placement}
            onChange={(e) => handleElementUpdate('lighting', 'placement', e.target.value)}
          >
            <option value="even">Even Distribution</option>
            <option value="focal">Focal Points</option>
            <option value="perimeter">Perimeter</option>
            <option value="accent">Accent Features</option>
          </select>
        </div>
      </div>
    );
  };
  
  const renderLandscapingSection = () => {
    const { landscaping } = config.elements;
    const landscapingElements = landscaping.elements || [];
    
    const toggleLandscapingElement = (element) => {
      const updated = landscapingElements.includes(element)
        ? landscapingElements.filter(e => e !== element)
        : [...landscapingElements, element];
      
      handleNestedElementUpdate('landscaping', { elements: updated });
    };
    
    return (
      <div className="element-section">
        <h3 className="element-title">Green Elements</h3>
        
        <div className="input-group">
          <label>Green Integration Style</label>
          <select 
            value={landscaping.style}
            onChange={(e) => handleElementUpdate('landscaping', 'style', e.target.value)}
          >
            <option value="minimal">Minimal</option>
            <option value="moderate">Moderate</option>
            <option value="abundant">Abundant</option>
            <option value="vertical">Vertical Garden</option>
            <option value="integrated">Fully Integrated</option>
          </select>
        </div>
        
        <div className="checkbox-group">
          <label>Green Elements</label>
          <div className="checkbox-options">
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={landscapingElements.includes('planters')}
                onChange={() => toggleLandscapingElement('planters')}
              />
              Planters
            </label>
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={landscapingElements.includes('greenWall')}
                onChange={() => toggleLandscapingElement('greenWall')}
              />
              Green Wall
            </label>
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={landscapingElements.includes('verticalGarden')}
                onChange={() => toggleLandscapingElement('verticalGarden')}
              />
              Vertical Garden
            </label>
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={landscapingElements.includes('roofGarden')}
                onChange={() => toggleLandscapingElement('roofGarden')}
              />
              Roof Garden
            </label>
            
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                checked={landscapingElements.includes('climbingPlants')}
                onChange={() => toggleLandscapingElement('climbingPlants')}
              />
              Climbing Plants
            </label>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="panel-scroll">
      <div className="tabs-container">
        <button 
          className={`tab-button ${activeSection === 'windows' ? 'active' : ''}`}
          onClick={() => setActiveSection('windows')}
        >
          Windows
        </button>
        <button 
          className={`tab-button ${activeSection === 'doors' ? 'active' : ''}`}
          onClick={() => setActiveSection('doors')}
        >
          Doors
        </button>
        <button 
          className={`tab-button ${activeSection === 'balcony' ? 'active' : ''}`}
          onClick={() => setActiveSection('balcony')}
        >
          Balcony
        </button>
        <button 
          className={`tab-button ${activeSection === 'roof' ? 'active' : ''}`}
          onClick={() => setActiveSection('roof')}
        >
          Roof
        </button>
        <button 
          className={`tab-button ${activeSection === 'lighting' ? 'active' : ''}`}
          onClick={() => setActiveSection('lighting')}
        >
          Lighting
        </button>
        <button 
          className={`tab-button ${activeSection === 'landscaping' ? 'active' : ''}`}
          onClick={() => setActiveSection('landscaping')}
        >
          Green
        </button>
      </div>
      
      <div className="panel-section">
        {activeSection === 'windows' && renderWindowsSection()}
        {activeSection === 'doors' && renderDoorsSection()}
        {activeSection === 'balcony' && renderBalconySection()}
        {activeSection === 'roof' && renderRoofSection()}
        {activeSection === 'lighting' && renderLightingSection()}
        {activeSection === 'landscaping' && renderLandscapingSection()}
      </div>
    </div>
  );
};

export default ElementsPanel; 