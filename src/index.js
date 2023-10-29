import express from "express";
import ProductManager from "./controllers/product-manager.js";

const product = new ProductManager();

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async(req, res) => {
    res.send(await product.getProducts())
})

app.post("/products", async (req, res) => {
    const newProduct = req.body;
res.send(await product.addProduct(newProduct));
});


app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});