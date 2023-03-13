const ProductsModel = require("../models/productos.model");
const bcrypt = require("bcrypt");

module.exports = {
  addProduct,
  createProduct,
};


function addProduct(req, res) {
    ProductsModel.findById(res.locals.user.id)
      .populate({path:"productos",populate:{path:"list"}})
      .then((result) => res.json(result.favorites))
      .catch((err) => res.json(err));
  }

  function createProduct(req, res) {
    const products = res.locals.product;
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    ProductsModel.findByIdAndUpdate(products, req.body, {
      new: true,
    })
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }