import React from 'react';
import { soundFx } from '../../utils/audio';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="modal-header">
          <div className="modal-badge">{project.category || 'Featured Engineering'}</div>
          <h2 className="gradient-text">{project.title}</h2>
          <p className="modal-subtitle">{project.tagline || 'Advanced Architectural Implementation'}</p>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3>📌 Overview & Problem Solved</h3>
            <p>{project.description}</p>
          </div>

          <div className="modal-section">
            <h3>⚡ Key Engineering Highlights</h3>
            <ul className="modal-bullet-list">
              {project.points.map((pt, idx) => (
                <li key={idx}>
                  <span className="bullet-icon">✦</span> {pt}
                </li>
              ))}
            </ul>
          </div>

          <div className="modal-section">
            <h3>🛠️ Tech Stack & Architecture</h3>
            <div className="modal-tech-tags">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.architecture && (
            <div className="modal-section">
              <h3>🏗️ System Architecture Flow</h3>
              <div className="architecture-box">
                <code>{project.architecture}</code>
              </div>
            </div>
          )}

          {project.liveUrl && (
            <div className="modal-section modal-live-section">
              <h3>🌐 Live Deployment Status</h3>
              <div className="live-status-box">
                <div className="live-status-info">
                  <span className="live-indicator-dot"></span>
                  <span className="live-status-text">Production Build Online on Vercel</span>
                </div>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-direct-link"
                >
                  {project.liveUrl} ↗
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-btn live-btn"
              onClick={() => soundFx.playClick()}
            >
              <span>🚀 Launch Live App</span>
            </a>
          )}
          <a
            href={project.githubUrl || 'https://github.com/BNARENDRAREDDY143'}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-btn primary-btn"
            onClick={() => soundFx.playClick()}
          >
            <span>View GitHub</span>
          </a>
          <button
            className="modal-btn secondary-btn"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
          >
            <span>Close Preview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
