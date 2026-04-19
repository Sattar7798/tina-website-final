import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LayerNavigation.css';

const LayerNavigation = ({ onChange }) => {
  const [activeLayer, setActiveLayer] = useState(0);
  const [isHovered, setIsHovered] = useState(null);
  
  const layers = [
    {
      id: 0,
      name: 'Structural',
      description: 'Engineering foundations and structural systems',
      color: 'var(--structural-base)',
      icon: '🏗️'
    },
    {
      id: 1,
      name: 'Environmental',
      description: 'Sustainable systems and energy efficiency',
      color: 'var(--systems-base)',
      icon: '🌱'
    },
    {
      id: 2,
      name: 'Spatial',
      description: 'Human experience and spatial organization',
      color: 'var(--sustainability-base)',
      icon: '🏠'
    },
    {
      id: 3,
      name: 'Material',
      description: 'Innovative materials and their properties',
      color: 'var(--experience-base)',
      icon: '🧪'
    }
  ];

  useEffect(() => {
    if (onChange) {
      onChange(activeLayer);
    }
  }, [activeLayer, onChange]);

  const handleLayerClick = (id) => {
    setActiveLayer(id);
  };

  // Animation variants
  const layerVariants = {
    initial: (custom) => ({
      x: custom % 2 === 0 ? -20 : 20,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: (custom) => ({
      x: custom % 2 === 0 ? -20 : 20,
      opacity: 0,
      transition: { duration: 0.3 }
    })
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="layer-navigation">
      <div className="layer-tabs">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.id}
            className={`layer-tab ${activeLayer === layer.id ? 'active' : ''}`}
            onClick={() => handleLayerClick(layer.id)}
            onMouseEnter={() => setIsHovered(layer.id)}
            onMouseLeave={() => setIsHovered(null)}
            custom={index}
            variants={layerVariants}
            initial="initial"
            animate="animate"
            style={{
              backgroundColor: activeLayer === layer.id ? layer.color : 'transparent',
              borderColor: layer.color
            }}
          >
            <span className="layer-icon">{layer.icon}</span>
            <span className="layer-name">{layer.name}</span>
            {isHovered === layer.id && (
              <motion.div 
                className="layer-hint"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {layer.description}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLayer}
          className="layer-content"
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="layer-content-inner" style={{ backgroundColor: layers[activeLayer].color }}>
            <h3>{layers[activeLayer].name} Layer</h3>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LayerNavigation;