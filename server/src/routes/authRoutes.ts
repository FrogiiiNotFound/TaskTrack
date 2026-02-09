import { Router } from 'express';
import { authController } from '../controllers/authController';
import { loginValidationRules } from '../ultils/validators/auth/login';
import { body } from 'express-validator';

const authRouter = Router();

authRouter.post(
  '/register',
  body('email').notEmpty(),
  body('password').isLength({ min: 6 }),
  authController.registerUser,
);
authRouter.post('/login', loginValidationRules, authController.loginUser);

export default authRouter;
