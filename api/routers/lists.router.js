const router = require("express").Router();
const { authUser, adminCheck, roleCheck } = require("../utils"); // Authenticated Route

const {
  createList,
  updateList,
  getList,
  deleteListById,
  delteProductoById
} = require("../controllers/list.controllers");


router.get("/list", authUser, getList)
router.post("/list", authUser, createList);
router.patch("/list", authUser, updateList);
router.delete("/list/:id", authUser, deleteListById);
router.delete("/list/:id/producto/:list",authUser,delteProductoById)
module.exports = router;