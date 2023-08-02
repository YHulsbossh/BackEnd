const express = require("express");
const cartsRouter = express.Router();
const CartManager = require("../CartManager.js");
const CM = new CartManager();

cartsRouter.post("/", (req, res) => {
  if (CM.newCart()) {
    res.send({ status: "ok", message: "El Carrito se creó correctamente!" });
  } else {
    res
      .status(500)
      .send({ status: "error", message: "Error! No se pudo crear el Carrito!" });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = CM.getCart(cartId);

  if (cart) {
    res.send(cart.products);
  } else {
    res.status(404).send({ status: "error", message: "Carrito no encontrado." });
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);

  let cart = CM.getCart(cartId);

  if (!cart) {
    const newCart = await CM.newCart();
    if (!newCart) {
      return res
        .status(500)
        .send({ status: "error", message: "Error! No se pudo crear el Carrito!" });
    }
    cart = CM.getCart(cartId);
  }

 
  if (cart && Array.isArray(cart.products)) {
    const existingProduct = cart.products.find((product) => product.product === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }
  }

  CM.saveCart();
  res.send({ status: "ok", message: "Producto agregado al carrito correctamente!" });
});

module.exports = cartsRouter;


