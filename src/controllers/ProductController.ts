import { Request, Response } from "express";
import { FindOptionsOrderValue } from "typeorm";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

class ProductController {
  // private productRepository;

  constructor() {
    // this.productRepository = AppDataSource.getRepository(Product);
  }

  async getAll(request: Request, response: Response) {
    try {
      const query = request.query;

      const productRepository = AppDataSource.getRepository(Product);

      const products = await productRepository.find({
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
