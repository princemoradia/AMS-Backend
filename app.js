require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser")
const UserRoute = require("./routes/user.routes");
const ToDoRoute = require('./routes/todo.router');

const app = express();

const port = process.env.port || 3000;


app.listen(port,()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
})
console.log("My name is ",process.env.MYNAME);
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));
app.use("/",UserRoute);
app.use("/",ToDoRoute);

module.exports = app;