// Change file extension to .jsx for Vite compatibility with JSX syntax

import React from 'react';
import DeleteButton from './DeleteButton.jsx';
import styles from './BlogPostItem.module.css';

const BlogPostItem = ({ title, summary, date, onClick, onDelete }) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div className={styles.blogPostItem} onClick={onClick}>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p>{summary}</p>
        <small>{date}</small>
      </div>
      <div className={styles.actions}>
        <DeleteButton onClick={handleDelete} />
      </div>
    </div>
  );
};

export default BlogPostItem;