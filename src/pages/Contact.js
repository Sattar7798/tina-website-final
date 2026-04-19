import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }
  })
};

const contactCards = [
  {
    label: 'Email',
    value: 'ziaratit@gmail.com',
    href: 'mailto:ziaratit@gmail.com',
    note: 'Best for project inquiries, research collaborations, and academic contact.'
  },
  {
    label: 'Phone',
    value: '(+39) 338 218 8244',
    href: 'tel:+393382188244',
    note: 'Available for direct conversation on collaborations and project discussions.'
  },
  {
    label: 'Location',
    value: 'Rieti, Italy',
    href: null,
    note: 'Based in Italy and open to remote, academic, and international opportunities.'
  }
];

const collaborationTopics = [
  'Architectural and BIM project collaboration',
  'Research partnerships in sustainable building engineering',
  'AI, digital twins, and energy-system discussions',
  'Academic speaking, review, and publication opportunities'
];

const socials = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tina-ziarati-42b014202/' },
  {
    name: 'Google Scholar',
    href: 'https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=AC6lMd8HTxSTGKBW0O3aR4lR2bmyhyAL2BgbT_1YhTUJa0L5AEQOpWykPpC5IT3ZcySfNE93tVdpxDG2CSUxhg&user=Ymfit90AAAAJ'
  },
  { name: 'GitHub', href: 'https://github.com/Tina7887' },
  { name: 'ResearchGate', href: 'https://researchgate.net/' }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Project Inquiry',
    subject: '',
    message: ''
  });

  const [formNotice, setFormNotice] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, organization, inquiryType, subject, message } = formData;

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization || 'Not provided'}`,
      `Inquiry Type: ${inquiryType}`,
      '',
      message
    ].join('\n');

    const mailtoUrl =
      `mailto:ziaratit@gmail.com` +
      `?subject=${encodeURIComponent(subject || inquiryType)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    setFormNotice('Your email app should open with the message prepared.');
  };

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <section className="contact-hero dark-section">
        <div className="contact-hero-grid-pattern"></div>
        <div className="contact-hero-glow contact-hero-glow-left"></div>
        <div className="contact-hero-glow contact-hero-glow-right"></div>

        <div className="container contact-hero-layout">
          <motion.div
            className="contact-hero-copy"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p
              className="section-label"
              style={{ color: 'var(--copper-light)' }}
              variants={fadeUp}
            >
              Contact
            </motion.p>
            <motion.h1 className="contact-hero-title" variants={fadeUp} custom={0.08}>
              A clear place to
              <span className="contact-hero-accent"> start the conversation.</span>
            </motion.h1>
            <motion.p className="contact-hero-subtitle" variants={fadeUp} custom={0.16}>
              If you are reaching out about a project, research collaboration, publication,
              or consulting opportunity, this page is designed to make contact feel immediate
              and calm rather than overly technical.
            </motion.p>

            <motion.div className="contact-hero-tags" variants={fadeUp} custom={0.24}>
              <span>Project inquiries</span>
              <span>Research collaboration</span>
              <span>Academic opportunities</span>
              <span>BIM and sustainability consulting</span>
            </motion.div>
          </motion.div>

          <motion.aside
            className="contact-hero-card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="contact-card-label">Availability</span>
            <h2>Open to thoughtful collaborations.</h2>
            <p>
              I am especially interested in opportunities that connect design quality with BIM,
              sustainability, resilience, or research-led architectural work.
            </p>
            <div className="contact-card-stats">
              <div>
                <span className="contact-card-stat-value">Italy</span>
                <span className="contact-card-stat-label">base location</span>
              </div>
              <div>
                <span className="contact-card-stat-value">Remote</span>
                <span className="contact-card-stat-label">friendly</span>
              </div>
              <div>
                <span className="contact-card-stat-value">Academic + Practice</span>
                <span className="contact-card-stat-label">collaboration modes</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="container contact-main-layout">
          <motion.div
            className="contact-sidebar"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
          >
            <div className="contact-panel">
              <span className="contact-panel-label">Direct Channels</span>
              <div className="contact-channel-list">
                {contactCards.map((item) => (
                  <div key={item.label} className="contact-channel-card">
                    <span className="contact-channel-name">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="contact-channel-value">
                        {item.value}
                      </a>
                    ) : (
                      <span className="contact-channel-value">{item.value}</span>
                    )}
                    <p>{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-panel">
              <span className="contact-panel-label">Best Reasons To Reach Out</span>
              <div className="contact-topic-list">
                {collaborationTopics.map((topic) => (
                  <div key={topic} className="contact-topic-item">
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-panel">
              <span className="contact-panel-label">Profiles</span>
              <div className="contact-social-list">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                  >
                    <span>{social.name}</span>
                    <span>Open</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-shell"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            <div className="contact-form-header">
              <span className="contact-panel-label">Message Form</span>
              <h2>Send a prepared message</h2>
              <p>
                This form opens your email client with a drafted message, so contact is immediate
                and you keep a copy of what you send.
              </p>
            </div>

            {formNotice ? <div className="contact-form-notice">{formNotice}</div> : null}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form-grid">
                <label className="contact-form-group">
                  <span>Full Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="contact-form-group">
                  <span>Email Address *</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="contact-form-group">
                  <span>Organization</span>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </label>

                <label className="contact-form-group">
                  <span>Inquiry Type *</span>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option>Project Inquiry</option>
                    <option>Research Collaboration</option>
                    <option>Academic Opportunity</option>
                    <option>Consulting</option>
                  </select>
                </label>

                <label className="contact-form-group contact-form-group-full">
                  <span>Subject *</span>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label className="contact-form-group contact-form-group-full">
                  <span>Message *</span>
                  <textarea
                    name="message"
                    rows="7"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </label>
              </div>

              <button type="submit" className="contact-submit-button">
                Open Email Draft
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
