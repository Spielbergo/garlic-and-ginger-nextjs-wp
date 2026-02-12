'use client';

import { useState } from 'react';
import styles from './BlogSection.module.css';
import BlogGrid from './BlogGrid';

export default function BlogSection({ posts = [] }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const categories = [
    { id: 'ALL', label: 'ALL POSTS' },
    { id: 'GARLIC', label: 'GARLIC' },
    { id: 'GINGER', label: 'GINGER' },
    { id: 'CHILLIES', label: 'CHILLIES' },
  ];

  const filteredPosts = activeFilter === 'ALL' 
    ? posts 
    : posts.filter(post => {
        const postCategories = post.categories?.nodes || [];
        const categorySlugs = postCategories.map(cat => cat.slug);
        
        if (activeFilter === 'GARLIC') return categorySlugs.includes('garlic-blog');
        if (activeFilter === 'GINGER') return categorySlugs.includes('ginger-blog');
        if (activeFilter === 'CHILLIES') return categorySlugs.includes('chillies-blog');
        
        return true;
      });

  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>EXPLORE OUR ARTICLES</h2>
          <p className={styles.description}>
            Dive into the world of spicy cooking with insights, tips, and stories about garlic, ginger, and chillies.
          </p>
        </div>

        <div className={styles.filterBar}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.filterBtn} ${activeFilter === category.id ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <BlogGrid posts={filteredPosts} />
        
        {filteredPosts.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📝</span>
            <p className={styles.emptyText}>No posts found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
