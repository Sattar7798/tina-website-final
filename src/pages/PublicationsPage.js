import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParametricWaveAnimation from '../components/ParametricWaveAnimation';

// Constants
import colors from '../constants/colors';

// Utilities
import '../pages/Publications.css';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

const PublicationsPage = () => {
  const [filter, setFilter] = useState('all');
  const publicationsRef = useRef(null);
  const filterRef = useRef(null);
  
  // Publication data
  const publications = [
    {
      id: 1,
      title: "Advancing Infrastructure Resilience through Smart Monitoring: Insights from the Genoa Bridge Catastrophe",
      authors: "Sattar Hedayat, Tina Ziarati, Paolo Ciampi, Leonardo Maria Giannini",
      journal: "",
      year: "2025",
      status: "In preparation",
      type: "journal",
      abstract: "This research emphasizes the significance of advanced monitoring in addressing critical gaps in infrastructure resilience and its substantial impact on catastrophe risk reduction and sustainable development. The study develops innovative strategies to enhance the resilience and sustainability of infrastructure systems, drawing insights from the Genoa Bridge collapse.",
      keywords: ["Infrastructure Resilience", "Smart Monitoring", "Catastrophe Risk Reduction", "Sustainable Development"],
      link: "",
      doi: "",
      featured: true,
      gradient: 'linear-gradient(135deg, #4cc9f0, #4361ee)'
    },
    {
      id: 2,
      title: "Iran's Seismic Puzzle: Bridging Gaps in Earthquake Emergency Planning and Public Awareness for Risk Reduction",
      authors: "Ciampi, P., Giannini, L. M., Hedayat, S., Ziariati, T., and Scarascia Mugnozza, G.",
      journal: "Italian Journal of Engineering Geology and Environment",
      year: "2024",
      status: "Published",
      type: "journal",
      abstract: "This research focused on emergency planning and preparedness for seismic disasters in Iran, based on a comprehensive national survey. The study recommends a holistic, integrated, and participative strategy for earthquake risk reduction and enhanced public awareness.",
      keywords: ["Seismic Risk", "Emergency Planning", "Public Awareness", "Iran", "Risk Reduction"],
      link: "",
      doi: "PUBLISHED DOI",
      featured: true,
      gradient: 'linear-gradient(135deg, #480ca8, #3f37c9)'
    },
    {
      id: 3,
      title: "Smart Sustainability: The AI-Driven Future of Renewable Energy",
      authors: "T. Ziarati, S. Hedayat, C. Moscatiello, G. Sappa and M. Manganelli",
      journal: "IEEE International Conference on Environment and Electrical Engineering and IEEE Industrial and Commercial Power Systems Europe (EEEIC / ICPS Europe)",
      year: "2024",
      status: "Published",
      type: "conference",
      abstract: "This paper explores the potential for significant advancements in renewable energy by focusing on innovative technologies such as digital twins and smart cities. It demonstrates how incorporating artificial intelligence can unlock efficiency, maximize resource use, and propel the sustainable energy sector into a technologically advanced future.",
      keywords: ["Artificial Intelligence", "Renewable Energy", "Digital Twins", "Smart Cities", "Sustainability"],
      link: "",
      doi: "PUBLISHED DOI",
      featured: true,
      gradient: 'linear-gradient(135deg, #f72585, #b5179e)'
    },
    {
      id: 4,
      title: "Smart Sustainability: The AI-Driven Future of Renewable Energy",
      authors: "Tina Ziarati",
      journal: "B.Sc. Thesis, Sapienza University",
      year: "2023",
      status: "Completed",
      type: "thesis",
      abstract: "This thesis explores the potential for significant advancements by focusing on innovative technologies such as digital twins and smart cities. It demonstrates how incorporating AI can unlock efficiency, maximize resource use, and propel the sustainable energy sector into a technologically advanced future.",
      keywords: ["Artificial Intelligence", "Renewable Energy", "Digital Twins", "Smart Cities", "Sustainability"],
      link: "",
      doi: "",
      featured: false,
      gradient: 'linear-gradient(135deg, #3a0ca3, #4361ee)'
    }
  ];
  
  // Filter publications
  const filteredPublications = filter === 'all' 
    ? publications
    : publications.filter(pub => pub.type === filter);
  
  // Set up animations
  useEffect(() => {
    // Animate publication cards
    const cards = document.querySelectorAll('.publication-card');
    
    gsap.fromTo(
      cards,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: publicationsRef.current,
          start: "top 80%"
        }
      }
    );
    
    // Animate filter buttons
    gsap.fromTo(
      filterRef.current.children,
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.5,
        ease: "power2.out",
        delay: 0.3
      }
    );
  }, [filter]);
  
  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    
    // Animate new cards
    setTimeout(() => {
      const cards = document.querySelectorAll('.publication-card');
      
      gsap.fromTo(
        cards,
        { 
          scale: 0.95, 
          opacity: 0 
        },
        { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );
    }, 100);
  };
  
  return (
    <div className="research-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="research-hero">
        <div className="hero-backdrop">
          <ParametricWaveAnimation 
            color={colors.primary[700]} 
            speed={0.03} 
            amplitude={20}
          />
        </div>
        <div className="hero-gradient-overlay"></div>
        
        <div className="research-hero-content">
          <h1 className="research-title">Publications</h1>
          <p className="research-description">
            Research papers, conference proceedings, and academic contributions in architectural engineering and infrastructure resilience.
          </p>
          
          <div className="research-keywords">
            <span>Smart Design</span>
            <span>Sustainable Engineering</span>
            <span>Structural Systems</span>
            <span>Infrastructure Resilience</span>
          </div>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="container">
        <div className="section-header">
          <h2>Academic Contributions</h2>
          <p>Explore my collection of published research in architectural engineering, infrastructure resilience, and sustainable design.</p>
        </div>
        
        <div className="publication-filters" ref={filterRef}>
          <button
            onClick={() => handleFilterChange('all')}
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          >
            All Publications
          </button>
          <button
            onClick={() => handleFilterChange('journal')}
            className={`filter-button ${filter === 'journal' ? 'active' : ''}`}
          >
            Journal Articles
          </button>
          <button
            onClick={() => handleFilterChange('conference')}
            className={`filter-button ${filter === 'conference' ? 'active' : ''}`}
          >
            Conference Papers
          </button>
          <button
            onClick={() => handleFilterChange('thesis')}
            className={`filter-button ${filter === 'thesis' ? 'active' : ''}`}
          >
            Theses
          </button>
        </div>
        
        {/* Publications List */}
        <div className="publications-container" ref={publicationsRef}>
          {filteredPublications.map((publication) => (
            <div 
              key={publication.id} 
              className="publication-card"
            >
              <div className="publication-header" style={{ background: publication.gradient }}>
                <div className="publication-type-badge">
                  {publication.type === 'journal' && 'Journal Article'}
                  {publication.type === 'conference' && 'Conference Paper'}
                  {publication.type === 'thesis' && 'Thesis'}
                </div>
                {publication.featured && (
                  <div className="featured-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" className="featured-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>Featured</span>
                  </div>
                )}
              </div>
              
              <div className="publication-content">
                <div className="publication-meta">
                  <span className="publication-year">{publication.year}</span>
                  {publication.status && (
                    <span className={`publication-status ${publication.status.toLowerCase().replace(' ', '-')}`}>
                      {publication.status}
                    </span>
                  )}
                </div>
                
                <h3 className="publication-title">{publication.title}</h3>
                <p className="publication-authors">{publication.authors}</p>
                
                {publication.journal && (
                  <div className="publication-journal">
                    <span>{publication.journal}</span>
                  </div>
                )}
                
                <div className="publication-abstract">
                  <p>{publication.abstract}</p>
                </div>
                
                {publication.keywords.length > 0 && (
                  <div className="publication-keywords-container">
                    {publication.keywords.map((keyword, index) => (
                      <span key={index} className="publication-keyword">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="publication-actions">
                  {publication.doi && (
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="publication-action-button"
                    >
                      View Publication
                    </a>
                  )}
                  
                  {publication.link && (
                    <a
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="publication-action-button outlined"
                    >
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredPublications.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No publications found</h3>
              <p>There are no publications in this category yet.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Citation Information */}
      <section className="research-methodology">
        <div className="container">
          <div className="section-header light">
            <h2>Citation Information</h2>
            <p>
              If you'd like to cite my work in your research, please use the following formats.
            </p>
          </div>
          
          <div className="methodology-grid">
            <div className="methodology-item">
              <div className="methodology-icon">APA</div>
              <div className="methodology-content">
                <h4 className="methodology-title">APA Format</h4>
                <p className="methodology-description">
                  Ziarati, T., Hedayat, S., Moscatiello, C., Sappa, G., & Manganelli, M. (2024). Smart Sustainability: The AI-Driven Future of Renewable Energy. <em>IEEE International Conference on Environment and Electrical Engineering and IEEE Industrial and Commercial Power Systems Europe (EEEIC / ICPS Europe)</em>, 1-6.
                </p>
              </div>
            </div>
            
            <div className="methodology-item">
              <div className="methodology-icon">MLA</div>
              <div className="methodology-content">
                <h4 className="methodology-title">MLA Format</h4>
                <p className="methodology-description">
                  Ziarati, Tina, et al. "Smart Sustainability: The AI-Driven Future of Renewable Energy." <em>IEEE International Conference on Environment and Electrical Engineering and IEEE Industrial and Commercial Power Systems Europe</em>, 2024, pp. 1-6.
                </p>
              </div>
            </div>
            
            <div className="methodology-item">
              <div className="methodology-icon">CHI</div>
              <div className="methodology-content">
                <h4 className="methodology-title">Chicago Format</h4>
                <p className="methodology-description">
                  Ziarati, Tina, Sattar Hedayat, C. Moscatiello, G. Sappa, and M. Manganelli. "Smart Sustainability: The AI-Driven Future of Renewable Energy." <em>IEEE International Conference on Environment and Electrical Engineering and IEEE Industrial and Commercial Power Systems Europe (EEEIC / ICPS Europe)</em> (2024): 1-6.
                </p>
              </div>
            </div>
          </div>
          
          <div className="citation-profiles">
            <p>For citation metrics and additional publications, visit my academic profiles:</p>
            <div className="profile-links">
              <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" className="profile-link">
                <svg className="profile-icon google-scholar" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.242 13.769L4.5 16.5H1.5L5.845 5H8.204L12.5 16.5H9.5L8.807 13.769H5.242ZM7.031 8.065L5.897 11.469H8.147L7.031 8.065Z"/>
                  <path d="M13.5 12.5H21.5V14H13.5V12.5Z"/>
                  <path d="M13.5 9H21.5V10.5H13.5V9Z"/>
                  <path d="M13.5 16H21.5V17.5H13.5V16Z"/>
                </svg>
                Google Scholar
              </a>
              <a href="https://researchgate.net/" target="_blank" rel="noopener noreferrer" className="profile-link">
                <svg className="profile-icon researchgate" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.586 5.586L13.414 11.757L12 13.171L10.586 11.757L4.414 5.586L3 7L9.172 13.171L3 19.343L4.414 20.757L10.586 14.586L12 13.171L13.414 14.586L19.586 20.757L21 19.343L14.828 13.171L21 7L19.586 5.586Z"/>
                </svg>
                ResearchGate
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="latest-projects">
        <div className="container">
          <div className="section-header light">
            <h2>Interested in Collaboration?</h2>
            <p>
              I'm always open to research collaborations and discussions about sustainable building engineering,
              smart monitoring systems, and innovative approaches to infrastructure resilience.
            </p>
          </div>
          
          <div className="view-all-container">
            <Link to="/contact" className="view-all-button">
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PublicationsPage; 