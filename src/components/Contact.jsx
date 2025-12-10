import "../styles/Contact.css";
// You might want to import a relevant icon here, like FaEnvelope or FaHandshake
// import { FaEnvelope, FaHandshake } from "react-icons/fa"; 

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      
      {/* 1. Stronger, more direct main heading */}
      <h2 className="contact-title">
        <span className="my-custom-line"></span>
        Ready to Launch Your Next Project? 
        <span className="my-custom-line"></span>
      </h2>
      
      {/* 2. Subheading emphasizes expertise and specific value */}
      <p className="contact-sub">
        I’m currently open to new <b>AI development</b>, <b>full-stack engineering</b>
        , and <b>consulting</b> opportunities. 
        Whether you need a custom LLM integration, an optimized data pipeline, or just a technical discussion on the latest trends, let's connect.
      </p>

      {/* 3. Actionable Contact Card/Button */}
      <div className="contact-card">
        <a
          className="btn-primary"
          href="mailto:lakshaymalik.dev@gmail.com"
        >
          {/* Enhanced CTA text */}
          Start the Conversation
        </a>
      </div>

      {/* 4. Clear fallback with direct email access */}
      <p className="contact-email">
        Or, send a direct message to: 
        <a href="mailto:lakshaymalik.dev@gmail.com">
          <strong>lakshaymalik.dev@gmail.com</strong>
        </a>
      </p>

      {/* 5. Professional closing note */}
      <p className="contact-note">
        I look forward to hearing about your project || opportunity! I typically reply within 24 hours.
      </p>
      
    </section>
  );
}