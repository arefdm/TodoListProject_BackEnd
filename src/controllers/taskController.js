import { getUserTasks,addNewTask,editTask, removeTask } from '../datamodel/taskData.js';

export const getTasks = async (req, res) => {
    try {
      const userId = req.user.userId;
      const dueDate = req.query.dueDate;
      const title = req.query.title;
      const allTasks = await getUserTasks(userId,title,dueDate);
      res.send(allTasks);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  };

export const createTask = async (req,res) => {
  try {
  const userId = req.user.userId;
  const {title,description,dueDate,status} = req.body;
  await addNewTask(userId,title,description,dueDate,status);
  res.status(201).json({"message": "task added successfully"});
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
    if(!editedTask[0]){
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(201).json({"message": "task updated successfully"});
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
}

export const deleteTask = async (req,res) => {
  try {
    const userId = req.user.userId;
    const taskId = req.params.task_id;
    const deletedTask = await removeTask(taskId,userId);
    console.log(deletedTask);
    if (!deletedTask[0]) {
      return res.status(404).json({ error: 'Task not found' });
    };
    res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
}