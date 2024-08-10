const StudentModel = require("../models/student.model");
const StudentServices = require("../services/student.service");
exports.register = async (req, res, next) => {
  try {
    console.log("---req body---", req.body);
    const { email, password, name, Status, role } = req.body;
    const duplicate = await StudentServices.getUserByEmail(email);
    if (duplicate) {
      throw new Error(`UserName ${email}, Already Registered`);
    }
    const response = await StudentServices.registerUser(
      email,
      password,
      name,
      Status,
      role
    );

    res.json({ status: true, success: "User registered successfully" });
  } catch (err) {
    console.log("---> err -->", err);
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      throw new Error("Parameter are not correct");
    }
    let user = await StudentServices.checkUser(email);
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (isPasswordCorrect === false) {
      throw new Error(`Username or Password does not match`);
    }

    let tokenData;
    tokenData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      subject: user.subject,
      Status: user.Status,
    };

    const token = await StudentServices.generateAccessToken(
      tokenData,
      "secret",
      "1h"
    );
    res.status(200).json({
      status: true,
      success: "sendData",
      token: token,
      role: user.role,
    });
  } catch (error) {
    console.log(error, "err---->");
    next(error);
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    const { userId } = req.query;
    let userData = await StudentServices.getUserData(userId);
    res.json({ status: true, success: userData });
  } catch (e) {
    console.log(e, "e-->");
    next(e);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await StudentServices.forgetPassword(email, password);
    if (result.status) {
      res.json({ status: true, success: result.success });
    } else {
      res.status(404).json({ status: false, error: result.error });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
};

// exports.fetchStudentAttendance = async (req, res, next) => {
//   try {
//     const { studentname, subject } = req.query;
//     const StudentAttendance = await StudentServices.fetchStudentAttendance(
//       studentname,
//       subject
//     );
//     res.json({ status: true, data: StudentAttendance });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: false, error: "Internal server error" });
//   }
// };


exports.fetchStudentAttendance = async (req, res, next) => {
  try {
    const { studentname, subject } = req.query;
    const studentAttendance = await StudentServices.fetchStudentAttendance(studentname, subject);
    res.json({ status: true, data: studentAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, error: "Internal server error" });
  }
}

