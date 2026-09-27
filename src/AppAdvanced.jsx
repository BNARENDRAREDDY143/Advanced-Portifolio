import React, { useState, useEffect } from 'react';
import Header from './Components/Pages/Header';
import Hero from './Components/Pages/Hero';
import Skills from './Components/Pages/Skills';
import Projects from './Components/Pages/Projects';
import Experience from './Components/Pages/Experience';
import Education from './Components/Pages/Education';
import Certifications from './Components/Pages/Certifications';
import Contact from './Components/Pages/Contact';
import Footer from './Components/Pages/Footer';
import CustomCursor from './Components/UI/CustomCursor';
import Toast from './Components/UI/Toast';
import ParticleField from './Components/3D/ParticleField';
import FloatingOrbs from './Components/3D/FloatingOrbs';
import BackgroundVideo from './Components/UI/BackgroundVideo';
import { soundFx } from './utils/audio';
import './AppAdvanced.css';

function AppAdvanced() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTheme, setCurrentTheme] = useState('theme-cyan');
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const newState = soundFx.toggleSound();
    setIsAudioOn(newState);
    showToast(newState ? 'Audio FX Enabled 🔊' : 'Audio FX Muted 🔇');
  };

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    showToast(`Switched Theme 🎨`);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3500);
  };

  return (
    <div className={`App-advanced ${currentTheme}`}>
      {/* Custom Cyber Interactive Cursor */}
      <CustomCursor />

      {/* Ambient Looping Background Video */}
      <BackgroundVideo />

      {/* 3D Celestial Dust Constellation & Ambient Orbs */}
      <ParticleField />
      <FloatingOrbs />

      {/* Cyber Grid Background */}
      <div className="grid-background"></div>

      {/* Advanced Navigation Header */}
      <Header
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        isAudioOn={isAudioOn}
        onAudioToggle={handleAudioToggle}
      />

      <main className="main-content">
        {/* 1. Hero */}
        <Hero scrollY={scrollY} />

        <div className="section-divider"></div>

        {/* 2. Skills Radar & Categorized Matrix */}
        <Skills />

        <div className="section-divider"></div>

        {/* 4. Projects Showcase & Architecture */}
        <Projects />

        <div className="section-divider"></div>

        {/* 5. Professional Internship Experience */}
        <Experience />

        <div className="section-divider"></div>

        {/* 6. Education & LeetCode Trophy Showcase */}
        <Education />

        <div className="section-divider"></div>

        {/* 7. Certifications Vault */}
        <Certifications />

        <div className="section-divider"></div>

        {/* 8. Contact & Transmission Hub */}
        <Contact showToast={showToast} />
      </main>

      {/* Modern Footer */}
      <Footer />

      {/* Floating Notification Toast */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg('')} />}
    </div>
  );
}

export default AppAdvanced;
