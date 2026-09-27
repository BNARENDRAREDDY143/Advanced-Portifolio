import React, { useState, useEffect } from 'react';
import { soundFx } from '../../utils/audio';

const Header = ({ currentTheme, onThemeChange, isAudioOn, onAudioToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section detection
      const sections = ['home', 'skills', 'projects', 'experience', 'education', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    soundFx.playClick();
    setMobileMenuOpen(false);
  };

  const themes = [
    { id: 'theme-cyan', label: 'Cyan', color: '#00f0ff' },
    { id: 'theme-purple', label: 'Purple', color: '#8a2be2' },
    { id: 'theme-green', label: 'Matrix', color: '#00ff9d' },
    { id: 'theme-pink', label: 'Neon', color: '#ff007f' }
  ];

  return (
    <header className={`advanced-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner container">
        {/* Brand Logo */}
        <a 
          href="#home" 
          className="header-brand"
          onClick={() => soundFx.playClick()}
        >
          <div className="brand-hexagon">
            <span className="brand-initials">NR</span>
            <div className="hexagon-glow"></div>
          </div>
          <div className="brand-text-block">
            <span className="brand-name">NARENDRA REDDY</span>
            <span className="brand-role">Software Developer</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <div className="nav-pill-container">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`nav-item ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => soundFx.playHover()}
              >
                {link.label}
                {activeSection === link.id && <span className="active-dot"></span>}
              </a>
            ))}
          </div>
        </nav>

        {/* Action Controls: Theme Picker + Sound SFX + CTA */}
        <div className="header-actions">
          {/* Theme Switcher */}
          <div className="theme-picker" title="Switch Neon Theme">
            {themes.map((t) => (
              <button
                key={t.id}
                className={`theme-dot ${currentTheme === t.id ? 'active' : ''}`}
                style={{ backgroundColor: t.color, boxShadow: currentTheme === t.id ? `0 0 10px ${t.color}` : 'none' }}
                onClick={() => {
                  soundFx.playClick();
                  onThemeChange(t.id);
                }}
                aria-label={`Switch to ${t.label} theme`}
              />
            ))}
          </div>

          {/* Sound FX Toggle */}
          <button
            className={`sfx-toggle-btn ${isAudioOn ? 'sound-active' : ''}`}
            onClick={onAudioToggle}
            onMouseEnter={() => soundFx.playHover()}
            title={isAudioOn ? 'Audio FX Enabled (Click to Mute)' : 'Audio FX Disabled (Click to Enable)'}
            aria-label="Toggle Audio Effects"
          >
            <span className="sfx-icon">{isAudioOn ? '🔊' : '🔇'}</span>
            <div className="sfx-bars">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </button>

          {/* Connect Button */}
          <a
            href="#contact"
            className="header-cta-btn"
            onClick={() => soundFx.playClick()}
            onMouseEnter={() => soundFx.playHover()}
          >
            <span>Let's Talk</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`mobile-toggle-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => {
              soundFx.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle Menu"
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`mobile-nav-item ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => handleNavClick(link.href)}
            >
              <span className="mobile-link-text">{link.label}</span>
              <span className="mobile-arrow">→</span>
            </a>
          ))}
          <div className="mobile-drawer-footer">
            <a
              href="mailto:bareddynarendhareddy555@gmail.com"
              className="drawer-email-link"
              onClick={() => soundFx.playClick()}
            >
              📧 bareddynarendhareddy555@gmail.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
