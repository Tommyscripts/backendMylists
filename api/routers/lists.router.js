const router = require("express").Router();
const { authUser, adminCheck, roleCheck } = require("../utils"); // Authenticated Route

const {
  createList,
  updateList,
  getList,
  deleteListById,
  delteProductoById
} = require("../controllers/list.controllers");


router.get("/list", authUser,roleCheck, getList)
router.post("/list", authUser,roleCheck, createList);
router.patch("/list", authUser,roleCheck, updateList);
router.delete("/list/:id", authUser,roleCheck, deleteListById);
router.delete("list/producto:id",authUser,delteProductoById)
module.exports = router;