import React, { useEffect, useRef, useState } from 'react';
import './FloatingOrbs.css';

const FloatingOrbs = () => {
  const containerRef = useRef(null);
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    // Generate random orbs
    const generatedOrbs = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      size: Math.random() * 100 + 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 5 + 8,
      delay: Math.random() * 2,
      color: ['#00d4ff', '#ff006e', '#8338ec'][Math.floor(Math.random() * 3)]
    }));
    setOrbs(generatedOrbs);
  }, []);

  return (
    <div ref={containerRef} className="floating-orbs">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="orb"
          style={{
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            animation: `floatOrb ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            background: `radial-gradient(circle, ${orb.color}20, transparent)`,
            boxShadow: `0 0 ${orb.size / 2}px ${orb.color}40`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
