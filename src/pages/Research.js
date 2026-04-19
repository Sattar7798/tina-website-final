import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Research.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }
  })
};

const researchAreas = [
  {
    id: 'bim',
    label: '01 / Coordination',
    shortTitle: 'BIM & delivery intelligence',
    title: 'BIM Coordination & Constructability',
    summary:
      'Using BIM as a decision layer for complex architectural delivery, from multidisciplinary coordination and clash detection to information structures that keep design intent clear through execution.',
    note:
      'This track is strongest when architecture, structure, and systems teams need one shared model logic instead of parallel disconnected documentation.',
    metrics: [
      { value: '2', label: 'project anchors' },
      { value: '1', label: 'linked publication' },
      { value: '3', label: 'core platforms' }
    ],
    questions: [
      'How can a model reduce coordination friction before issues reach site?',
      'What information structure supports cleaner collaboration across disciplines?',
      'How can BIM stay legible for both design development and execution teams?'
    ],
    applications: [
      'Historic warehouse conversion in Rieti',
      'Research and technology building in Tehran',
      'Infrastructure coordination with large multidisciplinary teams'
    ],
    tools: ['Revit', 'Navisworks', 'AutoCAD', 'shared parameters'],
    gradient: 'linear-gradient(135deg, #C08552 0%, #8C5A3C 100%)'
  },
  {
    id: 'ai',
    label: '02 / Intelligence',
    shortTitle: 'AI for sustainable systems',
    title: 'AI in Sustainable Building Engineering',
    summary:
      'Exploring how digital twins, reinforcement learning, and data-informed simulation can improve energy efficiency, HVAC performance, and environmental decision-making in buildings.',
    note:
      'The goal is not technology for its own sake, but operational intelligence that improves comfort, lowers waste, and makes sustainability measurable.',
    metrics: [
      { value: '3', label: 'published outputs' },
      { value: '2024', label: 'research ramp-up' },
      { value: '2', label: 'major AI themes' }
    ],
    questions: [
      'How can AI augment environmental design without losing engineering rigor?',
      'What can digital twins reveal earlier than conventional workflows?',
      'How should thermodynamic constraints shape learning-based optimization?'
    ],
    applications: [
      'Bioclimatic building design research',
      'Physics-informed HVAC optimization',
      'AI and renewable energy systems studies'
    ],
    tools: ['digital twins', 'simulation', 'RL frameworks', 'energy analytics'],
    gradient: 'linear-gradient(135deg, #8C5A3C 0%, #4B2E2B 100%)'
  },
  {
    id: 'resilience',
    label: '03 / Resilience',
    shortTitle: 'Infrastructure and risk systems',
    title: 'Infrastructure Resilience & Risk Reduction',
    summary:
      'Researching seismic preparedness, emergency planning, and public-awareness systems that connect technical engineering knowledge with actionable resilience strategies.',
    note:
      'This work is focused on the gap between what experts know and what communities, institutions, and decision-makers can actually use during risk planning.',
    metrics: [
      { value: '1', label: 'survey-based paper' },
      { value: '1', label: 'national-scale topic' },
      { value: '3', label: 'resilience lenses' }
    ],
    questions: [
      'Where do planning systems fail before a disaster occurs?',
      'How can technical risk communication become more public-facing?',
      'What kinds of integrated strategies reduce vulnerability at scale?'
    ],
    applications: [
      'Earthquake emergency planning analysis',
      'Public-awareness and preparedness research',
      'Systems thinking for infrastructure resilience'
    ],
    tools: ['risk mapping', 'survey analysis', 'policy framing', 'system integration'],
    gradient: 'linear-gradient(135deg, #6E4530 0%, #4B2E2B 100%)'
  },
  {
    id: 'heritage',
    label: '04 / Preservation',
    shortTitle: 'Heritage-sensitive intervention',
    title: 'Heritage-Sensitive Design Strategy',
    summary:
      'Balancing contemporary performance targets with cultural continuity through design methods that respect existing fabric, local identity, and architectural memory.',
    note:
      'This area bridges research and practice most directly because it requires both analytical discipline and design sensitivity in every decision.',
    metrics: [
      { value: '2', label: 'built contexts' },
      { value: 'Italy', label: 'active setting' },
      { value: '1', label: 'design principle' }
    ],
    questions: [
      'How can renovation preserve identity without freezing a building in time?',
      'Which interventions add value without erasing context?',
      'How should historic constraints reshape technical decision-making?'
    ],
    applications: [
      'Warehouse-to-residential adaptive reuse',
      'Context-aware renovation workflows',
      'Technical documentation for sensitive urban settings'
    ],
    tools: ['survey workflows', 'documentation', 'renovation detailing', 'fire safety'],
    gradient: 'linear-gradient(135deg, #D4A06A 0%, #C08552 100%)'
  }
];

const methodology = [
  {
    id: 'frame',
    number: '01',
    title: 'Frame the performance question',
    description:
      'Each study starts by identifying the environmental, operational, or coordination problem that actually matters for a building, not just what is easy to simulate.'
  },
  {
    id: 'model',
    number: '02',
    title: 'Model the system with discipline',
    description:
      'Digital models are treated as structured evidence: geometry, data, constraints, and relationships must all remain legible enough to support decisions.'
  },
  {
    id: 'test',
    number: '03',
    title: 'Test alternatives across scenarios',
    description:
      'Design options, climate conditions, system responses, and implementation pathways are compared iteratively so tradeoffs become visible early.'
  },
  {
    id: 'translate',
    number: '04',
    title: 'Translate findings into practice',
    description:
      'The output is only complete when it can inform documentation, collaboration, sustainability strategy, or a clearer next design move.'
  }
];

const workflow = [
  {
    phase: 'Question',
    title: 'Define ambition and constraints',
    description:
      'Set measurable targets around comfort, coordination quality, resilience, or environmental performance.'
  },
  {
    phase: 'Simulation',
    title: 'Build the analytical layer',
    description:
      'Connect geometry, data, and system behavior so the design can be tested rather than only described.'
  },
  {
    phase: 'Validation',
    title: 'Compare evidence and iterate',
    description:
      'Review multiple options, pressure-test assumptions, and refine what should move forward.'
  },
  {
    phase: 'Application',
    title: 'Embed the result in real work',
    description:
      'Carry the insight into BIM delivery, sustainability strategy, technical coordination, or publication.'
  }
];

const featuredPublications = [
  {
    title:
      'Artificial Intelligence and Digital Twins for Bioclimatic Building Design: Innovations in Sustainability and Efficiency',
    journal: 'Energies',
    year: '2025',
    category: 'Journal Article',
    summary:
      'Investigates how AI and digital twins can improve bioclimatic design decisions and raise measurable sustainability performance.',
    tags: ['AI', 'Digital Twins', 'Bioclimatic Design'],
    doi: '10.3390/en18195230',
    gradient: 'linear-gradient(135deg, #C08552 0%, #8C5A3C 100%)'
  },
  {
    title:
      'A Physics-Informed Reinforcement Learning Framework for HVAC Optimization',
    journal: 'Energies',
    year: '2025',
    category: 'Journal Article',
    summary:
      'Develops a thermodynamically constrained RL framework for HVAC optimization, combining simulation validation with energy-performance logic.',
    tags: ['Reinforcement Learning', 'HVAC', 'Optimization'],
    doi: '10.3390/en18236310',
    gradient: 'linear-gradient(135deg, #8C5A3C 0%, #4B2E2B 100%)'
  },
  {
    title:
      "Iran's Seismic Puzzle: Bridging Gaps in Earthquake Emergency Planning and Public Awareness for Risk Reduction",
    journal: 'Italian Journal of Engineering Geology and Environment',
    year: '2024',
    category: 'Journal Article',
    summary:
      'Examines resilience through emergency planning and public-awareness systems, arguing for a more integrated and participative risk-reduction strategy.',
    tags: ['Seismic Risk', 'Planning', 'Resilience'],
    doi: '10.4408/IJEGE.2024-01.O-01',
    gradient: 'linear-gradient(135deg, #6E4530 0%, #4B2E2B 100%)'
  },
  {
    title:
      'Overview of the Impact of Artificial Intelligence on the Future of Renewable Energy',
    journal: 'IEEE EEEIC / ICPS Europe',
    year: '2024',
    category: 'Conference Paper',
    summary:
      'Positions AI, digital twins, and smart-city thinking as practical levers for a more responsive and efficient renewable-energy ecosystem.',
    tags: ['Renewable Energy', 'AI', 'Smart Cities'],
    doi: '10.1109/EEEIC/ICPSEurope61470.2024.10751553',
    gradient: 'linear-gradient(135deg, #D4A06A 0%, #C08552 100%)'
  }
];

const researchImpact = [
  {
    title: 'From theory to project delivery',
    description:
      'Research insights are translated into documentation logic, BIM coordination, and performance-led architectural decision-making.'
  },
  {
    title: 'Multi-scale thinking',
    description:
      'The work spans room-scale environmental systems, building-wide digital workflows, and infrastructure resilience questions.'
  },
  {
    title: 'Design with evidence',
    description:
      'The common thread is disciplined experimentation: test, compare, and make visible why one design move performs better than another.'
  }
];

const Research = () => {
  const [activeAreaId, setActiveAreaId] = useState(researchAreas[0].id);
  const activeArea = researchAreas.find((area) => area.id === activeAreaId) || researchAreas[0];

  return (
    <motion.div
      className="research-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <section className="research-hero-section dark-section">
        <div className="research-hero-grid-pattern"></div>
        <div className="research-hero-glow research-hero-glow-left"></div>
        <div className="research-hero-glow research-hero-glow-right"></div>

        <div className="container research-hero-grid">
          <motion.div
            className="research-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              className="section-label"
              style={{ color: 'var(--copper-light)' }}
              variants={fadeUp}
              custom={0}
            >
              Research Direction
            </motion.p>

            <motion.h1 className="research-hero-title" variants={fadeUp} custom={0.08}>
              Research that turns
              <span className="research-hero-title-accent"> building intelligence into design decisions.</span>
            </motion.h1>

            <motion.p className="research-hero-lead" variants={fadeUp} custom={0.16}>
              My work focuses on how digital coordination, environmental intelligence, and
              systems thinking can produce buildings and infrastructure that are more
              resilient, more efficient, and more responsible to context.
            </motion.p>

            <motion.div className="research-hero-actions" variants={fadeUp} custom={0.24}>
              <Link to="/publications" className="btn">
                View Publications
              </Link>
              <Link to="/contact" className="btn btn-outline research-hero-outline">
                Research Collaboration
              </Link>
            </motion.div>

            <motion.div className="research-hero-stats" variants={fadeUp} custom={0.32}>
              <div className="research-hero-stat">
                <span className="research-hero-stat-value">4</span>
                <span className="research-hero-stat-label">published papers</span>
              </div>
              <div className="research-hero-stat">
                <span className="research-hero-stat-value">3</span>
                <span className="research-hero-stat-label">active research clusters</span>
              </div>
              <div className="research-hero-stat">
                <span className="research-hero-stat-value">2</span>
                <span className="research-hero-stat-label">practice-to-academia directions</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="research-hero-aside"
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="research-hero-card">
              <p className="research-card-eyebrow">Current emphasis</p>
              <h2>Applied research for real building systems</h2>
              <p>
                The through-line is consistent: combine technical rigor with design clarity so
                research outcomes are usable in practice, not isolated from it.
              </p>
              <div className="research-hero-card-tags">
                <span>AI for energy systems</span>
                <span>BIM coordination</span>
                <span>Seismic preparedness</span>
                <span>Context-sensitive renovation</span>
              </div>
            </div>

            <div className="research-orbit-card">
              <p className="research-card-eyebrow">Live themes</p>
              <div className="research-orbit">
                <div className="research-orbit-core">Built Environment</div>
                {researchAreas.map((area, index) => (
                  <span
                    key={area.id}
                    className={`research-orbit-node research-orbit-node-${index + 1}`}
                    style={{ '--node-gradient': area.gradient }}
                  >
                    {area.shortTitle}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="research-focus-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Research Focus</p>
            <h2>An editorial view of the work</h2>
            <div className="section-divider"></div>
            <p>
              The research page now reads as a structured narrative: each area has a clear
              question, application range, and practical consequence.
            </p>
          </motion.div>

          <div className="research-focus-layout">
            <div className="research-focus-nav">
              {researchAreas.map((area, index) => (
                <motion.button
                  key={area.id}
                  type="button"
                  className={`research-focus-trigger ${activeAreaId === area.id ? 'active' : ''}`}
                  onClick={() => setActiveAreaId(area.id)}
                  style={{ '--focus-gradient': area.gradient }}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <span className="research-focus-trigger-label">{area.label}</span>
                  <span className="research-focus-trigger-title">{area.title}</span>
                  <span className="research-focus-trigger-note">{area.shortTitle}</span>
                </motion.button>
              ))}
            </div>

            <motion.article
              key={activeArea.id}
              className="research-focus-panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ '--panel-gradient': activeArea.gradient }}
            >
              <div className="research-focus-panel-header">
                <span className="research-focus-pill">{activeArea.label}</span>
                <h3>{activeArea.title}</h3>
                <p>{activeArea.summary}</p>
              </div>

              <div className="research-focus-metrics">
                {activeArea.metrics.map((metric) => (
                  <div key={metric.label} className="research-focus-metric">
                    <span className="research-focus-metric-value">{metric.value}</span>
                    <span className="research-focus-metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="research-focus-columns">
                <div className="research-focus-block">
                  <span className="research-focus-block-label">Core questions</span>
                  <ul>
                    {activeArea.questions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="research-focus-block">
                  <span className="research-focus-block-label">Applied in</span>
                  <ul>
                    {activeArea.applications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="research-focus-footer">
                <div className="research-focus-tools">
                  {activeArea.tools.map((tool) => (
                    <span key={tool} className="tag">
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="research-focus-note">{activeArea.note}</p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="research-method-section dark-section">
        <div className="container research-method-layout">
          <motion.div
            className="research-method-intro"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75 }}
          >
            <p className="section-label" style={{ color: 'var(--copper-light)' }}>
              Methodology
            </p>
            <h2>Measured experimentation, not abstract speculation.</h2>
            <div className="section-divider research-method-divider"></div>
            <p className="research-method-copy">
              Research methods need to stay elegant enough for communication and rigorous enough
              for engineering. The workflow below keeps both sides in view.
            </p>

            <div className="research-workflow">
              {workflow.map((item) => (
                <div key={item.phase} className="research-workflow-item">
                  <span className="research-workflow-phase">{item.phase}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="research-method-grid">
            {methodology.map((item, index) => (
              <motion.article
                key={item.id}
                className="research-method-card"
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <span className="research-method-card-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="research-output-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Selected Outputs</p>
            <h2>Recent publications with a clearer visual hierarchy</h2>
            <div className="section-divider"></div>
            <p>
              Instead of the older generic project cards, this section foregrounds the actual
              academic output and lets readers move directly to the publication record.
            </p>
          </motion.div>

          <div className="research-output-grid">
            {featuredPublications.map((publication, index) => (
              <motion.article
                key={publication.title}
                className="research-output-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
              >
                <div
                  className="research-output-card-accent"
                  style={{ background: publication.gradient }}
                ></div>
                <div className="research-output-card-body">
                  <div className="research-output-card-meta">
                    <span className="research-output-type">{publication.category}</span>
                    <span className="research-output-year">{publication.year}</span>
                  </div>
                  <h3>{publication.title}</h3>
                  <p className="research-output-journal">{publication.journal}</p>
                  <p className="research-output-summary">{publication.summary}</p>

                  <div className="research-output-tags">
                    {publication.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="research-output-actions">
                    <a
                      href={`https://doi.org/${publication.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline research-output-link"
                    >
                      Open DOI
                    </a>
                    <Link to="/publications" className="research-output-inline-link">
                      See full list
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="research-impact-section dark-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label" style={{ color: 'var(--copper-light)' }}>
              Why It Matters
            </p>
            <h2 style={{ color: 'var(--cream)' }}>Research that stays usable in practice</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="research-impact-grid">
            {researchImpact.map((item, index) => (
              <motion.article
                key={item.title}
                className="research-impact-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="research-cta-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.12 }}
          >
            <div>
              <p className="section-label" style={{ color: 'var(--copper-light)' }}>
                Collaboration
              </p>
              <h3>Looking for research, publication, or applied design collaboration?</h3>
              <p>
                I am open to collaborations in sustainable building engineering, BIM-enabled
                delivery, AI-informed environmental systems, and resilience-focused research.
              </p>
            </div>
            <div className="research-cta-actions">
              <Link to="/contact" className="btn">
                Start a Conversation
              </Link>
              <Link to="/portfolio" className="btn btn-outline research-hero-outline">
                View Practice Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Research;
