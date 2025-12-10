import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import '../styles/PostPage.css';

// Use Vite's glob import to get ALL markdown files
// Adjust the path if necessary (e.g., '../../content/blog/*.md')
const allPosts = import.meta.glob('../../content/blog/*.md', { as: 'raw' });

const PostPage = () => {
    // Get the dynamic part of the URL (the 'slug', e.g., 'my-first-post')
    const { slug } = useParams(); 
    
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            
            // 1. Construct the expected file path
            const targetPath = `../../content/blog/${slug}.md`;

            // 2. Find the corresponding module import function
            const importFunc = allPosts[targetPath];

            if (!importFunc) {
                setError(`Post not found: ${slug}`);
                setLoading(false);
                return;
            }

            try {
                // 3. Import and read the raw Markdown content
                const rawContent = await importFunc();
                
                // 4. Parse the content and frontmatter
                const { data, content } = matter(rawContent);

                setPostData({
                    title: data.title || 'Untitled Post',
                    // 💡 FIX 1: Add the author field from Frontmatter (data.author)
                    author: data.author || 'Unknown Author', 
                    date: new Date(data.date).toLocaleDateString(),
                    content: content,
                });
                
            } catch (err) {
                console.error("Error loading post:", err);
                setError("Failed to load blog post content.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPost();
        }
    }, [slug]);


    if (loading) {
        return <div className="post-container loading-state">Loading post...</div>;
    }

    if (error) {
        return <div className="post-container error-state">Error: {error}</div>;
    }

    if (!postData) {
        // Fallback for cases where slug is missing or post isn't found
        return <div className="post-container error-state">Post not found.</div>;
    }

    // --- Render the Blog Post ---
    return (
        <article className="post-container">
            <header className="post-header">
                <h1 className="post-title">{postData.title}</h1>
                {/* 💡 FIX 2: Display the Author alongside the Date */}
                <p className="post-meta">
                    By: {postData.author} | Published on: {postData.date}
                </p>
                <hr className="post-divider"/>
            </header>
            
            {/* ReactMarkdown renders the Markdown content as HTML */}
            <div className="post-content">
                <ReactMarkdown>{postData.content}</ReactMarkdown>
            </div>
        </article>
    );
};

export default PostPage;