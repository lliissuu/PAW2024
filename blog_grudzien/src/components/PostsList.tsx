import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 10))); 
  }, []);

  return (
    <div className="container">
      <h2> Najnowsze wpisy</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsList;
