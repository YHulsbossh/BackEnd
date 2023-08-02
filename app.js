const express = require("express");
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router");

const app = express();
const puerto = 8080;

app.use(express.json());
app.use("/api/products/", productsRouter);
app.use("/api/carts/", cartsRouter);

app.listen(puerto, () => {
    console.log("Servidor activo en el puerto: " + puerto);
});

