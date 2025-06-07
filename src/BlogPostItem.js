import React from 'react';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ title, summary, date, url }) => (
  <div className={styles.blogPostItem}>
    <h2><a href={url}>{title}</a></h2>
    <p>{summary}</p>
    <small>{date}</small>
  </div>
);

export default BlogPostItem;
