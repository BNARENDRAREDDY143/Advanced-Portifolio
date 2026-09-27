import React, { useState } from 'react';
import TiltCard from '../UI/TiltCard';
import CertModal from '../UI/CertModal';
import { soundFx } from '../../utils/audio';

const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  const certsData = [
    {
      title: 'Introduction to Cyber Security',
      provider: 'Cisco',
      domain: 'Information Security & Networking',
      skills: ['Network Security', 'Threat Assessment', 'Cyber Defense Basics', 'Encryption'],
      icon: '🛡️',
      color: '#00d4ff'
    },
    {
      title: 'Cloud Practitioner (Foundational)',
      provider: 'AWS',
      domain: 'Cloud Architecture & Infrastructure',
      skills: ['Cloud Computing', 'IAM Security', 'EC2 & S3', 'AWS Global Infrastructure'],
      icon: '☁️',
      color: '#ff9900'
    },
    {
      title: 'Full Stack Development',
      provider: 'Udemy',
      domain: 'Web Application Engineering',
      skills: ['Frontend SPA', 'Node.js Backend', 'REST APIs', 'Database Integration'],
      icon: '🌐',
      color: '#a435f0'
    },
    {
      title: 'Python Programming',
      provider: 'Infosys Springboard',
      domain: 'Core Programming & Data Structures',
      skills: ['OOP Concepts', 'Data Structures', 'Pythonic Algorithms', 'Scripting'],
      icon: '🐍',
      color: '#00ffcc'
    },
    {
      title: 'Generative AI Foundations',
      provider: 'Infosys Springboard',
      domain: 'Artificial Intelligence & LLMs',
      skills: ['Prompt Engineering', 'LLM Architectures', 'Generative Workflows', 'AI Ethics'],
      icon: '🧠',
      color: '#ff007f'
    },
    {
      title: 'Data Science Fundamentals',
      provider: 'Infosys Springboard',
      domain: 'Data Science & Statistical Analysis',
      skills: ['Statistical Modeling', 'Exploratory Data Analysis', 'Visualization', 'Data Cleaning'],
      icon: '📊',
      color: '#8a2be2'
    }
  ];

  return (
    <section id="certifications" className="certifications-section">
      <div className="container">
        <div className="section-title-block">
         
          <h2 className="section-heading gradient-text">Certifications Vault</h2>
          <p className="section-lead">
            Industry-recognized credentials validating practical skills across Cloud, Cybersecurity, AI/ML, and Full Stack Development.
          </p>
        </div>

        <div className="certs-modern-grid">
          {certsData.map((cert, index) => (
            <TiltCard
              key={index}
              className="cert-modern-tilt-card"
              maxTilt={12}
              scale={1.03}
              onClick={() => {
                soundFx.playClick();
                setSelectedCert(cert);
              }}
            >
              <div className="cert-card-inner">
                <div className="cert-top-row">
                  <div className="cert-icon-frame">{cert.icon}</div>
                  <span className="cert-provider-pill">{cert.provider}</span>
                </div>

                <h3 className="cert-card-title">{cert.title}</h3>
                <span className="cert-domain-label">{cert.domain}</span>

                <div className="cert-skills-list">
                  {cert.skills.slice(0, 3).map((sk, i) => (
                    <span key={i} className="cert-mini-tag">
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="cert-card-footer">
                  <span className="cert-verify-btn">
                    <span>View Credential</span>
                    <span className="verify-arrow">→</span>
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      {/* Cert Modal with Confetti */}
      {selectedCert && (
        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </section>
  );
};

export default Certifications;
