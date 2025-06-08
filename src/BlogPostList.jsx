// Change file extension to .jsx for Vite compatibility with JSX syntax

import React from 'react';
import BlogPostItem from './BlogPostItem.jsx';
import styles from './BlogPostList.module.css';

const BlogPostList = ({ posts, onPostClick }) => {
  if (!posts || posts.length === 0) {
    return <p>No blog posts available.</p>;
  }
  return (
    <div className={styles.blogPostList}>
      <h2>Blog Posts</h2>
      {posts.map((post) => (
        <BlogPostItem
          key={post.id}
          title={post.title}
          summary={post.summary}
          date={post.date}
          onClick={() => onPostClick(post.id)}
        />
      ))}
    </div>
  );
};

export default BlogPostList;