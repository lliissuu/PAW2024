import {Router} from "express";
import { PrismaClient } from "@prisma/client"

const categoryRouter :Router = Router();
const prisma = new PrismaClient();

categoryRouter.get('/all', async (req, res) => {
    const wpisy = await prisma.kategoria.findMany()
    res.json(wpisy)
});

categoryRouter.get("/:id", async (req,res) => {
    const id = Number(req.params.id)
    const wpis = await prisma.kategoria.findUnique({
        where: {
            id: id
        }
    })


    if(!wpis){
        res.status(404)
        res.json({
            "message":"Category not found"
        })
        res.end()
    }


    res.json(wpis)
})

categoryRouter.post("/", async (req,res) =>{

    const {name,wpis} = req.body

    await prisma.kategoria.create(
        {
            data:{

                wpis,
                nazwa:name
            }

        }
    )
    res.redirect("/")
})

categoryRouter.put("/:id",async (req, res) => {
    const id = Number(req.params.id)
    const {name,wpis} = req.body
    await prisma.kategoria.update(
        {
            data:{



                wpis,
                nazwa:name
            },
            where:{
                id
            }
        }
    )
    res.redirect("/")
})
categoryRouter.delete("/:id", async (req, res) => {

    const id = Number(req.params.id)


    await prisma.kategoria.delete(
        {
            where:{
                id
            }
        }
    )
    res.redirect("/")
})

export default categoryRouter;