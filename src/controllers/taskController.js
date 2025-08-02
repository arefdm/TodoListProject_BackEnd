import { getUserTasks } from '../datamodel/taskData.js';

export const getTasks = async (req, res) => {
    try {
      const userId = req.params.user_id;
      const Alltasks = await getUserTasks(userId);
      res.send(Alltasks);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
  };