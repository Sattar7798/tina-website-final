import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WaveHero from '../components/WaveHero';
import './Home.css';

/* ── Animation variants ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: d, ease: [0.16, 1, 0.3, 1] }
  })
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
};

/* ── Stats counter ──────────────────────────────────────── */
const useCounter = (target, duration = 1600) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = () => {
      start += target / (duration / 16);
      setCount(Math.min(Math.round(start), target));
      if (start < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
};

const StatItem = ({ value, suffix, label }) => {
  const { count, ref } = useCounter(value);
  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

/* ── Expertise pills ────────────────────────────────────── */
const skills = [
  'BIM Coordination', 'Revit (Advanced)', 'Navisworks',
  'Clash Detection', 'AutoCAD', 'Rhinoceros',
  'AI-Assisted Rendering', 'Sustainable Design',
  'Heritage Renovation', 'Acca Primus',
];

/* ── Projects preview ───────────────────────────────────── */
const featuredProjects = [
  {
    id: 1,
    title: 'Blasetti',
    tag: 'Heritage Renovation',
    desc: 'Historic warehouse converted into a modern residential unit in a culturally sensitive zone — full lifecycle from survey to execution.',
    year: '2025',
    gradient: 'linear-gradient(135deg, #C08552 0%, #8C5A3C 100%)',
  },
  {
    id: 2,
    title: 'Vardavard Technology Park',
    tag: 'BIM · High-Rise',
    desc: '10-story multi-tenant R&T building in Tehran — full architectural design, Revit modeling with 4D/5D BIM integration.',
    year: '2023–2025',
    gradient: 'linear-gradient(135deg, #8C5A3C 0%, #4B2E2B 100%)',
  },
  {
    id: 3,
    title: 'San Paolo Dormitory',
    tag: 'Architectural Design',
    desc: 'Student dormitory in Rieti — complete 2D/3D design, interior detailing, fire safety documentation.',
    year: '2025',
    gradient: 'linear-gradient(135deg, #D4A06A 0%, #C08552 100%)',
  },
];

/* ── Research areas ─────────────────────────────────────── */
const researchAreas = [
  { icon: '🏗️', title: 'BIM & Digital Coordination', desc: 'Revit, Navisworks, clash detection and resolution across complex multidisciplinary projects.' },
  { icon: '🤖', title: 'AI in Sustainable Engineering', desc: 'Physics-informed RL, digital twins, and AI-driven optimization for energy and building systems.' },
  { icon: '🌍', title: 'Infrastructure Resilience', desc: 'Seismic risk reduction, emergency planning, and smart monitoring systems.' },
  { icon: '🏛️', title: 'Heritage-Sensitive Design', desc: 'Architectural renovation that preserves cultural identity while achieving modern standards.' },
];

/* ── Component ──────────────────────────────────────────── */
const Home = () => {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >

      {/* ══ HERO ═══════════════════════════════════════════ */}
      <section className="hero-section">
        {/* Three.js canvas */}
        <div className="hero-canvas">
          <WaveHero />
        </div>

        {/* Gradient overlays */}
        <div className="hero-overlay-bottom"></div>
        <div className="hero-overlay-left"></div>

        {/* Content */}
        <div className="hero-content-wrap">
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={stagger}>
            <motion.p className="hero-eyebrow" variants={fadeUp} custom={0}>
              BIM Engineer · Architectural Designer
            </motion.p>

            <motion.h1 className="hero-title" variants={fadeUp} custom={0.1}>
              Tina<br />
              <span className="hero-title-accent">Ziarati</span>
            </motion.h1>

            <motion.p className="hero-subtitle" variants={fadeUp} custom={0.25}>
              Delivering full-cycle architectural and BIM design across residential, commercial,
              and heritage-sensitive projects in Italy — with expertise in Revit, Navisworks, and AI-assisted workflows.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp} custom={0.4}>
              <Link to="/portfolio" className="btn">View Portfolio</Link>
              <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
            </motion.div>

            <motion.div className="hero-location" variants={fadeUp} custom={0.5}>
              <span className="location-dot"></span>
              <span>Rieti, Italy · Open to collaboration</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <span className="scroll-line"></span>
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════ */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatItem value={7} suffix="+" label="Years of Experience" />
            <StatItem value={10} suffix="+" label="Projects Delivered" />
            <StatItem value={4} suffix="" label="Research Publications" />
            <StatItem value={2} suffix="nd" label="Ranked in BSc Class" />
          </div>
        </div>
      </section>

      {/* ══ SKILLS STRIP ═══════════════════════════════════ */}
      <section className="skills-strip-section">
        <div className="skills-strip-inner">
          <p className="skills-strip-label">Core Expertise</p>
          <div className="skills-track">
            {[...skills, ...skills].map((s, i) => (
              <span key={i} className="skill-pill">{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECTS ══════════════════════════════ */}
      <section className="featured-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Selected Work</p>
            <h2>Featured Projects</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="projects-grid">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.id}
                className="project-card-home"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
              >
                <div className="project-card-visual" style={{ background: p.gradient }}>
                  <div className="project-card-overlay"></div>
                  <div className="project-card-year">{p.year}</div>
                </div>
                <div className="project-card-body">
                  <span className="project-card-tag">{p.tag}</span>
                  <h3 className="project-card-title">{p.title}</h3>
                  <p className="project-card-desc">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="section-cta">
            <Link to="/portfolio" className="btn btn-outline">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* ══ RESEARCH AREAS ═════════════════════════════════ */}
      <section className="research-overview-section dark-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label" style={{ color: 'var(--copper-light)' }}>Research &amp; Publications</p>
            <h2 style={{ color: 'var(--cream)' }}>Areas of Focus</h2>
            <div className="section-divider"></div>
          </motion.div>

          <div className="research-areas-grid">
            {researchAreas.map((area, i) => (
              <motion.div
                key={i}
                className="research-area-tile"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <span className="area-icon">{area.icon}</span>
                <h4 className="area-title">{area.title}</h4>
                <p className="area-desc">{area.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="section-cta" style={{ marginTop: '3rem' }}>
            <Link to="/research" className="btn btn-outline" style={{ borderColor: 'var(--copper)', color: 'var(--copper)' }}>
              Explore Research
            </Link>
            <Link to="/publications" className="btn" style={{ marginLeft: '1rem' }}>
              Publications
            </Link>
          </div>
        </div>
      </section>

      {/* ══ ABOUT TEASER ═══════════════════════════════════ */}
      <section className="about-teaser-section">
        <div className="container about-teaser-grid">
          <motion.div
            className="about-teaser-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label">About Me</p>
            <h2>Engineering Meets<br />Cultural Sensitivity</h2>
            <div className="section-divider" style={{ margin: '1.5rem 0' }}></div>
            <p>
              BIM Engineer and Architectural Designer with hands-on experience in multidisciplinary
              building and infrastructure projects in Italy, collaborating with Emanuela Biscetti Studio
              and SPERI S.p.A. Specialized in full-cycle architectural delivery — from site survey and 2D/3D design
              through technical documentation and on-site execution, as well as BIM coordination and clash detection
              on large-scale infrastructure projects.
            </p>
            <p>
              Currently completing a Master's in Sustainable Building Engineering at Sapienza University, Rome.
              Ranked 2nd in class during BSc (GPA: 3.83/4).
            </p>
            <div className="about-teaser-actions">
              <Link to="/about" className="btn">Learn More</Link>
              <Link to="/contact" className="btn btn-outline" style={{ marginLeft: '1rem' }}>Contact</Link>
            </div>
          </motion.div>

          <motion.div
            className="about-teaser-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="about-teaser-card">
              <div className="about-card-header">
                <span className="about-card-icon">🏗️</span>
                <span className="about-card-company">Emanuela Biscetti Studio</span>
                <span className="about-card-year">2025–Present</span>
              </div>
              <p className="about-card-role">BIM Engineer &amp; Architectural Designer</p>
              <ul className="about-card-items">
                <li>Full BIM design across residential &amp; commercial projects</li>
                <li>Revit, AutoCAD, Rhinoceros + AI rendering</li>
                <li>Acca Primus computo metrico workflows</li>
              </ul>
            </div>

            <div className="about-teaser-card" style={{ marginTop: '1.25rem' }}>
              <div className="about-card-header">
                <span className="about-card-icon">🌆</span>
                <span className="about-card-company">SPERI S.p.A, Rome</span>
                <span className="about-card-year">2025–Present</span>
              </div>
              <p className="about-card-role">BIM Engineer / External Collaboration</p>
              <ul className="about-card-items">
                <li>Via Salaria &amp; AMA Roma infrastructure projects</li>
                <li>Navisworks clash detection &amp; resolution</li>
                <li>Multidisciplinary BIM coordination</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════ */}
      <section className="home-cta-section dark-section">
        <div className="container home-cta-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label" style={{ color: 'var(--copper-light)' }}>Let's Collaborate</p>
            <h2 style={{ color: 'var(--cream)' }}>Interested in Working Together?</h2>
            <p style={{ color: 'rgba(255,248,240,0.7)', maxWidth: '540px', margin: '1rem auto 2rem' }}>
              I'm open to project opportunities, research collaborations, and academic partnerships
              in BIM engineering, architectural design, and sustainable building.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn">Get in Touch</Link>
              <Link to="/publications" className="btn btn-outline" style={{ marginLeft: '1rem', borderColor: 'rgba(255,248,240,0.4)', color: 'var(--cream)' }}>
                View Publications
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
};

export default Home;