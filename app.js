const express = require("express");
const bodyParser = require("body-parser")
const UserRoute = require("./routes/user.routes");
// const ToDoRoute = require('./routes/todo.router');
const AttendanceRoute = require('./routes/attendance.router');
const app = express();
const StudentRoute = require('./routes/student.routes');
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));
app.use("/",UserRoute);
app.use("/",AttendanceRoute);
app.use("/",StudentRoute);
// app.use("/",ToDoRoute);

module.exports = app;