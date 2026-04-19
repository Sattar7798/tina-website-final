// src/pages/About.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './About.css';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Hooks & Utils
import { fadeInOnScroll, staggeredReveal } from '../utils/animations';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

// Constants
import colors from '../constants/colors';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const timelineRef = useRef(null);
  const methodologyRef = useRef(null);
  const skillsRef = useRef(null);
  const persianMotifRef = useRef(null);
  const architecturalModelRef = useRef(null);
  
  // Intersection observers for sections
  const { ref: timelineInViewRef, inView: timelineInView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const { ref: methodologyInViewRef, inView: methodologyInView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: architecturalInViewRef, inView: architecturalInView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  const { ref: persianMotifInViewRef, inView: persianMotifInView } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });
  
  // Set up timeline animations
  useEffect(() => {
    if (timelineInView && timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      staggeredReveal(timelineItems, { stagger: 0.2 });
    }
  }, [timelineInView]);
  
  // Set up methodology animations
  useEffect(() => {
    if (methodologyInView && methodologyRef.current) {
      const methodItems = methodologyRef.current.querySelectorAll('.methodology-item');
      staggeredReveal(methodItems, { 
        y: 50, 
        stagger: 0.3,
        delay: 0.2
      });
    }
  }, [methodologyInView]);

  // Set up architectural visualization animations
  useEffect(() => {
    if (architecturalInView && architecturalModelRef.current) {
      gsap.fromTo(
        architecturalModelRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [architecturalInView]);

  // Set up Persian motif animations
  useEffect(() => {
    if (persianMotifInView && persianMotifRef.current) {
      const motifs = persianMotifRef.current.querySelectorAll('.persian-motif');
      
      motifs.forEach((motif, index) => {
        gsap.fromTo(
          motif,
          { 
            opacity: 0, 
            rotation: 0,
            scale: 0.8
          },
          { 
            opacity: 0.85, 
            rotation: index % 2 === 0 ? 15 : -15,
            scale: 1,
            duration: 1.5,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.3)"
          }
        );
      });
    }
  }, [persianMotifInView]);
  
  // Set up page intro animations
  useEffect(() => {
    const titles = document.querySelectorAll('.section-title');
    const paragraphs = document.querySelectorAll('.section-text');
    
    gsap.fromTo(
      titles,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out',
        delay: 0.3
      }
    );
    
    gsap.fromTo(
      paragraphs,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: 'power3.out',
        delay: 0.5
      }
    );
  }, []);

  // Animation variants for Framer Motion
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: { 
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const rotateAnimation = {
    initial: { rotate: 0 },
    animate: { 
      rotate: 360,
      transition: { 
        duration: 30,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };
  
  return (
    <div className="about-container">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Persian-Inspired Hero Section */}
        <section className="about-hero persian-hero">
          <div className="persian-arch-container">
            <div className="persian-arch"></div>
            <div className="persian-arch-shadow"></div>
          </div>
          
          <div className="persian-pattern-grid">
            {Array.from({ length: 20 }).map((_, index) => (
              <div 
                key={index} 
                className="persian-pattern-element"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.1 + Math.random() * 0.2
                }}
              ></div>
            ))}
          </div>
          
          <div className="hero-content">
            <motion.div
              className="persian-ornamental-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <motion.h1 
                className="hero-title persian-title"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                About Tina Ziarati
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className="hero-description persian-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              Exploring the intersection of sustainable building engineering, smart technologies, and Persian architectural heritage
              to create resilient, culturally-rich, and human-centered built environments.
            </motion.p>
            
            <div className="persian-icons-container">
              <motion.div 
                className="persian-hero-icon persian-dome"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
              ></motion.div>
              <motion.div 
                className="persian-hero-icon persian-star"
                variants={rotateAnimation}
                initial="initial"
                animate="animate"
              ></motion.div>
              <motion.div 
                className="persian-hero-icon persian-minaret"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                custom={1}
              ></motion.div>
            </div>
          </div>
        </section>
        
        {/* Persian Cultural Heritage Section */}
        <section 
          className="persian-heritage-section" 
          ref={(el) => {
            persianMotifRef.current = el;
            persianMotifInViewRef(el);
          }}
        >
          <div className="heritage-background">
            <div className="eslimi-pattern-container"></div>
          </div>
          
          <div className="persian-motifs-container">
            <div className="persian-motif motif-toranj"></div>
            <div className="persian-motif motif-eslimi"></div>
            <div className="persian-motif motif-shamseh"></div>
            <div className="persian-motif motif-arabesque"></div>
          </div>
          
          <div className="heritage-content">
            <h2 className="section-title persian-section-title">Persian Heritage</h2>
            <p className="section-text">
              My Persian roots deeply influence my architectural philosophy and design approach. Drawing inspiration 
              from thousands of years of Persian architectural mastery - from the majestic columns of Persepolis 
              to the intricate geometric patterns of Isfahan's mosques - I integrate traditional elements with 
              contemporary sustainable engineering to create spaces that honor cultural heritage while embracing innovation.
            </p>
            
            <div className="persian-sites-grid">
              <div className="persian-site">
                <div className="site-image persepolis"></div>
                <h3>Persepolis</h3>
                <p>Majestic columns and monumental staircases influence my structural approach</p>
              </div>
              
              <div className="persian-site">
                <div className="site-image isfahan"></div>
                <h3>Naqsh-e Jahan Square</h3>
                <p>The harmonious proportions and grand scale inspire my public space design</p>
              </div>
              
              <div className="persian-site">
                <div className="site-image yazd"></div>
                <h3>Yazd Wind Catchers</h3>
                <p>Ancient passive cooling techniques inform my sustainable design strategies</p>
              </div>
              
              <div className="persian-site">
                <div className="site-image kashan"></div>
                <h3>Kashan Historical Houses</h3>
                <p>Courtyard layouts and natural ventilation systems guide my residential designs</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Persian-Inspired Architectural Visualization */}
        <section 
          className="architectural-visualization-section persian-architectural-section" 
          ref={(el) => {
            architecturalModelRef.current = el;
            architecturalInViewRef(el);
          }}
        >
          <div className="visualization-wrapper">
            <div className="persian-architectural-elements">
              <div className="persian-dome-3d"></div>
              <div className="persian-arches-group">
                <div className="persian-arch-element"></div>
                <div className="persian-arch-element"></div>
                <div className="persian-arch-element"></div>
              </div>
              <div className="persian-column-group">
                <div className="persian-column"></div>
                <div className="persian-column"></div>
                <div className="persian-column"></div>
              </div>
            </div>
          </div>
          
          <div className="visualization-text">
            <h2 className="visualization-title persian-title">Engineering Philosophy</h2>
            <p>
              My architectural engineering practice weaves ancient Persian wisdom with modern structural principles.
              I draw inspiration from the ingenious vaulted structures of Persian bazaars, the wind-catching towers of Yazd,
              and the mathematically precise domes of Isfahan's mosques. By understanding how these historical structures 
              have withstood centuries, I design buildings that harmonize technical excellence with cultural resonance.
            </p>
          </div>
        </section>
        
        {/* Academic Journey Section with Persian Timeline */}
        <section className="about-section">
          <h2 className="section-title persian-section-title">Academic Journey</h2>
          <p className="section-text">
            My academic path is driven by a deep commitment to sustainable building engineering and smart technology integration,
            enriched by the influence of Persian architectural principles and cultural heritage.
          </p>
          
          <div 
            className="timeline persian-timeline" 
            ref={(el) => {
              timelineRef.current = el;
              timelineInViewRef(el);
            }}
          >
            {/* Timeline items */}
            <motion.div 
              className="timeline-item"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="timeline-dot persian-timeline-dot"></div>
              <div className="timeline-connector"></div>
              <h3 className="timeline-title">Master in Sustainable Building Engineering</h3>
              <h4 className="timeline-subtitle">Sapienza University, Rome, Italy</h4>
              <p className="timeline-date">2024 - 2026 (In Progress)</p>
              <p className="timeline-description">
                Pursuing advanced studies in sustainable building technologies, smart systems integration, and resilient design practices.
                Special research focus on adapting Persian passive cooling techniques for modern Mediterranean buildings.
              </p>
            </motion.div>
            
            <motion.div 
              className="timeline-item"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="timeline-dot persian-timeline-dot"></div>
              <div className="timeline-connector"></div>
              <h3 className="timeline-title">B.Sc. in Sustainable Building Engineering</h3>
              <h4 className="timeline-subtitle">Sapienza University, Rome, Italy</h4>
              <p className="timeline-date">2020 - 2023</p>
              <p className="timeline-description">
                Graduated with distinction (GPA: 3.83/4, CGPA: 4+/4), ranking 2nd among 90 students in the program.
                Thesis: "Reviving Ancient Wisdom: Persian Engineering Principles in Modern Sustainable Design" - explored the 
                application of traditional Persian building techniques in contemporary sustainable architecture.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Research Interests Section with Persian Motifs */}
        <section className="about-section persian-research-section">
          <h2 className="section-title persian-section-title">Research Interests</h2>
          <p className="section-text">
            My research focuses on blending ancient Persian architectural wisdom with contemporary technologies,
            creating innovative solutions for today's environmental challenges.
          </p>
          
          <div className="interests-grid persian-interests-grid">
            <motion.div 
              className="interest-card persian-interest-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="interest-icon persian-icon bagdir"></div>
              <h3 className="interest-title">Passive Cooling Technologies</h3>
              <p>
                Reviving and adapting traditional Persian "Badgir" (wind-catcher) principles 
                for natural ventilation in modern buildings, reducing energy consumption.
              </p>
            </motion.div>
            
            <motion.div 
              className="interest-card persian-interest-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="interest-icon persian-icon muqarnas"></div>
              <h3 className="interest-title">Parametric Persian Patterns</h3>
              <p>
                Applying computational design to traditional Persian geometric patterns and Muqarnas 
                vaulting systems, creating structurally efficient and aesthetically rich building elements.
              </p>
            </motion.div>
            
            <motion.div 
              className="interest-card persian-interest-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="interest-icon persian-icon dome"></div>
              <h3 className="interest-title">Iranian Dome Construction</h3>
              <p>
                Studying the mathematical principles behind double-shell Persian domes for 
                application in modern lightweight and energy-efficient roofing systems.
              </p>
            </motion.div>
            
            <motion.div 
              className="interest-card persian-interest-card"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="interest-icon persian-icon garden"></div>
              <h3 className="interest-title">Persian Garden Design</h3>
              <p>
                Reimagining the "Chahar Bagh" (four gardens) concept for urban microclimate 
                control, integrating water management and sustainable landscaping in dense urban environments.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Professional Experience Section */}
        <section className="about-section">
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-text">
            My professional experience spans research, academic projects, and architectural practice,
            providing a multifaceted perspective on sustainable building design and development.
          </p>
          
          <motion.div 
            className="grid grid-cols-1 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="experience-card" variants={fadeInUp}>
              <h3 className="experience-title">Research Assistant</h3>
              <h4 className="experience-company">Sapienza University, Italy</h4>
              <p className="experience-date">2023 - Present</p>
              <ul className="experience-list">
                <li>Contributing to the preparation of research reports, conference papers, and journal articles</li>
                <li>Involved in research on infrastructure resilience and smart monitoring systems</li>
                <li>Collaborating on studies related to seismic risk reduction and emergency planning</li>
                <li>Supporting investigations into AI applications for renewable energy systems</li>
              </ul>
            </motion.div>
            
            <motion.div className="experience-card" variants={fadeInUp}>
              <h3 className="experience-title">Project Intern</h3>
              <h4 className="experience-company">Architectural Studio Rieti, Italy</h4>
              <p className="experience-date">Summer 2022</p>
              <ul className="experience-list">
                <li>Assisted in the development of BIM models for historic building renovations</li>
                <li>Collaborated on the design of sustainable retrofitting solutions for existing structures</li>
                <li>Participated in client meetings and presentations of design concepts</li>
                <li>Contributed to energy analysis and performance optimization studies</li>
              </ul>
            </motion.div>
          </motion.div>
        </section>
        
        {/* Skills Section */}
        <section className="about-section">
          <h2 className="section-title">Technical Proficiencies</h2>
          <p className="section-text">
            My technical skills encompass a range of software tools, analytical methods, and design approaches
            that enable me to tackle complex architectural engineering challenges.
          </p>
          
          <div className="skills-container" ref={skillsRef}>
            <div className="skills-category">
              <h3 className="skills-category-title">Design & Modeling</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="skill-level" style={{ width: '95%' }}></div>
                  <span className="skill-name">Revit (BIM)</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="skill-level" style={{ width: '90%' }}></div>
                  <span className="skill-name">AutoCAD</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="skill-level" style={{ width: '85%' }}></div>
                  <span className="skill-name">SketchUp</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="skill-level" style={{ width: '80%' }}></div>
                  <span className="skill-name">Rhino 3D</span>
                </motion.div>
              </div>
            </div>
            
            <div className="skills-category">
              <h3 className="skills-category-title">Analysis & Simulation</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="skill-level" style={{ width: '90%' }}></div>
                  <span className="skill-name">Energy Plus</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="skill-level" style={{ width: '85%' }}></div>
                  <span className="skill-name">SAP 2000</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="skill-level" style={{ width: '80%' }}></div>
                  <span className="skill-name">Computational Fluid Dynamics</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="skill-level" style={{ width: '75%' }}></div>
                  <span className="skill-name">Finite Element Analysis</span>
                </motion.div>
              </div>
            </div>
            
            <div className="skills-category">
              <h3 className="skills-category-title">Programming & Data</h3>
              <div className="skills-grid">
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="skill-level" style={{ width: '80%' }}></div>
                  <span className="skill-name">Python for Data Analysis</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="skill-level" style={{ width: '75%' }}></div>
                  <span className="skill-name">Dynamo (Visual Programming)</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="skill-level" style={{ width: '70%' }}></div>
                  <span className="skill-name">MATLAB</span>
                </motion.div>
                <motion.div 
                  className="skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="skill-level" style={{ width: '65%' }}></div>
                  <span className="skill-name">Machine Learning Basics</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action with Persian Design */}
        <section className="cta-section persian-cta">
          <div className="persian-cta-decoration"></div>
          <h2 className="cta-title persian-title">Let's Create Together</h2>
          <p className="cta-text">
            Interested in collaborating on projects that blend Persian architectural heritage with 
            sustainable innovation? Let's connect and explore how we can create meaningful spaces together.
          </p>
          <Link to="/contact" className="cta-button persian-button">
            Get in Touch
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;