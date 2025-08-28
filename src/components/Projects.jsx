import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import "../styles/Projects.css";

const projects = [
  {
    title: "🤖 Autonomous Multi-Chatbot Platform",
    desc: "A no-code chatbot builder supporting 10+ avatars, roles, and themes. Integrated RAG pipelines with FAISS + LLaMA 3.2 for context-aware responses (92% query relevance).",
    github: "https://github.com/Mlakshay01/Autonomous-Multi-Chatbot-Platform",
  },
  {
    title: "📚 MindRoute – AI Learning Roadmap Generator",
    desc: "An AI-powered personalized roadmap generator improving recommendation accuracy by 35%. Uses FAISS + LLM for real-time <1.2s query search.",
    github: "https://github.com/Mlakshay01/RAG-Roadmap-Generator",
  },
  {
    title: "🔎 Named Entity Recognition with BERT",
    desc: "Fine-tuned BERT on CoNLL-2003 achieving F1: 0.89, Accuracy: 97.15%. Optimized training with token alignment for 20% faster convergence.",
    github: "https://github.com/Mlakshay01/BERT-NER-FINE-TUNED",
  },
  {
    title: "🌙 Moon-Mom",
    desc: "An experimental project exploring AI-driven automation workflows and smart system design. Focuses on modular architecture and scalable AI agent pipelines.",
    live: "https://moon-mom.vercel.app/",
    github: "https://github.com/Mlakshay01/Moon-Mom",
  },
];

export default function Projects() {
  const highlightWords = ["AI", "FAISS", "LLaMA", "NER", "BERT", "LLM"];

  return (
    <section id="projects" className="section projects">
      <h2 className="mask-text">My Work</h2>
      <div className="project-grid irregular">
        {projects.map((p, i) => (
          <div className={`project-card project-${i}`} key={i}>
            <h3 className="mask-text">{p.title}</h3>
            <p>
              {p.desc.split(" ").map((word, idx) => {
                const cleaned = word.replace(/[^a-zA-Z]/g, "");
                if (highlightWords.includes(cleaned)) {
                  return (
                    <span key={idx} className="highlight">
                      {word}{" "}
                    </span>
                  );
                }
                return word + " ";
              })}
            </p>

            <div className="project-links">
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-link"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="icon-link"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
