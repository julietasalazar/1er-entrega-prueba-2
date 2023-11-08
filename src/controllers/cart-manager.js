import { promises as fs } from "fs";
import { v4 as uuidv4 } from 'uuid';
import ProductManager from "./product-manager.js";

const productsList = new ProductManager();

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
    }

    async getJsonFromFile() {
        try {
            const carts = await fs.readFile(this.path, "utf-8");
            return JSON.parse(carts);
        } catch (error) {
            console.error("Error al cargar los carritos", error);
            return [];
        }
    }

    async saveJsonInFile(cart) {
        try {
            await fs.writeFile(this.path, JSON.stringify(cart));
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
        }
    }

    async exist(id) {
        const carts = await this.getJsonFromFile();
        return carts.find(cart => cart.id === id);
    };

    async addCart() {
        const prevCarts = await this.getJsonFromFile();
        const id = uuidv4();
        const cartsList = [{ id: id, products: [] }, ...prevCarts];
        await this.saveJsonInFile(cartsList);
        return "Carrito agregado correctamente.";
    };

    async getCartById(id) {
        const cart = await this.exist(id);
        if (!cart) return "Carrito no encontrado";
        return (cart);
    };

    async addProductInCart(cartId, productId) {
        const cart = await this.exist(cartId);
        if (!cart) return "Carrito no encontrado";
        const product = await productsList.exist(productId);
        if (!product) return "Producto no encontrado";

        const cartsList = await this.getJsonFromFile();
        const cartFilter = cartsList.filter((c) => c.id !== cartId);

        if (cart.products.some((prod) => prod.id === productId)) {
            const addedProduct = cart.products.find((prod) => prod.id === productId);
            addedProduct.quantity += 1;
            const updatedCart = [cart, ...cartFilter];
            await this.saveJsonInFile(updatedCart);
            return "Producto sumado al carrito";
        } 
            cart.products.push({ id: product.id, quantity: 1 });
            const updatedCart = [cart, ...cartFilter];
            await this.saveJsonInFile(updatedCart);
            return "Producto agregado al carrito";
   


    };

}

export default CartManager

// } else {
//     // cart.products.push({ id: product.id, quantity: 1 });
//     const updatedCart = [{ id: cartId, products: [{ id: product.id, quantity: 1 }] }, ...cartFilter];
//     await this.saveJsonInFile(updatedCart);
//     return "Producto agregado al carrito";
// };
