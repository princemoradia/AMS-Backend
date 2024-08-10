const db = require("../config/db");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "userName can't be empty"],
      match: [
        /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
        "userName format is not correct",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    name: {
      type: String,
      required: [true, "name is required"],
    },
    Status: {
      type: String,
      default: "false",
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

StudentSchema.pre("save", async function () {
  var user = this;
  if (!user.isModified("password")) {
    return;
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (err) {
    throw err;
  }
});


StudentSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    console.log("----------------no password", this.password);

    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const StudentModel = db.model("all Students", StudentSchema);
module.exports = StudentModel;
