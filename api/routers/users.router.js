const router = require("express").Router();
const { authUser, adminCheck } = require("../utils"); // Authenticated Route

const {
  getUserById,
  deleteUserById,
  updateUser,
  createUser,
  getListaProducto,
  getLista,
  createListAdd,
  updateListaRemove,
} = require("../controllers/users.controllers");

router.get("/profile", authUser, getUserById);
router.post('/admin',authUser,adminCheck,createUser);
router.put("/profile",authUser, updateUser);
router.delete("/profile", authUser, deleteUserById);
router.get("/lista", authUser, getLista);
router.get("/lista/producto", authUser,getListaProducto)
router.patch("/lista/add", authUser, createListAdd);
router.patch("/lista/remove", authUser, updateListaRemove);
module.exports = router;