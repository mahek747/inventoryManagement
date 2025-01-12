const express = require("express");
const route = express.Router();
const { userSignUp, userLogin, getUser, updateUser, deleteUser } = require("../controller/user.controller");

route.post("/signup", userSignUp);
route.post("/login", userLogin);
route.get("/:id", getUser);
route.put("/:id", updateUser);
route.delete("/:id",  deleteUser);

module.exports = route;
