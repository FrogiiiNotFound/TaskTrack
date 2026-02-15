import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validate } from '../middlewares/validationMiddleware';
import { AuthSchema } from '../ultils/validation/authValidation';

const authRouter = Router();

authRouter.post('/register', validate(AuthSchema), authController.registerUser);
authRouter.post('/login', validate(AuthSchema), authController.loginUser);
authRouter.post('/logout', authController.logoutUser);
authRouter.post('/refresh', authController.refresh);
authRouter.post('/activate/:link', authController.activate);

export default authRouter;
