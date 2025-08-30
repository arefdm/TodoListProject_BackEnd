import express from 'express';
import { register,login, logedInUser,logout } from '../controllers/authController.js';
import { authentication } from '../middlewares/authMiddelware.js';
import { validation } from '../middlewares/validationMiddelware.js';
import { registerSchema,loginSchema } from '../validation/authValidation.js';

const router = express.Router();

router.post('/register',validation(registerSchema),register);
router.post('/login',validation(loginSchema),login);
router.post('/logout',logout);
router.use(authentication);
router.get('/get_user',logedInUser);
export default router;

