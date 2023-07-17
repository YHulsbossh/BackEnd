const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "product.json"
  }

  loadProducts() {
    try {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    } catch (error) {
      this.products = [];
      console.error("Error al cargar los productos desde el archivo:", error);
    }
  }

  getProducts() {
    this.loadProducts();
    return this.products;
  }

  generateId() {
    const ids = this.products.map(product => product.id);
    let newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    return newId;
  }

  addProduct(product) {
    if (!product.title || !product.code || !product.price || !product.description || !product.thumbnail || !product.stock) {
      console.error("Todos los campos son obligatorios.");
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
    console.log("Producto actualizado correctamente.");
  }

  deleteProduct(id) {
    this.loadProducts()
    const productIndex = this.products.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      console.error("Producto no encontrado.");
      return;
    }

    this.products.splice(productIndex, 1); 
    this.saveToFile();
    console.log("Producto eliminado correctamente.");
  }

  getProductById(id) {
    this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    const product = this.products.find(product => product.id === id);
    if (!product) {
      return "No se encontró ningún producto con el ID proporcionado.";
    } else {
      return product;
    }
  }

  saveToFile() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf-8");
    } catch (error) {
      console.error("Error al guardar los productos en el archivo:", error);
    }
  }
}

const PM = new ProductManager();

PM.deleteProduct(3)



console.log(PM.getProducts());


