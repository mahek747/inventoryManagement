const express = require("express");
const route = express.Router();
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controller/product.controller");

route.post("/create", createProduct);
route.get("/:id?", getProducts);
route.put("/:id", updateProduct); 
route.delete("/:id", deleteProduct); 

module.exports = route;
