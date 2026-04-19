import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MaterialDemonstration.css';

const MaterialDemonstration = () => {
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [activeProperty, setActiveProperty] = useState('thermal');
  
  const materials = [
    {
      id: 0,
      name: 'Cross-Laminated Timber',
      description: 'Engineered wood panels made by layering boards in alternating directions',
      image: '/assets/research/material-timber.jpg',
      color: '#8B4513',
      properties: {
        thermal: {
          value: 0.13,
          unit: 'W/(m·K)',
          rating: 'Good',
          description: 'Low thermal conductivity for excellent insulation properties'
        },
        structural: {
          value: 24,
          unit: 'MPa',
          rating: 'Very Good',
          description: 'High strength-to-weight ratio and good performance in multiple directions'
        },
        acoustic: {
          value: 0.10,
          unit: 'Absorption Coefficient',
          rating: 'Fair',
          description: 'Moderate sound absorption, but can be improved with surface treatments'
        },
        sustainability: {
          value: 90,
          unit: 'Score/100',
          rating: 'Excellent',
          description: 'Renewable material with carbon sequestration benefits'
        }
      }
    },
    {
      id: 1,
      name: 'Fiber-Reinforced Concrete',
      description: 'Concrete containing fibrous materials to increase structural integrity',
      image: '/assets/research/material-concrete.jpg',
      color: '#A9A9A9',
      properties: {
        thermal: {
          value: 1.7,
          unit: 'W/(m·K)',
          rating: 'Poor',
          description: 'High thermal conductivity requiring additional insulation'
        },
        structural: {
          value: 60,
          unit: 'MPa',
          rating: 'Excellent',
          description: 'High compressive strength with improved tensile performance'
        },
        acoustic: {
          value: 0.02,
          unit: 'Absorption Coefficient',
          rating: 'Poor',
          description: 'Low sound absorption, highly reflective of sound waves'
        },
        sustainability: {
          value: 40,
          unit: 'Score/100',
          rating: 'Fair',
          description: 'Energy-intensive production but durable long-term performance'
        }
      }
    },
    {
      id: 2,
      name: 'Smart Glass',
      description: 'Glass that changes properties in response to light, heat, or electrical charge',
      image: '/assets/research/material-glass.jpg',
      color: '#87CEEB',
      properties: {
        thermal: {
          value: 0.9,
          unit: 'W/(m·K)',
          rating: 'Excellent',
          description: 'Dynamic thermal regulation based on environmental conditions'
        },
        structural: {
          value: 50,
          unit: 'MPa',
          rating: 'Good',
          description: 'Comparable to standard glass but with enhanced functionality'
        },
        acoustic: {
          value: 0.05,
          unit: 'Absorption Coefficient',
          rating: 'Poor',
          description: 'Similar to standard glass with minimal sound absorption'
        },
        sustainability: {
          value: 65,
          unit: 'Score/100',
          rating: 'Good',
          description: 'Energy savings in operation offset higher manufacturing energy'
        }
      }
    },
    {
      id: 3,
      name: 'Mycelium Composites',
      description: 'Fungal-based materials that can be grown into specific forms',
      image: '/assets/research/material-mycelium.jpg',
      color: '#D2B48C',
      properties: {
        thermal: {
          value: 0.08,
          unit: 'W/(m·K)',
          rating: 'Excellent',
          description: 'Outstanding thermal insulation properties'
        },
        structural: {
          value: 0.5,
          unit: 'MPa',
          rating: 'Poor',
          description: 'Limited structural applications, mainly used for non-load-bearing elements'
        },
        acoustic: {
          value: 0.75,
          unit: 'Absorption Coefficient',
          rating: 'Excellent',
          description: 'High sound absorption due to porous structure'
        },
        sustainability: {
          value: 98,
          unit: 'Score/100',
          rating: 'Excellent',
          description: 'Biodegradable, minimal energy in production, carbon negative'
        }
      }
    }
  ];

  const propertyColors = {
    thermal: 'var(--structural-base)',
    structural: 'var(--systems-base)',
    acoustic: 'var(--sustainability-base)',
    sustainability: 'var(--experience-base)'
  };

  const propertyIcons = {
    thermal: '🔥',
    structural: '🏗️',
    acoustic: '🔊',
    sustainability: '♻️'
  };

  // Generate visualization data based on property
  const getVisualizationData = (property) => {
    return materials.map(material => ({
      id: material.id,
      name: material.name,
      color: material.color,
      value: material.properties[property].value,
      unit: material.properties[property].unit,
      max: getMaxValue(property)
    }));
  };

  // Get maximum value for a property across all materials
  const getMaxValue = (property) => {
    let maxValue = 0;
    materials.forEach(material => {
      if (material.properties[property].value > maxValue) {
        maxValue = material.properties[property].value;
      }
    });
    return maxValue;
  };

  const handleMaterialChange = (id) => {
    setActiveMaterial(id);
  };

  const handlePropertyChange = (property) => {
    setActiveProperty(property);
  };

  return (
    <div className="material-demonstration">
      <div className="material-header">
        <h2>Material Property Demonstrations</h2>
        <p>Explore how different architectural materials perform across key properties</p>
      </div>
      
      <div className="material-tabs">
        {materials.map(material => (
          <button
            key={material.id}
            className={`material-tab ${activeMaterial === material.id ? 'active' : ''}`}
            style={{ 
              borderColor: material.color,
              backgroundColor: activeMaterial === material.id ? material.color : 'transparent'
            }}
            onClick={() => handleMaterialChange(material.id)}
          >
            {material.name}
          </button>
        ))}
      </div>
      
      <div className="material-content">
        <div className="material-info">
          <h3>{materials[activeMaterial].name}</h3>
          <p>{materials[activeMaterial].description}</p>
          
          <div className="property-buttons">
            {Object.keys(materials[activeMaterial].properties).map(property => (
              <button
                key={property}
                className={`property-button ${activeProperty === property ? 'active' : ''}`}
                style={{ 
                  borderColor: propertyColors[property],
                  backgroundColor: activeProperty === property ? propertyColors[property] : 'transparent'
                }}
                onClick={() => handlePropertyChange(property)}
              >
                <span className="property-icon">{propertyIcons[property]}</span>
                <span className="property-name">{property.charAt(0).toUpperCase() + property.slice(1)}</span>
              </button>
            ))}
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProperty}
            className="property-visualization"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="visualization-header" style={{ color: propertyColors[activeProperty] }}>
              <h4>
                <span className="property-icon">{propertyIcons[activeProperty]}</span>
                {activeProperty.charAt(0).toUpperCase() + activeProperty.slice(1)} Performance
              </h4>
              <p>
                {materials[activeMaterial].properties[activeProperty].rating} ({materials[activeMaterial].properties[activeProperty].value} {materials[activeMaterial].properties[activeProperty].unit})
              </p>
            </div>
            
            <div className="visualization-content">
              {activeProperty === 'thermal' && (
                <div className="thermal-visualization">
                  <div className="heat-container">
                    <div className="heat-source" style={{ backgroundColor: '#FF5A5F' }}></div>
                    <div 
                      className="material-sample"
                      style={{ 
                        backgroundColor: materials[activeMaterial].color,
                        width: `${100 - (materials[activeMaterial].properties.thermal.value / 2) * 100}px`
                      }}
                    ></div>
                    <div className="temperature-gradient">
                      <div className="hot-side">Hot</div>
                      <div className="cold-side">Cold</div>
                    </div>
                  </div>
                  <div className="visualization-explanation">
                    <p>{materials[activeMaterial].properties.thermal.description}</p>
                    <p className="technical-note">
                      Lower thermal conductivity values indicate better insulation properties.
                    </p>
                  </div>
                </div>
              )}
              
              {activeProperty === 'structural' && (
                <div className="structural-visualization">
                  <div className="strength-container">
                    <div className="beam-container">
                      <div 
                        className="material-beam"
                        style={{ 
                          backgroundColor: materials[activeMaterial].color,
                          transform: `scaleY(${1 - (materials[activeMaterial].properties.structural.value / 100) * 0.3})`
                        }}
                      ></div>
                      <div className="load"></div>
                    </div>
                    <div className="deformation-scale">
                      <div className="max-def">Max Deformation</div>
                      <div className="min-def">Min Deformation</div>
                    </div>
                  </div>
                  <div className="visualization-explanation">
                    <p>{materials[activeMaterial].properties.structural.description}</p>
                    <p className="technical-note">
                      Higher MPa values indicate greater strength and less deformation under load.
                    </p>
                  </div>
                </div>
              )}
              
              {activeProperty === 'acoustic' && (
                <div className="acoustic-visualization">
                  <div className="sound-container">
                    <div className="sound-source">
                      <div className="sound-wave"></div>
                      <div className="sound-wave"></div>
                      <div className="sound-wave"></div>
                    </div>
                    <div 
                      className="material-sample"
                      style={{ 
                        backgroundColor: materials[activeMaterial].color
                      }}
                    >
                      {Array.from({ length: Math.round(materials[activeMaterial].properties.acoustic.value * 20) }).map((_, index) => (
                        <div 
                          key={index}
                          className="absorption-particle"
                          style={{
                            animationDelay: `${index * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div 
                      className="reflected-waves"
                      style={{
                        opacity: 1 - materials[activeMaterial].properties.acoustic.value
                      }}
                    >
                      <div className="sound-wave reversed"></div>
                      <div className="sound-wave reversed"></div>
                    </div>
                  </div>
                  <div className="visualization-explanation">
                    <p>{materials[activeMaterial].properties.acoustic.description}</p>
                    <p className="technical-note">
                      Higher absorption coefficient values indicate better sound absorption.
                    </p>
                  </div>
                </div>
              )}
              
              {activeProperty === 'sustainability' && (
                <div className="sustainability-visualization">
                  <div className="eco-impact-container">
                    <div className="impact-scale">
                      <div 
                        className="impact-meter"
                        style={{ 
                          width: `${materials[activeMaterial].properties.sustainability.value}%`,
                          backgroundColor: materials[activeMaterial].properties.sustainability.value > 75 
                            ? '#4CAF50' 
                            : materials[activeMaterial].properties.sustainability.value > 50 
                              ? '#FFC107' 
                              : '#FF5A5F'
                        }}
                      ></div>
                    </div>
                    <div className="impact-indicators">
                      <div className="low-impact">High Impact</div>
                      <div className="high-impact">Low Impact</div>
                    </div>
                    <div className="eco-icons">
                      {materials[activeMaterial].properties.sustainability.value > 80 && (
                        <div className="eco-icon">🌱</div>
                      )}
                      {materials[activeMaterial].properties.sustainability.value > 60 && (
                        <div className="eco-icon">♻️</div>
                      )}
                      {materials[activeMaterial].properties.sustainability.value > 40 && (
                        <div className="eco-icon">💧</div>
                      )}
                      {materials[activeMaterial].properties.sustainability.value <= 40 && (
                        <div className="eco-icon">🏭</div>
                      )}
                    </div>
                  </div>
                  <div className="visualization-explanation">
                    <p>{materials[activeMaterial].properties.sustainability.description}</p>
                    <p className="technical-note">
                      Higher sustainability scores indicate lower environmental impact and better resource efficiency.
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="comparison-chart">
              <h4>Material Comparison</h4>
              <div className="chart-container">
                {getVisualizationData(activeProperty).map(item => (
                  <div 
                    key={item.id}
                    className={`chart-bar ${activeMaterial === item.id ? 'active' : ''}`}
                    onClick={() => handleMaterialChange(item.id)}
                  >
                    <div 
                      className="bar-fill"
                      style={{ 
                        height: `${(item.value / item.max) * 100}%`,
                        backgroundColor: item.color
                      }}
                    ></div>
                    <div className="bar-label">{item.name.split(' ')[0]}</div>
                  </div>
                ))}
              </div>
              <div className="chart-unit">
                Unit: {materials[0].properties[activeProperty].unit}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MaterialDemonstration;