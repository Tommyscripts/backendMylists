const router = require("express").Router();
const { authUser, adminCheck } = require("../utils"); // Authenticated Route

const {
  createList,
  updateList,
  getList,
  deleteListById
} = require("../controllers/list.controllers");


router.get("/list", authUser,getList)
router.post("/list", authUser, createList);
router.patch("/list", authUser, updateList);
router.delete("/list", authUser, deleteListById);
module.exports = router;