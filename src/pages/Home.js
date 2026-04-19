import React from 'react';
import { motion } from 'framer-motion';

// Components
import LayerNavigation from '../components/LayerNavigation';
import BuildingAnatomy from '../components/BuildingAnatomy';
import TimelineAnimation from '../components/TimelineAnimation';
import ResearchWebVisualization from '../components/ResearchWebVisualization';

// CSS
import './Home.css';

const Home = () => {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Architectural Engineering
            <span className="highlight">Research</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Exploring the intersections of structural systems, environmental design, 
            and innovative building technologies
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a href="/research" className="btn">Explore Research</a>
            <a href="/contact" className="btn btn-outline">Get in Touch</a>
          </motion.div>
        </div>
        
        <motion.div
          className="hero-visual"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="layered-design">
            <div className="layer layer-1"></div>
            <div className="layer layer-2"></div>
            <div className="layer layer-3"></div>
            <div className="layer layer-4"></div>
          </div>
        </motion.div>
      </section>
      
      <section className="concept-section">
        <div className="section-header">
          <h2>Core Concept: "Layers of Design"</h2>
          <p>
            A multidisciplinary approach to architectural engineering through interconnected layers
            that create cohesive architectural solutions.
          </p>
        </div>
        
        <LayerNavigation />
      </section>
      
      <section className="anatomy-section">
        <div className="section-header">
          <h2>Interactive Building Anatomy</h2>
          <p>
            Explore how different systems integrate to create functional and sustainable architecture.
          </p>
        </div>
        
        <BuildingAnatomy />
      </section>
      
      <section className="timeline-section">
        <TimelineAnimation />
      </section>
      
      <section className="research-section">
        <div className="section-header">
          <h2>Research Focus Areas</h2>
          <p>
            Discover the interconnected web of research topics that drive innovation in architectural engineering.
          </p>
        </div>
        
        <ResearchWebVisualization />
      </section>
      
      <section className="call-to-action">
        <h2>Interested in Collaboration?</h2>
        <p>
          I'm always looking for research partners, project opportunities, and academic collaborations.
        </p>
        <div className="cta-buttons">
          <a href="/portfolio" className="btn">View Portfolio</a>
          <a href="/contact" className="btn btn-outline">Contact Me</a>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;