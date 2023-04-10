const ProductsModel = require("../models/productos.model");
const ListModel = require("../models/list.model")
const bcrypt = require("bcrypt");

module.exports = {
  addProduct,
  createProduct,
  deleteProductById
};
function addProduct(req, res) {
  ProductsModel.findById(productos._id)
    .populate({ path: "productos", populate: { path: "list" } })
    .then((result) => res.json(result.favorites))
    .catch((err) => res.json(err));
}
function createProduct(req, res) {
  ProductsModel.create(req.body)
  .then((products) => {
    ListModel.findOneAndUpdate({name:"Todos los productos"})
        .then((respond)=>{
          respond.productos.push(products._id.toLocaleString())
          respond.save(),
          res.json(respond)
        }).catch((err) => res.json(err));
    })
}

function deleteProductById(req, res) {
  ListModel.findByIdAndDelete(req.params.id)
    .then((response) =>res.json(response))  
    .catch((err) => res.json(err));
}