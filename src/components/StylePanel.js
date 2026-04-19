import React from 'react';
import './Panel.css';

const StylePanel = ({ config, updateConfig }) => {
  const architecturalStyles = [
    { id: 'modern', name: 'Modern', description: 'Clean lines, large windows, minimal ornamentation' },
    { id: 'minimalist', name: 'Minimalist', description: 'Simplicity, monochromatic, geometric precision' },
    { id: 'industrial', name: 'Industrial', description: 'Raw materials, exposed systems, utilitarian' },
    { id: 'traditional', name: 'Traditional', description: 'Symmetrical, proportioned, classical elements' },
    { id: 'biophilic', name: 'Biophilic', description: 'Nature-integrated, living walls, organic forms' }
  ];

  const handleStyleChange = (styleId) => {
    updateConfig(null, 'style', styleId);

    // Update other properties based on selected style
    switch (styleId) {
      case 'modern':
        updateConfig('colorScheme', {
          primary: '#e0e0e0',
          secondary: '#a3d9ff',
          accent: '#7d5a4f',
          trim: '#8a8a8a'
        });
        updateConfig('materials', {
          primary: 'concrete',
          secondary: 'glass',
          accent: 'wood',
          trim: 'metal'
        });
        break;
      case 'minimalist':
        updateConfig('colorScheme', {
          primary: '#f5f5f5',
          secondary: '#e0e0e0',
          accent: '#616161',
          trim: '#9e9e9e'
        });
        updateConfig('materials', {
          primary: 'concrete',
          secondary: 'glass',
          accent: 'metal',
          trim: 'metal'
        });
        break;
      case 'industrial':
        updateConfig('colorScheme', {
          primary: '#78909c',
          secondary: '#b0bec5',
          accent: '#c75b39',
          trim: '#546e7a'
        });
        updateConfig('materials', {
          primary: 'concrete',
          secondary: 'metal',
          accent: 'brick',
          trim: 'metal'
        });
        break;
      case 'traditional':
        updateConfig('colorScheme', {
          primary: '#d7ccc8',
          secondary: '#bcaaa4',
          accent: '#795548',
          trim: '#8d6e63'
        });
        updateConfig('materials', {
          primary: 'stone',
          secondary: 'wood',
          accent: 'brick',
          trim: 'wood'
        });
        break;
      case 'biophilic':
        updateConfig('colorScheme', {
          primary: '#c8e6c9',
          secondary: '#a5d6a7',
          accent: '#795548',
          trim: '#81c784'
        });
        updateConfig('materials', {
          primary: 'concrete',
          secondary: 'glass',
          accent: 'wood',
          trim: 'wood'
        });
        updateConfig('elements', {
          ...config.elements,
          landscaping: {
            style: 'abundant',
            elements: ['planters', 'greenWall', 'verticalGarden']
          }
        });
        break;
      default:
        break;
    }
  };

  const handleDimensionChange = (dimension, value) => {
    updateConfig('dimensions', {
      ...config.dimensions,
      [dimension]: parseFloat(value)
    });
  };

  const handleColorChange = (colorType, value) => {
    updateConfig('colorScheme', {
      ...config.colorScheme,
      [colorType]: value
    });
  };

  return (
    <div className="panel-scroll">
      <div className="panel-section">
        <h3 className="section-title">Architectural Style</h3>
        <p className="section-description">
          Choose a style to automatically set materials, colors, and proportions
        </p>
        
        <div className="style-selector">
          {architecturalStyles.map(style => (
            <div 
              key={style.id}
              className={`style-card ${config.style === style.id ? 'active' : ''}`}
              onClick={() => handleStyleChange(style.id)}
            >
              <div className="style-preview" data-style={style.id}>
                <div className="style-icon">{style.id.charAt(0).toUpperCase()}</div>
              </div>
              <div className="style-info">
                <h4>{style.name}</h4>
                <p>{style.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="panel-section">
        <h3 className="section-title">Building Dimensions</h3>
        <div className="input-group">
          <label>Width</label>
          <div className="slider-container">
            <input 
              type="range" 
              min="6" 
              max="20" 
              step="0.5"
              value={config.dimensions.width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
            />
            <span className="value-display">{config.dimensions.width}m</span>
          </div>
        </div>
        
        <div className="input-group">
          <label>Height</label>
          <div className="slider-container">
            <input 
              type="range" 
              min="4" 
              max="15" 
              step="0.5"
              value={config.dimensions.height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
            />
            <span className="value-display">{config.dimensions.height}m</span>
          </div>
        </div>
        
        <div className="input-group">
          <label>Depth</label>
          <div className="slider-container">
            <input 
              type="range" 
              min="6" 
              max="15" 
              step="0.5"
              value={config.dimensions.depth}
              onChange={(e) => handleDimensionChange('depth', e.target.value)}
            />
            <span className="value-display">{config.dimensions.depth}m</span>
          </div>
        </div>
      </div>
      
      <div className="panel-section">
        <h3 className="section-title">Color Scheme</h3>
        <div className="color-palette">
          <div className="color-input">
            <label>Primary</label>
            <input 
              type="color" 
              value={config.colorScheme.primary}
              onChange={(e) => handleColorChange('primary', e.target.value)}
            />
          </div>
          
          <div className="color-input">
            <label>Secondary</label>
            <input 
              type="color" 
              value={config.colorScheme.secondary}
              onChange={(e) => handleColorChange('secondary', e.target.value)}
            />
          </div>
          
          <div className="color-input">
            <label>Accent</label>
            <input 
              type="color" 
              value={config.colorScheme.accent}
              onChange={(e) => handleColorChange('accent', e.target.value)}
            />
          </div>
          
          <div className="color-input">
            <label>Trim</label>
            <input 
              type="color" 
              value={config.colorScheme.trim}
              onChange={(e) => handleColorChange('trim', e.target.value)}
            />
          </div>
        </div>
        
        <div className="color-preview">
          <div className="preview-swatch" style={{backgroundColor: config.colorScheme.primary}}></div>
          <div className="preview-swatch" style={{backgroundColor: config.colorScheme.secondary}}></div>
          <div className="preview-swatch" style={{backgroundColor: config.colorScheme.accent}}></div>
          <div className="preview-swatch" style={{backgroundColor: config.colorScheme.trim}}></div>
        </div>
      </div>
      
      <div className="panel-section">
        <button className="reset-button">Reset to Default</button>
      </div>
    </div>
  );
};

export default StylePanel; 