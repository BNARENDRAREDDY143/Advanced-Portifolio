import React, { useState } from 'react';
import TiltCard from '../UI/TiltCard';
import { soundFx } from '../../utils/audio';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');

  const skillCategories = [
    { id: 'all', label: 'All Stack' },
    { id: 'languages', label: 'Languages & Core' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & Database' },
    { id: 'ai', label: 'AI & Machine Learning' },
    { id: 'soft', label: 'Soft & Engineering Skills' }
  ];

  const allSkills = [
    { name: 'Python', category: 'languages', level: 90, icon: '🐍', desc: 'Data structures, OOP, ML scripting, automation' },
    { name: 'SQL', category: 'backend', level: 88, icon: '🗄️', desc: 'Complex queries, schema design, relational DBs' },
    { name: 'JavaScript (ES6+)', category: 'frontend', level: 85, icon: '⚡', desc: 'Modern async JS, DOM manipulation, APIs' },
    { name: 'React.js', category: 'frontend', level: 85, icon: '⚛️', desc: 'Components, state hooks, virtual DOM, SPAs' },
    { name: 'HTML5 & CSS3', category: 'frontend', level: 92, icon: '🎨', desc: 'Semantic layouts, responsive flex/grid, animations' },
    { name: 'C Programming', category: 'languages', level: 80, icon: '⚙️', desc: 'Memory management, pointers, low-level logic' },
    { name: 'Node.js & Express', category: 'backend', level: 78, icon: '🟢', desc: 'RESTful API servers, middleware, routing' },
    { name: 'Machine Learning', category: 'ai', level: 82, icon: '🤖', desc: 'Supervised learning, predictive modeling, IBM certified' },
    { name: 'Data Preprocessing', category: 'ai', level: 85, icon: '📊', desc: 'Feature engineering, normalization, cleaning' },
    { name: 'Git & GitHub', category: 'languages', level: 86, icon: '🐙', desc: 'Version control, branching, open-source workflow' },
    { name: 'Three.js & 3D Web', category: 'frontend', level: 75, icon: '🌐', desc: 'WebGL rendering, 3D meshes, particle shaders' },
    { name: 'Problem Solving & DSA', category: 'soft', level: 90, icon: '🧩', desc: '125+ LeetCode problems solved, 50-day streak' },
    { name: 'Team Collaboration', category: 'soft', level: 92, icon: '🤝', desc: 'Agile communication, code reviews, adaptability' },
    { name: 'Time Management', category: 'soft', level: 88, icon: '⏱️', desc: 'Efficient milestone delivery and task prioritization' }
  ];

  const filteredSkills = activeTab === 'all' 
    ? allSkills 
    : allSkills.filter(s => s.category === activeTab);

  const handleTabChange = (tabId) => {
    soundFx.playClick();
    setActiveTab(tabId);
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-title-block">
          <h2 className="section-heading gradient-text">Skills & Technologies</h2>
          <p className="section-lead">
            Comprehensive breakdown of my technical stack, programming foundations, and engineering competencies.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="skills-tabs-row">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              className={`skills-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => handleTabChange(cat.id)}
              onMouseEnter={() => soundFx.playHover()}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-interactive-grid">
          {filteredSkills.map((skill) => (
            <TiltCard key={skill.name} className="skill-tilt-card" maxTilt={12} scale={1.03}>
              <div className="skill-card-inner">
                <div className="skill-card-top">
                  <span className="skill-icon-bubble">{skill.icon}</span>
                  <div className="skill-title-block">
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className="skill-cat-tag">{skill.category.toUpperCase()}</span>
                  </div>
                  <span className="skill-pct-badge">{skill.level}%</span>
                </div>

                <p className="skill-desc-text">{skill.desc}</p>

                {/* Progress Bar with glow */}
                <div className="skill-progress-track">
                  <div
                    className="skill-progress-fill"
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="fill-glow-tip"></div>
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

export default Skills;
