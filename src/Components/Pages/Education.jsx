import React from 'react';
import TiltCard from '../UI/TiltCard';
import { soundFx } from '../../utils/audio';

const Education = () => {
  const educationData = [
    {
      degree: 'Bachelor of Technology in Computer Science & Engineering',
      institution: "Vignan's LARA Institute of Technology & Science",
      location: 'Vadlamudi, Guntur, AP',
      period: '2023 – 2027 (Pursuing)',
      grade: 'CGPA: 8.22',
      details: 'Focusing on Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Web Development, and Artificial Intelligence.',
      icon: '🎓',
      current: true
    },
    {
      degree: 'Intermediate (MPC - Mathematics, Physics, Chemistry)',
      institution: 'Sri Chaitanya Junior College',
      location: 'Gorantla, Guntur, AP',
      period: '2021 – 2023',
      grade: 'Score: 88.7%',
      details: 'Comprehensive foundations in higher mathematics, analytical reasoning, and physics fundamentals.',
      icon: '📐',
      current: false
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Z.P.H.S High School',
      location: 'Telukutla, AP',
      period: '2020 – 2021',
      grade: 'Score: 80.0%',
      details: 'Strong academic foundation with honors in mathematics and science coursework.',
      icon: '🏫',
      current: false
    }
  ];

  return (
    <section id="education" className="education-section">
      <div className="container">
        <div className="section-title-block">
          <h2 className="section-heading gradient-text">Education & Achievements</h2>
          <p className="section-lead">
            Academic milestones along with competitive programming achievements and algorithmic excellence.
          </p>
        </div>

        {/* LeetCode & Problem Solving Trophy Showcase */}
        <div className="achievements-banner-wrapper">
          <TiltCard className="trophy-tilt-card" maxTilt={8} scale={1.01}>
            <div className="trophy-card-content">
              <div className="trophy-left">
                <div className="trophy-icon-box">
                  <span className="trophy-emoji">🏆</span>
                  <div className="trophy-ring"></div>
                </div>
                <div className="trophy-text">
                  <div className="trophy-tag">COMPETITIVE PROGRAMMING BADGE</div>
                  <h3 className="trophy-title">50 Days LeetCode Badge</h3>
                  <p className="trophy-desc">
                    Solved <strong>125+ Algorithmic Problems</strong> demonstrating rigorous consistency, data structure mastery, and optimal time/space complexity thinking.
                  </p>
                </div>
              </div>

              <div className="trophy-metrics-grid">
                <div className="metric-box">
                  <span className="metric-val">125+</span>
                  <span className="metric-label">Problems Solved</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">50 Days</span>
                  <span className="metric-label">Daily Streak</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">Python / C</span>
                  <span className="metric-label">Languages Used</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </div>

        {/* Education Timeline */}
        <div className="education-timeline-tree">
          {educationData.map((item, index) => (
            <div key={index} className="edu-timeline-node">
              <div className="edu-node-marker">
                <div className="marker-dot">
                  <span className="marker-icon">{item.icon}</span>
                </div>
                {index < educationData.length - 1 && <div className="marker-stem"></div>}
              </div>

              <div className="edu-node-card-wrap">
                <TiltCard className="edu-tilt-card" maxTilt={6} scale={1.01}>
                  <div className="edu-card-content">
                    <div className="edu-card-top">
                      <div>
                        <div className="edu-badge-row">
                          {item.current && <span className="current-badge">● Currently Pursuing</span>}
                          <span className="period-badge">{item.period}</span>
                        </div>
                        <h3 className="edu-degree-title">{item.degree}</h3>
                        <h4 className="edu-institution-name">{item.institution}</h4>
                        <span className="edu-location-text">📍 {item.location}</span>
                      </div>

                      <div className="edu-score-pill">{item.grade}</div>
                    </div>

                    <p className="edu-details-text">{item.details}</p>
                  </div>
                </TiltCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
