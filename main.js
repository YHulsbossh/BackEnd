const fs = require("fs").promises;


class ProductManager {
  constructor() {
    this.products = [];
    this.path = "product.json"
  }

  async loadProducts() {
    try {
      console.log("Loading products from the file...");
      const data = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
      console.log("Products loaded successfully:", this.products);
    } catch (error) {
      this.products = [];
      console.error("Error al cargar los productos desde el archivo:", error);
    }
  }
  

  async getProducts(limit) {
    try {
      await this.loadProducts();
      if (limit === 0) {
        return [];
      }
      return this.products.slice(0, limit); 
    } catch (error) {
      console.error("Error al cargar los productos desde el archivo:", error);
      throw error; 
    }
  }
  

  generateId() {
    const ids = this.products.map(product => product.id);
    let newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    return newId;
  }

  addProduct(product) {
    if (!product.title || !product.code || !product.price || !product.description || !product.stock) {
      console.error("Todos los campos son obligatorios.");
      return;
    }
  
    if (product.title.trim().length === 0) {
      console.error("El título del producto no puede estar vacío.");
      return;
    }
  
    const isDuplicate = this.products.some(existingProduct => existingProduct.code === product.code);
    if (isDuplicate) {
      console.error("El código del producto ya está en uso.");
    } else {
      const newProduct = {
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
      };
  
      newProduct.id = this.generateId();
      this.products.push(newProduct);
      this.saveToFile(); 
      console.log("producto agregado");
    }
  }
  

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);
  
    if (productIndex === -1) {
      console.error("Producto no encontrado.");
      return;
    }
  
    const updatedProduct = { ...this.products[productIndex], ...updatedFields, id: id };
  
    this.products[productIndex] = updatedProduct;
    this.saveToFile();
    console.log("Producto actualizado correctamente:", updatedProduct);
  }
  
    

  async deleteProduct(id) {
    try {
        await this.loadProducts(); 

        console.log("Deleting product with id:", id);
        console.log("Before deletion, products:", this.products);

        const productIndex = this.products.findIndex((product) => product.id === id);

        if (productIndex === -1) {
            console.error("Producto no encontrado.");
            return false;
        }

        this.products.splice(productIndex, 1);
        this.saveToFile();
        console.log("Producto eliminado correctamente.");
        console.log("Updated products:", this.products);

        return true;
    } catch (error) {
        console.error("Error al cargar los productos desde el archivo:", error);
        return false;
    }
}



  async getProductById(id) {
    try {
      const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
      const product = products.find(product => product.id === id);
      if (!product) {
        return "No se encontró ningún producto con el ID proporcionado.";
      } else {
        return product;
      }
    } catch (error) {
      console.error("Error al cargar los productos desde el archivo:", error);
      return "Error al cargar los productos desde el archivo.";
    }
  }
  

  saveToFile() {
    fs.writeFile(this.path, JSON.stringify(this.products, null, 2), "utf-8", (err) => {
      if (err) {
        console.error("Error al guardar los productos en el archivo:", err);
      } else {
        console.log("Productos guardados en el archivo.");
      }
    });
  }
}

const PM = new ProductManager();





module.exports = ProductManager;
