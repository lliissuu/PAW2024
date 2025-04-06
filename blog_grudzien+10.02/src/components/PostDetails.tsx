
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
  comments: string[];
}

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then((response) => {
        setPost(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

  const handleAddComment = () => {
    if (comment) {
      axios.post(`http://localhost:5000/api/posts/${id}/comments`, { comment })
        .then((response) => {
          setComments(response.data);
          setComment(""); 
        })
        .catch((error) => console.error("Error adding comment:", error));
    }
  };

  if (!post) return <p>Ładowanie...</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <div>
        <h3>Komentarze:</h3>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>

        <input 
          type="text" 
          value={comment} 
          onChange={handleCommentChange} 
          placeholder="Dodaj komentarz" 
        />
        <button onClick={handleAddComment}>Dodaj komentarz</button>
      </div>
    </div>
  );
};

export default PostDetails;
