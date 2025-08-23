import { getUserTasks,addNewTask,editTask, removeTask } from '../datamodel/taskData.js';

export const getTasks = async (req, res) => {
    try {
      const userId = req.user.userId;
      const dueDate = req.query.dueDate;
      const title = req.query.title;
      console.log(dueDate);
      const allTasks = await getUserTasks(userId,title,dueDate);
      console.log(allTasks);
      res.send(allTasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const createTask = async (req,res) => {
  try {
  const userId = req.user.userId;
  const {title,description,dueDate,status} = req.body;
  const newTask = await addNewTask(userId,title,description,dueDate,status);
  res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const updateTask = async (req,res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.task_id;
    const {title,description,dueDate,status} = req.body;
    const editedTask = await editTask(taskId,userId,title,description,dueDate,status);
    res.status(201).json(editedTask);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
}

export const deleteTask = async (req,res) => {
  try {
    const taskId = req.params.task_id;
    const deletedTask = await removeTask(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
}