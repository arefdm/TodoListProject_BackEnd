import express from 'express';
import { register,login, logedInUser } from '../controllers/authController.js';
import { authentication } from '../middlewares/authMiddelware.js';
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.use(authentication);
router.post('/get_user',logedInUser);
export default router;

