import React, { useEffect, useRef } from 'react';

const ParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    // Lightweight drifting ambient starfield with depth
    const starCount = Math.min(Math.floor(width / 20), 75);
    const stars = [];

    const colors = ['#00f0ff', '#8a2be2', '#ff007f', '#ffffff', '#38bdf8'];

    const initStars = () => {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * 0.8 + 0.2, // depth factor
          size: Math.random() * 1.8 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25 - 0.1,
          pulse: Math.random() * Math.PI,
          pulseSpeed: Math.random() * 0.02 + 0.008
        });
      }
    };

    initStars();

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const render = () => {
      // Smooth mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const offsetX = (mouseX - width / 2) * 0.03;
      const offsetY = (mouseY - height / 2) * 0.03;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.pulse += s.pulseSpeed;

        if (s.x < -20) s.x = width + 20;
        if (s.x > width + 20) s.x = -20;
        if (s.y < -20) s.y = height + 20;
        if (s.y > height + 20) s.y = -20;

        const currentX = s.x + offsetX * s.z;
        const currentY = s.y + offsetY * s.z;
        const currentSize = s.size * (1 + Math.sin(s.pulse) * 0.3);
        const opacity = (0.35 + Math.sin(s.pulse) * 0.25) * s.z;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size > 1.5 ? 8 : 0;
        ctx.beginPath();
        ctx.arc(currentX, currentY, Math.max(0.5, currentSize), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-field-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
};

export default ParticleField;
