import { FaLinkedin, FaGithub } from "react-icons/fa";
import "../styles/Sidebar.css";

export default function SocialSidebar() {
  return (
    <div className="social-sidebar">
      <a
        href="https://www.linkedin.com/in/lakshay-malik-4b925524b/"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
      >
        <FaLinkedin />
      </a>
      <a
        href="https://github.com/Mlakshay01"
        target="_blank"
        rel="noreferrer"
        className="social-icon"
      >
        <FaGithub />
      </a>
    </div>
  );
}
