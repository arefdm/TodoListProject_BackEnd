import express from 'express';
import {getTasks,createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authentication } from '../middlewares/authMiddelware.js';
const router = express.Router();

router.use(authentication);

router.get('/',getTasks);
router.post('/', createTask);
router.put('/:task_id', updateTask);
router.delete('/:task_id', deleteTask);

export default router;