import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PublicationsSection.css';

const PublicationsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPublication, setSelectedPublication] = useState(null);
  
  const categories = [
    { id: 'all', name: 'All Publications' },
    { id: 'journal', name: 'Journal Articles' },
    { id: 'conference', name: 'Conference Papers' },
    { id: 'book', name: 'Book Chapters' },
    { id: 'thesis', name: 'Thesis Works' }
  ];
  
  const publications = [
    {
      id: 1,
      title: 'Parametric Optimization of Structural Systems in High-Rise Buildings',
      authors: 'Tina Ziarati, M. Johnson, R. Smith',
      journal: 'Journal of Architectural Engineering',
      year: 2023,
      volume: '29',
      issue: '3',
      pages: '142-158',
      doi: '10.1000/journal.arch.2023.29.3.142',
      abstract: 'This paper presents a novel approach to optimizing structural systems in high-rise buildings using parametric design methods. The research demonstrates significant improvements in material efficiency while maintaining structural integrity under various load conditions.',
      keywords: ['Parametric Design', 'Structural Optimization', 'High-Rise Buildings'],
      category: 'journal',
      thumbnail: '/assets/publications/paper1.jpg'
    },
    {
      id: 2,
      title: 'Thermal Regulation Strategies for Building Envelopes in Extreme Climate Conditions',
      authors: 'Tina Ziarati, K. Williams, S. Chen',
      conference: 'International Conference on Sustainable Architecture and Urban Design',
      location: 'Barcelona, Spain',
      year: 2022,
      pages: '78-86',
      doi: '10.1000/conf.saud.2022.78',
      abstract: 'This research explores innovative thermal regulation strategies for building envelopes in regions with extreme climate conditions. Using computational fluid dynamics simulations, the study evaluates the performance of different envelope systems and proposes new approaches for optimizing energy efficiency.',
      keywords: ['Thermal Regulation', 'Building Envelope', 'Energy Efficiency', 'CFD Simulation'],
      category: 'conference',
      thumbnail: '/assets/publications/paper2.jpg'
    },
    {
      id: 3,
      title: 'Integration of Structural and Environmental Systems in Contemporary Architecture',
      authors: 'Tina Ziarati, P. Garcia',
      book: 'Advances in Architectural Engineering',
      editors: 'E. Thompson, L. Davis',
      publisher: 'Academic Press',
      year: 2023,
      pages: '215-242',
      doi: '10.1000/book.arch.2023.215',
      abstract: 'This chapter examines the integration of structural and environmental systems in contemporary architectural practice. Through case studies and theoretical analysis, the authors identify patterns and strategies for enhanced systems integration that promote both performance and aesthetic quality.',
      keywords: ['Systems Integration', 'Architectural Engineering', 'Environmental Systems', 'Case Studies'],
      category: 'book',
      thumbnail: '/assets/publications/paper3.jpg'
    },
    {
      id: 4,
      title: 'Adaptive Structural Systems for Resilient Urban Architecture',
      authors: 'Tina Ziarati',
      institution: 'University of Advanced Design',
      degree: 'Master of Architectural Engineering',
      year: 2021,
      pages: '112',
      abstract: 'This thesis investigates adaptive structural systems that can respond to changing environmental conditions and usage requirements. The research proposes a framework for designing resilient urban architecture that can withstand climate change impacts while providing flexible spaces for evolving user needs.',
      keywords: ['Adaptive Structures', 'Urban Resilience', 'Climate Change', 'Flexible Architecture'],
      category: 'thesis',
      thumbnail: '/assets/publications/paper4.jpg'
    }
  ];
  
  const filteredPublications = activeFilter === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === activeFilter);
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSelectedPublication(null);
  };
  
  const handlePublicationClick = (publication) => {
    setSelectedPublication(publication);
  };
  
  const handleCloseDetails = () => {
    setSelectedPublication(null);
  };
  
  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  return (
    <div className="publications-section">
      <div className="publications-header">
        <h2>Publications</h2>
        <p>Research papers, conference proceedings, and academic contributions</p>
      </div>
      
      <div className="publications-filters">
        {categories.map(category => (
          <button 
            key={category.id}
            className={`filter-button ${activeFilter === category.id ? 'active' : ''}`}
            onClick={() => handleFilterChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          className="publications-grid"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{ 
            visible: { 
              transition: { 
                staggerChildren: 0.1 
              } 
            } 
          }}
          key={activeFilter}
        >
          {filteredPublications.map(publication => (
            <motion.div
              key={publication.id}
              className="publication-card"
              onClick={() => handlePublicationClick(publication)}
              variants={itemVariants}
            >
              <div className="publication-thumbnail">
                <img src={publication.thumbnail} alt={publication.title} />
              </div>
              <div className="publication-info">
                <h3>{publication.title}</h3>
                <p className="publication-authors">{publication.authors}</p>
                <p className="publication-source">
                  {publication.journal || publication.conference || publication.book || publication.institution}
                </p>
                <p className="publication-year">{publication.year}</p>
                <div className="publication-keywords">
                  {publication.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">{keyword}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedPublication && (
          <motion.div 
            className="publication-details"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="details-content">
              <button className="close-button" onClick={handleCloseDetails}>×</button>
              
              <h2>{selectedPublication.title}</h2>
              <p className="details-authors">{selectedPublication.authors}</p>
              
              {selectedPublication.category === 'journal' && (
                <div className="details-source">
                  <p>
                    <strong>{selectedPublication.journal}</strong>, {selectedPublication.year}, 
                    Vol. {selectedPublication.volume}, Issue {selectedPublication.issue}, 
                    pp. {selectedPublication.pages}
                  </p>
                  <p>DOI: <a href={`https://doi.org/${selectedPublication.doi}`} target="_blank" rel="noopener noreferrer">{selectedPublication.doi}</a></p>
                </div>
              )}
              
              {selectedPublication.category === 'conference' && (
                <div className="details-source">
                  <p>
                    <strong>{selectedPublication.conference}</strong>, {selectedPublication.location}, 
                    {selectedPublication.year}, pp. {selectedPublication.pages}
                  </p>
                  <p>DOI: <a href={`https://doi.org/${selectedPublication.doi}`} target="_blank" rel="noopener noreferrer">{selectedPublication.doi}</a></p>
                </div>
              )}
              
              {selectedPublication.category === 'book' && (
                <div className="details-source">
                  <p>
                    <strong>Chapter in: {selectedPublication.book}</strong>, 
                    Editors: {selectedPublication.editors}, 
                    {selectedPublication.publisher}, {selectedPublication.year}, 
                    pp. {selectedPublication.pages}
                  </p>
                  <p>DOI: <a href={`https://doi.org/${selectedPublication.doi}`} target="_blank" rel="noopener noreferrer">{selectedPublication.doi}</a></p>
                </div>
              )}
              
              {selectedPublication.category === 'thesis' && (
                <div className="details-source">
                  <p>
                    <strong>{selectedPublication.degree} Thesis</strong>, 
                    {selectedPublication.institution}, {selectedPublication.year}, 
                    {selectedPublication.pages} pages
                  </p>
                </div>
              )}
              
              <div className="details-abstract">
                <h3>Abstract</h3>
                <p>{selectedPublication.abstract}</p>
              </div>
              
              <div className="details-keywords">
                <h3>Keywords</h3>
                <div>
                  {selectedPublication.keywords.map((keyword, index) => (
                    <span key={index} className="keyword">{keyword}</span>
                  ))}
                </div>
              </div>
              
              <div className="details-actions">
                <button className="action-button">Download PDF</button>
                <button className="action-button">Cite</button>
                <button className="action-button">Share</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PublicationsSection;