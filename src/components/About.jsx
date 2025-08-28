import "../styles/About.css"; 
import { useEffect, useState } from "react";

// Categorized skills
const skillsData = {
  "Languages & Frameworks": ["React.js", "Node.js", "FastAPI", "Flask", "Python"],
  "Frontend & Styling": ["Tailwind CSS", "CSS", "HTML", "JS"],
  "Databases & APIs": ["MongoDB", "REST APIs", "FAISS"],
  "AI & Tools": ["HuggingFace", "LLaMA 3.2", "Git"]
};

export default function About() {
  const [visible, setVisible] = useState(false);

  // Mouse tilt effect
  useEffect(() => {
    const handleMouse = (e) => {
      const about = document.querySelector(".section.about");
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 10;
      const y = (e.clientY / innerHeight - 0.5) * 10;
      about.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    window.addEventListener("mousemove", handleMouse);

    // Show content after mount
    setTimeout(() => setVisible(true), 300);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section id="about" className="section about">
      <h2 className="about-title mask-text">
        Building <span className="neon">AI & Web</span> Experiences
      </h2>

      <p className={`about-text ${visible ? "visible" : ""}`}>
        I craft <span className="liquid">interactive</span>, 
        <span className="liquid"> scalable</span>, and 
        <span className="liquid"> futuristic</span> products that feel alive.
      </p>
      <p className={`about-text ${visible ? "visible" : ""}`}>
        My approach: <span className="neon">Innovate</span> & 
        <span className="neon"> Deliver</span> with precision.
      </p>

      {/* Updated heading */}
      <h3 className={`skills-heading mask-text ${visible ? "visible" : ""}`}>
        My Expertise
      </h3>

      <div className={`skills-section ${visible ? "visible" : ""}`}>
        {Object.entries(skillsData).map(([category, skills], idx) => (
          <div key={idx} className="skill-row">
            <h4 className="skill-heading">{category}</h4>
            <div className="skill-list centered">
              {skills.map((skill, i) => (
                <span key={i} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
