import express from 'express';
import {getTasks,createTask} from '../controllers/taskController.js';
const router = express.Router();

router.get('/:user_id',getTasks);
router.post('/:user_id', createTask);
// router.put('/:id', taskController.updateTask);
// router.delete('/:id', deleteTask);

export default router;