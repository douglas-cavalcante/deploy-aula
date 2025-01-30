import { Router } from "express";

import ProductController from "../controllers/ProductController";

const productRouter = Router();

const productController = new ProductController();

productRouter.get("/", productController.getAll);
productRouter.get("/:id", productController.getOne);
productRouter.post("/", productController.create);
productRouter.delete('/:id', productController.delete)
productRouter.put('/:id', productController.update)
productRouter.patch("/:id/status", productController.status)



export default productRouter;
