const express = require("express");
const route = express.Router();
const { createOrder, getOrders, updateOrder, deleteOrder } = require("../controller/order.controller");

route.post("/create", createOrder);
route.get("/:id?", getOrders);
route.put("/:id", updateOrder);
route.delete("/:id", deleteOrder);

module.exports = route;
