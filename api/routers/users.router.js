const router = require("express").Router();
const { authUser, adminCheck } = require("../utils"); // Authenticated Route

const {
  getUserById,
  deleteUserById,
  updateUser,
  createUser,
  addProduct,
  createList,
  updateList,
  getList
} = require("../controllers/users.controllers");

router.get("/profile", authUser, getUserById);
router.post('/admin',authUser,adminCheck,createUser);
router.put("/profile",authUser, updateUser);
router.delete("/profile", authUser, deleteUserById);
router.get("/profile/list", authUser, addProduct);
router.get("/profile/list", authUser,getList)
router.post("/favorite/list", authUser, createList);
router.patch("/favorite/list", authUser, updateList);
module.exports = router;