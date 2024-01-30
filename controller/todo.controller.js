const ToDoModel = require('../models/todo.model');
const ToDoService = require('../services/todo.service');

exports.createToDo =  async (req,res,next)=>{
    try {
        const { userId,title, desc,cat } = req.body;
        let todoData = await ToDoService.createToDo(userId,title,desc,cat);
        res.json({status: true,success:todoData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getToDoList = async (req, res, next) => {
    try {
      const { userId } = req.query; // Use req.query to get parameters from the URL query string
   // Use req.query to get parameters from the URL query string
let todoData = await ToDoService.getUserToDoList(userId);

      res.json({ status: true, success: todoData });
    } catch (error) {
      console.log(error, 'err---->');
      next(error);
    }
  }
  

exports.deleteToDo =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await ToDoService.deleteToDo(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}


exports.updateTodo = async(req,res,next)=>{
  try{
    const {title,description,category} = req.body;
    const user = await ToDoModel.findByIdAndUpdate(req.params.id,{title,description,category});
    res.status(200).json({message:"User Updated Successfully"});
    console.log(user);
  }catch(e){
    console.log(e);
    next(e)
  }
}

