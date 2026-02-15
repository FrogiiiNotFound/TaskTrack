import { Router } from 'express';
import { taskGroupController } from '../controllers/taskGroupController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { TaskGroupSchema } from '../ultils/validation/taskGroupValidation';
import { validate } from '../middlewares/validationMiddleware';
import { UpdateTaskGroupSchema } from '../ultils/validation/updateTaskGroupValidation';
const taskGroupRouter = Router();

taskGroupRouter.use(authMiddleware);

taskGroupRouter.get('/taskGroups', taskGroupController.getGroups);
taskGroupRouter.get('/taskGroups/:id/tasks', taskGroupController.getGroupTasks);

taskGroupRouter.post('/taskGroups', validate(TaskGroupSchema), taskGroupController.createGroup);
taskGroupRouter.patch(
  '/taskGroups/:id',
  validate(UpdateTaskGroupSchema),
  taskGroupController.updateGroup,
);
taskGroupRouter.delete('/taskGroups/:id', taskGroupController.deleteGroup);

export default taskGroupRouter;
