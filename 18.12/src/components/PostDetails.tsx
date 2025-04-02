import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        return fetch(`${API_URL}/users/${data.userId}`);
      })
      .then((res) => res.json())
      .then((userData) => setUser(userData));
  }, [id]);

  if (!post || !user) return <p>Ładowanie...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <h3>Autor: {user.name}</h3>
      <p>Email autora: {user.email}</p>
      <p>Adres autora: {user.address?.street}, {user.address?.city}</p>
    </div>
  );
};

export default PostDetails;
