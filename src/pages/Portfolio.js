import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Portfolio.css';

const Portfolio = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flippingDirection, setFlippingDirection] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hoveredPage, setHoveredPage] = useState(null);

  // Refs
  const bookRef = useRef(null);
  const pagesContainerRef = useRef(null);
  
  const projects = [
    {
      id: 1,
      title: 'Adaptive Tensile Structure',
      category: 'structural',
      description: 'A tensile structure system that adapts to changing environmental conditions through parametric control of tension elements.',
      image: '/assets/projects/project1.jpg',
      location: 'University Research Lab',
      year: 2023,
      client: 'Advanced Research Institute',
      technologies: ['Parametric Modeling', 'Material Testing', 'Structural Analysis'],
      longDescription: [
        'This research project explores the potential of adaptive tensile structures to respond to changing environmental conditions through the parametric control of tension elements.',
        'The system uses a network of sensors to monitor environmental factors such as wind speed, temperature, and precipitation, and adjusts the tension in the fabric membrane accordingly.',
        'Through computational modeling and physical prototyping, the research demonstrates significant improvements in structural performance and energy efficiency compared to traditional static tensile structures.'
      ]
    },
    {
      id: 2,
      title: 'Climate-Responsive Facade System',
      category: 'environmental',
      description: 'A double-skin facade system with integrated passive ventilation and solar shading components optimized for different climate zones.',
      image: '/assets/projects/project2.jpg',
      location: 'Urban Innovation Center',
      year: 2022,
      client: 'Sustainable Building Initiative',
      technologies: ['Computational Fluid Dynamics', 'Thermal Modeling', 'Parametric Design'],
      longDescription: [
        'The Climate-Responsive Facade System is designed to optimize energy performance in buildings across different climate zones through the integration of passive ventilation and dynamic solar shading.',
        'The system features a double-skin facade with a ventilated cavity that helps regulate temperature and air quality, while reducing energy consumption for heating, cooling, and lighting.',
        'Advanced computational fluid dynamics simulations were used to analyze air flow patterns and optimize the configuration of ventilation components for maximum efficiency.'
      ]
    },
    {
      id: 3,
      title: 'Bio-composite Structural Elements',
      category: 'materials',
      description: 'Development and testing of bio-based composite materials for structural applications, focusing on strength-to-weight ratio and environmental impact.',
      image: '/assets/projects/project3.jpg',
      location: 'Material Science Lab',
      year: 2023,
      client: 'Green Materials Consortium',
      technologies: ['Material Testing', 'Finite Element Analysis', 'Sustainability Assessment'],
      longDescription: [
        'This project investigates the potential of bio-based composite materials for structural applications, focusing on their strength-to-weight ratio and environmental impact.',
        'The research includes the development of new composite formulations using natural fibers and bio-resins, as well as extensive material testing to evaluate mechanical properties and durability.',
        'Finite element analysis was used to model the performance of bio-composite structural elements under various loading conditions, demonstrating their viability as sustainable alternatives to traditional materials.'
      ]
    },
    {
      id: 4,
      title: 'Generative Design for Urban Spaces',
      category: 'computational',
      description: 'A generative design framework for optimizing urban spaces based on user-defined parameters and environmental data.',
      image: '/assets/projects/project4.jpg',
      location: 'City Planning Office',
      year: 2023,
      client: 'Urban Development Agency',
      technologies: ['Generative Design', 'GIS Analysis', 'User-Centered Design'],
      longDescription: [
        'This project presents a generative design framework for optimizing urban spaces based on user-defined parameters and environmental data.',
        'The framework integrates geographic information systems (GIS) analysis with generative design algorithms to create spatial configurations that respond to social, environmental, and economic factors.',
        'User-centered design principles were applied to ensure that the generated solutions meet the needs and preferences of local communities.'
      ]
    },
    {
      id: 5,
      title: 'Parametric Persian Garden Pavilion',
      category: 'persian',
      description: 'A contemporary interpretation of traditional Persian garden pavilions using parametric design techniques and sustainable materials.',
      image: '/assets/projects/persian-pavilion.jpg',
      location: 'Tehran Cultural Center',
      year: 2024,
      client: 'Cultural Heritage Foundation',
      technologies: ['Parametric Design', 'Traditional Craftsmanship', 'Sustainable Materials', 'Persian Architecture'],
      longDescription: [
        'This project reimagines the traditional Persian Chahar Bagh (four-garden) pavilion concept through contemporary parametric design methods while honoring ancient principles of Persian architecture.',
        'The design incorporates traditional geometric patterns found in Persian architecture, transforming them into a responsive structural system that creates intricate dappled light patterns reminiscent of Persian mashrabiya screens.',
        'Environmental considerations include passive cooling techniques inspired by traditional Persian wind catchers (Badgirs) and water features that create microclimates within the pavilion spaces.'
      ]
    },
    {
      id: 6,
      title: 'Persepolis Digital Reconstruction',
      category: 'persian',
      description: 'A digital reconstruction of Persepolis using advanced 3D modeling, photogrammetry, and archaeological data to recreate the ancient Persian capital.',
      image: '/assets/projects/persepolis.jpg',
      location: 'Virtual Heritage Institute',
      year: 2023,
      client: 'National Museum of Iran',
      technologies: ['3D Reconstruction', 'Photogrammetry', 'Archaeological Analysis', 'Historical Research'],
      longDescription: [
        'This comprehensive digital reconstruction project brings the ancient Persian capital of Persepolis back to life through cutting-edge 3D modeling techniques and rigorous archaeological research.',
        'The project involved detailed analysis of remaining structures, artifacts, and historical documents to ensure accuracy in the representation of architectural details, decorative elements, and spatial organization.',
        'Interactive visualization tools allow users to experience the grandeur of Achaemenid architecture and understand the sophisticated engineering knowledge of ancient Persian builders.'
      ]
    }
  ];

  // Add intro page and table of contents page to beginning of book
  const allPages = [
    { 
      id: 'cover',
      type: 'cover'
    },
    { 
      id: 'contents',
      type: 'contents'
    },
    ...projects.map(project => ({
      ...project,
      type: 'project'
    }))
  ];
  
  // Handle window scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      if (bookRef.current) {
        const scrollPosition = window.pageYOffset;
        const bookTop = bookRef.current.getBoundingClientRect().top + window.pageYOffset;
        const relativeScroll = scrollPosition - bookTop;
        
        if (relativeScroll > -500 && relativeScroll < 500) {
          const tiltFactor = relativeScroll / 1000;
          bookRef.current.style.transform = `
            perspective(2000px) 
            rotateX(${tiltFactor * 5}deg) 
            rotateY(${tiltFactor * -5}deg)
          `;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Initialize book animations
  useEffect(() => {
    if (!isInitialized) {
      // Animated book opening
      setTimeout(() => {
        const bookCover = document.querySelector('.book-cover');
        if (bookCover) {
          bookCover.classList.add('book-open');
        }
        
        // Add paper texture effects
        const pages = document.querySelectorAll('.book-page');
        pages.forEach((page, index) => {
          page.style.zIndex = pages.length - index;
          
          // Add random paper texture variations
          const variation = Math.floor(Math.random() * 3) + 1;
          page.classList.add(`paper-texture-${variation}`);
        });
        
        setIsInitialized(true);
      }, 1000);
    }
  }, [isInitialized]);
  
  const flipToPage = (pageIndex) => {
    if (pageIndex === currentPage || isFlipping) return;
    
    setIsFlipping(true);
    setFlippingDirection(pageIndex > currentPage ? 'forward' : 'backward');
    
    // Add sound effect
    const pageTurnSound = new Audio('/assets/sounds/page-turn.mp3');
    pageTurnSound.volume = 0.3;
    pageTurnSound.play().catch(() => {
      // Silently fail if sound can't be played (e.g., if audio file doesn't exist)
    });
    
    // Add dynamic page effect with shadow
    const pages = document.querySelectorAll('.book-page');
    if (pages[currentPage]) {
      pages[currentPage].classList.add(pageIndex > currentPage ? 'turning-forward' : 'turning-backward');
    }
    
    setTimeout(() => {
      if (pages[currentPage]) {
        pages[currentPage].classList.remove('turning-forward', 'turning-backward');
      }
      setCurrentPage(pageIndex);
      setIsFlipping(false);
      setFlippingDirection(null);
      
      // Scroll illumination effects
      if (pagesContainerRef.current && pageIndex >= 2) {
        const pageContent = pagesContainerRef.current.querySelector('.page-content');
        if (pageContent) {
          pageContent.scrollTop = 0;
        }
      }
    }, 600); // Match duration with CSS animation
  };

  const goToNextPage = () => {
    if (currentPage < allPages.length - 1 && !isFlipping) {
      flipToPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      flipToPage(currentPage - 1);
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevPage();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);
  
  // Touch swipe navigation
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].clientX;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const swipeThreshold = 50;
      if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left
        goToNextPage();
      } else if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right
        goToPrevPage();
      }
    };
    
    if (pagesContainerRef.current) {
      pagesContainerRef.current.addEventListener('touchstart', handleTouchStart);
      pagesContainerRef.current.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        if (pagesContainerRef.current) {
          pagesContainerRef.current.removeEventListener('touchstart', handleTouchStart);
          pagesContainerRef.current.removeEventListener('touchend', handleTouchEnd);
        }
      };
    }
  }, [currentPage, isFlipping]);
  
  // Add page hover effects for previewing
  const handlePageHover = (pageIndex) => {
    if (!isFlipping && pageIndex !== currentPage) {
      setHoveredPage(pageIndex);
    }
  };
  
  const handlePageLeave = () => {
    setHoveredPage(null);
  };

  return (
    <div className="portfolio-page persian-book-page">
      <Navbar />
      
      <section className="book-showcase">
        <div className="book-environment">
          <div className="illuminated-background"></div>
          <div className="light-source"></div>
          <div className="persian-patterns-container"></div>
          <div className="dust-particles">
            {Array.from({ length: 50 }).map((_, index) => (
              <div 
                key={index} 
                className="dust-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${10 + Math.random() * 20}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.2 + Math.random() * 0.3
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="book-intro">
          <h1 className="book-title">
            <span className="title-line">Ancient Wisdom,</span>
            <span className="title-line">Modern Engineering</span>
          </h1>
          <p className="book-description">
            Explore my architectural engineering portfolio through the pages of this Persian manuscript.
            Each folio reveals a project that blends traditional Persian design principles with contemporary engineering.
          </p>
        </div>
        
        <div className="book-display-container">
          <div className="book-shadow"></div>
          
          <motion.div 
            className="persian-book"
            ref={bookRef}
            initial={{ rotateX: 10, rotateY: -15, scale: 0.95 }}
            animate={{ 
              rotateX: [10, 5, 10],
              rotateY: [-15, -10, -15],
              scale: [0.95, 1, 0.95]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <div className="book-cover">
              <div className="book-spine">
                <div className="spine-pattern"></div>
                <div className="spine-title">Tina Ziarati Portfolio</div>
                <div className="spine-ornament top"></div>
                <div className="spine-ornament bottom"></div>
              </div>
              
              <div className="cover-front">
                <div className="cover-pattern"></div>
                <div className="cover-medallion"></div>
                <h2 className="cover-title">
                  <span>The Book of</span>
                  <span>Architectural</span>
                  <span>Engineering</span>
                </h2>
                <div className="cover-ornament top-left"></div>
                <div className="cover-ornament top-right"></div>
                <div className="cover-ornament bottom-left"></div>
                <div className="cover-ornament bottom-right"></div>
                <div className="cover-author">Tina Ziarati</div>
              </div>
              
              <div className="cover-back">
                <div className="back-pattern"></div>
                <div className="back-medallion"></div>
              </div>
            </div>
            
            <div 
              className="book-pages-container" 
              ref={pagesContainerRef}
            >
              <AnimatePresence mode="wait">
                {!isFlipping && (
                  <motion.div 
                    key={`page-${currentPage}`}
                    className="book-page"
                    initial={{ 
                      opacity: 0, 
                      rotateY: flippingDirection === 'forward' ? -90 : 90,
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)"
                    }}
                    animate={{ 
                      opacity: 1, 
                      rotateY: 0,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                    }}
                    exit={{ 
                      opacity: 0, 
                      rotateY: flippingDirection === 'forward' ? 90 : -90,
                      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" 
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {allPages[currentPage].type === 'cover' && (
                      <div className="page-content cover-page">
                        <div className="illumination-border">
                          <div className="illumination-corner top-left"></div>
                          <div className="illumination-corner top-right"></div>
                          <div className="illumination-corner bottom-left"></div>
                          <div className="illumination-corner bottom-right"></div>
                        </div>
                        <h2>Architectural Engineering Portfolio</h2>
                        <div className="cover-illumination"></div>
                        <div className="cover-illustration"></div>
                        <p className="book-subtitle">A Journey Through Persian-Inspired Design & Engineering</p>
                        <div className="author-signature">Tina Ziarati</div>
                        <div className="scroll-hint">
                          Turn the page <span className="arrow">→</span>
                        </div>
                      </div>
                    )}
                    
                    {allPages[currentPage].type === 'contents' && (
                      <div className="page-content contents-page">
                        <div className="page-header-decoration"></div>
                        <h2 className="contents-title">Table of Contents</h2>
                        <div className="contents-decoration"></div>
                        <ul className="contents-list">
                          {projects.map((project, index) => (
                            <li 
                              key={project.id} 
                              className={`contents-item ${hoveredPage === index + 2 ? 'hovered' : ''}`}
                              onClick={() => flipToPage(index + 2)} // +2 to account for cover and contents pages
                              onMouseEnter={() => handlePageHover(index + 2)}
                              onMouseLeave={handlePageLeave}
                            >
                              <span className="contents-number">{index + 1}</span>
                              <span className="contents-page-title">{project.title}</span>
                              <span className="contents-dots"></span>
                              <span className="contents-preview">
                                <span className="preview-image" style={{ backgroundImage: `url(${project.image})` }}></span>
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="page-footer-decoration"></div>
                        <div className="page-number">ii</div>
                      </div>
                    )}
                    
                    {allPages[currentPage].type === 'project' && (
                      <div className="page-content project-page">
                        <div className="page-header">
                          <div className="header-decoration left"></div>
                          <div className="project-number">{currentPage - 1}</div>
                          <h2 className="project-title">{allPages[currentPage].title}</h2>
                          <div className="header-decoration right"></div>
                        </div>
                        
                        <div className="project-image-container">
                          <div 
                            className="project-image" 
                            style={{ backgroundImage: `url(${allPages[currentPage].image})` }}
                          >
                            <div className="image-frame"></div>
                            <div className="image-caption">{allPages[currentPage].title} - {allPages[currentPage].year}</div>
                          </div>
                        </div>
                        
                        <div className="project-details">
                          <div className="project-meta">
                            <div className="meta-item">
                              <span className="meta-label">Location</span>
                              <span className="meta-value">{allPages[currentPage].location}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-label">Year</span>
                              <span className="meta-value">{allPages[currentPage].year}</span>
                            </div>
                            <div className="meta-item">
                              <span className="meta-label">Client</span>
                              <span className="meta-value">{allPages[currentPage].client}</span>
                            </div>
                          </div>
                          
                          <div className="section-divider">
                            <div className="divider-ornament"></div>
                          </div>
                          
                          <div className="project-description">
                            <p className="first-paragraph">{allPages[currentPage].description}</p>
                            {allPages[currentPage].longDescription.map((paragraph, idx) => (
                              <p key={idx}>{paragraph}</p>
                            ))}
                          </div>
                          
                          <div className="section-divider">
                            <div className="divider-ornament"></div>
                          </div>
                          
                          <div className="project-technologies">
                            <h3>Technologies & Methods</h3>
                            <div className="tech-tags">
                              {allPages[currentPage].technologies.map((tech, idx) => (
                                <span key={idx} className="tech-tag">{tech}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="page-decoration bottom-decoration"></div>
                        <div className="page-number">{currentPage - 1}</div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Page edge effect */}
              <div className="book-page-edges">
                {Array.from({ length: allPages.length }).map((_, index) => (
                  <div 
                    key={index}
                    className={`page-edge ${index === currentPage ? 'active' : ''} ${index < currentPage ? 'turned' : ''}`}
                    style={{
                      right: `${index * 0.25}px`,
                      zIndex: allPages.length - index
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="book-navigation">
              <button 
                className={`nav-button prev-button ${currentPage <= 0 ? 'disabled' : ''}`}
                onClick={goToPrevPage}
                disabled={currentPage <= 0 || isFlipping}
                aria-label="Previous page"
              >
                <span className="nav-icon">←</span>
                <span className="nav-text">Previous Page</span>
              </button>
              
              <div className="page-indicator">
                {currentPage === 0 ? (
                  <span>Cover</span>
                ) : currentPage === 1 ? (
                  <span>Contents</span>
                ) : (
                  <span>Page {currentPage - 1} of {allPages.length - 2}</span>
                )}
              </div>
              
              <button 
                className={`nav-button next-button ${currentPage >= allPages.length - 1 ? 'disabled' : ''}`}
                onClick={goToNextPage}
                disabled={currentPage >= allPages.length - 1 || isFlipping}
                aria-label="Next page"
              >
                <span className="nav-text">Next Page</span>
                <span className="nav-icon">→</span>
              </button>
            </div>
          </motion.div>
          
          <div className="book-instructions">
            <div className="instruction-item">
              <div className="instruction-icon keyboard"></div>
              <span>Use arrow keys</span>
            </div>
            <div className="instruction-item">
              <div className="instruction-icon swipe"></div>
              <span>Swipe pages</span>
            </div>
            <div className="instruction-item">
              <div className="instruction-icon click"></div>
              <span>Click buttons</span>
            </div>
          </div>
        </div>
      </section>
      
      <section className="book-description-section">
        <div className="container">
          <h2 className="section-title">About This Persian Manuscript</h2>
          
          <div className="book-manuscript-intro">
            <p>
              This digital manuscript draws inspiration from the rich tradition of Persian illuminated manuscripts,
              particularly the iconic <em>Shahnameh</em> (Book of Kings) and the legendary works of master calligraphers and illuminators
              of the Timurid and Safavid periods. It merges this ancient artistry with my modern architectural engineering projects.
            </p>
          </div>
          
          <div className="book-features">
            <div className="feature-item">
              <div className="feature-icon illumination-icon"></div>
              <h3>Traditional Illumination</h3>
              <p>
                Each page features detailed illuminations (<em>tazhib</em>) and decorative elements characteristic of
                Persian artistic tradition. Gold leaf accents, intricate geometric patterns, and floral motifs create a harmonious blend
                of beauty and structure.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon calligraphy-icon"></div>
              <h3>Persian Design Elements</h3>
              <p>
                The geometric patterns (<em>girih</em>), arabesque motifs (<em>eslimi</em>), and color palette reflect the rich
                visual language of Persian illuminated manuscripts, reinterpreted through a contemporary architectural lens for the
                presentation of my engineering portfolio.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon binding-icon"></div>
              <h3>Interactive Experience</h3>
              <p>
                Like traditional codices that preserve knowledge across generations, this digital manuscript
                presents my architectural engineering projects as a continuous narrative that bridges Persian cultural heritage
                with innovative contemporary design solutions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
  