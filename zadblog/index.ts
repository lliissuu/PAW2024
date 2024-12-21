import express from 'express';
import wpisRouter from "./WpisRouter"
import commentRouter from "./CommentRouter";
import categoryRouter from "./CategoryRouter";
const app = express()

app.use("/wpisy",wpisRouter)
app.use("/category",categoryRouter)
app.use("/comments",commentRouter)

app.listen(3000)