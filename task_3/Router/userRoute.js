const express = require("express");
const router = express.Router();
const data = require("../Model/data.json");
const Users = require("../Controller/userController");
const { checkfields,validateResult } = require("../Utils/validator");

const user = new Users();

router.route("/users")
    .get(user.getAllUsers)
    .post(checkfields,validateResult,user.addUser);

router.route("/user/:id")
    .get(user.findById)
    .put(checkfields,validateResult,user.updateUser)
    .delete(user.deleteUser);





module.exports = router;