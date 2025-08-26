import express from 'express';
import {getTasks,createTask, updateTask, deleteTask } from '../controllers/taskController.js';
import { authentication } from '../middlewares/authMiddelware.js';
import { validation } from '../middlewares/validationMiddelware.js';
import { addEditTaskSchema } from '../validation/taskValidation.js';

const router = express.Router();

router.use(authentication);

router.get('/',getTasks);
router.post('/',validation(addEditTaskSchema), createTask);
router.put('/:task_id',validation(addEditTaskSchema), updateTask);
router.delete('/:task_id', deleteTask);

export default router;