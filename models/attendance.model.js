const db = require("../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AttendanceSchema = new Schema(
  {
    studentName: {
      type:String,
      required: true
    },
    facultyId: {
      type: Schema.Types.ObjectId,
      ref: "all users", 
      required: true
    },
    status: {
      type: String,
      enum: ["present", "absent"],
      default: "absent"
    },
    subject: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const AttendanceModel = db.model("Data Mining", AttendanceSchema);
module.exports = AttendanceModel;
