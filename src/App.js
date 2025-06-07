import React from 'react';
import BlogPostList from './BlogPostList';

const samplePosts = [
  {
    id: 1,
    title: 'First Blog Post',
    summary: 'This is the summary of the first blog post.',
    date: '2025-06-07',
    url: '#'
  },
  {
    id: 2,
    title: 'Second Blog Post',
    summary: 'This is the summary of the second blog post.',
    date: '2025-06-06',
    url: '#'
  }
];

function App() {
  return (
    <div>
      <h1>Blog Post Listing</h1>
      <BlogPostList posts={samplePosts} />
    </div>
  );
}

export default App;
