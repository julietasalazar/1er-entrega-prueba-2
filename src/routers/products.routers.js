import { Router } from "express";
import ProductManager from "../controllers/product-manager.js";

const productRouter = Router();
const product = new ProductManager();

productRouter.get("/products", async(req, res) => {
    res.send(await product.getProducts());
});

productRouter.get("/products/:pid", async(req, res) => {
    const id = req.params.id;
    res.send(await product.getProductById(id));
});

productRouter.post("/products", async (req, res) => {
    const newProduct = req.body;
res.send(await product.addProduct(newProduct));
});

productRouter.put("/products/:pid", async(req, res) => {
const id = req.params.id;
const updatedProduct = req.body;
res.send(await product.updateProduct(id, updatedProduct));
});

productRouter.delete("/products", async (req, res) => {
    const id = req.params.id;
    res.send(await product.deleteProduct(id));
});

export default productRouter;