import React, { useState, useEffect } from 'react';
import { soundFx } from '../../utils/audio';

const Hero = ({ scrollY = 0 }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    'Python & SQL Developer',
    'Full Stack Engineer',
    'AI & Machine Learning Enthusiast',
    'Problem Solver (125+ LeetCode)'
  ];

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  const quickStats = [
    { label: 'B.Tech CSE', value: '8.22 CGPA', icon: '🎓' },
    { label: 'LeetCode Solved', value: '125+ Tasks', icon: '🏆' },
    { label: 'Certifications', value: '6+ Badges', icon: '📜' },
    { label: 'Work Experience', value: 'IBM Virtual', icon: '💼' }
  ];

  return (
    <section id="home" className="hero-section hero-centered-layout">
      <div className="container hero-content-center">
        {/* Status Pill */}
        <div className="status-pill">
          <span className="pulsing-radar-dot"></span>
          <span>AVAILABLE FOR SDE / FULL STACK INTERNSHIPS</span>
        </div>

        {/* Main Name & Titles */}
        <h1 className="hero-main-title">
          Hi, I'm <br />
          <span className="gradient-text-shimmer">BAREDDY NARENDRA REDDY</span>
        </h1>

        {/* Typing Role Stream */}
        <div className="hero-typing-container">
          <span className="typing-prefix">&gt; </span>
          <span className="typing-text">{displayText}</span>
          <span className="typing-cursor">_</span>
        </div>

        <p className="hero-lead-desc">
          Motivated Computer Science Engineering student passionate about crafting high-performance full-stack web applications, scalable backend systems, and solving complex algorithmic challenges.
        </p>

        {/* Quick Stats Grid */}
        <div className="hero-stats-row">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="mini-stat-card">
              <span className="mini-stat-icon">{stat.icon}</span>
              <div className="mini-stat-info">
                <span className="mini-stat-val">{stat.value}</span>
                <span className="mini-stat-lbl">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs Action Buttons */}
        <div className="hero-actions-row">
          <a
            href="#projects"
            className="cyber-cta primary-cta"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
          >
            <span>Explore Projects</span>
            <span className="btn-icon">⚡</span>
          </a>

          <a
            href="#skills"
            className="cyber-cta secondary-cta"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
          >
            <span>Technical Skills</span>
            <span className="btn-icon">🛠️</span>
          </a>

          <a
            href="mailto:bareddynarendhareddy555@gmail.com"
            className="cyber-cta outline-cta"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
          >
            <span>Contact Me</span>
            <span className="btn-icon">✉️</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
