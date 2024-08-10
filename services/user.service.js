const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

class UserServices {
  static async registerUser(email, password, name, subject, role) {
    try {
      console.log(
        "-----Email --- Password-----",
        email,
        password,
        name,
        subject,
        role
      );

      const createUser = new UserModel({
        email,
        password,
        name,
        subject,
        role,
      });
      return await createUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (err) {
      console.log(err);
    }
  }

  static async checkUser(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
    return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
  }

  static async forgetPassword(email, password) {
    try {
      const user = await UserModel.findOne({ email });
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

  //   static async resetUserPassword(email, password) {
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     user.password = password;
  //     await user.save();

  //     return "Password updatd successfully";
  //   }

  // static async getUserData(userId){
  //     const user = await UserModel.find({userId : userId})
  //     return user;
  // }
}

module.exports = UserServices;
