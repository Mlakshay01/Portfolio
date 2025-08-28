import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SocialSidebar from "./components/Sidebar";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  // loader state
  const [loading, setLoading] = useState(true);
  const [contentMounted, setContentMounted] = useState(false);

  // Wait for page assets (images/fonts) to load
  useEffect(() => {
    const MIN = 600; // minimum loader duration
    const startTime = performance.now();

    const onWindowLoad = () => {
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, MIN - elapsed);
      setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === "complete") onWindowLoad();
    else window.addEventListener("load", onWindowLoad);

    return () => window.removeEventListener("load", onWindowLoad);
  }, []);

  // Mount content only after loader removed
  useEffect(() => {
    if (!loading) {
      const t = setTimeout(() => setContentMounted(true), 540); // allow fade-out
      return () => clearTimeout(t);
    }
  }, [loading]);

  // GSAP animations when content mounts
  useEffect(() => {
    if (!contentMounted) return;

    gsap.from(".hero .title", {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.from(".hero .subtitle", {
      y: 20,
      opacity: 0,
      duration: 0.9,
      delay: 0.15,
      ease: "power3.out",
    });

    gsap.utils.toArray(".section").forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: "top 85%",
        onEnter: () => {
          gsap.fromTo(
            sec,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
          );
        },
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, [contentMounted]);

  // Hide scroll when loader is active
  useEffect(() => {
    if (loading) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [loading]);

  return (
    <>
      {loading && <Loader setLoading={setLoading} />}
      {contentMounted && (
        <div className="app">
          <Navbar />
          <SocialSidebar/>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </div>
      )}
    </>
  );
}
