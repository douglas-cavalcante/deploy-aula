require('dotenv').config()

import "reflect-metadata";
import express from "express"
import {AppDataSource} from "./data-source"

import cors from "cors"

import userRouter from "./routes/user.routes";
import productRouter from "./routes/product.routes";
import {handleError} from "./middlewares/handleError";
import verifyToken from "./middlewares/auth";
import fornecedorRouter from "./routes/fornecedor.routes";
import authRouter from "./routes/auth.routes";
import logger from "./config/winston";

const app = express()

app.use(cors()) // Permite que o express entenda requisições de outros domínios

app.use(express.json()) // Permite que o express entenda JSON


app.use("/users", userRouter)
app.use("/products", verifyToken, productRouter)
app.use("/fornecedores", fornecedorRouter )
app.use("/login", authRouter )

app.use(handleError)

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        logger.info("O servidor está rodando em http://localhost:3000")
    })
}).catch(error => console.log(error))

