import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { FindOptionsOrderValue } from "typeorm";

class ProductController {
  private productRepository;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

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
  }
}

export default ProductController;
