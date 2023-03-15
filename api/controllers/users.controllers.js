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


async function createUser(req, res) {
  try {
    const user = await UserModel.create(req.body);
    const rest = await ListModel.findById(user.listas);
    rest.users.push(user.id)
    //guardar siempre los cambios
    await rest.save()
    //
    res.json(user);
  } catch (error) {
    res.json(error);
  }
}