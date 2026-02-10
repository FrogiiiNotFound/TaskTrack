import { Router } from 'express';
import { taskGroupController } from '../controllers/taskGroupController';

const taskGroupRouter = Router();

taskGroupRouter.get('/taskGroups', taskGroupController.getGroups);
taskGroupRouter.get('/taskGroups/:id/tasks', taskGroupController.getGroupTasks);
taskGroupRouter.post('/taskGroups', taskGroupController.createGroup);
taskGroupRouter.patch('/taskGroups/:id', taskGroupController.updateGroup);
taskGroupRouter.delete('/taskGroups/:id', taskGroupController.deleteGroup);

export default taskGroupRouter;
