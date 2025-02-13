import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { FindOptionsOrderValue } from "typeorm";

import AppError from "../utils/AppError";
import SendEmail from "../utils/SendEmail";
import logger from "../config/winston";

class ProductController {
  private productRepository;
 // private sendMail;


  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
   // this.sendMail = new SendEmail()
  }

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const body = request.body;

      if (!body.name) {
        throw new AppError("O nome é obrigatório", 400);
      } else if (!body.price) {
        throw new AppError("O preço é obrigatório", 400);
      } else if (!body.description) {
        throw new AppError("A descrição é obrigatório", 400);
      } else if (!body.amount) {
        throw new AppError("A quantidade é obrigatória", 400);
      } else {

        const product = await this.productRepository.save(body);

        // enviar email
        const sendMail = new SendEmail()
        await sendMail.send(body.email, "Novo produto no estoque", body.name)

        response.status(201).json(product);
      }
    } catch (error) {
      next(error);
    }
  };

  getAll = async (request: Request, response: Response, next: NextFunction) => {
    try {
    
      logger.info("Entrando na rota listar produtos")
      const query = request.query;

      const products = await this.productRepository.find({
        order: {
          price: (query.order as FindOptionsOrderValue) || "ASC",
        },
        where: {
          status: true,
        },
        relations: ["category"]
      }); // SELECT * from products where status = true

      response.json(products);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params;

      const productInDatabase = await this.productRepository.findOneBy({
        id: parseInt(params.id),
      }); // SELECT * from products WHERE id = params.id

      if (!productInDatabase) {
        throw new AppError("Produto não encontrado", 404);
      } else {
        response.json(productInDatabase);
      }
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params;
      const body = request.body;

      if (body.id || body.created_at || body.updated_at) {
        throw new AppError(
          "Existem informações que não podem ser atualizadas",
          403
        );
      }

      const productInDatabase = await this.productRepository.findOneBy({
        id: parseInt(params.id),
      });

      if (!productInDatabase) {
        throw new AppError("Produto não encontrado", 404);
      } else {
        Object.assign(productInDatabase, body);

        await this.productRepository.save(productInDatabase);

        response.status(200).json(productInDatabase);
      }
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params;

      const productInDatabase = await this.productRepository.findOneBy({
        id: parseInt(params.id),
      });

      if (!productInDatabase) {
        throw new AppError("Produto não encontrado", 404);
      } else {
        await this.productRepository.delete(productInDatabase.id);
        response.status(204).json();
      }
    } catch (error) {
      next(error);
    }
  };

  status = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = request.params;

      const productInDatabase = await this.productRepository.findOneBy({
        id: parseInt(params.id),
      });

      if (!productInDatabase) {
        throw new AppError("Não foi encontrado produto com esse ID", 404);
      } else {
        //  productInDatabase.status =  productInDatabase.status ? false : true

        /* SOLUCAO PADRAO
        if(productInDatabase.status === true) {
          productInDatabase.status = false
        } else {
          productInDatabase.status = true
        }*/

        productInDatabase.status = !productInDatabase.status;

        this.productRepository.save(productInDatabase);

        response.json(productInDatabase);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
