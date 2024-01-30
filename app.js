require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser")
const UserRoute = require("./routes/user.routes");
const ToDoRoute = require('./routes/todo.router');
const mongoose = require('mongoose');

const app = express();

mongoose.createConnection(process.env.MONGO_URL).on('open',()=>{console.log("MongoDB Connected");}).on('error',()=>{
    console.log("MongoDB Connection error");
});

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