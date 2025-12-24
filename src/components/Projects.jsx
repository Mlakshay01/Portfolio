import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import "../styles/Projects.css";

const projects = [
  {
    title: "🔗 Hybrid ACO-PSO Link Predictor",
    desc: "Engineered a novel hybrid metaheuristic technique for link prediction in social networks by integrating Ant Colony Optimization (ACO) for community detection and Particle Swarm Optimization (PSO) for feature weight tuning. Achieved a near-perfect AUC of 0.9931 on the Facebook dataset, significantly outperforming standalone algorithms through optimized topological measures.",
    github: "https://github.com/Mlakshay01/ACO-PSO-HYBRID-ALGO", 
  },
  {
    title: "🤖 Multi-Agent AI Orchestration Benchmark",
    desc: "Architected a research-driven evaluation platform to benchmark Multi-Agent Systems (MAS) including LangChain, CrewAI, and AutoGen. Evaluated complex task automation and code generation using LLaMA 3.2 via Ollama, providing real-time performance analytics and token-cost comparisons through an interactive Streamlit dashboard.",
    github: "https://github.com/Mlakshay01/Empirical-Evaluation-of-Multi-Agent-Orchestration-Frameworks-for-Complex-Task-Automation",
  },
  {
    title: "🤖 Autonomous Multi-Chatbot Platform",
    desc: "Developed a full-stack, no-code chatbot builder featuring Retrieval-Augmented Generation (RAG) pipelines. Integrated FAISS vector databases and LLaMA 3.2 to deliver context-aware responses with 92% query relevance, supporting multiple AI personas, custom roles, and dynamic UI themes.",
    github: "https://github.com/Mlakshay01/Autonomous-Multi-Chatbot-Platform",
  },
  {
    title: "📚 MindRoute – AI Learning Roadmap Generator",
    desc: "Designed an AI-powered personalized roadmap generator that improved content recommendation accuracy by 35%. Leveraged semantic search via FAISS and Large Language Models (LLMs) to provide real-time, sub-1.2s query execution for customized educational paths.",
    github: "https://github.com/Mlakshay01/RAG-Roadmap-Generator",
  },
  {
    title: "🔎 Named Entity Recognition with BERT",
    desc: "Fine-tuned a BERT transformer model on the CoNLL-2003 dataset, achieving an F1-score of 0.89 and 97.15% accuracy. Optimized the NLP training pipeline with token alignment and custom training loops in PyTorch, resulting in 20% faster convergence rates.",
    github: "https://github.com/Mlakshay01/BERT-NER-FINE-TUNED",
  },
  {
    title: "🌙 Moon-Mom (E-commerce Platform)",
    desc: "Launched a responsive Full-Stack e-commerce platform for a retail brand using React.js . Implemented a dynamic product catalog, intuitive UI/UX design, and optimized state-managed shopping cart functionality with a focus on mobile-first performance and SEO visibility.",
    live: "https://moon-mom.vercel.app/",
    github: "https://github.com/Mlakshay01/Moon-Mom",
  },
  {
    title: "🧙‍♂️ WizardZ – Marketing Architecture",
    desc: "Built a modern digital marketing website featuring high-performance animations and smooth-scroll UI components. Optimized frontend delivery using React and advanced CSS techniques to ensure cross-browser compatibility and rapid page load speeds.",
    live: "https://mlakshay01.github.io/Marketing-Website/",
    github: "https://github.com/Mlakshay01/Marketing-Website",
  },
  {
    title: "📄 AI Resume & ATS Analyzer",
    desc: "Engineered a full-stack AI platform to automate resume screening using FastAPI and PostgreSQL . Utilized local LLMs via Ollama to extract structured data and generate ATS scores, quality ratings, and personalized career improvement recommendations.",
    github: "https://github.com/Mlakshay01/Resume-Analyzer",
  },
  {
    title: "🖼️ SnapFind – Real-Time Image Search",
    desc: "Developed a lightweight, high-speed image search application using Vanilla JavaScript and RESTful APIs . Implemented asynchronous data fetching and responsive UI design to allow users to search, preview, and download assets in real-time.",
    live: "https://mlakshay01.github.io/ImageSEARCHapp/",
    github: "https://github.com/Mlakshay01/ImageSEARCHapp",
  },
];

export default function Projects() {
  const highlightWords = [
    "AI", "LLM", "LLMs", "LLaMA", "BERT", "PyTorch", "React", "React.js", 
    "FastAPI", "PostgreSQL", "Python", "RAG", "FAISS", "Vector", 
    "Transformers", "NLP", "NER", "Multi-Agent", "Retrieval-Augmented",
    "ACO", "PSO", "Metaheuristic", "Optimization", "AUC", "Topological", 
    "Hybrid", "Full-Stack", "Architecture", "Automation", "Benchmarking", 
    "Engineered", "RESTful APIs", "Vanilla JavaScript", "CSS"
  ];

  return (
    <section id="projects" className="section projects">
      <h2 className="mask-text">My Work</h2>
      <div className="project-grid irregular">
        {projects.map((p, i) => (
          <div className={`project-card project-${i}`} key={i}>
            <h3 className="mask-text">{p.title}</h3>
            <p>
              {p.desc.split(" ").map((word, idx, array) => {
                // 1. Clean the word but KEEP hyphens and dots (for React.js)
                const cleaned = word.replace(/[^a-zA-Z.-]/g, "").toLowerCase();
                
                // 2. Check for single word match
                const isSingleMatch = highlightWords.some(
                  (h) => h.toLowerCase() === cleaned
                );

                // 3. Check for multi-word phrase match (e.g., "RESTful APIs")
                // This checks if the current word + the next word matches a phrase
                const nextWord = array[idx + 1] ? array[idx + 1].replace(/[^a-zA-Z.-]/g, "").toLowerCase() : "";
                const phrase = `${cleaned} ${nextWord}`;
                const isPhraseMatch = highlightWords.some(
                  (h) => h.toLowerCase() === phrase
                );

                // 4. Special handling: if this word is the start of a matched phrase, highlight it
                // If the PREVIOUS word was the start of a phrase, highlight this one too
                const prevWord = array[idx - 1] ? array[idx - 1].replace(/[^a-zA-Z.-]/g, "").toLowerCase() : "";
                const prevPhrase = `${prevWord} ${cleaned}`;
                const isPartOfPrevPhrase = highlightWords.some(
                  (h) => h.toLowerCase() === prevPhrase
                );

                if (isSingleMatch || isPhraseMatch || isPartOfPrevPhrase) {
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
                <a href={p.live} target="_blank" rel="noreferrer" className="icon-link">
                  <FaExternalLinkAlt />
                </a>
              )}
              <a href={p.github} target="_blank" rel="noreferrer" className="icon-link">
                <FaGithub />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}