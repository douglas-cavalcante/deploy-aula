import "reflect-metadata";
import express, { Request, Response } from "express"
import {AppDataSource} from "./data-source"
import cors from "cors"
import { User } from "./entity/User";

const app = express()

app.use(cors())
app.use(express.json())

const userRepository = AppDataSource.getRepository(User)

app.get("/users", (req: Request, res: Response) => {
    try {
        const listUser = userRepository.find()

        res.status(200).json(listUser)
    } catch (ex) {
        res.status(500).send("Ocorreu um erro ao executar a solicitação")
    }
})

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log("O servidor está rodando em http://localhost:3000")
    })
}).catch(error => console.log(error))

