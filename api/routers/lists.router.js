const router = require("express").Router();
const { authUser, adminCheck, roleCheck } = require("../utils"); // Authenticated Route

const {
  createList,
  updateList,
  getList,
  deleteListById
} = require("../controllers/list.controllers");


router.get("/list", authUser,roleCheck, getList)
router.post("/list", authUser,roleCheck, createList);
router.patch("/list", authUser,roleCheck, updateList);
router.delete("/list/:id", authUser,roleCheck, deleteListById);
module.exports = router;