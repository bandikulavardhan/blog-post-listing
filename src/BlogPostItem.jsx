// Change file extension to .jsx for Vite compatibility with JSX syntax

import React from 'react';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ title, summary, date, onClick }) => (
  <div className={styles.blogPostItem} onClick={onClick} style={{cursor: 'pointer'}}>
    <h3>{title}</h3>
    <p>{summary}</p>
    <small>{date}</small>
  </div>
);

export default BlogPostItem;