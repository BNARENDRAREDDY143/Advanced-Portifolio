import React from 'react';

const Toast = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="toast-notification-banner">
      <div className="toast-inner">
        <span className="toast-sparkle">✨</span>
        <span className="toast-text">{message}</span>
        <button className="toast-close-btn" onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

export default Toast;
