const UserModel = require("../models/user.model");
const ListModel = require("../models/list.model")
const bcrypt = require("bcrypt");

module.exports = {
  getUserById,
  deleteUserById,
  updateUser,
  createUser
};

function getUserById(req, res) {
  res.json(res.locals.user);
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
    ListModel.findOne({name:"Todos los productos"})
        .then((res)=>{
          user.listas.push(res._id.toLocaleString())
          user.save(),
          res.json(user)
        }).catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
}