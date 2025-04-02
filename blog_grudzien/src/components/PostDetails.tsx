import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        return fetch(`${API_URL}/users/${data.userId}`);
      })
      .then((res) => res.json())
      .then((userData) => setAuthor(userData));
  }, [id]);

  if (!post || !author) return <p>Ładowanie...</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>Autor: {author.name}</h3>
    </div>
  );
};

export default PostDetails;
