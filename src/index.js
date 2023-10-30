import express from "express";
import productRouter from "./routers/products.routers.js";
import cartRouter from "./routers/carts.routers.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", productRouter, cartRouter);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});