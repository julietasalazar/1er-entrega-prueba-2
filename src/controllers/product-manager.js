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
    };

    exist = async (id) => {
        const products = await this.getJsonFromFile();
        return products.find((p) => {
            p.id === id;
        });

    };

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

    getProductById = async (id) => {
        const product = await this.exist(id);
        if (!product) return "Producto no encontrado";
        return (product);
    };

    updateProduct = async (id, product) => {
        const productById = await this.exist(id);
        if (!productById) {
            return "Producto no encontrado.";
        } else {
            await this.deleteProduct(id);
            const prevProduct = await this.getJsonFromFile();
            const updatedProduct = [{...product, id : id}, ...prevProduct];
            await this.saveJsonInFile(updatedProduct);
        };
    };

    deleteProduct = async (id) => {
        const products = await this.getJsonFromFile();
        const existingProduct = products.some((p) => {
            p.id === id;
        });
        if (existingProduct) {
            const filteredProducts = products.filter((p) => p.id != id);
            await this.saveJsonInFile(filteredProducts);
            return "Producto eliminado correctamente";
        } else {
            "El producto que quiere eliminar no existe"
        };
    };
}

export default ProductManager

