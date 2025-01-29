import { Request, Response, Router } from "express";

import { AppDataSource } from "../data-source";
import { Product } from "../entity/Product";

import { FindOptionsOrderValue } from "typeorm";
import ProductController from "../controllers/ProductController";

const productRouter = Router();

const productRepository = AppDataSource.getRepository(Product);

const productController = new ProductController()

productRouter.get("/", productController.getAll);

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

productRouter.post("/", async (request: Request, response: Response) => {
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
      const product = await productRepository.save(body);
      response.status(201).json(product);
    }
  } catch (error) {
    response
      .status(500)
      .json({ error: "Não foi possível cadastrar o produto" });
  }
});

export default productRouter;
