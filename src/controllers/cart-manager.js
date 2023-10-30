import { promises as fs } from "fs";
import { v4 as uuidv4 } from 'uuid';

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    getJsonFromFile = async () => {
        const carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    };

    saveJsonInFile = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    };

    exist = async (id) => {
        const carts = await this.getJsonFromFile();
        return carts.find((p) => {
            p.id === id;
        });

    };

    addCart = async () => {
        const prevCarts = await this.getJsonFromFile();
        const id = uuidv4();
        const cartsList = [{ id : id, products : []}, ...prevCarts];
        await this.saveJsonInFile(cartsList);
        return "Carrito agregado correctamente.";
    };

}

export default CartManager