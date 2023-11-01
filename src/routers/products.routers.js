import { Router } from "express";
import ProductManager from "../controllers/product-manager.js";

const productRouter = Router();
const product = new ProductManager();

productRouter.post("/products", async (req, res) => {
    const newProduct = req.body;
res.send(await product.addProduct(newProduct));
});

productRouter.get("/products", async(req, res) => {
    res.send(await product.getProducts());
});


productRouter.get("/products/:pid", async(req, res) => {
    const id = req.params.pid;
    res.send(await product.getProductById(id));
});

productRouter.put("/products/:pid", async(req, res) => {
const id = req.params.pid;
const updatedProduct = req.body;
res.send(await product.updateProduct(id, updatedProduct));
});

productRouter.delete("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    res.send(await product.deleteProduct(id));
});

export default productRouter;