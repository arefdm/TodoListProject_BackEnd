import { getUserTasks,addNewTask,editTask } from '../datamodel/taskData.js';

export const getTasks = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const allTasks = await getUserTasks(userId);
      res.send(allTasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };

export const createTask = async (req,res) => {
  try {
  const userId = req.params.user_id;
  const {title,description,due_date,status} = req.body;
  const newTask = await addNewTask(userId,title,description,due_date,status);
  res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export const updateTask = async (req,res) => {
  try {
    const userId = req.params.user_id;
    const taskId = req.params.task_id;
    const {title,description,due_date,status} = req.body;
    const EditedTask = await editTask(taskId,userId,title,description,due_date,status);
    res.status(201).json(newTask);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
}