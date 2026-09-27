import React, { useRef, useState } from 'react';
import { soundFx } from '../../utils/audio';

const TiltCard = ({ children, className = '', maxTilt = 14, scale = 1.02, glare = true, onClick, style = {} }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.08s ease-out'
    });

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePos({ x: glareX, y: glareY, opacity: 0.25 });
    }
  };

  const handleMouseEnter = () => {
    soundFx.playHover();
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.4s ease-out'
    });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        ...transformStyle,
        position: 'relative',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}

      {glare && (
        <div
          className="tilt-card-glare"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: 'inherit',
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 65%)`,
            pointerEvents: 'none',
            opacity: glarePos.opacity,
            transition: 'opacity 0.2s ease',
            zIndex: 10
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
