const UserServices = require("../services/user.service");
exports.register = async (req, res, next) => {
  try {
    console.log("---req body---", req.body);
    const { email, password, name, subject, role, } = req.body;
    const duplicate = await UserServices.getUserByEmail(email);
    if (duplicate) {
      throw new Error(`UserName ${email}, Already Registered`); 
    }
    const response = await UserServices.registerUser(
      email,
      password,
      name,
      subject,
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

    if (!email || !password || !role ) {
      throw new Error("Parameter are not correct");
    }
    let user = await UserServices.checkUser(email);
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (isPasswordCorrect === false) {
      throw new Error(`Username or Password does not match`);
    }

    // Creating Token

    let tokenData;
    tokenData = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      subject: user.subject,
      // year: user.year,
    };

    const token = await UserServices.generateAccessToken(
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
    let userData = await UserServices.getUserData(userId);
    res.json({ status: true, success: userData });
  } catch (e) {
    console.log(e, "e-->");
    next(e);
  }
};


exports.resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await UserServices.forgetPassword(email, password);
    if (result.status) {
      res.json({ status: true, success: result.success });
    } else {
      res.status(404).json({ status: false, error: result.error });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: false, error: 'Internal server error' });
  }
};



// exports.resetPassword = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const message = await UserServices.resetUserPassword(email, password);
//     res.json({ status: true, success: message });
//   } catch (error) {
//     res.status(400).json({ status :false});
//   }
// };
