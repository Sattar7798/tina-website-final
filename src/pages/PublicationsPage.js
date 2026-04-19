import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './Publications.css';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }
  })
};

const publications = [
  {
    id: 1,
    title:
      'Artificial Intelligence and Digital Twins for Bioclimatic Building Design: Innovations in Sustainability and Efficiency',
    authors: 'Filippova, E.; Hedayat, S.; Ziarati, T.; Manganelli, M.',
    journal: 'Energies',
    year: '2025',
    volume: 'Vol. 18, 5230',
    status: 'Published',
    type: 'journal',
    abstract:
      'This paper explores the integration of artificial intelligence and digital twin technologies in bioclimatic building design, demonstrating significant improvements in sustainability and energy efficiency outcomes through innovative computational approaches.',
    keywords: [
      'Artificial Intelligence',
      'Digital Twins',
      'Bioclimatic Design',
      'Sustainability',
      'Building Efficiency'
    ],
    doi: '10.3390/en18195230',
    featured: true,
    gradient: 'linear-gradient(135deg, #C08552 0%, #8C5A3C 100%)'
  },
  {
    id: 2,
    title:
      'A Physics-Informed Reinforcement Learning Framework for HVAC Optimization: Thermodynamically-Constrained Deep Deterministic Policy Gradients with Simulation-Based Validation',
    authors: 'Hedayat, S.; Ziarati, T.; Manganelli, M.',
    journal: 'Energies',
    year: '2025',
    volume: 'Vol. 18, 6310',
    status: 'Published',
    type: 'journal',
    abstract:
      'This research presents a physics-informed reinforcement learning framework for HVAC system optimization, incorporating thermodynamic constraints into deep deterministic policy gradients. The approach demonstrates significant energy savings while maintaining thermal comfort standards validated through simulation.',
    keywords: [
      'Reinforcement Learning',
      'HVAC Optimization',
      'Physics-Informed AI',
      'Building Energy',
      'Thermodynamics'
    ],
    doi: '10.3390/en18236310',
    featured: true,
    gradient: 'linear-gradient(135deg, #8C5A3C 0%, #4B2E2B 100%)'
  },
  {
    id: 3,
    title:
      "Iran's Seismic Puzzle: Bridging Gaps in Earthquake Emergency Planning and Public Awareness for Risk Reduction",
    authors: 'Ciampi, P.; Giannini, L. M.; Hedayat, S.; Ziarati, T.; Scarascia Mugnozza, G.',
    journal: 'Italian Journal of Engineering Geology and Environment',
    year: '2024',
    volume: '(1), 5–15',
    status: 'Published',
    type: 'journal',
    abstract:
      'This research focused on emergency planning and preparedness for seismic disasters in Iran, based on a comprehensive national survey. The study recommends a holistic, integrated, and participative strategy for earthquake risk reduction and enhanced public awareness.',
    keywords: [
      'Seismic Risk',
      'Emergency Planning',
      'Public Awareness',
      'Iran',
      'Risk Reduction',
      'Infrastructure Resilience'
    ],
    doi: '10.4408/IJEGE.2024-01.O-01',
    featured: true,
    gradient: 'linear-gradient(135deg, #6E4530 0%, #4B2E2B 100%)'
  },
  {
    id: 4,
    title: 'Overview of the Impact of Artificial Intelligence on the Future of Renewable Energy',
    authors: 'Ziarati, T.; Hedayat, S.; Moscatiello, C.; Sappa, G.; Manganelli, M.',
    journal: 'IEEE International Conference on Environment and Electrical Engineering (EEEIC) / ICPS Europe',
    year: '2024',
    volume: 'Proceedings',
    status: 'Published',
    type: 'conference',
    abstract:
      'This paper explores the potential for significant advancements in renewable energy by focusing on innovative technologies such as digital twins and smart cities. It demonstrates how incorporating artificial intelligence can unlock efficiency, maximize resource use, and propel the sustainable energy sector into a technologically advanced future.',
    keywords: [
      'Artificial Intelligence',
      'Renewable Energy',
      'Digital Twins',
      'Smart Cities',
      'Sustainability'
    ],
    doi: '10.1109/EEEIC/ICPSEurope61470.2024.10751553',
    featured: true,
    gradient: 'linear-gradient(135deg, #D4A06A 0%, #C08552 100%)'
  },
  {
    id: 5,
    title: 'Paper Reviewer — EEEIC 2025',
    authors: 'Tina Ziarati',
    journal: 'IEEE International Conference on Environment and Electrical Engineering (EEEIC) 2025',
    year: '2025',
    volume: 'Reviewer',
    status: 'Appointed',
    type: 'review',
    abstract:
      'Appointed to review and evaluate scholarly submissions for EEEIC 2025, focusing on sustainability, innovation, and engineering advancements in electrical engineering and environment.',
    keywords: ['Peer Review', 'Sustainability', 'Engineering', 'EEEIC 2025', 'Innovation'],
    doi: '',
    featured: false,
    gradient: 'linear-gradient(135deg, #4B2E2B 0%, #3A2220 100%)'
  }
];

const categories = [
  { id: 'all', label: 'All Output' },
  { id: 'journal', label: 'Journal Articles' },
  { id: 'conference', label: 'Conference Papers' },
  { id: 'review', label: 'Academic Service' }
];

const stats = [
  { value: '4', label: 'published papers' },
  { value: '2024–2025', label: 'current output window' },
  { value: '3', label: 'primary research directions' }
];

const themes = [
  'AI for building systems',
  'Digital twins and environmental performance',
  'Infrastructure resilience and risk reduction',
  'Renewable energy intelligence'
];

const profiles = [
  {
    name: 'Google Scholar',
    description: 'Citation metrics and publication record',
    icon: 'Scholar',
    href: 'https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AC6lMd8HTxSTGKBW0O3aR4lR2bmyhyAL2BgbT_1YhTUJa0L5AEQOpWykPpC5IT3ZcySfNE93tVdpxDG2CSUxhg&user=Ymfit90AAAAJ'
  },
  {
    name: 'ORCID',
    description: 'Persistent researcher identity and works',
    icon: 'ORCID',
    href: 'https://orcid.org/'
  },
  {
    name: 'ResearchGate',
    description: 'Research network and paper visibility',
    icon: 'RG',
    href: 'https://researchgate.net/'
  }
];

const getTypeLabel = (type) => {
  if (type === 'journal') return 'Journal Article';
  if (type === 'conference') return 'Conference Paper';
  return 'Academic Service';
};

const PublicationsPage = () => {
  const [filter, setFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(publications[0].id);

  const filteredPublications = useMemo(() => {
    return filter === 'all'
      ? publications
      : publications.filter((publication) => publication.type === filter);
  }, [filter]);

  const featuredPublication = filteredPublications[0] || publications[0];

  useEffect(() => {
    if (filteredPublications.length && !filteredPublications.some((publication) => publication.id === expandedId)) {
      setExpandedId(filteredPublications[0].id);
    }
  }, [expandedId, filteredPublications]);

  return (
    <motion.div
      className="publications-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <section className="pub-hero dark-section">
        <div className="pub-hero-grid-pattern"></div>
        <div className="pub-hero-glow pub-hero-glow-left"></div>
        <div className="pub-hero-glow pub-hero-glow-right"></div>

        <div className="container pub-hero-layout">
          <motion.div
            className="pub-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p
              className="section-label"
              style={{ color: 'var(--copper-light)' }}
              variants={fadeUp}
            >
              Academic Output
            </motion.p>
            <motion.h1 className="pub-hero-title" variants={fadeUp} custom={0.08}>
              Publications with
              <span className="pub-hero-accent"> stronger hierarchy and calmer rhythm.</span>
            </motion.h1>
            <motion.p className="pub-hero-subtitle" variants={fadeUp} custom={0.16}>
              A cleaner reading experience for papers, conference work, and academic service across
              sustainable building engineering, AI-driven systems, and infrastructure resilience.
            </motion.p>

            <motion.div className="pub-hero-stats" variants={fadeUp} custom={0.24}>
              {stats.map((item) => (
                <div key={item.label} className="pub-hero-stat">
                  <span className="pub-hero-stat-value">{item.value}</span>
                  <span className="pub-hero-stat-label">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.aside
            className="pub-hero-aside"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="pub-focus-card">
              <span className="pub-focus-label">Current emphasis</span>
              <h2>{featuredPublication.title}</h2>
              <p>{featuredPublication.abstract}</p>
              <div className="pub-focus-meta">
                <span>{featuredPublication.journal}</span>
                <span>{featuredPublication.year}</span>
              </div>
            </div>

            <div className="pub-theme-card">
              <span className="pub-focus-label">Research threads</span>
              <div className="pub-theme-list">
                {themes.map((theme) => (
                  <span key={theme}>{theme}</span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="pub-filter-section">
        <div className="container pub-filter-layout">
          <p className="pub-filter-copy">
            Filter by publication type and expand only the entries you want to read in depth.
          </p>
          <div className="pub-filter-bar">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`pub-filter-button ${filter === category.id ? 'active' : ''}`}
                onClick={() => setFilter(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pub-list-section">
        <div className="container pub-list-layout">
          <motion.aside
            className="pub-index-column"
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <span className="pub-column-label">Index</span>
            <div className="pub-index-list">
              {filteredPublications.map((publication) => (
                <button
                  key={publication.id}
                  type="button"
                  className={`pub-index-item ${expandedId === publication.id ? 'active' : ''}`}
                  onClick={() => setExpandedId(publication.id)}
                >
                  <span className="pub-index-year">{publication.year}</span>
                  <span className="pub-index-title">{publication.title}</span>
                </button>
              ))}
            </div>
          </motion.aside>

          <div className="pub-list-column">
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                className="pub-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >
                {filteredPublications.map((publication, index) => {
                  const expanded = expandedId === publication.id;

                  return (
                    <motion.article
                      key={publication.id}
                      className={`pub-sheet ${expanded ? 'expanded' : ''}`}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.52, delay: index * 0.05 }}
                    >
                      <div
                        className="pub-sheet-accent"
                        style={{ background: publication.gradient }}
                      ></div>

                      <div className="pub-sheet-body">
                        <div className="pub-sheet-topline">
                          <span className={`pub-type-pill pub-type-${publication.type}`}>
                            {getTypeLabel(publication.type)}
                          </span>
                          <span className="pub-sheet-year">{publication.year}</span>
                          <span className={`pub-status-pill pub-status-${publication.status.toLowerCase()}`}>
                            {publication.status}
                          </span>
                        </div>

                        <div className="pub-sheet-main">
                          <div className="pub-sheet-copy">
                            <h3>{publication.title}</h3>
                            <p className="pub-sheet-authors">{publication.authors}</p>
                            <p className="pub-sheet-venue">
                              <span>{publication.journal}</span>
                              <span>{publication.volume}</span>
                            </p>
                          </div>

                          <div className="pub-sheet-actions">
                            {publication.doi ? (
                              <a
                                href={`https://doi.org/${publication.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                              >
                                Open DOI
                              </a>
                            ) : (
                              <span className="pub-service-note">Academic service</span>
                            )}

                            <button
                              type="button"
                              className="pub-expand-button"
                              onClick={() => setExpandedId(expanded ? null : publication.id)}
                            >
                              {expanded ? 'Hide Details' : 'Read Abstract'}
                            </button>
                          </div>
                        </div>

                        <AnimatePresence>
                          {expanded && (
                            <motion.div
                              className="pub-sheet-expanded"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.28 }}
                            >
                              <p className="pub-sheet-abstract">{publication.abstract}</p>
                              <div className="pub-sheet-bottom">
                                <div className="pub-sheet-tags">
                                  {publication.keywords.map((keyword) => (
                                    <span key={keyword} className="tag">
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                                {publication.doi && (
                                  <span className="pub-sheet-doi">DOI: {publication.doi}</span>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="pub-profiles-section dark-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-label" style={{ color: 'var(--copper-light)' }}>
              Find My Work Online
            </p>
            <h2 style={{ color: 'var(--cream)' }}>Academic Profiles</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="pub-profiles-grid">
            {profiles.map((profile, index) => (
              <motion.a
                key={profile.name}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pub-profile-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.58, delay: index * 0.07 }}
              >
                <span className="pub-profile-icon">{profile.icon}</span>
                <span className="pub-profile-name">{profile.name}</span>
                <span className="pub-profile-description">{profile.description}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="pub-cta-section">
        <div className="container pub-cta-card">
          <div>
            <p className="section-label">Collaboration</p>
            <h2>Interested in research collaboration?</h2>
            <p>
              I am open to collaborations in sustainable building engineering, AI applications,
              BIM coordination, and infrastructure resilience.
            </p>
          </div>
          <div className="pub-cta-actions">
            <Link to="/contact" className="btn">
              Get in Touch
            </Link>
            <Link to="/research" className="btn btn-outline">
              View Research
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PublicationsPage;
