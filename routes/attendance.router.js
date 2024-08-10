const router = require("express").Router();
const AttendanceController = require("../controller/Attendance.controller");
router.post("/addAttendance", AttendanceController.addAttendance);
router.get("/attendance", AttendanceController.fetchAttendanceByFacultyId);

module.exports = router;
