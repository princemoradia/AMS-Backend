const AttendanceService = require("../services/attendance.service");

exports.addAttendance = async (req, res, next) => {
  try {
    const { studentName, facultyId, subject, status } = req.body;

    const result = await AttendanceService.storeAttendanceData(
      studentName,
      facultyId,
      subject,
      status
    );

    if (result.status) {
      res.json({ status: true, success: result.success });
    } else {
      res.status(500).json({ status: false, error: result.error });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.fetchAttendanceByFacultyId = async (req, res, next) => {
  try {
    const { facultyId } = req.query;
    const attendance = await AttendanceService.fetchAttendanceByFacultyId(
        facultyId,
    )
    res.json({ status: true, data: attendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
};
