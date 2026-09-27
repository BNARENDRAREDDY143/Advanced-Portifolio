import React, { useEffect } from 'react';
import { soundFx } from '../../utils/audio';
import confetti from 'canvas-confetti';

const CertModal = ({ cert, onClose }) => {
  useEffect(() => {
    if (cert) {
      soundFx.playSuccess();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 }
      });
    }
  }, [cert]);

  if (!cert) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog cert-modal-dialog glass-panel" onClick={(e) => e.stopPropagation()}>
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

        <div className="cert-badge-icon">{cert.icon || '📜'}</div>
        <div className="cert-verified-pill">✓ Verified Credential</div>

        <h2 className="gradient-text cert-modal-title">{cert.title}</h2>
        <p className="cert-modal-issuer">Issued by <strong>{cert.provider}</strong></p>

        <div className="cert-modal-body">
          <div className="cert-meta-grid">
            <div className="meta-card">
              <span className="meta-label">Domain</span>
              <span className="meta-value">{cert.domain || 'Software Engineering'}</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Recipient</span>
              <span className="meta-value">Bareddy Narendra Reddy</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Status</span>
              <span className="meta-value text-green">Completed & Certified</span>
            </div>
          </div>

          <div className="cert-skills-box">
            <h4>Core Competencies Validated:</h4>
            <div className="cert-skills-tags">
              {(cert.skills || ['Core Technical Fundamentals', 'Hands-on Practice', 'Industry Standards']).map((sk, idx) => (
                <span key={idx} className="cert-skill-tag">{sk}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="modal-btn primary-btn"
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
          >
            <span>Awesome! Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertModal;
