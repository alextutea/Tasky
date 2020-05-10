var express = require('express');
var router = express.Router();

const {jwtVerify} = require("../authentication/controller/middleware/jwtVerification.js");
const getUsers = require("./controller/resolvers/getUsers.js");
const updateUsers = require("./controller/resolvers/updateUsers.js");
const deleteUsers = require("./controller/resolvers/deleteUsers.js");
const {getUsersQueryValidation, updateUsersBodyValidation, deleteUsersBodyValidation} = require("./controller/middleware/validation.js");

router.get("/", jwtVerify, getUsersQueryValidation, getUsers);
router.put("/", jwtVerify, updateUsersBodyValidation, updateUsers);
router.delete("/", jwtVerify, deleteUsersBodyValidation, deleteUsers);

module.exports = router;