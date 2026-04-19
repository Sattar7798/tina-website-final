import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Portfolio.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }
  })
};

const projects = [
  {
    id: 1,
    title: 'Blasetti',
    subtitle: 'Historic Warehouse Residential Conversion',
    category: 'heritage',
    location: 'Rieti, Italy',
    year: '2025 – Present',
    employer: 'Emanuela Biscetti Studio',
    tags: ['Heritage Renovation', 'Full Lifecycle', 'Revit', 'AutoCAD'],
    description:
      'Full renovation of a historic warehouse into a modern residential unit in a culturally sensitive area, from site survey through design and on-site execution.',
    details: [
      'Full lifecycle management from site survey to execution',
      'Adaptive reuse of a historic warehouse into residential space',
      'Preservation of structural heritage values with contemporary standards',
      'Technical documentation, 2D/3D modeling, and fire safety drawings'
    ],
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #C08552 0%, #8C5A3C 100%)',
    layout: 'featured'
  },
  {
    id: 2,
    title: 'San Paolo',
    subtitle: 'Student Dormitory',
    category: 'residential',
    location: 'Rieti, Italy',
    year: '2025 – Present',
    employer: 'Emanuela Biscetti Studio',
    tags: ['Residential', 'Interior Design', 'Fire Safety', 'Revit'],
    description:
      'Architectural and interior design for a student dormitory in Rieti, including spatial layout, interior detailing, and technical documentation.',
    details: [
      'Full architectural and interior design development',
      'Revit and AutoCAD workflow across project phases',
      'Interior detailing and fire safety documentation',
      'Residential planning focused on student living quality'
    ],
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #D4A06A 0%, #C08552 100%)',
    layout: 'tall'
  },
  {
    id: 3,
    title: 'Cinque Confini',
    subtitle: 'Commercial Complex — Terminillo',
    category: 'commercial',
    location: 'Terminillo, Italy',
    year: '2025 – Present',
    employer: 'Emanuela Biscetti Studio',
    tags: ['Commercial', 'Interior Design', 'Mountain Architecture', '2D/3D'],
    description:
      'Architectural and interior design of a gym and cafe complex adjacent to an athletics track in the mountain landscape of Terminillo.',
    details: [
      'Gym and cafe complex in a mountain context',
      '2D/3D architectural development and interior design',
      'Context-sensitive design for a highland site',
      'Documentation built through Revit and AutoCAD'
    ],
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1431576901776-e539bd916ba2?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #8C5A3C 0%, #4B2E2B 100%)',
    layout: 'wide'
  },
  {
    id: 4,
    title: 'Vardavard Technology Park',
    subtitle: 'Research & Technology Building',
    category: 'bim',
    location: 'West Tehran, Iran',
    year: '2023 – 2025',
    employer: 'Peyvand Baft Pars',
    tags: ['BIM', '10-Story', 'Revit', '4D/5D BIM', 'Seismic Integration'],
    description:
      'Co-led architectural design and BIM coordination for a 10-story multi-tenant research and technology building with advanced data integration.',
    details: [
      'Architectural design for a dual-tenant R&T building',
      'Revit models with shared parameters and detailed documentation',
      '4D/5D integration with cost, schedule, and seismic data',
      'Coordinated delivery handed directly to the client'
    ],
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #6E4530 0%, #4B2E2B 100%)',
    layout: 'featured'
  },
  {
    id: 5,
    title: 'Social Housing & Urban Planning',
    subtitle: 'Large-Scale Residential Project',
    category: 'residential',
    location: 'Rieti, Italy',
    year: '2024 – 2025',
    employer: 'Sapienza University (Academic)',
    tags: ['Social Housing', 'Urban Design', 'Sustainability', 'Community'],
    description:
      'Large-scale social housing design centered on sustainability, urban cohesion, and community-focused residential planning.',
    details: [
      'Large-scale housing strategy shaped by community needs',
      'Urban planning integrated with architectural design',
      'Revit and AutoCAD models plus site planning studies',
      'Academic work grounded in sustainability and cohesion'
    ],
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #C08552 0%, #6E4530 100%)',
    layout: 'standard'
  },
  {
    id: 6,
    title: 'Via Salaria & AMA Roma',
    subtitle: 'Infrastructure BIM Coordination',
    category: 'bim',
    location: 'Rome, Italy',
    year: '2025 – Present',
    employer: 'SPERI S.p.A',
    tags: ['Infrastructure BIM', 'Navisworks', 'Clash Detection', 'Road Infrastructure'],
    description:
      'BIM coordination support across major infrastructure projects, focused on model quality, clash detection, and multidisciplinary collaboration.',
    details: [
      'Infrastructure BIM support for strategic road and systems work',
      'Navisworks clash detection and resolution',
      'Coordination within multidisciplinary project environments',
      'Modeling and systems support for AMA Roma and Via Salaria'
    ],
    image:
      'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #3A2220 0%, #4B2E2B 100%)',
    layout: 'wide'
  },
  {
    id: 7,
    title: 'Cinque Fonti',
    subtitle: 'Historic Fountain Renovation',
    category: 'heritage',
    location: 'Amandola, Italy',
    year: '2025',
    employer: 'Emanuela Biscetti Studio',
    tags: ['Heritage', 'Historic Renovation', 'Architectural Design'],
    description:
      'Architectural design for the renovation of a historic fountain, balancing conservation values with contemporary intervention logic.',
    details: [
      'Historic fountain renovation concept',
      'Conservation-aware design development',
      'Technical documentation prepared for approval',
      'Careful balance between preservation and functional update'
    ],
    image:
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1200&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #D4A06A 0%, #8C5A3C 100%)',
    layout: 'standard'
  },
  {
    id: 8,
    title: 'Marale',
    subtitle: 'Hair Salon Historic Renovation',
    category: 'commercial',
    location: 'Italy',
    year: '2025',
    employer: 'Emanuela Biscetti Studio',
    tags: ['Commercial', 'Interior Design', 'Heritage Preservation'],
    description:
      'Renovation and interior design of a salon space that preserves historical identity while establishing a refined contemporary commercial atmosphere.',
    details: [
      'Commercial interior renovation in a heritage setting',
      'Material and spatial choices respectful of context',
      'Contemporary functional update without losing character',
      'Interior-led transformation with preservation logic'
    ],
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    detailImage:
      'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=1200&q=80',
    accent: 'linear-gradient(135deg, #C08552 0%, #4B2E2B 100%)',
    layout: 'tall'
  }
];

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'bim', label: 'BIM' },
  { id: 'heritage', label: 'Heritage' },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' }
];

const stats = [
  { value: '8', label: 'selected models' },
  { value: '4', label: 'project typologies' },
  { value: 'Italy + Iran', label: 'contexts' }
];

const Portfolio = () => {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);

  const filteredProjects = useMemo(() => {
    return filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter);
  }, [filter]);

  const selectedProject =
    selectedId === null
      ? null
      : filteredProjects.find((project) => project.id === selectedId) ||
        projects.find((project) => project.id === selectedId) ||
        null;

  useEffect(() => {
    if (selectedId !== null && !filteredProjects.some((project) => project.id === selectedId)) {
      setSelectedId(null);
    }
  }, [filteredProjects, selectedId]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedId(null);
      }
    };

    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <motion.div
      className="portfolio-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <section className="portfolio-hero dark-section">
        <div className="portfolio-hero-grid-pattern"></div>
        <div className="portfolio-hero-glow portfolio-hero-glow-left"></div>
        <div className="portfolio-hero-glow portfolio-hero-glow-right"></div>

        <div className="container portfolio-hero-layout">
          <motion.div
            className="portfolio-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p
              className="section-label"
              style={{ color: 'var(--copper-light)' }}
              variants={fadeUp}
            >
              Selected Work
            </motion.p>
            <motion.h1 className="portfolio-hero-title" variants={fadeUp} custom={0.08}>
              A portfolio designed
              <span className="portfolio-hero-accent"> for the images to lead.</span>
            </motion.h1>
            <motion.p className="portfolio-hero-subtitle" variants={fadeUp} custom={0.16}>
              This page is intentionally quieter. The layout is built so your future renders can
              dominate the experience while the project names and essential context stay precise and restrained.
            </motion.p>
            <motion.div className="portfolio-hero-stats" variants={fadeUp} custom={0.24}>
              {stats.map((item) => (
                <div key={item.label} className="portfolio-hero-stat">
                  <span className="portfolio-hero-stat-value">{item.value}</span>
                  <span className="portfolio-hero-stat-label">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="portfolio-hero-preview"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portfolio-hero-preview-frame">
              <img src={projects[3].image} alt={projects[3].title} />
              <div className="portfolio-hero-preview-overlay">
                <span className="portfolio-hero-preview-label">Current spotlight</span>
                <h2>{projects[3].title}</h2>
                <p>{projects[3].subtitle}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="portfolio-filter-section">
        <div className="container portfolio-filter-layout">
          <p className="portfolio-filter-copy">
            Curated models and project studies. Placeholder photography for now, ready to be replaced by your renders.
          </p>
          <div className="portfolio-filter-bar">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`portfolio-filter-button ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-gallery-section">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="portfolio-gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {filteredProjects.map((project, index) => (
                <motion.button
                  key={project.id}
                  type="button"
                  className={`portfolio-tile portfolio-tile-${project.layout}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedId(project.id)}
                >
                  <img
                    className="portfolio-tile-image"
                    src={project.image}
                    alt={`${project.title} placeholder architectural view`}
                  />
                  <div className="portfolio-tile-overlay"></div>
                  <div
                    className="portfolio-tile-accent"
                    style={{ background: project.accent }}
                  ></div>
                  <div className="portfolio-tile-meta-top">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <div className="portfolio-tile-caption">
                    <h3>{project.title}</h3>
                    <p>{project.subtitle}</p>
                    <span className="portfolio-tile-location">{project.location}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="portfolio-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              className="portfolio-lightbox-panel"
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 36, scale: 0.98 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="portfolio-lightbox-visuals">
                <div className="portfolio-lightbox-main">
                  <img
                    src={selectedProject.image}
                    alt={`${selectedProject.title} primary placeholder view`}
                  />
                </div>
                <div className="portfolio-lightbox-secondary">
                  <img
                    src={selectedProject.detailImage}
                    alt={`${selectedProject.title} secondary placeholder view`}
                  />
                </div>
              </div>

              <div className="portfolio-lightbox-content">
                <button
                  type="button"
                  className="portfolio-lightbox-close"
                  onClick={() => setSelectedId(null)}
                  aria-label="Close portfolio detail"
                >
                  Close
                </button>

                <div className="portfolio-lightbox-header">
                  <span
                    className="portfolio-lightbox-category"
                    style={{ background: selectedProject.accent }}
                  >
                    {selectedProject.category}
                  </span>
                  <span className="portfolio-lightbox-year">{selectedProject.year}</span>
                </div>

                <h2>{selectedProject.title}</h2>
                <p className="portfolio-lightbox-subtitle">{selectedProject.subtitle}</p>
                <p className="portfolio-lightbox-description">{selectedProject.description}</p>

                <div className="portfolio-lightbox-info">
                  <div>
                    <span className="portfolio-info-label">Location</span>
                    <span className="portfolio-info-value">{selectedProject.location}</span>
                  </div>
                  <div>
                    <span className="portfolio-info-label">Role / Context</span>
                    <span className="portfolio-info-value">{selectedProject.employer}</span>
                  </div>
                </div>

                <div className="portfolio-lightbox-tags">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="portfolio-lightbox-details">
                  {selectedProject.details.map((detail) => (
                    <p key={detail}>{detail}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Portfolio;
