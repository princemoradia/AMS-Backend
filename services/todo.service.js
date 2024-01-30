const ToDoModel = require("../models/todo.model");

class ToDoService{
    static async createToDo(userId,title,description,category){
            const createToDo = new ToDoModel({userId,title,description,category});
            return await createToDo.save();
    }

    static async getUserToDoList(userId){
        const todoList = await ToDoModel.find({userId})
        return todoList;
    }

   static async deleteToDo(id){
        const deleted = await ToDoModel.findByIdAndDelete({_id:id})
        return deleted;
   }

  //  static async handleUpdateUsers(req,res){
  //   await ToDoModel.findByIdAndUpdate(req.params.id,{title,description,category});
  //   res.status(200).json({message:"User Updated Successfully"});
  //  }

  //  static async updateTodo(id, updatedTodoData) {
  //   try {
  //     // Find the todo by ID and update its data
  //     const updatedTodo = await TodoModel.findByIdAndUpdate(
  //       id,
  //       updatedTodoData,
  //       { new: true } // Return the updated document
  //     );

  //     return updatedTodo;
  //   } catch (error) {
  //     throw error;
  //   }
  // }

}

module.exports = ToDoService;