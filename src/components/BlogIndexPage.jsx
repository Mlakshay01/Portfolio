// src/components/BlogIndexPage.jsx

import React, { useState, useEffect } from 'react';
import matter from 'gray-matter';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import '../styles/PostPage.css'; // You can reuse blog post styling

// Use Vite's glob feature to import all Markdown files
const allPosts = import.meta.glob('../../content/blog/*.md', { as: 'raw' });

export default function BlogIndexPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllPosts = async () => {
            const loadedPosts = [];
            for (const path in allPosts) {
                const rawContent = await allPosts[path]();
                const { data } = matter(rawContent);
                const slug = path.split('/').pop().replace('.md', '');

                loadedPosts.push({
                    id: slug,
                    title: data.title || 'Untitled Post',
                    excerpt: data.excerpt || 'Check out this new post!',
                    date: new Date(data.date),
                    link: `/blog/${slug}`,
                });
            }

            // Sort posts by date (newest first)
            loadedPosts.sort((a, b) => b.date - a.date);
            setPosts(loadedPosts);
            setLoading(false);
        };

        fetchAllPosts();
    }, []);

    if (loading) {
        return <div className="post-container loading-state">Loading articles...</div>;
    }

    return (
        // Re-using the post-container class for centered layout
        <div className="post-container" style={{ minHeight: 'auto', paddingTop: '100px' }}>
            <h1 className="post-title" style={{ textAlign: 'left', marginBottom: '40px' }}>All Articles ({posts.length})</h1>
            
            <div className="all-articles-list">
                {posts.map(post => (
                    <article key={post.id} className="article-preview">
                        <h2>
                            <Link to={post.link} className="post-link">
                                {post.title}
                            </Link>
                        </h2>
                        <p className="post-meta">Published: {post.date.toLocaleDateString()}</p>
                        <p>{post.excerpt}</p>
                        <hr style={{margin: '30px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)'}}/>
                    </article>
                ))}
            </div>
        </div>
    );
}