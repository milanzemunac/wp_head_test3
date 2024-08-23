import React, { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://locantolistings.com/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);

  const createExcerpt = (content) => {
    const maxLength = 100; // Maximum length of the excerpt
    const strippedContent = content.replace(/<[^>]+>/g, ''); // Remove HTML tags
    return strippedContent.length > maxLength
      ? strippedContent.substring(0, maxLength) + '...'
      : strippedContent;
  };

  return (
    <div>
      <h1>Locanto Listings</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title.rendered}</h2>
          <p>{createExcerpt(post.content.rendered)}</p>
          <a href={`#/post/${post.id}`}>Click here for more</a>
        </div>
      ))}
    </div>
  );
}

export default App;
