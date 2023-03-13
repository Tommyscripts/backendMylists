const router = require("express").Router();
const { authUser, adminCheck } = require("../utils"); // Authenticated Route

const {
  addProduct,
} = require("../controllers/products.controllers");


router.get("/products", authUser, addProduct);

module.exports = router;