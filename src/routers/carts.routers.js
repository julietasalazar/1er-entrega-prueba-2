import { Router } from "express";
import CartManager from "../controllers/cart-manager.js";

const cartRouter = Router();
const carts = new CartManager

cartRouter.post("/carts", async (req, res) => {
    res.send( await carts.addCart());
});

cartRouter.get("/carts", async (req, res) => {
    res.send( await carts.getJsonFromFile());
});

cartRouter.get("/carts/:cid", async(req, res) => {
    res.send(await carts.getCartById(req.params.cid));
});

cartRouter.post("/carts/:cid/products/:pid", async(req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    res.send(await carts.addProductInCart(cartId, productId));
});

export default cartRouter