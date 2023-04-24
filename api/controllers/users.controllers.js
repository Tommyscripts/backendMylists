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
  updateListaRemove,
};

function getUserById(req, res) {
  const users = res.locals.user;
  UserModel.findById(users.id)
    .populate("listas")
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
    .populate({ path: "favorites", populate: { path: "restaurant" } })
    .then((result) => res.json(result.favorites))
    .catch((err) => res.json(err));
}

function createListAdd(req, res) {
  UserModel.findById(res.locals.user.id)
    .then((result) => {
      result.favorites.push(req.body.id);
      result.save().then((fav) => {
        res.json(result.favorites);
      });
    })
    .catch((err) => res.json(err));
}
function updateListaRemove(req, res) {
  UserModel.findById(res.locals.user.id)
  .then(user => {
    let index = user.favorites.indexOf(req.body.id)
    user.favorites.splice(index, 1)
    user.save()
    res.json(user)
  })
    .catch((err) => res.json(err));
}
function getLista(req, res) {
  UserModel.findById(res.locals.user.id)
    .then((result) => res.json(result.favorites))
    .catch((err) => res.json(err));
}