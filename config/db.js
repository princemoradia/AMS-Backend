const mongoose = require('mongoose');

const connection = mongoose.createConnection(process.env.MONGO_URL).on('open',()=>{console.log("MongoDB Connected");}).on('error',()=>{
    console.log("MongoDB Connection error");
});

module.exports = connection;