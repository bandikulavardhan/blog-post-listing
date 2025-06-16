import React from 'react';
import styles from './DeleteButton.module.css';

const DeleteButton = ({ onClick, disabled }) => {
  return (
    <button
      className={styles.deleteButton}
      onClick={onClick}
      disabled={disabled}
      aria-label="Delete post"
    >
      {disabled ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
