import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 5000;


interface Post {
  id: number;
  title: string;
  body: string;
  comments: string[];
}

let posts: Post[] = [
  { id: 1, title: "Pierwszy post", body: "Treść pierwszego posta", comments: [] },
  { id: 2, title: "Drugi post", body: "Treść drugiego posta", comments: [] }
];


app.use(cors());
app.use(bodyParser.json());


app.get("/api/posts", (req: Request, res: Response) => {
  res.json(posts);
});


app.get("/api/posts/:id", (req: Request, res: Response) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.json(post);
});

app.post("/api/posts/:id/comments", (req: Request, res: Response) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");

  const { comment } = req.body;
  post.comments.push(comment);

  res.json(post.comments);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
