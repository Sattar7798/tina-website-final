// src/pages/Publications.js
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ParametricWaveAnimation from '../components/ParametricWaveAnimation';

// Constants
import colors from '../constants/colors';

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

const Publications = () => {
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
      featured: true
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
      featured: true
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
      featured: true
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
      featured: false
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
  }, []);
  
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-16 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 to-primary-600/80 mix-blend-multiply"></div>
            <ParametricWaveAnimation 
              color={colors.primary[200]} 
              speed={0.05} 
              amplitude={15}
            />
          </div>
          
          <div className="relative text-center py-24 px-4">
            <h1 className="text-5xl font-bold mb-6 text-white">Publications</h1>
            <div className="w-24 h-1 bg-white/50 mx-auto mb-6"></div>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              My research focuses on sustainable building engineering, infrastructure resilience,
              and the integration of smart technologies for improved built environments.
            </p>
          </div>
        </section>
        
        {/* Filter Section */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-8" ref={filterRef}>
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === 'all'
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              All Publications
            </button>
            <button
              onClick={() => handleFilterChange('journal')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === 'journal'
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              Journal Articles
            </button>
            <button
              onClick={() => handleFilterChange('conference')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === 'conference'
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              Conference Papers
            </button>
            <button
              onClick={() => handleFilterChange('thesis')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === 'thesis'
                ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/20'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-md'
              }`}
            >
              Theses
            </button>
          </div>
        </section>
        
        {/* Publications List */}
        <section ref={publicationsRef}>
          <div className="grid grid-cols-1 gap-8">
            {filteredPublications.map((publication) => (
              <div 
                key={publication.id} 
                className={`publication-card bg-white p-0 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:translate-y-[-4px] ${
                  publication.featured ? 'border-l-4 border-primary-500' : ''
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12">
                  {/* Publication Type Indicator */}
                  <div className="md:col-span-1 bg-gray-50 flex items-center justify-center p-6">
                    {publication.type === 'journal' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      </svg>
                    )}
                    {publication.type === 'conference' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 10h4V6a2 2 0 0 0-2-2h-4"></path>
                        <path d="M3 6v4h4"></path>
                        <path d="M7 20H3v-4"></path>
                        <path d="M21 14h-4"></path>
                        <path d="M11 4h2"></path>
                        <path d="M11 20h2"></path>
                      </svg>
                    )}
                    {publication.type === 'thesis' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    )}
                  </div>
                  
                  {/* Publication Content */}
                  <div className="md:col-span-11 p-8">
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">{publication.title}</h3>
                        <p className="text-gray-700 mb-4">{publication.authors}</p>
                      </div>
                      <div className="flex-shrink-0 flex items-center space-x-1 bg-primary-50 px-4 py-2 rounded-full">
                        <span className={`w-2 h-2 rounded-full ${
                          publication.status === 'Published' ? 'bg-green-500' :
                          publication.status === 'In preparation' ? 'bg-amber-500' : 'bg-blue-500'
                        }`}></span>
                        <span className="text-sm font-medium text-gray-700">
                          {publication.journal}
                          {publication.journal && publication.year && ', '}
                          {publication.year}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="mb-4">
                        <h4 className="text-base font-semibold mb-2 text-gray-800">Abstract</h4>
                        <p className="text-gray-700 leading-relaxed">{publication.abstract}</p>
                      </div>
                      
                      {publication.keywords.length > 0 && (
                        <div className="mb-6">
                          <h4 className="text-base font-semibold mb-2 text-gray-800">Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {publication.keywords.map((keyword, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 mt-6">
                        {publication.doi && (
                          <a
                            href={`https://doi.org/${publication.doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-white border border-primary-500 text-primary-600 rounded-md hover:bg-primary-50 transition-colors shadow-sm group"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:rotate-[-10deg]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                            View Publication
                          </a>
                        )}
                        
                        {publication.link && (
                          <a
                            href={publication.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm group"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:translate-y-[-2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            Download PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredPublications.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p className="text-xl text-gray-600">No publications found for this category.</p>
            </div>
          )}
        </section>
        
        {/* Citation Information */}
        <section className="mt-16 bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Citation Information</h2>
          <p className="mb-6 text-gray-700">
            If you'd like to cite my work in your research, please use the following formats:
          </p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 flex items-center">
                <span className="w-8 h-8 inline-flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mr-2 text-xs font-bold">APA</span>
                APA Format
              </h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="font-mono text-sm">
                  Ziarati, T., Hedayat, S., Moscatiello, C., Sappa, G., & Manganelli, M. (2024). Smart Sustainability: The AI-Driven Future of Renewable Energy. <em>IEEE International Conference on Environment and Electrical Engineering and IEEE Industrial and Commercial Power Systems Europe (EEEIC / ICPS Europe)</em>, 1-6.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 flex items-center">
                <span className="w-8 h-8 inline-flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mr-2 text-xs font-bold">MLA</span>
                MLA Format
              </h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="font-mono text-sm">
                  Ziarati, Tina, et al. "Smart Sustainability: The AI-Driven Future of Renewable Energy." <em>IEEE International Conference on Environment and Electrical Engineering and IEEE Industrial and Commercial Power Systems Europe</em>, 2024, pp. 1-6.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-800 flex items-center">
                <span className="w-8 h-8 inline-flex items-center justify-center bg-primary-100 text-primary-600 rounded-full mr-2 text-xs font-bold">CHI</span>
                Chicago Format
              </h3>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <p className="font-mono text-sm">
                  Ziarati, Tina, Sattar Hedayat, C. Moscatiello, G. Sappa, and M. Manganelli. "Smart Sustainability: The AI-Driven Future of Renewable Energy." <em>IEEE International Conference on Environment and Electrical Engineering and IEEE Industrial and Commercial Power Systems Europe (EEEIC / ICPS Europe)</em> (2024): 1-6.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center sm:justify-start flex-wrap gap-4">
            <p className="text-gray-700 mr-2">
              For citation metrics and additional publications, visit:
            </p>
            <a 
              href="https://scholar.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.242 13.769L4.5 16.5H1.5L5.845 5H8.204L12.5 16.5H9.5L8.807 13.769H5.242ZM7.031 8.065L5.897 11.469H8.147L7.031 8.065Z"/>
                <path d="M13.5 12.5H21.5V14H13.5V12.5Z"/>
                <path d="M13.5 9H21.5V10.5H13.5V9Z"/>
                <path d="M13.5 16H21.5V17.5H13.5V16Z"/>
              </svg>
              Google Scholar
            </a>
            <a 
              href="https://researchgate.net/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="h-5 w-5 mr-2 text-green-600" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.586 5.586L13.414 11.757L12 13.171L10.586 11.757L4.414 5.586L3 7L9.172 13.171L3 19.343L4.414 20.757L10.586 14.586L12 13.171L13.414 14.586L19.586 20.757L21 19.343L14.828 13.171L21 7L19.586 5.586Z"/>
              </svg>
              ResearchGate
            </a>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-xl text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white bg-[length:20px_20px]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
          
          <div className="relative">
            <h2 className="text-3xl font-bold mb-4 text-white">Interested in Collaboration?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-gray-300">
              I'm always open to research collaborations and discussions about sustainable building engineering,
              smart monitoring systems, and innovative approaches to infrastructure resilience.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-primary-600 text-white py-3 px-8 rounded-md font-semibold hover:bg-primary-700 transition-colors hover:shadow-lg hover:shadow-primary-600/25 group"
            >
              Get in Touch
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Publications;