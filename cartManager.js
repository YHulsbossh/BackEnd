const fs = require("fs").promises;

class CartManager {
  constructor() {
    this.path = "carrito.json";
  }

  async createFile() {
    if (!fs.existsSync(this.path)) {
      await fs.writeFile(this.path, JSON.stringify([])); 
    }
  }

  async newCart() {
    const carts = await this.getCarts(); 
    const newCart = { id: this.generateId(), products: [] };
    carts.push(newCart); 
    await this.saveCart(carts); 
    console.log("Cart created!");

    return true;
  }

  async getCart(id) {
    const carts = await this.getCarts();
    return carts.find((item) => item.id === id);
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading carts file:", error);
      return [];
    }
  }

  generateId() {
    const ids = this.carts.map((product) => product.id);
    let newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    return newId;
  }

  async saveCart(carts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carts));
      console.log("Cart saved successfully.");
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts(); 
    const cart = carts.find((item) => item.id === cid);

    if (!cart) {
      console.log("Cart not found.");
      return false;
    }

    let product = cart.products.find((item) => item.product === pid);

    if (product) {
      product.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.saveCart(carts);
    console.log("Product added!");

    return true;
  }
}

module.exports = CartManager;

