import "../styles/Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <h2 className="contact-title"><hr className="my-custom-line"></hr>Let’s Build Something Awesome Together<hr className="my-custom-line"></hr></h2>
      <p className="contact-sub">
        I’m always excited to connect with like-minded creators, developers, and innovators.  
        Whether it’s a project, collaboration, or just a friendly chat about AI & tech — I’d love to hear from you!
      </p>

      <div className="contact-card">
        <a
          className="btn-primary"
          href="mailto:lakshaymalik.dev@gmail.com"
        >
          Say Hello
        </a>
      </div>

      <p className="contact-email">
        Prefer email? Reach me at: <strong>lakshaymalik.dev@gmail.com</strong>
      </p>

      <p className="contact-note">
        I usually respond within 24 hours. Let’s make your idea come to life!
      </p>
    </section>
  );
}
