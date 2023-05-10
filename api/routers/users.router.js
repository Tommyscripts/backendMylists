const router = require("express").Router();
const { authUser, adminCheck, roleCheck } = require("../utils"); // Authenticated Route

const {
  getUserById,
  deleteUserById,
  updateUser,
  createUser,
  getListaProducto,
  getLista,
  createListAdd,
  updateListaRemoveCompra,
  updateListaRemoveCasa
} = require("../controllers/users.controllers");

router.get("/profile", authUser, getUserById);
router.post('/admin',authUser,adminCheck,createUser);
router.put("/profile",authUser, updateUser);
router.delete("/profile", authUser, deleteUserById);
router.get("/lista", authUser, getLista);
router.get("/lista/producto", authUser,getListaProducto)
router.patch("/lista/add", authUser, createListAdd);
router.patch("/lista/:lista/remove/:id/:compra", authUser, updateListaRemoveCasa);
router.patch("/lista/:lista/remove/compra/:id", authUser, updateListaRemoveCompra);

module.exports = router;