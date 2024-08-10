const router = require("express").Router();
const UserController = require('../controller/user.controller');
// const upload = require("../middleware/imagemiddleware");
const UserModel = require("../models/user.model");
router.post("/register",UserController.register);

router.post("/login", UserController.login);

router.get("/userData", UserController.getUserData);

router.post('/resetpassword',UserController.resetPassword);


module.exports = router;