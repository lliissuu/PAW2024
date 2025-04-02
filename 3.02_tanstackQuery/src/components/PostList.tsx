import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/posts";
import { Link } from "react-router-dom";

const PostList = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd ładowania danych</p>;

  return (
    <div>
      <h1>Lista postów</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
