const AttendanceModel = require("../models/attendance.model");

class AttendanceService {
  static async storeAttendanceData(studentName, facultyId, subject, status) {
    try {
      const attendance = await AttendanceModel.create({
        studentName,
        facultyId,
        subject,
        status,
      });

      return { status: true, success: "Attendance data stored successfully" };
    } catch (error) {
      console.error("Error storing attendance:", error);
      return { status: false, error: error.message || "Internal server error" };
    }
  }

  static async fetchAttendanceByFacultyId(facultyId) {
    try {
      console.log("called");
      const attendance = await AttendanceModel.find({ facultyId })
        .select("studentName createdAt subject")
        .populate("facultyId", "name");
      return { status: true, data: attendance };
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return { status: false, error: error.message || "Internal server error" };
    }
  }
}

module.exports = AttendanceService;
