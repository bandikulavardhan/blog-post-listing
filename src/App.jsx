// Change file extension to .jsx for Vite compatibility with JSX syntax

import React, { useState } from 'react';
import BlogPostList from './BlogPostList.jsx';
import BlogPostDetail from './BlogPostDetail.jsx';
import BlogPostForm from './BlogPostForm.jsx';

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

function App() {
  const [mode, setMode] = useState('list'); // 'list' | 'create' | 'edit'
  const [editPost, setEditPost] = useState(null);
  const [posts, setPosts] = useState(samplePosts);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(false);

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
        <button onClick={handleBack} style={{marginBottom: '20px'}}>← Back to List</button>
        <button onClick={() => handleEdit(selectedPost)} style={{marginLeft: '10px', marginBottom: '20px'}}>Edit Post</button>
        <BlogPostDetail {...selectedPost} />
      </>
    );
  } else {
    content = (
      <>
        <button onClick={handleCreate} style={{marginBottom: '20px'}}>+ New Post</button>
        <BlogPostList posts={posts} onPostClick={handlePostClick} />
      </>
    );
  }

  return (
    <div>
      <h1>Blog Post Listing</h1>
      {content}
    </div>
  );
}

export default App;