import React from 'react';
import { soundFx } from '../../utils/audio';

const Footer = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="advanced-footer">
      <div className="container footer-inner">
        <div className="footer-top-row">
          <div className="footer-brand-info">
            <span className="footer-logo-title gradient-text">BAREDDY NARENDRA REDDY</span>
            <p className="footer-bio-short">
              Software Developer & Full Stack Engineer passionate about building scalable, interactive 3D web applications and solving complex algorithmic challenges.
            </p>
          </div>

          <div className="footer-links-group">
            <div className="footer-col">
              <span className="col-heading">NAVIGATION</span>
              <a href="#home" onClick={() => soundFx.playClick()}>Home</a>
              <a href="#terminal-section" onClick={() => soundFx.playClick()}>Terminal</a>
              <a href="#skills" onClick={() => soundFx.playClick()}>Skills</a>
              <a href="#projects" onClick={() => soundFx.playClick()}>Projects</a>
            </div>

            <div className="footer-col">
              <span className="col-heading">ACADEMICS</span>
              <a href="#experience" onClick={() => soundFx.playClick()}>IBM Internship</a>
              <a href="#education" onClick={() => soundFx.playClick()}>B.Tech CSE</a>
              <a href="#certifications" onClick={() => soundFx.playClick()}>Certifications</a>
              <a href="#contact" onClick={() => soundFx.playClick()}>Contact</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="footer-copy">
            © {new Date().getFullYear()} Bareddy Narendra Reddy. Designed & Engineered with React, Three.js & Modern CSS.
          </p>

          <button
            className="back-to-top-btn"
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHover()}
            title="Scroll to top"
          >
            <span>Back to Top</span>
            <span className="top-arrow">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
