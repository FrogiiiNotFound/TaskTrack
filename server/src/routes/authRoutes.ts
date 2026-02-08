import { Router } from 'express';
import { authController } from '../controllers/authController';
import { loginValidationRules } from '../ultils/validators/auth/login';

const authRouter = Router();

authRouter.post('/register', authController.registerUser);
authRouter.post('/login', loginValidationRules, authController.loginUser);

export default authRouter;
