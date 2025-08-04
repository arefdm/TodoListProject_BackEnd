import express from 'express';
import {getTasks,createTask, updateTask, deleteTask } from '../controllers/taskController.js';
const router = express.Router();

router.get('/:user_id',getTasks);
router.post('/:user_id', createTask);
router.put('/:user_id.:task_id', updateTask);
router.delete('/:task_id', deleteTask);

export default router;