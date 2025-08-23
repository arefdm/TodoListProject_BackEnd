import express from 'express';
import { register,login, logedInUser,logout } from '../controllers/authController.js';
import { authentication } from '../middlewares/authMiddelware.js';
const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.use(authentication);
router.get('/get_user',logedInUser);
export default router;

