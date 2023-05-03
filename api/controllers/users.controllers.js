const UserModel = require("../models/user.model");
const ListModel = require("../models/list.model");

const bcrypt = require("bcrypt");

module.exports = {
  getUserById,
  deleteUserById,
  updateUser,
  createUser,
  getListaProducto,
  getLista,
  createListAdd,
  updateListaRemoveCompra,
  updateListaRemoveCasa,
};

function getUserById(req, res) {
  const users = res.locals.user;
  UserModel.findById(users.id)
    .populate({ path: "listas", populate: { path: "productos" } })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

function updateUser(req, res) {
  const users = res.locals.user;
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  UserModel.findByIdAndUpdate(users, req.body, {
    new: true,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

function deleteUserById(req, res) {
  UserModel.findByIdAndDelete(res.locals.user.id)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
}

function createUser(req, res) {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  UserModel.create(req.body)
    .then((user) => {
      ListModel.findOne({ name: "Todos los productos" })
        .then((res) => {
          user.listas.push(res._id.toLocaleString());
          user.save(), res.json(user);
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
}

function getListaProducto(req, res) {
  UserModel.findById(res.locals.user.id)
    .populate("listas")
    .then((result) => res.json(result.listas))
    .catch((err) => res.json(err));
}

function createListAdd(req, res) {
  ListModel.findById(req.body.id)
    .then((result) => {
      result.productos.push(req.body.producto);
      result.save();
      res.json(result);
    })
    .catch((err) => res.json(err));
}

function updateListaRemoveCasa(req, res) {
  const users = res.locals.user;
  UserModel.findById(users.id)
    .populate({ path: "listas", populate: { path: "productos" } })
    .then((user) => {
      ListModel.find({ name: "Lista de casa" })
        .then((list) => {
          let index = list[0].productos.indexOf(req.params.id);
          list[0].productos.splice(index, 1);
          list[0].save();
          ListModel.find({ name: "Lista de compra" })
            .then((list) => {
              list[0].productos.push(req.params.id);
              list[0].save();
              res.json(user);
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    })

    .catch((err) => res.json(err));
}

function updateListaRemoveCompra(req, res) {
  const users = res.locals.user;
  UserModel.findById(users.id)
    //hago el populate para poder entrar a productos de la lista del usuario
    .populate({ path: "listas", populate: { path: "productos" } })
    .then((user) => {
      //le digo a que lista quiero entrar y cual quiero modificar
      ListModel.find({ name: "Lista de compra" })
        .then((list) => {
          //encuentra el indice del producto dentro del array de producto que tiene listas
          let index = list[0].productos.indexOf(req.params.id);
          //le pido que borre el producto indicado en dicha array, es necesario darle la posicion 0 para que busque la ID del producto dseado
          list[0].productos.splice(index, 1);
          //una vez borrado hago que se guarden los datos
          list[0].save();
          //accedo a la lista que quiero meter el producto una vez eliminado
          ListModel.find({ name: "Lista de casa" })
            .then((list) => {
              //puseo la id del producto que he eliminado anteriormente
              list[0].productos.push(req.params.id);
              //una vez borrado hago que se guarden los datos
              list[0].save();
              res.json(user);
            })
            .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
    })

    .catch((err) => res.json(err));
}
function getLista(req, res) {
  UserModel.findById(res.locals.user.id)
    .then((result) => res.json(result.listas))
    .catch((err) => res.json(err));
}
