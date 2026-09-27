import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = ({ scrollY, mousePos }) => {
  const bgRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    if (bgRef.current) {
      // Parallax effect based on scroll
      const layers = bgRef.current.querySelectorAll('.bg-layer');
      layers.forEach((layer, index) => {
        const speed = (index + 1) * 0.5;
        layer.style.transform = `translateY(${scrollY * speed * 0.5}px) 
          translateX(${mousePos.x * 0.01}px) 
          translateY(${mousePos.y * 0.01}px)`;
      });
    }
  }, [scrollY, mousePos]);

  return (
    <div ref={bgRef} className="animated-background">
      {/* Layer 1 - Gradient shapes */}
      <div className="bg-layer layer-1">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Layer 2 - Animated lines */}
      <div className="bg-layer layer-2">
        <svg className="animated-lines" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="1200" y2="800" className="line-1" />
          <line x1="1200" y1="0" x2="0" y2="800" className="line-2" />
          <circle cx="600" cy="400" r="300" className="circle-1" />
          <circle cx="600" cy="400" r="200" className="circle-2" />
        </svg>
      </div>

      {/* Layer 3 - Particles */}
      <div className="bg-layer layer-3">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Layer 4 - Grid */}
      <div className="bg-layer layer-4">
        <div className="grid"></div>
      </div>

      {/* Overlay gradient */}
      <div className="bg-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
