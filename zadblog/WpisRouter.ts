import {Router} from "express";
import { PrismaClient } from "@prisma/client"

const wpisRouter :Router = Router();
const prisma = new PrismaClient();

wpisRouter.get('/all', async (req, res) => {
    const wpisy = await prisma.wpis.findMany()
    res.json(wpisy)
});

wpisRouter.get("/:id", async (req,res) => {
    const id = Number(req.params.id)
    const wpis = await prisma.wpis.findUnique({
        where: {
            id: id
        }
    })
    if(!wpis){
        res.status(404)
        res.json({
            "message":"Wpis not found"
        })
        res.end()
    }
    res.json(wpis)
})

wpisRouter.post("/", async (req,res) =>{
    const {wpis,kategoria,komentarze} = req.body
    await prisma.wpis.create(
        {
            data:{
                wpis,
                kategoria,
                komentarze
            }
        }
    )
    res.redirect("/")
})


wpisRouter.delete("/:id", async (req, res) => {
    const id = Number(req.params.id)
    await prisma.wpis.delete(
        {
            where:{
                id
            }
        }
    )
    res.redirect("/")
})

wpisRouter.put("/:id",async (req, res) => {
    const id = Number(req.params.id)
    const {wpis,kategoria,komentarze} = req.body
    await prisma.wpis.update(
        {
            data:{
                wpis,kategoria,komentarze
            },
            where:{
                id
            }
        }
    )
    res.redirect("/")
});

export default wpisRouter;
