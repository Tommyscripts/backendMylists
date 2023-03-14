const ListModel = require("../models/list.model");
const bcrypt = require("bcrypt");


module.exports = {
  createList,
  updateList,
  getList,
  deleteListById
};

function createList(req, res) {
  ListModel.create(req.body)
  .then((list)=>
    res.json(list)
  )
  .catch((err) => res.json(err));
}

  function updateList(req, res) {
    ListModel.findById(res.locals.user.id)
    .then(user => {
      let index = user.favorites.indexOf(req.body.id)
      user.favorites.splice(index, 1)
      user.save()
      res.json(user)
    })
      .catch((err) => res.json(err));
  }
  
  function getList(req, res) {
    ListModel.findById(res.locals.user.id)
      .then((result) => res.json(result.favorites))
      .catch((err) => res.json(err));
  }
  function deleteListById(req, res) {
    ListModel.findByIdAndDelete(res.locals.user.id)
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  }