const router = require("express").Router();
const StudentController = require('../controller/student.controller');
// const upload = require("../middleware/imagemiddleware");
const StudentModel = require("../models/student.model");
router.post("/sregister",StudentController.register);

router.post("/slogin", StudentController.login);

router.post('/sresetpassword',StudentController.resetPassword);

// router.post('/takeUserAttendance',StudentController.getTakeUserAttendance);
router.get("/sattendance", StudentController.fetchStudentAttendance);

module.exports = router;