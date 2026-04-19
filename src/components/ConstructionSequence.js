import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './ConstructionSequence.css';

const ConstructionSequence = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  
  const constructionSteps = [
    {
      id: 0,
      name: 'Site Preparation',
      description: 'Clearing the site and preparing the foundation',
      duration: 2
    },
    {
      id: 1,
      name: 'Foundation',
      description: 'Laying the structural foundation',
      duration: 3
    },
    {
      id: 2,
      name: 'Structural Framework',
      description: 'Erecting the primary structural elements',
      duration: 4
    },
    {
      id: 3,
      name: 'Enclosure',
      description: 'Installing exterior walls and roof systems',
      duration: 3
    },
    {
      id: 4,
      name: 'Interior Systems',
      description: 'Implementing MEP (Mechanical, Electrical, Plumbing) systems',
      duration: 5
    },
    {
      id: 5,
      name: 'Finishing',
      description: 'Completing interior finishes and exterior details',
      duration: 3
    }
  ];
  
  // Automatic playback
  useEffect(() => {
    let timer;
    
    if (isPlaying) {
      timer = setTimeout(() => {
        setCurrentStep((prevStep) => {
          if (prevStep === constructionSteps.length - 1) {
            setIsPlaying(false);
            return prevStep;
          }
          return prevStep + 1;
        });
      }, (constructionSteps[currentStep].duration * 1000) / playbackSpeed);
    }
    
    return () => clearTimeout(timer);
  }, [currentStep, isPlaying, playbackSpeed, constructionSteps]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
    setIsPlaying(false);
  };
  
  const handleSpeedChange = (e) => {
    setPlaybackSpeed(parseFloat(e.target.value));
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < constructionSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
    }
  };
  
  return (
    <div className="construction-sequence">
      <div className="sequence-header">
        <h2>Construction Sequence Animation</h2>
        <p>Step-by-step visualization of the building construction process</p>
      </div>
      
      <div className="sequence-timeline">
        {constructionSteps.map((step) => (
          <div
            key={step.id}
            className={`timeline-step ${currentStep === step.id ? 'active' : ''} ${currentStep > step.id ? 'completed' : ''}`}
            onClick={() => handleStepChange(step.id)}
          >
            <div className="step-indicator">
              <span className="step-number">{step.id + 1}</span>
            </div>
            <div className="step-label">{step.name}</div>
          </div>
        ))}
      </div>
      
      <div className="sequence-viewport">
        <motion.div 
          className="sequence-animation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Site Preparation */}
          {currentStep >= 0 && (
            <div className={`construction-element site ${currentStep === 0 ? 'current' : ''}`}>
              <div className="ground"></div>
              <div className="excavation"></div>
            </div>
          )}
          
          {/* Foundation */}
          {currentStep >= 1 && (
            <div className={`construction-element foundation ${currentStep === 1 ? 'current' : ''}`}>
              <div className="foundation-slab"></div>
              <div className="foundation-footings"></div>
            </div>
          )}
          
          {/* Structural Framework */}
          {currentStep >= 2 && (
            <div className={`construction-element framework ${currentStep === 2 ? 'current' : ''}`}>
              <div className="column column-1"></div>
              <div className="column column-2"></div>
              <div className="column column-3"></div>
              <div className="column column-4"></div>
              <div className="beam beam-1"></div>
              <div className="beam beam-2"></div>
              <div className="floor floor-1"></div>
            </div>
          )}
          
          {/* Enclosure */}
          {currentStep >= 3 && (
            <div className={`construction-element enclosure ${currentStep === 3 ? 'current' : ''}`}>
              <div className="wall wall-1"></div>
              <div className="wall wall-2"></div>
              <div className="wall wall-3"></div>
              <div className="wall wall-4"></div>
              <div className="roof"></div>
            </div>
          )}
          
          {/* Interior Systems */}
          {currentStep >= 4 && (
            <div className={`construction-element systems ${currentStep === 4 ? 'current' : ''}`}>
              <div className="window window-1"></div>
              <div className="window window-2"></div>
              <div className="door"></div>
              <div className="mep-element mep-1"></div>
              <div className="mep-element mep-2"></div>
              <div className="mep-element mep-3"></div>
            </div>
          )}
          
          {/* Finishing */}
          {currentStep >= 5 && (
            <div className={`construction-element finishing ${currentStep === 5 ? 'current' : ''}`}>
              <div className="facade"></div>
              <div className="interior-finish"></div>
              <div className="landscape-element landscape-1"></div>
              <div className="landscape-element landscape-2"></div>
            </div>
          )}
        </motion.div>
      </div>
      
      <div className="sequence-info">
        <h3>{constructionSteps[currentStep].name}</h3>
        <p>{constructionSteps[currentStep].description}</p>
        <p className="step-duration">
          Duration: {constructionSteps[currentStep].duration} weeks
        </p>
      </div>
      
      <div className="sequence-controls">
        <button 
          className="control-button prev-button" 
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          role="button"
          tabIndex={0}
          aria-label="Previous Step"
        >
          &lt; Previous
        </button>
        
        <button 
          className="control-button play-button" 
          onClick={handlePlayPause}
          role="button"
          tabIndex={0}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        
        <button 
          className="control-button next-button" 
          onClick={handleNextStep}
          disabled={currentStep === constructionSteps.length - 1}
          role="button"
          tabIndex={0}
          aria-label="Next Step"
        >
          Next &gt;
        </button>
        
        <div className="speed-control">
          <label htmlFor="speed">Speed:</label>
          <select 
            id="speed" 
            value={playbackSpeed} 
            onChange={handleSpeedChange}
            aria-label="Playback Speed"
          >
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="2">2x</option>
            <option value="4">4x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ConstructionSequence;