const express = require("express");
const router = express.Router();
const ProductManager = require("../main");
const PM = new ProductManager();


router.get('/', async (req, res) => {
    try {
        let limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const products = await PM.getProducts(limit);
        res.send(products);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error al obtener los productos");
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await PM.getProductById(productId);
        res.send(product);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).send("Error al obtener el producto");
    }
});

router.post("/", (req, res) => {
    try {
      if (!req.body.title || !req.body.description || !req.body.code || !req.body.price || !req.body.stock || !req.body.category) {
        console.error("Error: Todos los campos son obligatorios, excepto thumbnails.");
        return res.status(400).json({ error: "Todos los campos son obligatorios, excepto thumbnails." });
      }
  
        const newProduct = {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || [],
      };
  
      PM.addProduct(newProduct); 
      res.status(201).json({ message: "Producto agregado correctamente." });
    } catch (error) {
      res.status(400).json({ error: "Error al agregar el producto." });
    }
  });
  
  
  router.put("/:pid", async (req, res) => {
    let pid = parseInt(req.params.pid);
    try {
      if (!req.body.title || !req.body.description || !req.body.code || !req.body.price || !req.body.stock || !req.body.category) {
        console.error("Error: Todos los campos son obligatorios, excepto thumbnails.");
        return res.status(400).json({ error: "Todos los campos son obligatorios, excepto thumbnails." });
      }
  
      const existingProduct = await PM.getProductById(pid); // Use 'await' here
      if (!existingProduct) {
        console.error("Producto no encontrado.");
        return res.status(404).json({ error: "Producto no encontrado." });
      }
  
      const updatedProduct = {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.hasOwnProperty("thumbnails") ? req.body.thumbnails : existingProduct.thumbnails,
      };
  
      PM.updateProduct(pid, updatedProduct);
      res.status(200).json({ message: "Producto actualizado correctamente." });
    } catch (error) {
      res.status(400).json({ error: "Error al actualizar el producto." });
    }
  });
  


router.delete("/:pid", (req, res) => {
    let pid = parseInt(req.params.pid);

    if (PM.deleteProduct(pid)) {
        res.send({status:"ok", message:"El Producto se eliminó correctamente!"});
    } else {
        res.status(500).send({status:"error", message:"Error! No se pudo eliminar el Producto!"});
    }
});

module.exports = router;
