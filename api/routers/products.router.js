const router = require("express").Router();
const { authUser, adminCheck } = require("../utils"); // Authenticated Route

const {
  addProduct,
  createProduct,
  deleteProductById
}= require("../controllers/products.controller");


router.get("/products", authUser, addProduct);
router.post("/products",authUser, adminCheck, createProduct);
router.delete("/products/:id",authUser, adminCheck,deleteProductById);


module.exports = router;