import { Router } from "express";
import CartManager from "../controllers/cart-manager.js";

const cartRouter = Router();
const carts = new CartManager

cartRouter.post("/carts", async (req, res) => {
    res.send( await carts )
})

export default cartRouter