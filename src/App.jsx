import React from 'react';
import Header from './Components/Pages/Header';
import Hero from './Components/Pages/Hero';
import Skills from './Components/Pages/Skills';
import Education from './Components/Pages/Education';
import Certifications from './Components/Pages/Certifications';
import Experience from './Components/Pages/Experience';
import Projects from './Components/Pages/Projects';
import Contact from './Components/Pages/Contact';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Education />
        <Certifications />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;