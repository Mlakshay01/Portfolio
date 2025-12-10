import React, { useState, useEffect } from "react";
import matter from 'gray-matter'; // Used to parse the YAML Frontmatter
import "../styles/Blogs.css";

// Use Vite's glob feature to import all Markdown files from the content/blog folder
// The structure is assumed to be: project_root/content/blog/*.md
const posts = import.meta.glob('../../content/blog/*.md', { as: 'raw' });

export default function Blogs() {
    const [latestPosts, setLatestPosts] = useState([]);
    // 💡 NEW STATE: Store the total count of all articles found
    const [totalPostCount, setTotalPostCount] = useState(0); 
    
    // Function to process all imported Markdown files
    useEffect(() => {
        const fetchPosts = async () => {
            const loadedPosts = [];
            
            // Loop through each dynamically imported file
            for (const path in posts) {
                // posts[path]() returns a promise with the raw file content
                const rawContent = await posts[path](); 
                
                // Use gray-matter to separate the Frontmatter (data) from the post body (content)
                const { data } = matter(rawContent);
                
                // Create a clean slug/link from the file name
                const slug = path.split('/').pop().replace('.md', '');

                loadedPosts.push({
                    id: slug,
                    title: data.title || 'Untitled Post',
                    // Use a dedicated 'excerpt' field in frontmatter, or a default
                    excerpt: data.excerpt || 'Check out this new post!', 
                    link: `/blog/${slug}`, 
                    date: new Date(data.date), // Use the date for sorting
                });
            }

            // 1. 💡 FIX: Set the total count before sorting and slicing
            setTotalPostCount(loadedPosts.length);

            // 2. Sort posts by date (newest first)
            loadedPosts.sort((a, b) => b.date - a.date);
            
            // 3. Set the state with only the top 3 posts
            setLatestPosts(loadedPosts.slice(0, 3));
        };

        fetchPosts();
    }, []);
    
    return(
        <section className="blogs-section" id="blogs">
            <div className="blog-posts-container">
                <div className="title-container">
                    <h2 className="section-title">
                        {/* Rotated heading element is now a div for better rendering */}
                        <div className="title-highlight-container">
                            <span className="title-highlight">Insights & Writings</span>
                        </div>
                        My Latest Blogs
                    </h2>
                    <div className="image"></div>
                </div>
                
                {/* Check if posts are loaded before mapping */}
                {latestPosts.length > 0 ? (
                    latestPosts.map(post => (
                        <a href={post.link} key={post.id} className="blog-card-link">
                            <article className="blog-card">
                                <h3 className="blog-card-title">{post.title}</h3>
                                <p className="blog-card-excerpt">{post.excerpt}</p>
                                <span className="read-more-link">Read Post &rarr;</span>
                            </article>
                        </a>
                    ))
                ) : (
                    // Display a loading state or a friendly message
                    <p className="loading-state">Loading latest posts...</p>
                )}

                {/* Call to Action for the main blog page */}
            <div className="view-all-container">
                <a href="/blog" className="view-all-button">
                    {/* 💡 FIX: Use the new state variable for the total count */}
                    View All Articles ({totalPostCount}) 
                </a>
            </div>
            </div>

            
        </section>
    );
}