const ListModel = require("../models/list.model");
const UserModel = require("../models/user.model")
const bcrypt = require("bcrypt");


module.exports = {
  createList,
  updateList,
  getList,
  deleteListById,
  delteProductoById
};

function createList(req, res) {
  ListModel.create(req.body)
  .then((list)=>
    {
      UserModel.findByIdAndUpdate(res.locals.user.id)
      .then((user)=>{
        user.listas.push(list)
        user.save(),
        res.json(user)
    })
    .catch((err) => res.json(err));
    }
    
  )
  .catch((err) => res.json(err));
}

  function updateList(req, res) {
    ListModel.findById(res.locals.user.id)
    .then(user => {
      let index = user.listas.indexOf(req.body.id)
      user.listas.splice(index, 1)
      user.save()
      res.json(user)
    })
      .catch((err) => res.json(err));
  }
  
  function getList(req, res) {
    UserModel.findById(res.locals.user.id)
      .populate({path:"listas", populate:{path:"productos"}})
      .then((result) => res.json(result.listas))
      .catch((err) => res.json(err));
  }
  function deleteListById(req, res) {
    ListModel.findByIdAndDelete(req.params.id)
      .then((response) =>res.json(response))  
      .catch((err) => res.json(err));
  }

  function delteProductoById(req, res) {
    ListModel.findById(req.params.id)
      .populate("productos")
      .then((response) => {
        let index = response.productos.findIndex(producto => producto._id == req.params.list);
        if (index !== -1) {
          response.productos.splice(index, 1);
          response.save();
          res.json(response);
        } else {
          res.json({ message: "El producto no se encontró en la lista" });
        }
      })
      .catch((err) => res.json(err));
  }
  