import { Router } from 'express';
import authRouter from './authRoutes';
import taskRouter from './tasksRoutes';
import taskGroupRouter from './taskGroupsRoutes';
import eventsRouter from './eventsRoutes';

const router = Router();

router.use(authRouter);
router.use(taskRouter);
router.use(taskGroupRouter);
router.use(eventsRouter);

export default router;
