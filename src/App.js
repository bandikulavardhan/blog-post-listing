import React from 'react';
import BlogPostList from './BlogPostList';
import BlogPostDetail from './BlogPostDetail';

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
  const sampleDetailPost = {
    title: 'How to Build a Blog in React',
    content: `<p>This guide will show you how to build a blog in <strong>React</strong> step by step.</p><ul><li>Set up your project</li><li>Create components</li><li>Style with CSS modules</li></ul><p>Read more on <a href='https://react.dev/' target='_blank' rel='noopener noreferrer'>React Docs</a>.</p>`,
    author: 'Jane Doe',
    date: '2025-06-07',
  };

  return (
    <div>
      <h1>Blog Post Listing</h1>
      <BlogPostList posts={samplePosts} />
      <hr />
      <BlogPostDetail {...sampleDetailPost} />
    </div>
  );
}

export default App;
