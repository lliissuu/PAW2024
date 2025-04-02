import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const PostList = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div>
      <h1>Lista postów</h1>
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

export default PostList;
