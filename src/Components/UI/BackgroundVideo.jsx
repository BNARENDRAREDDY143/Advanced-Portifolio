import React, { useState, useRef, useEffect } from 'react';
import '../styles/BackgroundVideo.css';

const BackgroundVideo = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [bgStyleIndex, setBgStyleIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const backgroundVideos = [
    {
      id: 'cyber-nebula',
      name: 'Cyber Neural Nebula',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-curved-lines-of-light-on-a-black-background-41487-large.mp4',
      geminiLink: 'https://share.gemini.google/3VEFYaUwlwtr'
    },
    {
      id: 'deep-space',
      name: 'Deep Cosmos Warp',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-flying-through-a-starfield-in-deep-space-32986-large.mp4',
      geminiLink: 'https://share.gemini.google/3VEFYaUwlwtr'
    },
    {
      id: 'neon-tunnel',
      name: 'Quantum Data Flow',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-tunnel-of-futuristic-neon-lights-41586-large.mp4',
      geminiLink: 'https://share.gemini.google/3VEFYaUwlwtr'
    }
  ];

  const currentBg = backgroundVideos[bgStyleIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => {
        setIsPaused(false);
      }).catch(() => {
        // Autoplay may be restricted in some browsers
      });
    }
  }, [bgStyleIndex]);

  const togglePause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const cycleBg = () => {
    setBgStyleIndex((prev) => (prev + 1) % backgroundVideos.length);
  };

  return (
    <div className="ambient-background-video-wrapper">
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        className={`ambient-bg-video ${isVideoLoaded ? 'loaded' : ''}`}
        src={currentBg.src}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
      />

      {/* Cyber Grid & Color Filter Overlays for Maximum Text Legibility */}
      <div className="bg-video-color-overlay"></div>
      <div className="bg-video-vignette-overlay"></div>
      <div className="bg-video-scanline-grid"></div>

      {/* Subtle Floating Ambiance Controls */}
      <div className="ambient-bg-controls" title="Ambient Video Background Controls">
        <button
          className="ambient-ctrl-btn"
          onClick={cycleBg}
          title={`Switch Background (${currentBg.name})`}
        >
          <span>🌌 {currentBg.name.split(' ')[0]}</span>
        </button>
        <button
          className="ambient-ctrl-btn pause-toggle"
          onClick={togglePause}
          title={isPaused ? 'Resume Ambient Video' : 'Pause Ambient Video'}
        >
          <span>{isPaused ? '▶' : '⏸'}</span>
        </button>
      </div>
    </div>
  );
};

export default BackgroundVideo;
