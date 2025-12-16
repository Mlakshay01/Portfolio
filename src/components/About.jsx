import "../styles/About.css"; 
import { useEffect, useState } from "react";

// Categorized skills: Heavily weighted towards Systems and GenAI
const skillsData = {
  "GenAI & LLM Systems": ["Python", "C++", "FastAPI", "LLaMA 3.2", "HuggingFace"], // Core AI + Performance Languages
  "AI/ML Infrastructure": ["FAISS", "Vector Databases", "Deployment", "Docker"], // Deployment and Data Storage
  "Backend & API Design": ["Node.js", "REST APIs", "MongoDB", "Git"], // Essential Software Engineering
  "Frontend Fundamentals": ["React.js", "Tailwind CSS", "HTML", "CSS", "JS"] // Acknowledging basic skills
};

export default function About() {
  const [visible, setVisible] = useState(false);

  // Mouse tilt effect
  useEffect(() => {
    const handleMouse = (e) => {
      const aboutElement = document.querySelector(".section.about");
      if (!aboutElement) return; // Guard clause
      
      const { innerWidth, innerHeight } = window;
      const rotX = (e.clientX / innerWidth - 0.5) * 10;
      const rotY = (e.clientY / innerHeight - 0.5) * 10;
      
      aboutElement.style.transform = `rotateY(${rotX}deg) rotateX(${-rotY}deg)`;
    };
    
    window.addEventListener("mousemove", handleMouse);

    // Show content after mount
    setTimeout(() => setVisible(true), 300);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    // Using a Fragment <>...</> to ensure React returns only one top-level element, 
    // which guarantees no 'Adjacent JSX elements' error at the root level.
    <> 
      <section id="about" className="section about">
        <h2 className="about-title mask-text">
          Engineering <span className="neon">GenAI Agents</span> for <span className="neon">High Performance</span>
        </h2>

        {/* IMPROVEMENT 1: Focus on C++/Systems and Agent Development */}
        <p className={`about-text ${visible ? "visible" : ""}`}>
          I am a <b><i>Systems Engineer </i></b>specializing in <b><i>GenAI</i></b>, crafting <span className="liquid">low-latency</span>, 
          <span className="liquid"> resource-efficient</span>, and <span className="liquid">deployable</span> AI Agents.
        </p>
        
        {/* IMPROVEMENT 2: Explicitly link C++ and Deployment goals */}
        <p className={`about-text ${visible ? "visible" : ""}`}>
          My expertise lies in optimizing core components using <b><i>C++</i></b>, building <b><i>RAG pipelines</i></b> with
          <span className="neon"> FAISS</span>, and focusing on <b><i>deployment</i></b> for robust, real-world chatbot and 
          AI solutions.
        </p>

        {/* Updated heading */}
        <h3 className={`skills-heading mask-text ${visible ? "visible" : ""}`}>
          Core Technical Stacks
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
    </>
  );
}