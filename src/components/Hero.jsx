import { useEffect, useRef } from "react";
import "../styles/Hero.css";

export default function Hero() {
  const maskRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mask = maskRef.current;
      if (!mask) return;

      const x = e.clientX;
      const y = e.clientY;

      mask.style.left = `${x}px`;
      mask.style.top = `${y}px`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="hero" className="hero">
      {/* Hero portrait */}
      <img src="/hero-sketch.png" alt="Portrait" className="hero-bg" />

      {/* Circular mask following cursor */}
      <div className="hero-mask" ref={maskRef}></div>

      {/* Hero content */}
      <div className="hero-content fade-in">
        <h1>Hello, I’m <span className="highlight">Lakshay Malik</span></h1>
        <h2 className="typing">Web Developer | AI Enthusiast | Engineer</h2>
        <p>I build modern, scalable web applications and AI-driven solutions.</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn">View Projects</a>
          <a href="https://drive.google.com/file/d/1dDYWzpLLSjM_h-hzlOKeurRt3sIgsw6i/view?usp=drive_link" target="_blank" rel="noreferrer" className="btn btn-outline">Download Resume</a>
        </div>
      </div>
    </section>
  );
}
