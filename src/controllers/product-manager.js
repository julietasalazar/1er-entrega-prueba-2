import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    // getJsonFromFile = async () => {
    //     const products = await fs.readFile(this.path, "utf-8");
    //     return JSON.parse(products);
    // };

    async getJsonFromFile() {
        try {
            const products = await fs.readFile(this.path, "utf-8");
            return JSON.parse(products);
        } catch (error) {
            console.error("Error al cargar los productos", error);
            return [];
        }
    }


    // saveJsonInFile = async (product) => {
    //     await fs.writeFile(this.path, JSON.stringify(product));
    // };

    async saveJsonInFile(product) {
        try {
            await fs.writeFile(this.path, JSON.stringify(product, null, '\t'));
        } catch (error) {
            console.error("Error al guardar el producto:", error);
        }
    }

    // exist = async (id) => {
    //     const products = await this.getJsonFromFile();
    //     return products.find(product => product.id === id);
    // };

    async exist(id) {
        const products = await this.getJsonFromFile();
        return products.find(product => product.id === id);
    }

    // addProduct = async (product) => {
    //     const prevProducts = await this.saveJsonInFile();
    //     product.id = uuidv4();
    //     const productsList = [...prevProducts, product];
    //     await this.saveJsonInFile(productsList);
    //     return "Producto agregado correctamente";
    // };

    // async addProduct(product) {
    //     const products = await this.getJsonFromFile();
    //     product.id = uuidv4();
    //     products.push(product);
    //     this.saveJsonInFile(products);
    //     return "Producto agregado correctamente";
    // }

    async addProduct(data) {
        const { title, description, price, stock, category, thumbnails } = data;
        if (!title || !description || !price || !stock || !category ||!thumbnails ) {
            throw new Error("Todos los campos son obligatorios");
        }

        const products = await this.getJsonFromFile();
        const newProduct = {
            id: uuidv4(),
            title,
            description,
            code: products.length + 1,
            price,
            status: true,
            stock,
            category,
            thumbnails,
        };

        products.push(newProduct);
        await this.saveJsonInFile(products);


        return 'El producto se cargó correctamente';
    }

    // getProducts = async () => {
    //     return await this.getJsonFromFile();
    // };

    async getProducts() {
        return this.getJsonFromFile();
    }

    // getProductById = async (id) => {
    //     const product = await this.exist(id);
    //     if (!product) return "Producto no encontrado";
    //     return (product);
    // };

    async getProductById(id) {
        const product = await this.exist(id);
        if (!product) return "Producto no encontrado";
        return product;
    }

    // updateProduct = async (id, product) => {
    //     const productById = await this.exist(id);
    //     if (!productById) {
    //         return "Producto no encontrado.";
    //     } else {
    //         await this.deleteProduct(id);
    //         const prevProduct = await this.getJsonFromFile();
    //         const updatedProduct = [{...product, id : id}, ...prevProduct];
    //         await this.saveJsonInFile(updatedProduct);
    //     };
    // };

    // async updateProduct(id, updatedProduct) {
    //     const products = await this.getJsonFromFile();
    //     const existingProductIndex = products.findIndex(product => product.id === id);

    //     if (existingProductIndex !== -1) {
    //         updatedProduct.id = id;
    //         products[existingProductIndex] = updatedProduct;
    //         this.saveJsonInFile(products);
    //         return "Producto actualizado correctamente";
    //     } else {
    //         return "Producto no encontrado.";
    //     }
    // }

    async updateProduct(id, data) {
        const { title, description, price, stock, category, thumbnails } = data;
        const products = await this.getJsonFromFile();
        const position = products.findIndex((p) => p.id === id);
        if (position === -1) {
            throw new Error("Producto no encontrado");
        }
        if (title) {
            products[position].title = title;
        }
        if (description) {
            products[position].description = description;
        }
        if (price) {
            products[position].price = price;
        }
        if (stock) {
            products[position].stock = stock;
        }
        if (category) {
            products[position].category = category;
        }
        if (thumbnails) {
            products[position].thumbnails = thumbnails;
        }
        await this.saveJsonInFile(products);
        return "Producto actualizado correctamente";

    }


    // deleteProduct = async (id) => {
    //     const products = await this.getJsonFromFile();
    //     const existingProduct = products.some( product => product.id === id);
    //     if (existingProduct) {
    //         const filteredProducts = products.filter(product => product.id != id);
    //         await this.saveJsonInFile(filteredProducts);
    //         return "Producto eliminado correctamente";
    //     } else {
    //         return "El producto que quiere eliminar no existe"
    //     };
    // };

    async deleteProduct(id) {
        const products = await this.getJsonFromFile();
        const existingProductIndex = products.findIndex(product => product.id === id);

        if (existingProductIndex !== -1) {
            products.splice(existingProductIndex, 1);
            this.saveJsonInFile(products);
            return "Producto eliminado correctamente";
        } else {
            return "El producto que quiere eliminar no existe";
        }
    }
}

export default ProductManager

