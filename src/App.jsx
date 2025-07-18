// Change file extension to .jsx for Vite compatibility with JSX syntax

import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BlogPostList from './BlogPostList.jsx';
import BlogPostDetail from './BlogPostDetail.jsx';
import BlogPostForm from './BlogPostForm.jsx';
import DeleteButton from './DeleteButton.jsx';
import ConfirmationDialog from './ConfirmationDialog.jsx';
import Layout from './Layout.jsx';
import CommentList from './CommentList.jsx';
import CommentForm from './CommentForm.jsx';
import SearchBar from './SearchBar.jsx';
import styles from './App.module.css';

const samplePosts = [
  {
    id: 1,
    title: 'First Blog Post',
    summary: 'This is the summary of the first blog post.',
    content: `<p>This is the <strong>full content</strong> of the first blog post. <a href='https://react.dev/'>React Docs</a></p>`,
    author: 'Jane Doe',
    date: '2025-06-07',
  },
  {
    id: 2,
    title: 'Second Blog Post',
    summary: 'This is the summary of the second blog post.',
    content: `<p>This is the <strong>full content</strong> of the second blog post. <a href='https://vitejs.dev/'>Vite Docs</a></p>`,
    author: 'John Smith',
    date: '2025-06-06',
  }
];

const initialComments = {
  1: [
    {
      name: 'Alice',
      date: '2025-07-01T10:30',
      text: 'Great post! Very informative.',
      avatar: '',
    },
    {
      name: 'Bob',
      date: '2025-07-02T14:15',
      text: 'Thanks for sharing!',
      avatar: '',
    },
  ],
  2: [],
};

function App() {
  const [mode, setMode] = useState('list'); // 'list' | 'create' | 'edit'
  const [editPost, setEditPost] = useState(null);
  const [posts, setPosts] = useState(samplePosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [searchQuery, setSearchQuery] = useState('');

  const handlePostClick = (id) => {
    const post = posts.find((p) => p.id === id);
    setSelectedPost(post);
    setMode('detail');
  };

  const handleBack = () => {
    setSelectedPost(null);
    setMode('list');
  };

  const handleCreate = () => {
    setEditPost(null);
    setMode('create');
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setMode('edit');
  };

  const handleFormSubmit = (formData) => {
    setLoading(true);
    setTimeout(() => {
      if (mode === 'create') {
        const newPost = {
          ...formData,
          id: Date.now(),
          summary: formData.content.slice(0, 60) + (formData.content.length > 60 ? '...' : ''),
        };
        setPosts([newPost, ...posts]);
        setSelectedPost(newPost);
        setMode('detail');
      } else if (mode === 'edit') {
        const updatedPosts = posts.map((p) =>
          p.id === editPost.id ? { ...p, ...formData, summary: formData.content.slice(0, 60) + (formData.content.length > 60 ? '...' : '') } : p
        );
        setPosts(updatedPosts);
        setSelectedPost({ ...editPost, ...formData });
        setMode('detail');
      }
      setLoading(false);
    }, 600);
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setPosts(posts.filter(p => p.id !== postToDelete.id));
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
      if (selectedPost?.id === postToDelete.id) {
        setSelectedPost(null);
        setMode('list');
      }
    }, 600);
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleAddComment = (comment) => {
    if (!selectedPost) return;
    setComments((prev) => {
      const postId = selectedPost.id;
      const newComment = {
        ...comment,
        date: new Date().toISOString(),
        avatar: '', // Optionally set avatar
      };
      return {
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      };
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter posts by search query (case-insensitive, title or content)
  const filteredPosts = posts.filter(post => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      post.title.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    );
  });

  let content;
  if (mode === 'create') {
    content = (
      <>
        <button onClick={handleBack} style={{marginBottom: '20px'}}>← Back to List</button>
        <BlogPostForm onSubmit={handleFormSubmit} loading={loading} />
      </>
    );
  } else if (mode === 'edit') {
    content = (
      <>
        <button onClick={handleBack} style={{marginBottom: '20px'}}>← Back to List</button>
        <BlogPostForm post={editPost} onSubmit={handleFormSubmit} loading={loading} />
      </>
    );
  } else if (mode === 'detail' && selectedPost) {
    content = (
      <>
        <div style={{ marginBottom: '20px' }}>
          <button onClick={handleBack}>← Back to List</button>
          <button onClick={() => handleEdit(selectedPost)} style={{ marginLeft: '10px' }}>
            Edit Post
          </button>
          <DeleteButton 
            onClick={() => handleDeleteClick(selectedPost)} 
            style={{ marginLeft: '10px' }}
          />
        </div>
        <BlogPostDetail {...selectedPost} />
        <h2 style={{marginTop: '32px'}}>Comments</h2>
        <CommentList comments={comments[selectedPost.id] || []} />
        <CommentForm onSubmit={handleAddComment} isLoggedIn={false} userName={''} />
      </>
    );
  } else {
    content = (
      <>
        <SearchBar onSearch={handleSearch} />
        <button onClick={handleCreate} className={styles.createButton}>+ New Post</button>
        <BlogPostList 
          posts={filteredPosts} 
          onPostClick={handlePostClick}
          onDeleteClick={handleDeleteClick}
        />
        {filteredPosts.length === 0 && (
          <div style={{marginTop: '24px', color: '#888'}}>No posts found.</div>
        )}
      </>
    );
  }

  return (
    <Router>
      <Layout>
        <div className={styles.app}>
          {content}
          <ConfirmationDialog 
            isOpen={isDeleteDialogOpen}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
            isDeleting={isDeleting}
          />
        </div>
      </Layout>
    </Router>
  );
}

export default App;