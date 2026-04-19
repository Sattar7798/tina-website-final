import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Research', path: '/research' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Design', path: '/design' },
    { name: 'Publications', path: '/publications' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const linkVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.1 * i }
    })
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      variants={navbarVariants}
      initial="initial"
      animate="animate"
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-layers">
            <div className="logo-layer layer-1"></div>
            <div className="logo-layer layer-2"></div>
            <div className="logo-layer layer-3"></div>
            <div className="logo-layer layer-4"></div>
          </div>
          <span>Tina Ziarati</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => (
            <motion.div 
              key={link.name} 
              variants={linkVariants}
              initial="initial"
              animate="animate"
              custom={index}
            >
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;