import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <div className="footer-logo-layers">
              <div className="footer-logo-layer layer-1"></div>
              <div className="footer-logo-layer layer-2"></div>
              <div className="footer-logo-layer layer-3"></div>
              <div className="footer-logo-layer layer-4"></div>
            </div>
            <span>Tina Ziarati</span>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/research">Research</Link>
              <Link to="/portfolio">Portfolio</Link>
            </div>
            
            <div className="footer-links-column">
              <h4>Information</h4>
              <Link to="/publications">Publications</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            
            <div className="footer-links-column">
              <h4>Connect</h4>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Tina Ziarati. All Rights Reserved.</p>
          <p>Architectural Engineering PhD Researcher</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;