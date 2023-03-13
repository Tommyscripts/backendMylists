const router = require("express").Router();
const { authUser, adminCheck } = require("../utils"); // Authenticated Route

const {
  addProduct,
  createProduct,
}= require("../controllers/products.controller");


router.get("/products", authUser, addProduct);
router.post("/products", adminCheck, createProduct);



module.exports = router;