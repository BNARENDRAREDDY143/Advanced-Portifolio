import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isPointerRef = useRef(false);
  const isClickedRef = useRef(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let animId;

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      const target = e.target;
      const isClickable =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('clickable') ||
        target.closest('.tilt-card-container') ||
        target.closest('.shape-btn') ||
        target.closest('.filter-pill-btn') ||
        target.closest('.skills-tab-btn');

      if (isClickable !== isPointerRef.current) {
        isPointerRef.current = !!isClickable;
        if (isPointerRef.current) {
          dot.style.transform = 'translate(-50%, -50%) scale(1.4)';
          dot.style.backgroundColor = 'var(--primary-color, #00f0ff)';
          dot.style.boxShadow = '0 0 16px var(--primary-color, #00f0ff)';
          ring.style.transform = 'translate(-50%, -50%) scale(1.3)';
          ring.style.borderColor = 'var(--primary-color, #00f0ff)';
          ring.style.backgroundColor = 'rgba(0, 240, 255, 0.08)';
        } else {
          dot.style.transform = 'translate(-50%, -50%) scale(1)';
          dot.style.backgroundColor = '#ffffff';
          dot.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
          ring.style.transform = 'translate(-50%, -50%) scale(1)';
          ring.style.borderColor = 'rgba(255, 255, 255, 0.35)';
          ring.style.backgroundColor = 'transparent';
        }
      }
    };

    const handleMouseDown = () => {
      isClickedRef.current = true;
      if (dot) dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
      if (ring) ring.style.transform = 'translate(-50%, -50%) scale(0.85)';
    };

    const handleMouseUp = () => {
      isClickedRef.current = false;
      if (dot) dot.style.transform = isPointerRef.current ? 'translate(-50%, -50%) scale(1.4)' : 'translate(-50%, -50%) scale(1)';
      if (ring) ring.style.transform = isPointerRef.current ? 'translate(-50%, -50%) scale(1.3)' : 'translate(-50%, -50%) scale(1)';
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      if (dot) dot.style.opacity = '0';
      if (ring) ring.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const render = () => {
      // Smooth ring lerp
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.22;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.22;

      dot.style.left = `${mousePos.current.x}px`;
      dot.style.top = `${mousePos.current.y}px`;

      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          width: '7px',
          height: '7px',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'transform 0.15s ease, background-color 0.2s ease, opacity 0.2s ease',
          willChange: 'left, top, transform'
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          width: '34px',
          height: '34px',
          border: '1.5px solid rgba(255, 255, 255, 0.35)',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          transition: 'transform 0.18s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
          willChange: 'left, top, transform'
        }}
      />
    </>
  );
};

export default CustomCursor;

