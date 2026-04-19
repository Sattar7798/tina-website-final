import React from 'react';
import './Panel.css';

const MaterialPanel = ({ config, updateConfig }) => {
  const materialOptions = [
    { id: 'concrete', name: 'Concrete', description: 'Durable, versatile structural material' },
    { id: 'glass', name: 'Glass', description: 'Transparent, creates openness and light' },
    { id: 'wood', name: 'Wood', description: 'Warm, natural, and sustainable' },
    { id: 'brick', name: 'Brick', description: 'Classic, textured masonry material' },
    { id: 'stone', name: 'Stone', description: 'Timeless, durable natural material' },
    { id: 'metal', name: 'Metal', description: 'Modern, sleek, and structurally strong' },
    { id: 'terracotta', name: 'Terracotta', description: 'Earthy, traditional clay material' }
  ];

  const handleMaterialChange = (materialType, value) => {
    updateConfig('materials', {
      ...config.materials,
      [materialType]: value
    });
  };

  const renderMaterialSelector = (title, description, type, currentValue) => {
    return (
      <div className="materials-section">
        <h4>{title}</h4>
        <p className="material-description">{description}</p>
        
        <div className="material-options">
          {materialOptions.map(material => (
            <div 
              key={material.id}
              className={`material-option ${currentValue === material.id ? 'selected' : ''}`}
              onClick={() => handleMaterialChange(type, material.id)}
            >
              <div className="material-swatch" data-material={material.id}></div>
              <span>{material.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMaterialDetails = (materialType) => {
    const material = materialOptions.find(m => m.id === config.materials[materialType]);
    if (!material) return null;

    return (
      <div className="material-details">
        <h5>{material.name}</h5>
        <p>{material.description}</p>
        
        <div className="material-properties">
          <div className="property">
            <span className="property-name">Sustainability</span>
            <div className="property-rating">
              <span className={`rating-dot ${getMaterialRating(material.id, 'sustainability') >= 1 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'sustainability') >= 2 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'sustainability') >= 3 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'sustainability') >= 4 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'sustainability') >= 5 ? 'active' : ''}`}></span>
            </div>
          </div>
          
          <div className="property">
            <span className="property-name">Durability</span>
            <div className="property-rating">
              <span className={`rating-dot ${getMaterialRating(material.id, 'durability') >= 1 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'durability') >= 2 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'durability') >= 3 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'durability') >= 4 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'durability') >= 5 ? 'active' : ''}`}></span>
            </div>
          </div>
          
          <div className="property">
            <span className="property-name">Cost</span>
            <div className="property-rating">
              <span className={`rating-dot ${getMaterialRating(material.id, 'cost') >= 1 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'cost') >= 2 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'cost') >= 3 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'cost') >= 4 ? 'active' : ''}`}></span>
              <span className={`rating-dot ${getMaterialRating(material.id, 'cost') >= 5 ? 'active' : ''}`}></span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper function to get material ratings
  const getMaterialRating = (materialId, property) => {
    const ratings = {
      concrete: { sustainability: 3, durability: 5, cost: 3 },
      glass: { sustainability: 2, durability: 3, cost: 4 },
      wood: { sustainability: 5, durability: 3, cost: 3 },
      brick: { sustainability: 4, durability: 4, cost: 3 },
      stone: { sustainability: 4, durability: 5, cost: 5 },
      metal: { sustainability: 3, durability: 4, cost: 4 },
      terracotta: { sustainability: 4, durability: 3, cost: 3 }
    };
    
    return ratings[materialId]?.[property] || 0;
  };

  return (
    <div className="panel-scroll">
      <div className="panel-section">
        <h3 className="section-title">Facade Materials</h3>
        <p className="section-description">
          Select materials for different parts of your building facade
        </p>
        
        {renderMaterialSelector(
          "Primary Material", 
          "Main material used for the building structure", 
          "primary", 
          config.materials.primary
        )}
        
        {renderMaterialDetails("primary")}
        
        {renderMaterialSelector(
          "Secondary Material", 
          "Used for windows, screens, and feature elements", 
          "secondary", 
          config.materials.secondary
        )}
        
        {renderMaterialSelector(
          "Accent Material", 
          "Highlights and focal points", 
          "accent", 
          config.materials.accent
        )}
        
        {renderMaterialSelector(
          "Trim Material", 
          "Edges, frames, and detailing", 
          "trim", 
          config.materials.trim
        )}
      </div>
      
      <div className="panel-section">
        <h3 className="section-title">Material Finishes</h3>
        
        <div className="input-group">
          <label>Surface Texture</label>
          <select>
            <option value="smooth">Smooth</option>
            <option value="textured">Textured</option>
            <option value="rough">Rough</option>
            <option value="patterned">Patterned</option>
          </select>
        </div>
        
        <div className="input-group">
          <label>Finish Type</label>
          <select>
            <option value="matte">Matte</option>
            <option value="glossy">Glossy</option>
            <option value="polished">Polished</option>
            <option value="weathered">Weathered</option>
            <option value="natural">Natural</option>
          </select>
        </div>
      </div>
      
      <div className="panel-section">
        <h3 className="section-title">Material Combinations</h3>
        <div className="preset-combinations">
          <button className="preset-button">Modern Contrast</button>
          <button className="preset-button">Natural Harmony</button>
          <button className="preset-button">Industrial Edge</button>
          <button className="preset-button">Classic Elegance</button>
        </div>
      </div>
    </div>
  );
};

export default MaterialPanel; 