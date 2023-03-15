const ProductsModel = require("../models/productos.model");
const bcrypt = require("bcrypt");

module.exports = {
  addProduct,
  createProduct,
};
function addProduct(req, res) {
  ProductsModel.findById(productos._id)
    .populate({ path: "productos", populate: { path: "list" } })
    .then((result) => res.json(result.favorites))
    .catch((err) => res.json(err));
}
function createProduct(req, res) {
  ProductsModel.create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
}
