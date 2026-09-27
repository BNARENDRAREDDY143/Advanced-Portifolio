import React, { useState } from 'react';
import TiltCard from '../UI/TiltCard';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

const Contact = ({ showToast }) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const emailAddress = 'bareddynarendhareddy555@gmail.com';
  const phoneNumber = '+91 6302775072';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    soundFx.playSuccess();
    setCopied(true);
    if (showToast) {
      showToast('Email copied to clipboard! 📋');
    }
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundFx.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setSubmitted(true);
    if (showToast) {
      showToast('Message transmitted successfully! 🚀');
    }

    // Reset after delay
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const socials = [
    {
      name: 'GitHub',
      handle: '@BNARENDRAREDDY143',
      url: 'https://github.com/BNARENDRAREDDY143',
      icon: '🐙',
      desc: 'Code repositories & open source'
    },
    {
      name: 'LinkedIn',
      handle: 'bareddy-narendra-reddy',
      url: 'https://www.linkedin.com/in/bareddy-narendra-reddy-338837343/',
      icon: '💼',
      desc: 'Professional network & milestones'
    },
    {
      name: 'Email Direct',
      handle: emailAddress,
      url: `mailto:${emailAddress}`,
      icon: '✉️',
      desc: 'Primary contact for internships & roles'
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-title-block">
          <h2 className="section-heading gradient-text">Get In Touch</h2>
          <p className="section-lead">
            I am actively seeking Software Development and Full Stack Engineering internships. Feel free to connect for opportunities, technical discussions, or collaborations!
          </p>
        </div>

        <div className="contact-grid-layout">
          {/* Left Column: Quick Channels & Bio */}
          <div className="contact-channels-column">
            <TiltCard className="contact-card-tilt" maxTilt={8} scale={1.01}>
              <div className="contact-card-box">
                <div className="channel-badge">DIRECT CONTACT</div>
                <h3 className="contact-subheading">Let's build something extraordinary</h3>
                <p className="contact-pitch">
                  Whether you have an internship opportunity, a project to collaborate on, or just want to discuss Python, SQL, React, or AI/ML, my inbox is always open.
                </p>

                {/* Email Copy Card */}
                <div className="copy-email-box">
                  <div className="email-meta">
                    <span className="email-label">PRIMARY EMAIL</span>
                    <span className="email-value">{emailAddress}</span>
                  </div>
                  <button
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={handleCopyEmail}
                    onMouseEnter={() => soundFx.playHover()}
                    title="Click to copy email address"
                  >
                    {copied ? '✓ Copied' : 'Copy'}
                  </button>
                </div>

                {/* Phone Call Card */}
                <div className="phone-box">
                  <span className="phone-icon">📞</span>
                  <div className="phone-info">
                    <span className="phone-label">PHONE NUMBER</span>
                    <a href={`tel:${phoneNumber}`} className="phone-link">
                      {phoneNumber}
                    </a>
                  </div>
                </div>

                {/* Social Links List */}
                <div className="social-links-container">
                  {socials.map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-channel-item"
                      onClick={() => soundFx.playClick()}
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <span className="social-icon">{soc.icon}</span>
                      <div className="social-info">
                        <span className="social-name">{soc.name}</span>
                        <span className="social-handle">{soc.handle}</span>
                      </div>
                      <span className="social-arrow">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="contact-form-column">
            <TiltCard className="contact-form-tilt" maxTilt={6} scale={1.01}>
              <div className="contact-form-card">
                <div className="form-header">
                  <h3 className="form-title">Send a Message</h3>
                  <span className="form-subtitle">Direct Transmission Interface</span>
                </div>

                {submitted ? (
                  <div className="form-success-state">
                    <span className="success-icon">🚀</span>
                    <h4 className="success-title">Message Transmitted!</h4>
                    <p className="success-desc">
                      Thank you for reaching out, Narendra Reddy will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="interactive-form">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe / Recruiter"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. recruiter@company.com"
                        className="form-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        placeholder="e.g. SDE Internship Opportunity"
                        className="form-input"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea
                        required
                        rows="4"
                        placeholder="Hello Narendra, I came across your portfolio and would love to connect..."
                        className="form-textarea"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="form-submit-btn"
                      onClick={() => soundFx.playClick()}
                      onMouseEnter={() => soundFx.playHover()}
                    >
                      <span>Transmit Message</span>
                      <span className="btn-plane">✈️</span>
                    </button>
                  </form>
                )}
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
