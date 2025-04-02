import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPostDetails } from "../api/posts";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostDetails(id!),
  });

  if (isLoading) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd ładowania posta</p>;

  return (
    <div>
      <h1>{data.post.title}</h1>
      <p>{data.post.body}</p>
      <h3>Autor: {data.user.name}</h3>
      <p>Email: {data.user.email}</p>
    </div>
  );
};

export default PostDetails;
