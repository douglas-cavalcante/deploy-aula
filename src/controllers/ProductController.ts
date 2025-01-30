import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { FindOptionsOrderValue } from "typeorm";

class ProductController {
  private productRepository;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  create = async (request: Request, response: Response) => {
    try {
      const body = request.body;

      if (!body.name) {
        response.status(400).json({ error: "O nome é obrigatório" });
      } else if (!body.price) {
        response.status(400).json({ error: "O preço é obrigatório" });
      } else if (!body.description) {
        response.status(400).json({ error: "A descrição é obrigatório" });
      } else if (!body.amount) {
        response.status(400).json({ error: "A quantidade é obrigatória" });
      } else {
        const product = await this.productRepository.save(body);
        response.status(201).json(product);
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: "Não foi possível cadastrar o produto" });
    }
  };

  getAll = async (request: Request, response: Response) => {
    try {
      const query = request.query;

      const products = await this.productRepository.find({
        order: {
          price: (query.order as FindOptionsOrderValue) || "ASC",
        },
      }); // SELECT * from products

      response.json(products);
    } catch (error) {
      console.log(error);
      response
        .status(500)
        .json({ error: "Não foi possível buscar os produtos" });
    }
  };

  getOne = async (request: Request, response: Response) => {
    try {
      const params = request.params;

      const productInDatabase = await this.productRepository.findOneBy({
        id: parseInt(params.id),
      }); // SELECT * from products WHERE id = params.id

      if (!productInDatabase) {
        response.status(404).json({ error: "Produto não encontrado" });
      } else {
        response.json(productInDatabase);
      }
    } catch (error) {
      response.status(500).json({ error: "Não foi possível buscar o produto" });
    }
  };

  update = async (request: Request, response: Response) => {
    try {
      const params = request.params;
      const body = request.body;

      if (body.id || body.created_at || body.updated_at) {
        response
          .status(403)
          .json({ error: "Existem informações que não podem ser atualizadas" });
      }

      const productInDatabase = await this.productRepository.findOneBy({
        id: parseInt(params.id),
      });

      if (!productInDatabase) {
        response.status(404).json({ error: "Produto não encontrado" });
      } else {
        
        Object.assign(productInDatabase, body);

        await this.productRepository.save(productInDatabase);

        response.status(200).json(productInDatabase);
      }
    } catch (error) {
      response
        .status(500)
        .json({ error: "Não foi possível atualizar o produto" });
    }
  };

  delete = async (request: Request, response: Response) => {
    try {
      const params = request.params;

      const productInDatabase = await this.productRepository.findOneBy({
        id: parseInt(params.id),
      });

      if (!productInDatabase) {
        response.status(404).json({ error: "Produto não encontrado" });
      } else {
        await this.productRepository.delete(productInDatabase.id);
        response.status(204).json();
      }
    } catch {
      response
        .status(500)
        .json({ error: "Não foi possível deletar o produto" });
    }
  };
}

export default ProductController;
