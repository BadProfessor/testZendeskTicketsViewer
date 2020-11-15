import React from 'react';

export const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <li key={post.id} className="list-group-item">
          Id: {post.id} <br />
          Status: {post.status} <br />
          Subject: {post.subject} <br />
          Description: {post.description}
        </li>
      ))}
    </ul>
  );
};

export default Posts;
