var express = require('express');
var router = express.Router();

const {loginValidation, registerValidation} = require("./controller/middleware/validation.js");
const {jwtVerify} = require("./controller/middleware/jwtVerification.js");
const login = require("./controller/resolvers/login.js");
const register = require("./controller/resolvers/register.js");
const sayHello = require("./controller/resolvers/sayHello.js")

router.post("/login", loginValidation, login);
router.post("/register", registerValidation, register);

router.post("/sayHello", jwtVerify, sayHello); //sanity check

module.exports = router