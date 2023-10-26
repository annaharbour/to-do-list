const Task = require("../Models/TaskModel")
const User = require("../Models/UserModel");

module.exports.createTask = async (req, res) => {
  console.log("Received request body:", req.body);

  try {
    const { task, user } = req.body;
    const newTask = new Task({ task, user, completed: false });

    // Save the new task to the database
    await newTask.save();

    // Log the new task
    console.log("Created task:", newTask);

    // Send the new task as the response
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a task" });
  }
};

      
module.exports.getTasks = async (req, res) => {
        try {
          const user = req.user; 
          const tasks = await Task.find({ user });
          res.json(tasks);
        } catch (error) {
          res.status(500).json({ error: "Failed to retrieve tasks" });
        }
      };

// module.exports.updateTask = async (req, res) => {
//         try {
//           const taskId = req.params.id; 

//           const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
//           res.json(updatedTask);
//         } catch (error) {
//           res.status(500).json({ error: "Failed to update the task" });
//         }
//       };

module.exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(taskId, { task, completed }, { new: true });

    // Check if the task was found and updated
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Log the updated task
    console.log("Updated task:", updatedTask);

    // Send the updated task as the response
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating a task:", error);
    res.status(500).json({ error: "Failed to update the task" });
  }
};


module.exports.deleteTask = async (req, res) => {
        try {
          const taskId = req.params.id; 
          await Task.findByIdAndRemove(taskId);
          res.json({ message: "Task deleted successfully" });
        } catch (error) {
          res.status(500).json({ error: "Failed to delete the task" });
        }
      };
      

      