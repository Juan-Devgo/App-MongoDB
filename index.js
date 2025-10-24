const Product = require("./models/product.model");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

// Endpoints, Controllers, Services

app.get("/", (req, res) => {
  res.send("Hello from Node API.");
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id: ${id} not found` });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with id: ${id} not found` });
    }

    res.status(200).send(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Conección a la base de datos MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/node_app")
  .then(() => {
    console.log("Connected to the database.");

    // Si la conexión es exitosa, la aplicación corre en el puerto 3000

    app.listen(3000, () => {
      console.log("Server is running on port 3000.");
    });
  })
  .catch(() => {
    console.log("Connection to the database failed.");
  });
