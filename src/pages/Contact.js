// src/pages/Contact.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import './Contact.css';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParametricWaveAnimation from '../components/ParametricWaveAnimation';

// Constants
import colors from '../constants/colors';
import animations from '../constants/animations';

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });
  
  // Refs for animations
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const mapContainerRef = useRef(null);
  const connectDotsRef = useRef(null);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: ''
    });
    
    // Simulate form submission
    setTimeout(() => {
      // In a real implementation, you would send the form data to a server
      console.log('Form submitted:', formData);
      
      // Simulate successful submission
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: 'Thank you for your message. I will get back to you soon!'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };
  
  // Initialize connecting dots animation
  useEffect(() => {
    if (!connectDotsRef.current) return;
    
    const canvas = connectDotsRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create dots
    let dots = [];
    const dotsCount = 80;
    const connectionDistance = 150;
    
    for (let i = 0; i < dotsCount; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 0.5 - 0.25,
        vy: Math.random() * 0.5 - 0.25,
        color: i % 5 === 0 ? '#4cc9f0' : i % 10 === 0 ? '#7209b7' : '#ffffff'
      });
    }
    
    // Animation function
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and move dots
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
        
        // Move dot
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Bounce off edges
        if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
      });
      
      // Connect dots
      dots.forEach((dot, i) => {
        dots.slice(i + 1).forEach(otherDot => {
          const dx = dot.x - otherDot.x;
          const dy = dot.y - otherDot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(76, 201, 240, ${opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        });
      });
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);
  
  // Initialize map animation
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Create architectural grid lines
    const gridContainer = mapContainerRef.current;
    const gridSize = 20;
    const rows = Math.ceil(gridContainer.clientHeight / gridSize);
    const cols = Math.ceil(gridContainer.clientWidth / gridSize);
    
    // Clear existing elements
    gridContainer.innerHTML = '';
    
    // Create horizontal lines
    for (let i = 0; i <= rows; i++) {
      const line = document.createElement('div');
      line.classList.add('grid-line', 'horizontal');
      line.style.top = `${i * gridSize}px`;
      gridContainer.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i <= cols; i++) {
      const line = document.createElement('div');
      line.classList.add('grid-line', 'vertical');
      line.style.left = `${i * gridSize}px`;
      gridContainer.appendChild(line);
    }
    
    // Add location marker
    const marker = document.createElement('div');
    marker.classList.add('location-marker');
    
    // Position marker at center
    marker.style.top = `${gridContainer.clientHeight / 2}px`;
    marker.style.left = `${gridContainer.clientWidth / 2}px`;
    
    gridContainer.appendChild(marker);
    
    // Animate marker pulse
    gsap.fromTo(
      marker,
      { scale: 1, opacity: 0.7 },
      { 
        scale: 1.5, 
        opacity: 0, 
        duration: 2, 
        repeat: -1, 
        ease: 'power1.out' 
      }
    );
    
    // Animate grid lines - subtle breathing effect
    gsap.fromTo(
      '.grid-line',
      { opacity: 0.2 },
      { 
        opacity: 0.4, 
        duration: 2, 
        repeat: -1, 
        yoyo: true, 
        stagger: 0.05, 
        ease: 'sine.inOut' 
      }
    );
  }, []);
  
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  return (
    <div className="contact-container">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-wave-container">
            <ParametricWaveAnimation 
              color={0x480ca8} 
              speed={0.8} 
              amplitude={1.5}
              colorMode="dynamic"
            />
          </div>
          
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              I'm interested in discussing research collaborations, project opportunities, 
              or consulting work related to sustainable building engineering and architectural design.
            </motion.p>
          </motion.div>
        </section>
        
        <div className="contact-layout">
          {/* Contact Information */}
          <motion.div 
            className="contact-info"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            ref={contactInfoRef}
          >
            <motion.div variants={itemVariants} className="info-card">
              <div className="info-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="info-title">Email</h3>
              <p className="info-text">ziarati.1966279@studenti.uniroma1.it</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="info-card">
              <div className="info-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="info-title">Phone</h3>
              <p className="info-text">(+39) 338 218 8244</p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="info-card">
              <div className="info-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" className="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="info-title">Location</h3>
              <p className="info-text">02100 Rieti, Italy</p>
              
              {/* Map visualization */}
              <div className="architectural-map" ref={mapContainerRef}></div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="info-card">
              <h3 className="info-title">Connect</h3>
              <div className="social-links">
                <motion.a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link social-link-linkedin"
                  aria-label="LinkedIn Profile"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="https://scholar.google.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link social-link-scholar"
                  aria-label="Google Scholar Profile"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="https://researchgate.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link social-link-research"
                  aria-label="ResearchGate Profile"
                  style={{ backgroundColor: "#00CCBB" }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.586 0c-2.093 0-3.638 1.527-3.638 3.604 0 2.04 1.527 3.584 3.638 3.584 2.093 0 3.638-1.543 3.638-3.584 0-2.077-1.545-3.604-3.638-3.604zm-3.032 7.798c-2.758.244-4.85 2.674-4.85 5.456 0 0-.023 1.178.508 2.27-2.781-.407-4.706-1.492-6.372-3.17 0 0-3.345 5.898-7.84 2.822v10.764c.244.061.434.099.597.099v-3.25h.878v-1.043h-.914v-.087h.914v-1.043h-.914v-.122h.914v-1.122h-.914v-.061h.934v-1.026h-.934v-.183h.934v-1.026h-.934v-.061h.934v-1.078h-.934v-.061h.934v-1.095h-.934v-.061h.914v-1.113h-.914v-.122h.914v-1.06h-.878v-3.224c.036-.012.079-.024.122-.024 1.545 0 2.308 1.12 2.308 1.12s-3.854 5.714.205 10.764c4.553-.839 4.813-3.935 4.813-3.935 1.545 1.831 3.394 2.563 5.35 2.563.244-1.068.366-2.368.366-3.386.017-3.055-2.283-5.486-5.042-5.241v.016z"/>
                  </svg>
                </motion.a>
                
                <motion.a 
                  href="https://orcid.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="ORCID Profile"
                  style={{ backgroundColor: "#A6CE39" }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947-.947-.431-.947-.947.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm4.162 0h3.932c3.509 0 5.269 2.178 5.269 5.021 0 2.866-1.788 5.021-5.269 5.021h-3.932V7.416zm1.444 1.378v7.285h2.489c2.522 0 3.788-1.443 3.788-3.647 0-2.172-1.266-3.638-3.788-3.638h-2.489z"/>
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="contact-form"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            ref={formRef}
          >
            <div className="connecting-dots-container">
              <canvas ref={connectDotsRef} className="connecting-dots"></canvas>
            </div>
            
            <motion.div variants={fadeIn} className="contact-form-container">
              <h2 className="form-title">Send a Message</h2>
              
              {formStatus.isSubmitted ? (
                <motion.div 
                  className="form-success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {formStatus.message}
                </motion.div>
              ) : formStatus.isError ? (
                <div className="form-error-message">
                  {formStatus.message}
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="organization" className="form-label">
                      Organization
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      id="organization"
                      name="organization"
                      className="form-input"
                      value={formData.organization}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-input"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      transition={{ duration: 0.2 }}
                      id="message"
                      name="message"
                      rows="5"
                      className="form-textarea"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></motion.textarea>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="submit-button"
                  disabled={formStatus.isSubmitting}
                >
                  {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;