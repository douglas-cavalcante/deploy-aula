import { NextFunction, Request, Response } from "express";

const rotaAutenticada = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.senha == "123"){
        next()
        return
    }
    res.status(401).json("Você não tem permissão").end()
    return
}

export default rotaAutenticada