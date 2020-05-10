var express = require('express');
var router = express.Router();

const {jwtVerify} = require("../authentication/controller/middleware/jwtVerification.js");
const getGroups = require("./controller/resolvers/getGroups.js")
const addGroup = require("./controller/resolvers/addGroup.js")
const updateGroups = require("./controller/resolvers/updateGroups.js")
const deleteGroups = require("./controller/resolvers/deleteGroups.js")


router.get("/", jwtVerify, getGroups);
router.post("/", jwtVerify, addGroup);
router.put("/", jwtVerify, updateGroups);
router.delete("/", jwtVerify, deleteGroups);

module.exports = router;