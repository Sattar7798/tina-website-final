import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would normally send the form data to a server
    // Simulating a successful submission
    setFormStatus({
      submitted: true,
      success: true,
      message: 'Thank you for your message! I will get back to you as soon as possible.'
    });
    
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: ''
      });
    }, 5000);
  };
  
  return (
    <div className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Feel free to reach out to me with any questions or opportunities related to architectural engineering research.
          </p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon">📧</div>
              <div className="method-details">
                <h3>Email</h3>
                <p>tina@architecturalengineering.edu</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">📱</div>
              <div className="method-details">
                <h3>Phone</h3>
                <p>+1 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">🏢</div>
              <div className="method-details">
                <h3>Office</h3>
                <p>Architectural Engineering Department<br />Room 305, Engineering Building<br />University Campus</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="method-icon">🌐</div>
              <div className="method-details">
                <h3>Connect</h3>
                <div className="social-links">
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
                  <a href="https://researchgate.net/" target="_blank" rel="noopener noreferrer">ResearchGate</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send a Message</h2>
          
          {formStatus.submitted && (
            <motion.div 
              className={`form-message ${formStatus.success ? 'success' : 'error'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {formStatus.message}
            </motion.div>
          )}
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
      
      <div className="map-container">
        <h3>Find Me</h3>
        <div className="map-placeholder">
          <div className="map-overlay">Interactive Map Coming Soon</div>
          {/* In a real implementation, you would include a Google Maps or similar component here */}
          <div className="map-image"></div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;