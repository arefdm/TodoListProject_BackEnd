import { getUserTasks,addNewTask } from '../datamodel/taskData.js';

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
  console.log(userId);
  const newTask = await addNewTask(userId,title,description,due_date,status);
  res.status(201).json(newTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
}