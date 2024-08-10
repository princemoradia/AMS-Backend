const AttendanceModel = require("../models/attendance.model");
const StudentModel = require("../models/student.model");
const jwt = require("jsonwebtoken");

class StudentServices {
  static async registerUser(email, password, name, Status, role) {
    try {
      console.log(
        "-----Email --- Password-----",
        email,
        password,
        name,
        Status,
        role
      );

      const createUser = new StudentModel({
        email,
        password,
        name,
        Status,
        role,
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await StudentModel.findOne({ email });
    } catch (err) {
      console.log(err);
    }
  }

  static async checkUser(email) {
    try {
      return await StudentModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
    return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
  }

  static async forgetPassword(email, password) {
    try {
      const user = await StudentModel.findOne({ email });

      if (!user) {
        return { status: false, error: "User not found" };
      }

      user.password = password;
      await user.save();

      return { status: true, success: "Password updated successfully" };
    } catch (error) {
      console.error("Error:", error);
      return { status: false, error: "Internal server error" };
    }
  }

  // static async fetchStudentAttendance(name, subject) {
  //   try {
  //     const userAttendance = await AttendanceModel.find({
  //       studentName: name,
  //       subject:subject,

  //     }).select("stauts");
  //     return { status: true, data: userAttendance};
  //   } catch (error) {
  //     console.log("Error", error);
  //     return { status: false, error: "Internal server error" };
  //   }
  // }


  static async fetchStudentAttendance(name, subject) {
    try {
      const userAttendance = await AttendanceModel.find({
        studentName: name,
        subject: subject,
      }).select("studentName subject status createdAt"); // Selecting required fields
      return { status: true, data: userAttendance};
    } catch (error) {
      console.log("Error", error);
      return { status: false, error: "Internal server error" };
    }
  }
  
}

module.exports = StudentServices;
