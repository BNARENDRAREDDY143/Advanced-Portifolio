import React, { useEffect, useRef } from 'react';
import './ParticleEffect.css';

const ParticleEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Particle system
    const particles = [];
    const mousePos = { x: 0, y: 0 };

    class Particle {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 50;
        this.y = y + (Math.random() - 0.5) * 50;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.01;
        this.color = ['#00d4ff', '#ff006e', '#8338ec'][Math.floor(Math.random() * 3)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= this.decay;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const handleMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;

      // Create particles on mouse movement
      if (Math.random() > 0.7) {
        particles.push(new Particle(mousePos.x, mousePos.y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].opacity <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-effect"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleEffect;
