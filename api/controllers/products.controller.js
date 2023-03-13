const ProductsModel = require("../models/products.model");
const bcrypt = require("bcrypt");

module.exports = {
  addProduct
};


function addProduct(req, res) {
    ProductsModel.findById(res.locals.user.id)
      .populate({path:"productos",populate:{path:"list"}})
      .then((result) => res.json(result.favorites))
      .catch((err) => res.json(err));
  }