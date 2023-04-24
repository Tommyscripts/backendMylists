const router = require("express").Router();
const { authUser, adminCheck } = require("../utils"); // Authenticated Route

const {
  getUserById,
  deleteUserById,
  updateUser,
  createUser,
  getListsProducts,
  createListsProducts,
  updateListsProducts
} = require("../controllers/users.controllers");

router.get("/profile", authUser, getUserById);
router.post('/admin',authUser,adminCheck,createUser);
router.put("/profile",authUser, updateUser);
router.delete("/profile", authUser, deleteUserById);
router.get("/lista/producto",authUser,getListsProducts)
router.create("/lista/add",authUser,createListsProducts)
router.path("/lista/remove",authUser,updateListsProducts)
module.exports = router;