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
      technologies: ['Python', 'NLP Engine', 'JavaScript', 'HTML5', 'CSS3', 'Vercel Deployment'],
      points: [
        'Automated 20+ common enquiry categories including admissions, examinations, course fees, and departmental details',
        'Reduced manual administrative query handling time by ~40%',
        'Designed real-time responsive chat UI with instant answer suggestions and fallback handling'
      ],
      architecture: 'Student Query -> Preprocessing & Tokenization -> Intent Classification Engine -> Response Dispatcher -> Web UI Stream',
      githubUrl: 'https://github.com/BNARENDRAREDDY143/Chatbot',
      liveUrl: 'https://chatbot-57jp.vercel.app',
      featured: true,
      badge: 'Live AI Demo 🟢'
    },
    {
      id: 'online-learning-platform',
      title: 'Online Learning Platform',
      category: 'fullstack',
      tagline: 'Interactive Learning & Student Performance Platform',
      description: 'Developing a full-stack online learning platform that enables students to access courses, learning materials, video lectures, quizzes, and track their learning progress.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'SQL / Relational DB', 'JWT Auth'],
      points: [
        'Implemented secure user registration, login, and role-based access for students',
        'Developed course browsing, learning materials, video lectures, and online quiz functionality',
        'Implemented student progress tracking and performance management using a relational database'
      ],
      architecture: 'Client (React SPA) -> RESTful API (Express) -> Authentication & Business Logic -> Relational SQL Database',
      githubUrl: 'https://github.com/BNARENDRAREDDY143/',
      liveUrl: 'https://online-learning-platform-jet-delta.vercel.app',
      featured: true,
      badge: 'Full Stack'
    },
    {
      id: 'adaptive-3d-webxr-learning-platform',
      title: 'Adaptive 3D/WebXR Learning Platform',
      category: 'fullstack',
      tagline: 'Immersive 3D Learning with AI-Powered Performance Prediction',
      description: 'Developing an adaptive learning platform that combines 3D/WebXR technology with machine learning to provide immersive learning experiences and predict student performance based on learning behavior and assessment results.',
      technologies: [
        'React.js',
        'Three.js',
        'React Three Fiber',
        'Python / Flask',
        'Machine Learning',
        'PostgreSQL / SQLite',
        'JWT Auth',
        'Tailwind CSS'
      ],
      points: [
        'Developed interactive 3D learning environments using Three.js and React Three Fiber for immersive WebXR-based education',
        'Implemented adaptive learning features and machine learning-based performance prediction using student learning and assessment data',
        'Built secure authentication and backend APIs using Flask and JWT, with SQLite and PostgreSQL for data management'
      ],
      architecture: 'Client (React + Tailwind CSS) -> 3D/WebXR Layer (Three.js + React Three Fiber) -> Flask REST API -> ML Performance Prediction -> SQLite/PostgreSQL Database',
      githubUrl: 'https://github.com/BNARENDRAREDDY143',
      featured: true,
      badge: 'AI + WebXR 🕶️'
    },
    {
      id: 'task-management-app',
      title: 'Task Management Application',
      category: 'fullstack',
      tagline: 'Efficient Task Planning & Productivity Platform',
      description: 'Developed a full-stack task management application using the MERN stack that enables users to create, organize, prioritize, and track tasks through an intuitive and responsive interface.',
      technologies: [
        'React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'JWT Auth',
        'Tailwind CSS'
      ],
      points: [
        'Implemented secure user registration, login, and JWT-based authentication',
        'Developed features for creating, editing, deleting, prioritizing, and tracking task status',
        'Built a responsive dashboard with task filtering and organization to improve productivity'
      ],
      architecture: 'Client (React.js + Tailwind CSS) -> RESTful API (Node.js + Express.js) -> MongoDB Database',
      githubUrl: 'https://github.com/BNARENDRAREDDY143/taskapp',
      liveUrl: 'https://taskapp-iota-nine.vercel.app',
      featured: true,
      badge: 'MERN Stack'
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
                  <span className={`project-badge-pill ${project.liveUrl ? 'live-badge' : ''}`}>
                    {project.badge}
                  </span>
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
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn live"
                      onClick={() => soundFx.playClick()}
                      onMouseEnter={() => soundFx.playHover()}
                      title="Launch Live Application on Vercel"
                    >
                      <span className="pulse-circle"></span>
                      <span>Live Demo</span>
                      <span className="btn-arrow">⚡</span>
                    </a>
                  )}

                  <button
                    className={`project-action-btn ${project.liveUrl ? 'details-btn' : 'primary'}`}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedProject(project);
                    }}
                    onMouseEnter={() => soundFx.playHover()}
                  >
                    <span>Architecture</span>
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
