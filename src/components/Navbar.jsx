import { FaLinkedin } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ IMPORTED Link and useNavigate
import React from 'react';

// Helper function to handle scrolling after navigation
const scrollToSection = (hash) => {
    // We delay the scroll slightly to ensure the home page has time to render
    setTimeout(() => {
        const section = document.querySelector(hash);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100); 
};

export default function Navbar() {
    const navigate = useNavigate();

    // Handles click: always navigate to home, then scroll to section
    const handleNavClick = (hash) => (e) => {
        e.preventDefault();
        
        // Check if we are already on the home page ('/')
        if (window.location.pathname === '/') {
            scrollToSection(hash);
        } else {
            // Navigate to home page and pass the hash/section ID as state
            navigate('/', { state: { scrollTo: hash } });
        }
    };
    
    // --- Navbar Structure ---
    return (
      <nav className="navbar">
        <h2 className="logo">
            {/* Logo always navigates to the top of the homepage */}
            <Link to="/" onClick={() => scrollToSection("#hero")}>Lakshay Malik</Link>
        </h2>
        <ul>
            {/* Use Link components with the new handler */}
            <li><Link to="/#about" onClick={handleNavClick("#about")}>About</Link></li>
            <li><Link to="/#projects" onClick={handleNavClick("#projects")}>Work</Link></li>
            <li><Link to="/#blogs" onClick={handleNavClick("#blogs")}>Blogs</Link></li>
            <li><Link to="/#contact" onClick={handleNavClick("#contact")}>Contact</Link></li>
        </ul>
      </nav>
  );
}