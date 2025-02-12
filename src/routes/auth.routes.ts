
import Router, { Request, Response } from 'express'
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const authRouter = Router()

const userRepository = AppDataSource.getRepository(User);

authRouter.post("/", async (req: Request, res: Response) => {
    try {

        const userLogin = req.body /*as UserLogin*/ // ->>>>>>> pegar o body da requisição

        const userEntity = await userRepository.findOne({
            where: {
                login: userLogin.email
            },
            /*
            relations: ["roles", "roles.permissions"],
            select: {
                roles: {
                    id: true,
                    description: true,
                    permissions: {
                        id: true,
                        description: true
                    }
                }
            }*/
        })

        if(!userEntity){
            res.status(400).json("Email e/ou senha inválido!")
            return
        }
       
        const isValid = await bcrypt.compare(userLogin.password, userEntity.password)

        if(!isValid){
            res.status(400).json("Email e/ou senha inválido!")
            return
        }


        const chaveSecretaJwt = process.env.JWT_SECRET ?? ""

        const payload = {
            //email: userEntity.email,
            firstName: userEntity.firstName,
            userId: userEntity.id,
           // roles: JSON.stringify(userEntity.roles),
        }
        
        const token = await jwt.sign(payload, chaveSecretaJwt, {expiresIn: '1h'})
        
        res.status(200).json({token: token})
    } catch (ex){
        res.status(500).json("Não foi possível se conectar ao banco de dados")
    }
})

export default authRouter