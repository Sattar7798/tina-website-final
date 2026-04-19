import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* Top copper line */}
        <div className="footer-accent-line"></div>

        <div className="footer-container">
          {/* Brand column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <svg className="footer-logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 10 H42 M24 10 V38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M28 24 L42 38 M28 38 L42 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span>Tina Ziarati</span>
            </Link>
            <p className="footer-tagline">
              BIM Engineer &amp; Architectural Designer specializing in BIM coordination,
              sustainable design, and heritage-sensitive renovation — based in Rieti, Italy.
            </p>
            <div className="footer-socials">
              <a href="https://www.linkedin.com/in/tina-ziarati-42b014202/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AC6lMd8HTxSTGKBW0O3aR4lR2bmyhyAL2BgbT_1YhTUJa0L5AEQOpWykPpC5IT3ZcySfNE93tVdpxDG2CSUxhg&user=Ymfit90AAAAJ" target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/></svg>
              </a>
              <a href="https://github.com/Tina7887" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56l-.02-2.17c-3.2.69-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 5.72 0c2.17-1.49 3.13-1.18 3.13-1.18.63 1.58.24 2.75.12 3.04.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.77 1.07.77 2.16l-.01 3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
              </a>
              <a href="https://researchgate.net/" target="_blank" rel="noopener noreferrer" aria-label="ResearchGate" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.586 0c-2.093 0-3.638 1.527-3.638 3.604 0 2.04 1.527 3.584 3.638 3.584 2.093 0 3.638-1.543 3.638-3.584C23.224 1.527 21.679 0 19.586 0z"/><path d="M13 8.5h-2V17h2v-3h1.5c1.4 0 2.5-1.1 2.5-2.5S15.9 9 14.5 9H13v-.5zM13 14v-3h1.5c.8 0 1.5.7 1.5 1.5S15.3 14 14.5 14H13z"/><path d="M9 8H4v9h1.5v-3.5H9v-1.5H5.5V9.5H9z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="footer-nav">
            <div className="footer-nav-col">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/research">Research</Link>
              <Link to="/portfolio">Portfolio</Link>
              <Link to="/publications">Publications</Link>
            </div>
            <div className="footer-nav-col">
              <h4>Information</h4>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-nav-col">
              <h4>Expertise</h4>
              <span>Revit · Navisworks</span>
              <span>BIM Coordination</span>
              <span>Clash Detection</span>
              <span>Sustainable Design</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Tina Ziarati. All Rights Reserved.</p>
          <p>BIM Engineer &amp; Architectural Designer · Rieti, Italy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
