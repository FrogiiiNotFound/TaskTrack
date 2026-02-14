import { Router } from 'express';
import { taskGroupController } from '../controllers/taskGroupController';
import { authMiddleware } from '../middlewares/authMiddleware';

const taskGroupRouter = Router();

taskGroupRouter.use(authMiddleware);

taskGroupRouter.get('/taskGroups', taskGroupController.getGroups);
taskGroupRouter.get('/taskGroups/:id/tasks', taskGroupController.getGroupTasks);
taskGroupRouter.post('/taskGroups', taskGroupController.createGroup);
taskGroupRouter.patch('/taskGroups/:id', taskGroupController.updateGroup);
taskGroupRouter.delete('/taskGroups/:id', taskGroupController.deleteGroup);

export default taskGroupRouter;
