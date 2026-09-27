import React, { useState } from 'react';
import TiltCard from '../UI/TiltCard';
import ProjectModal from '../UI/ProjectModal';
import { soundFx } from '../../utils/audio';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const projectsData = [
    {
      id: 'ap-tourism',
      title: 'AP Tourism Website',
      category: 'frontend',
      tagline: 'Modern Responsive Travel & Culture Portal',
      description: 'Developed a high-performance, responsive tourism platform showcasing destinations, itineraries, and cultural landmarks across Andhra Pradesh with optimized component architecture.',
      technologies: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3 / Flexbox', 'Vite'],
      points: [
        'Achieved 100% cross-device & mobile compatibility with responsive grid layouts',
        'Significantly improved page load performance and first contentful paint via lazy loading & optimized assets',
        'Implemented interactive destination filters, gallery showcases, and intuitive booking query workflows'
      ],
      architecture: 'User View -> React Component Tree -> State Router -> Dynamic Destination Filter -> Optimized Asset Delivery',
      githubUrl: 'https://github.com/BNARENDRAREDDY143',
      featured: true,
      badge: 'Completed'
    },
    {
      id: 'college-chatbot',
      title: 'Chatbot for College Enquiries',
      category: 'ai',
      tagline: 'Automated Query Resolution NLP Engine',
      description: 'Built an intelligent interactive conversational chatbot designed to streamline administrative and academic inquiries for students and faculty.',
      technologies: ['Python', 'Natural Language Processing', 'JavaScript', 'HTML5', 'CSS3'],
      points: [
        'Automated 20+ common enquiry categories including admissions, examinations, course fees, and departmental details',
        'Reduced manual administrative query handling time by ~40%',
        'Designed real-time responsive chat UI with instant answer suggestions and fallback handling'
      ],
      architecture: 'Student Query -> Preprocessing & Tokenization -> Intent Classification Engine -> Response Dispatcher -> Web UI Stream',
      githubUrl: 'https://github.com/BNARENDRAREDDY143',
      featured: true,
      badge: 'Featured AI'
    },
    {
      id: 'social-media-app',
      title: 'Full Stack Social Media Application',
      category: 'fullstack',
      tagline: 'Scalable Community & Content Sharing Platform',
      description: 'Developing a comprehensive full-stack social network featuring secure user authentication, personal profiles, real-time post creation, likes, comments, and relational database management.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'SQL / Relational DB', 'JWT Auth'],
      points: [
        'Engineered secure user registration, token-based authentication, and profile customization',
        'Implemented dynamic feed generation, interactive like counter, and comment threading',
        'Designed normalized relational SQL database schema with indexing for fast feed queries'
      ],
      architecture: 'Client (React SPA) -> RESTful API Gateway (Express) -> Controller Middleware -> Relational SQL Database',
      githubUrl: 'https://github.com/BNARENDRAREDDY143',
      featured: true,
      badge: 'Full Stack'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai', label: 'AI & Python' },
    { id: 'frontend', label: 'Frontend & UI' }
  ];

  const filteredProjects = projectsData.filter((proj) => {
    const matchesCategory = activeFilter === 'all' || proj.category === activeFilter;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-title-block">
          <h2 className="section-heading gradient-text">Featured Projects</h2>
          <p className="section-lead">
            Explore web applications, full-stack systems, and AI-driven solutions built with modern technology.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="projects-controls-bar">
          <div className="category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-pill-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => {
                  soundFx.playClick();
                  setActiveFilter(cat.id);
                }}
                onMouseEnter={() => soundFx.playHover()}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="projects-search-input"
              placeholder="Search by tech or keyword (e.g. React, Python, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-advanced-grid">
          {filteredProjects.map((project) => (
            <TiltCard key={project.id} className="project-tilt-card" maxTilt={10} scale={1.02}>
              <div className="project-card-content">
                <div className="project-top-row">
                  <span className="project-badge-pill">{project.badge}</span>
                  <div className="project-tech-count">{project.technologies.length} Tech Stack</div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-tagline-text">{project.tagline}</p>
                <p className="project-desc-text">{project.description}</p>

                {/* Key Bullet Points */}
                <div className="project-highlights">
                  <span className="highlights-title">Key Highlights:</span>
                  <ul className="highlights-list">
                    {project.points.slice(0, 2).map((pt, i) => (
                      <li key={i}>
                        <span className="highlight-bullet">▹</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Tags */}
                <div className="project-tech-badges">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-card-footer">
                  <button
                    className="project-action-btn primary"
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedProject(project);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    <span>Deep Dive & Architecture</span>
                    <span className="btn-arrow">↗</span>
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-btn outline"
                    onClick={() => soundFx.playClick()}
                    onMouseEnter={() => soundFx.playHover()}
                    title="View GitHub Repository"
                  >
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="no-projects-found">
            <p>No projects match your search query: "{searchQuery}"</p>
            <button className="reset-search-btn" onClick={() => setSearchQuery('')}>Clear Search</button>
          </div>
        )}
      </div>

      {/* Project Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

export default Projects;
