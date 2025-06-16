// Change file extension to .jsx for Vite compatibility with JSX syntax

import React from 'react';
import BlogPostItem from './BlogPostItem.jsx';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts, onPostClick, onDeleteClick }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No blog posts available.</p>
      </div>
    );
  }
  
  return (
    <div className={styles.blogPostList}>
      {posts.map((post) => (
        <BlogPostItem
          key={post.id}
          title={post.title}
          summary={post.summary}
          date={post.date}
          onClick={() => onPostClick(post.id)}
          onDelete={() => onDeleteClick(post)}
        />
      ))}
    </div>
  );
};

export default BlogPostList;