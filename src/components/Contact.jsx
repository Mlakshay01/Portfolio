import "../styles/Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact">

      <h2 className="contact-title">
        <span className="my-custom-line"></span>
        Let's Build Something Meaningful
        <span className="my-custom-line"></span>
      </h2>

      <p className="contact-sub">
        I'm currently seeking opportunities as an <b>AI Engineer</b> or
        <b> Software Engineer</b>. Whether you're building intelligent AI
        systems, scalable backend services, or innovative software products,
        I'd love to connect and explore how we can build something impactful
        together.
      </p>

      <div className="contact-card">
        <a
          className="btn-primary"
          href="mailto:lakshaymalik.dev@gmail.com"
        >
          Get In Touch
        </a>
      </div>

      <p className="contact-email">
        Prefer email?
        <a href="mailto:lakshaymalik.dev@gmail.com">
          <strong> lakshaymalik.dev@gmail.com</strong>
        </a>
      </p>

      <p className="contact-note">
        Whether it's a full-time opportunity, internship, research collaboration,
        freelance project, or simply a conversation about AI and software
        engineering, my inbox is always open. I typically respond within 24 hours.
      </p>

    </section>
  );
}