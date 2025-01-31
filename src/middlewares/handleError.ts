import { NextFunction, Request, Response } from "express"

export const handleError = (error: any , request: Request, response: Response, next: NextFunction) => {
    response.status(error.statusCode).json({error: error.message})
}