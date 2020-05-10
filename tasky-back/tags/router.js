var express = require('express');
var router = express.Router();

const {jwtVerify} = require("../authentication/controller/middleware/jwtVerification.js")
const getTags = require("./controller/resolvers/getTags.js");
const addTag = require("./controller/resolvers/addTag.js");
const updateTags = require("./controller/resolvers/updateTags.js");
const deleteTags = require("./controller/resolvers/deleteTags.js");

router.get("/", jwtVerify, getTags);
router.post("/", jwtVerify, addTag);
router.put("/", jwtVerify, updateTags);
router.delete("/", jwtVerify, deleteTags);

module.exports = router