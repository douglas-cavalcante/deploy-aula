import { Request, Response, Router } from "express";

import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";
import { FindOptionsOrderValue } from "typeorm";

const productRouter = Router();

const productRepository = AppDataSource.getRepository(Product);

productRouter.get("/", async (request: Request, response: Response) => {
  try {
    const query = request.query;

    const products = await productRepository.find({
      order: {
        price: (query.order as FindOptionsOrderValue) || "ASC",
      },
    }); // SELECT * from products

    response.json(products);
  } catch (error) {
    response.status(500).json({ error: "Não foi possível buscar os produtos" });
  }
});

productRouter.get("/:id", async (request: Request, response: Response) => {
  try {
    const params = request.params;

    const productInDatabase = await productRepository.findOneBy({
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
});

export default productRouter;
