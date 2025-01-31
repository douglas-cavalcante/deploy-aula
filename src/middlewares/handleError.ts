import { Response } from "express"

const handleError = (error: any , response: Response) => {
    response.status(error.statusCode).json({error: error.message})
}

export default handleError