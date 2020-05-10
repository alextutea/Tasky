var express = require('express');
var router = express.Router();

const {jwtVerify} = require("../authentication/controller/middleware/jwtVerification.js")
const getTasks = require("./controller/resolvers/getTasks.js");
const addTask = require("./controller/resolvers/addTask.js");
const updateTasks = require("./controller/resolvers/updateTasks.js");
const deleteTasks = require("./controller/resolvers/deleteTasks.js");

router.get("/", jwtVerify, getTasks);
router.post("/", jwtVerify, addTask);
router.put("/", jwtVerify, updateTasks);
router.delete("/", jwtVerify, deleteTasks);

module.exports = router