import { useEffect, useRef } from "react";
import "../styles/Hero.css";

export default function Hero() {
  const maskRef = useRef(null);

  useEffect(() => {
    const mask = maskRef.current;
    if (!mask) return;

    const moveMask = (x, y) => {
      mask.style.left = `${x}px`;
      mask.style.top = `${y}px`;
    };

    // Mouse movement
    const handleMouseMove = (e) => moveMask(e.clientX, e.clientY);
    window.addEventListener("mousemove", handleMouseMove);

    // Touch movement for mobile
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        moveMask(touch.clientX, touch.clientY);
      }
    };
    window.addEventListener("touchmove", handleTouchMove);

    // Set initial mask position at center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    moveMask(centerX, centerY);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Hero portrait */}
      <img src="/hero-sketch.png" alt="Portrait" className="hero-bg" />

      {/* Circular mask following cursor / touch */}
      <div className="hero-mask" ref={maskRef}></div>

      {/* Hero content */}
      <div className="hero-content fade-in">
        <h1>
          Hello, I’m <span className="highlight">Lakshay Malik</span>
        </h1>
        <h2 className="typing">Web Developer | AI Enthusiast | Engineer</h2>
        <p>I build modern, scalable web applications and AI-driven solutions.</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn">
            View Projects
          </a>
          <a
            href="https://drive.google.com/file/d/1dDYWzpLLSjM_h-hzlOKeurRt3sIgsw6i/view?usp=drive_link"
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
