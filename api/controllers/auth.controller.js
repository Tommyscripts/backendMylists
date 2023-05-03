const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ListModel = require("../models/list.model");
const UserModel = require("../models/user.model");

async function signup(req, res) {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await UserModel.create(req.body);
    const lists = await ListModel.findOne({ name: "Todos los productos" })
    const listas = await ListModel.create({name: "Lista de compra"})
    const listas2 = await ListModel.create({name: "Lista de casa"})
        user.listas.push(lists._id.toLocaleString());
        user.listas.push(listas._id.toLocaleString());
        user.listas.push(listas2._id.toLocaleString());
        user.save();
    const payload = { email: user.email };

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "10h" });
    res.status(200).json({ email: user.email, token }); // token: token
  } catch (error) {
    res.status(500).send(`Error creating user: ${error}`);
  }
}

async function login(req, res) {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).send("Email or password incorrect");
      return;
    }

    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) throw new Error(err);

      if (!result) {
        return res.json({ error: "Email or password incorrect" });
      }

      const token = jwt.sign({ email: user.email }, process.env.SECRET, {
        expiresIn: "10h",
      });

      res.status(200).json({ email: user.email, token });
    });
  } catch (error) {
    res.status(500).send("Error logging user");
  }
}

module.exports = {
  signup,
  login,
};
