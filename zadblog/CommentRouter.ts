import {Router} from "express";
import { PrismaClient } from "@prisma/client"

const commentRouter :Router = Router();
const prisma = new PrismaClient();

commentRouter.get('/all', async (req, res) => {
    const wpisy = await prisma.komentarz.findMany()
    res.json(wpisy)
});

commentRouter.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const wpis = await prisma.komentarz.findUnique({
        where: {
            id: id
        }
    })
    if(!wpis){
        res.status(404)
        res.json({
            "message":"Comment not found"
        })
        res.end()
    }
    res.json(wpis)
})

commentRouter.post("/", async (req, res) =>{
    const {komentarz,wpis} = req.body
    await prisma.komentarz.create(
        {
            data:{
                wpis,
                komentarz
            }
        }
    )
    res.redirect("/")
})


commentRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id)
    await prisma.komentarz.delete(
        {
            where:{
                id
            }
        }
    )
    res.redirect("/")
})

commentRouter.put("/:id",async (req, res) => {
    const id = Number(req.params.id)
    const {komentarz,wpis} = req.body
    await prisma.komentarz.update(
        {
            data:{
                wpis,
                komentarz
            },
            where:{
                id
            }
        }
    )
    res.redirect("/")
})

export default commentRouter;