const express = require("express");
const ProductManager = require("./main.js");

const app = express();
const puerto = 8080;
const PM = new ProductManager();

app.get('/products', async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const products = await PM.getProducts(limit);
    res.send(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error al obtener los productos");
  }
});

app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await PM.getProductById(productId);
    res.send(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send("Error al obtener el producto");
  }
});

app.listen(puerto, () => {
  console.log(`Example app listening on port ${puerto}`);
});

