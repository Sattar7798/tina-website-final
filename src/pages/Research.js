// src/pages/Research.js
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ResearchWebVisualization from '../components/ResearchWebVisualization';
import ParametricWaveAnimation from '../components/ParametricWaveAnimation';

// Constants
import colors from '../constants/colors';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

const Research = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const researchAreasRef = useRef(null);
  const projectsRef = useRef(null);
  const methodologyRef = useRef(null);
  
  // Research Areas Data
  const researchAreas = [
    {
      id: 'bim',
      title: 'Building Information Modeling (BIM)',
      description: 'My research investigates advanced applications of BIM technologies for sustainable building design, heritage preservation, and integration with computational methods.',
      color: colors.research.parametric,
      gradient: 'linear-gradient(135deg, #4cc9f0, #4361ee)',
      icon: '🏢',
      projects: [1, 2],
      publications: [1],
      visual: 'grid'
    },
    {
      id: 'specialized-buildings',
      title: 'Specialized Building Types',
      description: 'I explore innovative approaches to specific building typologies, including educational facilities, social housing, and adaptive reuse of industrial sites.',
      color: colors.research.adaptive,
      gradient: 'linear-gradient(135deg, #7209b7, #3a0ca3)', 
      icon: '🏗️',
      projects: [2, 3],
      publications: [],
      visual: 'buildings'
    },
    {
      id: 'smart-design',
      title: 'Human-Centered Smart Design',
      description: 'My work focuses on developing smart building systems that prioritize user experience and well-being, incorporating AI, digital twins, and IoT technologies.',
      color: colors.research.computation,
      gradient: 'linear-gradient(135deg, #f72585, #b5179e)',
      icon: '🧠',
      projects: [3],
      publications: [3],
      visual: 'nodes'
    },
    {
      id: 'structural-systems',
      title: 'Structural Systems in Architecture',
      description: 'I investigate the intersection of structural engineering and architectural design, with particular focus on resilient systems for seismic regions.',
      color: colors.research.materials,
      gradient: 'linear-gradient(135deg, #480ca8, #3f37c9)',
      icon: '🔧',
      projects: [1],
      publications: [2],
      visual: 'structure'
    }
  ];
  
  // Projects Data
  const projects = [
    {
      id: 1,
      title: 'Heritage-BIM Project – SNIA Viscosa Industrial Site',
      year: 2025,
      area: 'bim',
      image: 'project1.jpg',
      description: 'A comprehensive Heritage-BIM modeling project of the historic Snia Viscosa factory in Rieti, capturing intricate architectural details and structural components. The project focuses on transforming the abandoned industrial site into a sustainable urban landmark, integrating modern environmental solutions while preserving its historical identity.',
      technologies: ['Revit', 'AutoCAD', 'Laser Scanning', 'Point Cloud Processing'],
      gradient: 'linear-gradient(135deg, #4cc9f0, #4361ee)'
    },
    {
      id: 2,
      title: 'Phased BIM Modeling and Sustainable Redevelopment',
      year: 2025,
      area: 'bim',
      image: 'project2.jpg',
      description: 'A complete BIM project using Revit, modeling an existing two-story building through detailed phasing, including its current state and planned demolition. The project involves reconstructing the building with a focus on sustainable design solutions, incorporating energy-efficient strategies and modern construction standards.',
      technologies: ['Revit', 'Energy Analysis', 'Sustainable Design', 'BIM'],
      gradient: 'linear-gradient(135deg, #3a0ca3, #4361ee)'
    },
    {
      id: 3,
      title: 'Transforming Rieti into a Hub for Sustainable Education',
      year: 2022,
      area: 'specialized-buildings',
      image: 'project3.jpg',
      description: 'A visionary project aimed at re-purposing a sugar factory in Rieti, Italy, into a thriving university city. This initiative fostered sustainable development and positively impacted the entire region through adaptive reuse and educational infrastructure development.',
      technologies: ['Urban Planning', 'Adaptive Reuse', 'Sustainable Design'],
      gradient: 'linear-gradient(135deg, #7209b7, #3a0ca3)'
    },
    {
      id: 4,
      title: 'Smart Sustainability: AI Applications in Renewable Energy',
      year: 2023,
      area: 'smart-design',
      image: 'project4.jpg',
      description: 'Research project exploring the potential for significant advancements in renewable energy by integrating artificial intelligence. The project demonstrates how incorporating AI can unlock efficiency, maximize resource use, and propel the sustainable energy sector into a technologically advanced future.',
      technologies: ['Artificial Intelligence', 'Renewable Energy', 'Digital Twins', 'Smart City Technologies'],
      gradient: 'linear-gradient(135deg, #f72585, #b5179e)'
    },
    {
      id: 5,
      title: 'Emergency Planning for Seismic Disasters in Iran',
      year: 2023,
      area: 'structural-systems',
      image: 'project5.jpg',
      description: 'Research investigating emergency planning and preparedness for seismic disasters in Iran. Based on a comprehensive national survey, the study recommends a holistic, integrated, and participative strategy for earthquake risk reduction and enhanced public awareness.',
      technologies: ['Seismic Safety', 'Emergency Planning', 'Risk Reduction', 'Public Awareness'],
      gradient: 'linear-gradient(135deg, #480ca8, #3f37c9)'
    }
  ];
  
  // Research Methodology
  const methodology = [
    {
      id: 'computational',
      title: 'Computational Simulation',
      description: 'Using digital modeling and simulation tools to analyze building performance across multiple parameters and scenarios.',
      icon: '💻'
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis & Visualization',
      description: 'Applying analytical methods to interpret building performance data and visualize complex relationships.',
      icon: '📊'
    },
    {
      id: 'case-studies',
      title: 'Case Studies & Field Research',
      description: 'Conducting in-depth analyses of existing buildings and infrastructure to identify best practices and areas for improvement.',
      icon: '🔍'
    },
    {
      id: 'prototyping',
      title: 'Digital & Physical Prototyping',
      description: 'Developing scaled models and prototypes to test design concepts and validate computational findings.',
      icon: '🧪'
    }
  ];
  
  // Set up animations
  useEffect(() => {
    // Animate research areas
    if (researchAreasRef.current) {
      const areas = researchAreasRef.current.querySelectorAll('.research-area-card');
      
      gsap.fromTo(
        areas,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: researchAreasRef.current,
            start: "top 80%"
          }
        }
      );
      
      // Animate the visual elements inside each card
      const visuals = researchAreasRef.current.querySelectorAll('.area-visual-element');
      
      gsap.fromTo(
        visuals,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          delay: 0.5,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: researchAreasRef.current,
            start: "top 80%"
          }
        }
      );
    }
    
    // Animate projects
    if (projectsRef.current) {
      const projects = projectsRef.current.querySelectorAll('.project-card');
      
      gsap.fromTo(
        projects,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%"
          }
        }
      );
    }
    
    // Animate methodology
    if (methodologyRef.current) {
      const methods = methodologyRef.current.querySelectorAll('.methodology-item');
      
      gsap.fromTo(
        methods,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: methodologyRef.current,
            start: "top 80%"
          }
        }
      );
    }
  }, [activeTab]);
  
  return (
    <div className="research-page">
      <Navbar />
      
      <main>
        {/* Hero Section with 3D Visualization */}
        <section className="research-hero">
          <div className="hero-backdrop">
            <div className="hero-gradient-overlay"></div>
            <ParametricWaveAnimation 
              color={0x4361ee}
              speed={0.3}
              amplitude={0.5}
              colorMode="dynamic"
              isInteractive={false}
            />
          </div>
          
          <div className="research-hero-content">
            <motion.h1 
              className="research-title"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Research Vision
            </motion.h1>
            <motion.p 
              className="research-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My research sits at the intersection of sustainable building engineering, computational design, and smart technologies, 
              exploring how innovative approaches can create more resilient, efficient, and human-centered built environments.
            </motion.p>
            
            <motion.div 
              className="research-keywords"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <span>Sustainability</span>
              <span>Innovation</span>
              <span>Efficiency</span>
              <span>Resilience</span>
            </motion.div>
          </div>
        </section>
        
        {/* Research Areas Section */}
        <section className="research-areas" ref={researchAreasRef}>
          <div className="container">
            <div className="section-header">
              <h2>Research Areas</h2>
              <p>My research spans several interconnected domains in architecture and construction technology.</p>
            </div>
            
            <div className="research-areas-grid">
              {researchAreas.map((area) => (
                <div 
                  key={area.id} 
                  className="research-area-card"
                  data-area={area.id}
                >
                  <div 
                    className="area-icon-container"
                    aria-hidden="true"
                  >
                    <span className="area-icon">{area.icon}</span>
                  </div>
                  
                  <div className="area-card-content">
                    <h3 className="area-title">{area.title}</h3>
                    <p className="area-description">{area.description}</p>
                    
                    <div className="area-indicators">
                      <div className="area-indicator">
                        <span className="indicator-value">{area.projects.length}</span>
                        <span className="indicator-label">Projects</span>
                      </div>
                      <div className="area-indicator">
                        <span className="indicator-value">{area.publications.length}</span>
                        <span className="indicator-label">Publications</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Interactive Research Visualization */}
        <section className="research-visualization">
          <div className="container">
            <div className="section-header">
              <h2>Research Networks</h2>
              <p>Explore how my research areas interconnect and build upon each other.</p>
            </div>
            
            <div className="visualization-container">
              <ResearchWebVisualization />
            </div>
          </div>
        </section>
        
        {/* Methodology Section - Enhanced */}
        <section className="research-methodology" ref={methodologyRef}>
          <div className="container">
            <div className="section-header light">
              <h2>Research Methodology</h2>
              <p>
                My approach combines computational techniques, empirical analysis, and design principles 
                to develop innovative solutions for complex architectural challenges.
              </p>
            </div>
            
            <div className="methodology-grid">
              {methodology.map((method, index) => (
                <motion.div 
                  key={method.id}
                  className="methodology-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="methodology-icon">{method.icon}</div>
                  <div className="methodology-content">
                    <div className="methodology-number">0{index + 1}</div>
                    <h3 className="methodology-title">{method.title}</h3>
                    <p className="methodology-description">{method.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Latest Projects */}
        <section className="latest-projects" ref={projectsRef}>
          <div className="container">
            <div className="section-header">
              <h2>Latest Projects</h2>
              <p>
                Recent research projects applying innovative approaches to architectural engineering challenges.
              </p>
            </div>
            
            <div className="projects-grid">
              {projects.slice(0, 3).map((project) => (
                <motion.div 
                  key={project.id}
                  className="project-card"
                  whileHover={{ 
                    y: -5, 
                    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                    transition: { duration: 0.3 } 
                  }}
                >
                  <div 
                    className="project-image" 
                    style={{ backgroundImage: project.gradient }}
                  >
                    <div className="project-year">{project.year}</div>
                  </div>
                  
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-excerpt">
                      {project.description.substring(0, 120)}...
                    </p>
                    
                    <div className="project-technologies">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="technology-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="technology-tag">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    
                    <motion.a 
                      href={`/portfolio/project/${project.id}`} 
                      className="project-link"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Learn more
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="view-all-container">
              <motion.a 
                href="/portfolio" 
                className="view-all-button"
                whileHover={{ y: -3, boxShadow: '0 8px 20px rgba(76, 201, 240, 0.5)' }}
                transition={{ duration: 0.2 }}
              >
                View All Projects
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Research;

