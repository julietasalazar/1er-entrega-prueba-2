import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    getJsonFromFile = async () => {
        const products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    };

    saveJsonInFile = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    addProduct = async (product) => {
        const prevProducts = await this.saveJsonInFile();
        product.id = uuidv4();
        const productsList = [...prevProducts, product];
        await this.saveJsonInFile(productsList);
        return "Producto agregado correctamente";
    };

    getProducts = async () => {
        return await this.getJsonFromFile();
    };
}

export default ProductManager

