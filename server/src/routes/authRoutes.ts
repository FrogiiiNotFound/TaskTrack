import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validate } from '../middlewares/validationMiddleware';
import { AuthSchema } from '../ultils/validation/authValidation';

const authRouter = Router();

authRouter.post('/register', validate(AuthSchema), authController.register);
authRouter.post('/login', validate(AuthSchema), authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/activate/:link', authController.activate);

export default authRouter;
