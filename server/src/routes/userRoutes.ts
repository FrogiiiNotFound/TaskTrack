import { Router } from 'express';
import { userController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get('/user', userController.getUser);
userRouter.patch('/user/nickname', userController.changeNickname);
userRouter.patch('/user/avatar', upload.single('avatar'), userController.changeAvatar);
userRouter.delete('/user/avatar', userController.deleteAvatar);

export default userRouter;
