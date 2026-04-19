// src/pages/About.js — Full CV Content Rewrite
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.75, delay: d, ease: [0.16, 1, 0.3, 1] }
  })
};

/* ── Work experience data ───────────────────────────────── */
const experience = [
  {
    role: 'BIM Engineer & Architectural Designer',
    company: 'Emanuela Biscetti Studio',
    location: 'Rieti, Italy',
    period: '2025 – Present',
    highlights: [
      'Full architectural and BIM design across residential, commercial, and heritage-sensitive projects in central Italy',
      'Developed 2D/3D models in Revit, AutoCAD, Rhinoceros; produced interior details, technical drawings, fire safety plans',
      'Applied AI-assisted tools for high-quality rendering and design visualization',
      'Performed computo metrico with Acca Primus; contributed to a custom Revit plugin for automated quantity take-off',
      'BIM coordination and clash detection using Navisworks',
    ],
    projects: [
      'Blasetti — Historic warehouse residential conversion',
      'Cinque Confini — Commercial complex (gym & café), Terminillo',
      'San Paolo — Student dormitory, Rieti',
      'Marale — Hair salon renovation preserving historical character',
    ],
  },
  {
    role: 'BIM Engineer / External Collaboration',
    company: 'SPERI S.p.A',
    location: 'Rome, Italy',
    period: '2025 – Present',
    highlights: [
      'Major infrastructure and public-sector projects as part of a two-person BIM coordination team',
      'Revit modeling, clash detection, and BIM coordination workflows across multidisciplinary project environments',
      'Clash identification and resolution using Navisworks alongside the lead BIM Coordinator',
    ],
    projects: [
      'AMA Roma — Infrastructure and systems modeling',
      'Via Salaria — One of Italy\'s most strategic road infrastructure projects',
    ],
  },
  {
    role: 'Architectural Designer & BIM Coordinator',
    company: 'Peyvand Baft Pars',
    location: 'Tehran, Iran',
    period: '2023 – 2025',
    highlights: [
      'Co-led architectural design and BIM coordination for a 10-story multi-tenant R&T building at Vardavard Technology Park',
      'Responsible for full architectural design: dual-tenant spatial separation, rooftop management suite, interior layout',
      'Developed BIM models in Revit with Shared Parameters; produced detailed architectural drawings in AutoCAD',
      'Collaborated on 4D/5D integration incorporating construction schedules, cost data, geotechnical and seismic data',
    ],
    projects: ['Vardavard Technology Park — 10-story research facility, West Tehran'],
  },
  {
    role: 'Research Paper Reviewer',
    company: 'EEEIC 2025 Conference',
    location: 'International',
    period: '2025',
    highlights: [
      'Appointed to review and evaluate scholarly submissions focusing on sustainability, innovation, and engineering advancements',
    ],
    projects: [],
  },
  {
    role: 'Research Assistant',
    company: 'Sapienza University of Rome',
    location: 'Rome, Italy',
    period: '2023 – 2024',
    highlights: [
      'Contributed to research reports, conference papers, and journal articles in engineering, sustainability, and digital innovation',
    ],
    projects: [],
  },
  {
    role: 'Architectural Designer',
    company: 'Hasht Engineering Company',
    location: 'Iran',
    period: '2018 – 2019',
    highlights: [
      'Worked on architectural design projects using AutoCAD, contributing to functional and high-quality design solutions',
    ],
    projects: [],
  },
];

/* ── Education ──────────────────────────────────────────── */
const education = [
  {
    degree: 'Master in Sustainable Building Engineering',
    university: 'Sapienza University of Rome',
    period: '2024 – 2026',
    note: 'Ongoing',
    highlights: [],
  },
  {
    degree: 'B.Sc. in Sustainable Building Engineering',
    university: 'Sapienza University of Rome',
    period: '2020 – 2023',
    note: 'GPA: 3.83/4 · Ranked 2nd among 90 students',
    highlights: [
      'Thesis: "Smart Sustainability: The AI-Driven Future of Renewable Energy"',
      'First graduate to complete the program on schedule',
    ],
  },
];

/* ── Skills sections ────────────────────────────────────── */
const skillGroups = [
  {
    category: 'BIM Software',
    skills: ['Revit (Advanced)', 'Navisworks', 'AutoCAD', 'Rhinoceros', 'SketchUp', 'Autodesk Recap Pro'],
  },
  {
    category: 'BIM Processes',
    skills: ['BIM Coordination', 'Clash Detection & Resolution', 'Architectural Modeling', 'LOD 200–400', 'ISO 19650', 'UNI 11337', 'File Naming Conventions'],
  },
  {
    category: 'Architectural Design',
    skills: ['2D/3D Design', 'Interior Design', 'Technical Documentation', 'Fire Safety Plans', 'Heritage-Sensitive Renovation', 'Sustainable Design'],
  },
  {
    category: 'Quantity & Cost',
    skills: ['Acca Primus', 'Revit Schedules', 'Shared Parameters', 'WBS/Prezzario Code Integration'],
  },
  {
    category: 'Visualization',
    skills: ['AI-Assisted Rendering', 'Rhinoceros', 'SketchUp', 'Photoshop'],
  },
  {
    category: 'Engineering Tools',
    skills: ['SAP2000', 'HEC-HMS', 'QGIS', 'ArcGIS', 'Mathematica'],
  },
  {
    category: 'Languages',
    skills: ['Persian (Native)', 'English (Professional)', 'Italian (B1)'],
  },
];

/* ── Awards ─────────────────────────────────────────────── */
const honors = [
  { year: '2023', title: 'First graduate to complete BSc on schedule', org: 'Sapienza University' },
  { year: '2023', title: 'Ranked 2nd among 90 students', org: 'Sapienza University' },
  { year: '2020', title: 'Certified inline skating coach', org: 'Iran Skating Federation' },
  { year: '2017', title: 'Top 5% among 170,000+ candidates', org: 'Iranian University Entrance Exam' },
];

/* ── Component ──────────────────────────────────────────── */
const About = () => {
  return (
    <div className="about-page">

      {/* ══ PAGE HERO ═══════════════════════════════════════ */}
      <section className="about-hero dark-section">
        <div className="about-hero-bg"></div>
        <div className="container about-hero-inner">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p className="section-label" style={{ color: 'var(--copper-light)' }} variants={fadeUp} custom={0}>
              BIM Engineer · Architectural Designer
            </motion.p>
            <motion.h1 className="about-hero-title" variants={fadeUp} custom={0.1}>
              Tina Ziarati
            </motion.h1>
            <motion.p className="about-hero-subtitle" variants={fadeUp} custom={0.25}>
              BIM Engineer and Architectural Designer with hands-on experience in multidisciplinary building 
              and infrastructure projects in Italy. Specialized in architectural design, BIM modeling, and 
              coordination across residential, commercial, and heritage-sensitive projects — with strong 
              expertise in Revit, Navisworks, and AI-assisted rendering workflows.
            </motion.p>
            <motion.div className="about-hero-meta" variants={fadeUp} custom={0.4}>
              <span>📍 Rieti, Italy</span>
              <span>🎓 MSc Sapienza University (Ongoing)</span>
              <span>📄 4 Research Publications</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══ PROFESSIONAL SUMMARY ════════════════════════════ */}
      <section className="summary-section">
        <div className="container summary-grid">
          <div className="summary-text">
            <p className="section-label">Professional Summary</p>
            <h2>Engineering Architecture<br />with Precision</h2>
            <div className="section-divider" style={{ margin: '1.5rem 0' }}></div>
            <p>
              With experience ranging from full-cycle residential renovation to large-scale infrastructure BIM coordination, 
              my work bridges technical rigor and spatial sensitivity. I've delivered projects from site survey 
              through technical documentation and on-site execution — always with a focus on quality and efficiency.
            </p>
            <p>
              Proficient in computo metrico workflows using Acca Primus, and contributed to the development 
              of a custom Revit plugin for automated quantity take-off processes.
            </p>
          </div>
          <div className="summary-metrics">
            {[
              { v: '7+', l: 'Years Experience' },
              { v: '10+', l: 'Projects Delivered' },
              { v: '2', l: 'Active Employers' },
              { v: '4', l: 'Publications' },
            ].map((m, i) => (
              <motion.div
                key={i}
                className="metric-box"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="metric-value">{m.v}</span>
                <span className="metric-label">{m.l}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WORK EXPERIENCE ═════════════════════════════════ */}
      <section className="experience-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Career</p>
            <h2>Work Experience</h2>
            <div className="section-divider"></div>
          </div>

          <div className="timeline-list">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                className="timeline-entry"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
              >
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {i < experience.length - 1 && <div className="timeline-line"></div>}
                </div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role">{exp.role}</h3>
                      <p className="timeline-company">
                        {exp.company}
                        <span className="timeline-location"> · {exp.location}</span>
                      </p>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>
                  <ul className="timeline-highlights">
                    {exp.highlights.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                  {exp.projects.length > 0 && (
                    <div className="timeline-projects">
                      <p className="timeline-projects-label">Selected Projects</p>
                      <div className="timeline-project-tags">
                        {exp.projects.map((p, j) => (
                          <span key={j} className="project-tag">{p}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ EDUCATION ═══════════════════════════════════════ */}
      <section className="education-section dark-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label" style={{ color: 'var(--copper-light)' }}>Academic Background</p>
            <h2 style={{ color: 'var(--cream)' }}>Education</h2>
            <div className="section-divider"></div>
          </div>
          <div className="education-grid">
            {education.map((ed, i) => (
              <motion.div
                key={i}
                className="education-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: i * 0.1 }}
              >
                <div className="edu-period">{ed.period}</div>
                <h3 className="edu-degree">{ed.degree}</h3>
                <p className="edu-university">{ed.university}</p>
                <span className="edu-note">{ed.note}</span>
                {ed.highlights.map((h, j) => (
                  <p key={j} className="edu-highlight">— {h}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══════════════════════════════════════════ */}
      <section className="skills-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Technical Proficiency</p>
            <h2>Skills & Tools</h2>
            <div className="section-divider"></div>
          </div>
          <div className="skills-groups">
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                className="skill-group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <h4 className="skill-group-title">{group.category}</h4>
                <div className="skill-tags">
                  {group.skills.map((s, j) => (
                    <span key={j} className="skill-tag">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HONORS & AWARDS ═════════════════════════════════ */}
      <section className="honors-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Recognition</p>
            <h2>Honors &amp; Awards</h2>
            <div className="section-divider"></div>
          </div>
          <div className="honors-grid">
            {honors.map((h, i) => (
              <motion.div
                key={i}
                className="honor-card"
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="honor-year">{h.year}</span>
                <h4 className="honor-title">{h.title}</h4>
                <p className="honor-org">{h.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOBBIES ═════════════════════════════════════════ */}
      <section className="hobbies-section dark-section">
        <div className="container hobbies-inner">
          <div>
            <p className="section-label" style={{ color: 'var(--copper-light)' }}>Beyond Work</p>
            <h2 style={{ color: 'var(--cream)' }}>Interests &amp; Hobbies</h2>
          </div>
          <div className="hobbies-grid">
            {[
              { icon: '⛷️', label: 'Inline Skating', sub: '8 years certified coach' },
              { icon: '💪', label: 'Fitness', sub: 'Sports & physical wellness' },
              { icon: '✍️', label: 'Writing', sub: 'Creative & technical' },
              { icon: '🍳', label: 'Cooking', sub: 'Culinary exploration' },
            ].map((h, i) => (
              <motion.div
                key={i}
                className="hobby-tile"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="hobby-icon">{h.icon}</span>
                <span className="hobby-label">{h.label}</span>
                <span className="hobby-sub">{h.sub}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═════════════════════════════════════════════ */}
      <section className="about-cta-section">
        <div className="container about-cta-inner">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">References & Documents</p>
            <h2>Let's Create Together</h2>
            <div className="section-divider"></div>
            <p>
              Interested in collaborating on BIM projects, architectural design, or research?
              References, supporting documents, and project details are available upon request.
            </p>
            <div className="about-cta-buttons">
              <Link to="/contact" className="btn">Get in Touch</Link>
              <Link to="/publications" className="btn btn-outline" style={{ marginLeft: '1rem' }}>Publications</Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
