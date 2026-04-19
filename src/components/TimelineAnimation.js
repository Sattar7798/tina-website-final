import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './TimelineAnimation.css';

const TimelineAnimation = () => {
  const containerRef = useRef(null);
  const [activePhase, setActivePhase] = useState(0);
  
  const phases = [
    {
      id: 0,
      title: 'Concept Phase',
      description: 'Wireframe sketches and early calculations',
      icon: '💡',
      color: 'var(--structural-base)'
    },
    {
      id: 1,
      title: 'Design Development',
      description: 'Systems integration and technical specifications',
      icon: '📐',
      color: 'var(--systems-base)'
    },
    {
      id: 2,
      title: 'Analysis Phase',
      description: 'Simulations of structural performance and energy efficiency',
      icon: '📊',
      color: 'var(--sustainability-base)'
    },
    {
      id: 3,
      title: 'Construction Documentation',
      description: 'Technical drawings and specifications',
      icon: '📝',
      color: 'var(--experience-light)'
    },
    {
      id: 4,
      title: 'Final Implementation',
      description: 'Completed architectural solution',
      icon: '🏢',
      color: 'var(--experience-base)'
    }
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Transform the scroll progress to phase index (0-4)
  const phaseIndex = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8],
    [0, 1, 2, 3, 4]
  );

  // Update active phase based on scroll position
  useEffect(() => {
    const unsubscribe = phaseIndex.onChange(latest => {
      setActivePhase(Math.floor(latest));
    });
    
    return unsubscribe;
  }, [phaseIndex]);

  return (
    <div className="timeline-animation" ref={containerRef}>
      <div className="timeline-header">
        <h2>Architectural Engineering Process</h2>
        <p>Scroll to see how a building evolves from concept to completion</p>
      </div>
      
      <div className="timeline-progress">
        <div className="timeline-line"></div>
        <motion.div 
          className="timeline-indicator"
          style={{ 
            top: scrollYProgress.get() * 100 + '%',
            backgroundColor: phases[activePhase].color
          }}
        />
        
        {phases.map((phase) => (
          <motion.div
            key={phase.id}
            className={`timeline-point ${activePhase >= phase.id ? 'active' : ''}`}
            style={{ 
              top: `${phase.id * 25}%`,
              backgroundColor: phase.color,
              scale: activePhase === phase.id ? 1.2 : 1
            }}
          >
            <span className="timeline-point-icon">{phase.icon}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="timeline-content">
        {phases.map((phase) => (
          <motion.div
            key={phase.id}
            className={`timeline-phase ${activePhase === phase.id ? 'active' : ''}`}
            style={{ opacity: activePhase === phase.id ? 1 : 0.3 }}
          >
            <div 
              className="phase-header" 
              style={{ borderColor: phase.color }}
            >
              <span className="phase-icon" style={{ backgroundColor: phase.color }}>
                {phase.icon}
              </span>
              <h3>{phase.title}</h3>
            </div>
            
            <p>{phase.description}</p>
            
            <div className="phase-visual">
              {phase.id === 0 && (
                <div className="concept-visual">
                  <svg width="100%" height="100%" viewBox="0 0 500 300">
                    <g className="grid">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <line 
                          key={`h-${i}`} 
                          x1="0" 
                          y1={i * 15} 
                          x2="500" 
                          y2={i * 15} 
                          stroke="#2d3e50" 
                          strokeWidth="0.5" 
                        />
                      ))}
                      {Array.from({ length: 33 }).map((_, i) => (
                        <line 
                          key={`v-${i}`} 
                          x1={i * 15} 
                          y1="0" 
                          x2={i * 15} 
                          y2="300" 
                          stroke="#2d3e50" 
                          strokeWidth="0.5" 
                        />
                      ))}
                    </g>
                    <g className="sketch-lines">
                      <path 
                        d="M100,200 L400,200 L400,50 L250,20 L100,50 Z" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2" 
                        strokeDasharray="5,5" 
                      />
                      <path 
                        d="M150,200 L150,80 M350,200 L350,80" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2" 
                        strokeDasharray="5,5" 
                      />
                      <path 
                        d="M250,20 L250,80" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2" 
                        strokeDasharray="5,5" 
                      />
                    </g>
                    <g className="annotations">
                      <text x="230" y="15" fill="#adb5bd">Ridge</text>
                      <text x="410" y="125" fill="#adb5bd">Wall</text>
                      <text x="250" y="215" fill="#adb5bd">Foundation</text>
                    </g>
                    <g className="calculations">
                      <text x="50" y="240" fill="#00b8a9" fontSize="10">Span = 300 units</text>
                      <text x="50" y="260" fill="#00b8a9" fontSize="10">Height = 180 units</text>
                      <text x="50" y="280" fill="#00b8a9" fontSize="10">Pitch = 30°</text>
                    </g>
                  </svg>
                </div>
              )}
              
              {phase.id === 1 && (
                <div className="development-visual">
                  <svg width="100%" height="100%" viewBox="0 0 500 300">
                    <g className="building-outline">
                      <path 
                        d="M100,200 L400,200 L400,50 L250,20 L100,50 Z" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2" 
                      />
                      <path 
                        d="M150,200 L150,80 M350,200 L350,80" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="2" 
                      />
                    </g>
                    <g className="systems">
                      <path 
                        d="M120,140 L380,140" 
                        stroke="#2d7d93" 
                        strokeWidth="2" 
                      />
                      <circle cx="250" cy="140" r="15" fill="#1b4d5f" />
                      <path 
                        d="M130,80 L130,180 M370,80 L370,180" 
                        stroke="#2d7d93" 
                        strokeWidth="2" 
                        strokeDasharray="3,3" 
                      />
                    </g>
                    <g className="windows">
                      <rect x="180" y="100" width="30" height="30" fill="#2d7d93" fillOpacity="0.5" />
                      <rect x="290" y="100" width="30" height="30" fill="#2d7d93" fillOpacity="0.5" />
                      <rect x="220" y="160" width="60" height="40" fill="#2d7d93" fillOpacity="0.5" />
                    </g>
                    <g className="annotations">
                      <text x="240" y="130" fill="#adb5bd">HVAC</text>
                      <text x="110" y="130" fill="#adb5bd">Duct</text>
                      <text x="195" y="95" fill="#adb5bd">Window</text>
                      <text x="220" y="155" fill="#adb5bd">Entrance</text>
                    </g>
                  </svg>
                </div>
              )}
              
              {phase.id === 2 && (
                <div className="analysis-visual">
                  <svg width="100%" height="100%" viewBox="0 0 500 300">
                    <defs>
                      <linearGradient id="stressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0077b6" />
                        <stop offset="50%" stopColor="#00b8a9" />
                        <stop offset="100%" stopColor="#ff5a5f" />
                      </linearGradient>
                    </defs>
                    <g className="building-outline">
                      <path 
                        d="M100,200 L400,200 L400,50 L250,20 L100,50 Z" 
                        fill="none" 
                        stroke="#fff" 
                        strokeWidth="1" 
                      />
                    </g>
                    <g className="stress-analysis">
                      <path 
                        d="M100,50 L250,20 L400,50" 
                        fill="none" 
                        stroke="url(#stressGradient)" 
                        strokeWidth="5" 
                      />
                      <path 
                        d="M150,80 L150,200" 
                        fill="none" 
                        stroke="#00b8a9" 
                        strokeWidth="5" 
                      />
                      <path 
                        d="M350,80 L350,200" 
                        fill="none" 
                        stroke="#00b8a9" 
                        strokeWidth="5" 
                      />
                      <path 
                        d="M100,200 L400,200" 
                        fill="none" 
                        stroke="#0077b6" 
                        strokeWidth="5" 
                      />
                    </g>
                    <g className="energy-analysis">
                      <path 
                        d="M120,140 C200,60 300,60 380,140" 
                        fill="none" 
                        stroke="#f9bc60" 
                        strokeWidth="2" 
                        strokeDasharray="5,5" 
                      />
                      <path 
                        d="M120,100 C200,180 300,180 380,100" 
                        fill="none" 
                        stroke="#f9bc60" 
                        strokeWidth="2" 
                        strokeDasharray="5,5" 
                      />
                    </g>
                    <g className="data-points">
                      <circle cx="250" cy="20" r="5" fill="#ff5a5f" />
                      <circle cx="150" cy="80" r="5" fill="#00b8a9" />
                      <circle cx="350" cy="80" r="5" fill="#00b8a9" />
                      <circle cx="100" cy="200" r="5" fill="#0077b6" />
                      <circle cx="400" cy="200" r="5" fill="#0077b6" />
                    </g>
                    <g className="annotations">
                      <text x="30" y="140" fill="#adb5bd">Air Flow</text>
                      <text x="410" y="140" fill="#adb5bd">Air Flow</text>
                      <text x="240" y="260" fill="#adb5bd">Stress Analysis</text>
                      <text x="230" y="50" fill="#ff5a5f">High</text>
                      <text x="230" y="200" fill="#0077b6">Low</text>
                    </g>
                  </svg>
                </div>
              )}
              
              {phase.id === 3 && (
                <div className="documentation-visual">
                  <svg width="100%" height="100%" viewBox="0 0 500 300">
                    <g className="blueprint-grid">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <line 
                          key={`hd-${i}`} 
                          x1="0" 
                          y1={i * 15} 
                          x2="500" 
                          y2={i * 15} 
                          stroke="#1a2a3a" 
                          strokeWidth="0.5" 
                        />
                      ))}
                      {Array.from({ length: 33 }).map((_, i) => (
                        <line 
                          key={`vd-${i}`} 
                          x1={i * 15} 
                          y1="0" 
                          x2={i * 15} 
                          y2="300" 
                          stroke="#1a2a3a" 
                          strokeWidth="0.5" 
                        />
                      ))}
                    </g>
                    <g className="building-plan">
                      <rect x="150" y="50" width="200" height="200" fill="none" stroke="#fff" strokeWidth="2" />
                      <line x1="150" y1="150" x2="350" y2="150" stroke="#fff" strokeWidth="1" strokeDasharray="5,5" />
                      <circle cx="250" cy="150" r="30" fill="none" stroke="#fff" strokeWidth="2" />
                      <rect x="150" y="120" width="30" height="60" fill="none" stroke="#fff" strokeWidth="2" />
                      <rect x="320" y="120" width="30" height="60" fill="none" stroke="#fff" strokeWidth="2" />
                    </g>
                    <g className="dimensions">
                      <line x1="150" y1="270" x2="350" y2="270" stroke="#00b8a9" strokeWidth="1" />
                      <line x1="150" y1="265" x2="150" y2="275" stroke="#00b8a9" strokeWidth="1" />
                      <line x1="350" y1="265" x2="350" y2="275" stroke="#00b8a9" strokeWidth="1" />
                      <text x="240" y="285" fill="#00b8a9" fontSize="12" textAnchor="middle">200</text>
                      
                      <line x1="370" y1="50" x2="370" y2="250" stroke="#00b8a9" strokeWidth="1" />
                      <line x1="365" y1="50" x2="375" y2="50" stroke="#00b8a9" strokeWidth="1" />
                      <line x1="365" y1="250" x2="375" y2="250" stroke="#00b8a9" strokeWidth="1" />
                      <text x="385" y="150" fill="#00b8a9" fontSize="12" textAnchor="middle" transform="rotate(90, 385, 150)">200</text>
                    </g>
                    <g className="annotations">
                      <text x="230" y="40" fill="#adb5bd" fontSize="12">Floor Plan</text>
                      <text x="240" y="155" fill="#adb5bd" fontSize="10">Atrium</text>
                      <text x="165" y="110" fill="#adb5bd" fontSize="8">Stair</text>
                      <text x="325" y="110" fill="#adb5bd" fontSize="8">Stair</text>
                      <text x="140" y="30" fill="#adb5bd" fontSize="8">Drawing No: A-101</text>
                      <text x="340" y="30" fill="#adb5bd" fontSize="8">Scale: 1:100</text>
                    </g>
                  </svg>
                </div>
              )}
              
              {phase.id === 4 && (
                <div className="final-visual">
                  <svg width="100%" height="100%" viewBox="0 0 500 300">
                    <g className="building-facade">
                      <rect x="150" y="50" width="200" height="200" fill="#2d3e50" />
                      <polygon points="150,50 250,10 350,50" fill="#1a2a3a" />
                      <rect x="180" y="80" width="40" height="40" fill="#2d7d93" fillOpacity="0.7" />
                      <rect x="280" y="80" width="40" height="40" fill="#2d7d93" fillOpacity="0.7" />
                      <rect x="180" y="150" width="40" height="40" fill="#2d7d93" fillOpacity="0.7" />
                      <rect x="280" y="150" width="40" height="40" fill="#2d7d93" fillOpacity="0.7" />
                      <rect x="230" y="180" width="40" height="70" fill="#1b4d5f" />
                    </g>
                    <g className="environment">
                      <rect x="0" y="250" width="500" height="50" fill="#25a87d" />
                      <circle cx="100" cy="230" r="30" fill="#167053" />
                      <circle cx="85" cy="210" r="25" fill="#167053" />
                      <circle cx="115" cy="210" r="20" fill="#167053" />
                      <circle cx="400" cy="230" r="30" fill="#167053" />
                      <circle cx="385" cy="210" r="25" fill="#167053" />
                      <circle cx="415" cy="210" r="20" fill="#167053" />
                      
                      <circle cx="50" cy="40" r="20" fill="#f9bc60" />
                      <line x1="50" y1="40" x2="30" y2="60" stroke="#f9bc60" strokeWidth="2" />
                      <line x1="50" y1="40" x2="40" y2="20" stroke="#f9bc60" strokeWidth="2" />
                      <line x1="50" y1="40" x2="70" y2="30" stroke="#f9bc60" strokeWidth="2" />
                      <line x1="50" y1="40" x2="70" y2="50" stroke="#f9bc60" strokeWidth="2" />
                      <line x1="50" y1="40" x2="50" y2="65" stroke="#f9bc60" strokeWidth="2" />
                    </g>
                    <g className="people">
                      <circle cx="200" cy="270" r="5" fill="#dd8f6e" />
                      <line x1="200" y1="275" x2="200" y2="290" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="200" y1="280" x2="190" y2="285" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="200" y1="280" x2="210" y2="285" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="200" y1="290" x2="195" y2="300" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="200" y1="290" x2="205" y2="300" stroke="#dd8f6e" strokeWidth="2" />
                      
                      <circle cx="300" cy="270" r="5" fill="#dd8f6e" />
                      <line x1="300" y1="275" x2="300" y2="290" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="300" y1="280" x2="290" y2="285" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="300" y1="280" x2="310" y2="285" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="300" y1="290" x2="295" y2="300" stroke="#dd8f6e" strokeWidth="2" />
                      <line x1="300" y1="290" x2="305" y2="300" stroke="#dd8f6e" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TimelineAnimation;