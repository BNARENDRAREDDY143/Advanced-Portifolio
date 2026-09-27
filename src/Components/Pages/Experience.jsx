import React from 'react';
import TiltCard from '../UI/TiltCard';

const Experience = () => {
  const experiences = [
    {
      role: 'AI & Machine Learning Intern',
      company: 'IBM (Virtual Experience Program)',
      period: '06/2025 – 07/2025',
      badge: 'Certified Internship',
      description:
        'Successfully completed a specialized AI & Machine Learning internship with IBM. Built and evaluated machine learning predictive models using Python, executed end-to-end data preprocessing pipelines on real-world datasets, and applied supervised learning algorithms.',
      achievements: [
        'Implemented end-to-end Machine Learning pipelines using Python, NumPy, Pandas, and Scikit-learn',
        'Performed thorough data cleaning, outlier detection, feature encoding, and normalization on heterogeneous datasets',
        'Built, fine-tuned, and cross-validated supervised predictive models achieving superior test accuracy',
        'Analyzed model performance using precision-recall, confusion matrices, and ROC-AUC curves'
      ],
      technologies: ['Python', 'Machine Learning', 'Data Preprocessing', 'Supervised Learning', 'Predictive Modeling', 'Scikit-Learn']
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-title-block">
          <h2 className="section-heading gradient-text">Professional Experience</h2>
          <p className="section-lead">
            Hands-on industry internship experience building machine learning pipelines and real-world software solutions.
          </p>
        </div>

        <div className="experience-cards-wrapper">
          {experiences.map((exp, idx) => (
            <TiltCard key={idx} className="experience-tilt-card" maxTilt={8} scale={1.01}>
              <div className="experience-card-inner">
                <div className="exp-top-header">
                  <div className="exp-role-group">
                    <span className="exp-company-logo">💼</span>
                    <div>
                      <h3 className="exp-role-title">{exp.role}</h3>
                      <h4 className="exp-company-name">{exp.company}</h4>
                    </div>
                  </div>

                  <div className="exp-meta-badge">
                    <span className="exp-period-pill">{exp.period}</span>
                    <span className="exp-status-pill">{exp.badge}</span>
                  </div>
                </div>

                <p className="exp-summary-text">{exp.description}</p>

                <div className="exp-achievements-box">
                  <h5 className="achievements-heading">Key Contributions & Outcomes:</h5>
                  <ul className="achievements-list">
                    {exp.achievements.map((item, i) => (
                      <li key={i}>
                        <span className="achievement-icon">⚡</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="exp-tech-stack">
                  <span className="tech-stack-label">Stack Employed:</span>
                  <div className="tech-pills">
                    {exp.technologies.map((t, i) => (
                      <span key={i} className="exp-tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
