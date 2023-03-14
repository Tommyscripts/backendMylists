const router = require("express").Router();
const { authUser, adminCheck, roleCheck } = require("../utils"); // Authenticated Route

const {
  createList,
  updateList,
  getList,
  deleteListById
} = require("../controllers/list.controllers");


router.get("/list", authUser,getList)
router.post("/list", authUser, createList);
router.patch("/list", authUser, updateList);
router.delete("/list", authUser,roleCheck, deleteListById);
module.exports = router;