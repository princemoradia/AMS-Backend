const UserServices = require('../services/user.service');
const userModel = require("../models/user.model");
const UserModel = require('../models/user.model');
exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`)
        }
        const response = await UserServices.registerUser(email, password);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id, email: user.email };
    

        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }

}


// exports.loggedInUserData = async (req, res, next) => {
//     try {
//         const userId = req.params.userId || req.query.userId; // Adjust based on how you pass the user ID

//         if (!userId) {
//             throw new Error('User ID is missing in the request');
//         }

//         const userData = await UserServices.LoggedInUserData(userId);

//         if (!userData) {
//             throw new Error('User not found');
//         }

//         res.status(200).json({ status: true, data: userData });
//     } catch (error) {
//         console.log(error, 'err---->');
//         next(error);
//     }
// }


exports.getUserData = async (req,res,next)=>{
    try{
        const { userId } = req.query;
        let userData = await UserServices.getUserData(userId);
        res.json({status:true, success: userData});
    }catch(e){
        console.log(e,"e-->");
        next(e);
    }
}

