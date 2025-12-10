import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ⬅️ ADDED ROUTING IMPORTS
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SocialSidebar from "./components/Sidebar";
import Blogs from "./components/Blogs";
import PostPage from "./components/PostPage";
import BlogIndexPage from "./components/BlogIndexPage";

gsap.registerPlugin(ScrollTrigger);

// =======================================================
// HELPER COMPONENT: Renders the full portfolio layout
// =======================================================
// This component now contains all the sections that make up the homepage.
const PortfolioSections = () => (
    <>
        <SocialSidebar/>
        <Hero />
        <section className="section">
            <About />
        </section>
        <section className="section">
            <Projects />
        </section>
        <section className="section">
            {/* 🛑 Added .section class wrapper to ensure Blogs component gets the GSAP animation */}
            <Blogs/>
        </section>
        <section className="section">
            <Contact />
        </section>
    </>
);


// =======================================================
// MAIN APP COMPONENT (Handles Loader, GSAP Init, and Routes)
// =======================================================

export default function App() {
    const [loading, setLoading] = useState(true);
    const [contentMounted, setContentMounted] = useState(false);

    // [LOADER LOGIC: MIN DURATION]
    useEffect(() => {
        const MIN = 600;
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

    // [LOADER LOGIC: CONTENT MOUNT]
    useEffect(() => {
        if (!loading) {
            const t = setTimeout(() => setContentMounted(true), 540);
            return () => clearTimeout(t);
        }
    }, [loading]);

    // [GSAP ANIMATIONS INIT] - This runs on every route change, but only targets elements 
    // present on the homepage (which is what we want).
    useEffect(() => {
        if (!contentMounted) return;

        // Animate Hero elements
        gsap.from(".hero .title", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" });
        gsap.from(".hero .subtitle", { y: 20, opacity: 0, duration: 0.9, delay: 0.15, ease: "power3.out" });

        // ScrollTrigger animations for all sections
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
    }, [contentMounted]); // Note: contentMounted acts as the trigger for re-init

    // [BODY OVERFLOW CONTROL]
    useEffect(() => {
        if (loading) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [loading]);

    return (
        <Router> 
            {loading && <Loader setLoading={setLoading} />}
            
            {contentMounted && (
                <div className="app">
                    <Navbar />
                    <Routes>
                        {/* 1. Portfolio Homepage Route */}
                        <Route 
                            path="/" 
                            element={<PortfolioSections />} 
                        />

                        {/* 2. Blog Index/View All Articles Route ⬅️ NEW ROUTE */}
    <Route 
        path="/blog" 
        element={
            <>
                <Navbar /> {/* Keep Navbar for navigation */}
                <BlogIndexPage /> 
            </>
        } 
    />
                        
                        {/* 3. Individual Blog Post Route (MUST be after the /blog route) */}
                        <Route 
                            path="/blog/:slug" 
                            element={<PostPage />} 
                        />
                        
                        {/* You might want a dedicated /blog route for the index page, 
                            but for now, the teaser links to the individual pages. */}
                        
                        {/* Optional 404 Route */}
                        <Route 
                            path="*" 
                            element={
                                <div style={{padding: '100px', textAlign: 'center'}}>
                                    <h1>404</h1>
                                    <p>Page not found</p>
                                </div>
                            } 
                        />
                    </Routes>
                </div>
            )}
        </Router>
    );
}