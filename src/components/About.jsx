import "../styles/About.css";
import { useEffect, useState } from "react";

// Skills organized around capabilities rather than technologies
const skillsData = {
  "AI & Machine Learning": [
    "Python",
    "PyTorch",
    "TensorFlow",
    "Computer Vision",
    "Scikit-learn"
  ],

  "Generative AI": [
    "Transformers",
    "RAG",
    "Embeddings",
    "LLM Orchestration",
    "Prompt Engineering"
  ],

  "Backend & AI Systems": [
    "FastAPI",
    "REST APIs",
    "Docker",
    "Vector Databases",
    "MongoDB"
  ],

  "Software Engineering": [
    "C++",
    "Node.js",
    "React",
    "Git",
    "Data Structures & Algorithms"
  ]
};

export default function About() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMouse = (e) => {
      const aboutElement = document.querySelector(".section.about");
      if (!aboutElement) return;

      const { innerWidth, innerHeight } = window;

      const rotX = (e.clientX / innerWidth - 0.5) * 10;
      const rotY = (e.clientY / innerHeight - 0.5) * 10;

      aboutElement.style.transform = `rotateY(${rotX}deg) rotateX(${-rotY}deg)`;
    };

    window.addEventListener("mousemove", handleMouse);

    setTimeout(() => setVisible(true), 300);

    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      <section id="about" className="section about">
        <h2 className="about-title mask-text">
          Building <span className="neon">Scalable AI Systems</span> &
          <span className="neon"> Intelligent Software</span>
        </h2>

        <p className={`about-text ${visible ? "visible" : ""}`}>
          I am an <b><i>AI Engineer</i></b> and <b><i>Software Engineer</i></b>  who is
          passionate about designing intelligent systems that bridge machine
          learning with production-grade software. My interests span
          <span className="liquid"> Generative AI</span>,
          <span className="liquid"> Machine Learning</span>,
          <span className="liquid"> Backend Engineering</span>, and 
          <span className="liquid"> scalable AI infrastructure</span>.
        </p>

        <p className={`about-text ${visible ? "visible" : ""}`}>
          I enjoy understanding how systems work beneath the surface and
          applying that knowledge to build real-world AI solutions—from
          <b><i> RAG pipelines</i></b> and
          <b><i> multimodal machine learning models</i></b> to
          <b><i> scalable backend services</i></b>. Alongside building, I
          regularly write technical articles to deepen my understanding and
          share what I learn with the developer community.
        </p>

        <h3 className={`skills-heading mask-text ${visible ? "visible" : ""}`}>
          Core Technical Skills
        </h3>

        <div className={`skills-section ${visible ? "visible" : ""}`}>
          {Object.entries(skillsData).map(([category, skills], idx) => (
            <div key={idx} className="skill-row">
              <h4 className="skill-heading">{category}</h4>

              <div className="skill-list centered">
                {skills.map((skill, i) => (
                  <span key={i} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}