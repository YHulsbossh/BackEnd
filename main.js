class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
     
    }
}

  class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
        return this.products;
    }
    
    
    generateId() {
      const ids = this.products.map(product => product.id);
      let newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
      return newId;
    }
  
    
    addProduct(title, description, price, thumbnail, code, stock) {
        const isDuplicate = this.products.some(product => product.code === code);
        if (isDuplicate) {
          console.error("El código del producto ya está en uso."); 
        } else {
            const newProduct = new Product(title, description, price, thumbnail, code, stock);
            newProduct.id = this.generateId();
            this.products.push(newProduct);
            this.products = this.products
        }        
    }
  
    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
        return "No se encontró ningún producto con el ID proporcionado.";
        } else {
        return product;
        }
    }
  }

const PM = new ProductManager();




