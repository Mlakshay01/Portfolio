import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import matter from "gray-matter";
import "../styles/Blogs.css";

// Import all markdown files
const posts = import.meta.glob("../../content/blog/*.md", { as: "raw" });

export default function Blogs() {
    const [latestPosts, setLatestPosts] = useState([]);
    const [totalPostCount, setTotalPostCount] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            // ---------- Check Cache ----------
            const cachedPosts = sessionStorage.getItem("blogMetadata");

            if (cachedPosts) {
                const parsed = JSON.parse(cachedPosts);
                setLatestPosts(parsed.latestPosts);
                setTotalPostCount(parsed.totalPostCount);
                return;
            }

            try {
                // ---------- Load All Markdown Files in Parallel ----------
                const loadedPosts = await Promise.all(
                    Object.entries(posts).map(async ([path, loader]) => {
                        const rawContent = await loader();
                        const { data } = matter(rawContent);

                        const slug = path.split("/").pop().replace(".md", "");

                        return {
                            id: slug,
                            title: data.title || "Untitled Post",
                            excerpt: data.excerpt || "Check out this new post!",
                            link: `/blog/${slug}`,
                            date: new Date(data.date),
                        };
                    })
                );

                // ---------- Sort Latest First ----------
                loadedPosts.sort((a, b) => b.date - a.date);

                const latest = loadedPosts.slice(0, 3);

                setLatestPosts(latest);
                setTotalPostCount(loadedPosts.length);

                // ---------- Cache ----------
                sessionStorage.setItem(
                    "blogMetadata",
                    JSON.stringify({
                        latestPosts: latest,
                        totalPostCount: loadedPosts.length,
                    })
                );
            } catch (err) {
                console.error("Failed to load blog posts:", err);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="blogs-section" id="blogs">
            <div className="blog-posts-container">
                <div className="title-container">
                    <h2 className="section-title">
                        <div className="title-highlight-container">
                            <span className="title-highlight">
                                Insights & Writings
                            </span>
                        </div>
                        My Latest Blogs
                    </h2>

                    <div className="image"></div>
                </div>

                {latestPosts.length > 0 ? (
                    latestPosts.map((post) => (
                        <Link
                            to={post.link}
                            key={post.id}
                            className="blog-card-link"
                        >
                            <article className="blog-card">
                                <h3 className="blog-card-title">
                                    {post.title}
                                </h3>

                                <p className="blog-card-excerpt">
                                    {post.excerpt}
                                </p>

                                <span className="read-more-link">
                                    Read Post &rarr;
                                </span>
                            </article>
                        </Link>
                    ))
                ) : (
                    <p className="loading-state">Loading latest posts...</p>
                )}

                <div className="view-all-container">
                    <Link to="/blog" className="view-all-button">
                        View All Articles ({totalPostCount})
                    </Link>
                </div>
            </div>
        </section>
    );
}