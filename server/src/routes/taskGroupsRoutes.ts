import { Router } from 'express';
import { taskGroupController } from '../controllers/taskGroupsController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { TaskGroupSchema } from '../ultils/validation/taskGroupValidation';
import { validate } from '../middlewares/validationMiddleware';
import { UpdateTaskGroupSchema } from '../ultils/validation/updateTaskGroupValidation';
const taskGroupRouter = Router();

taskGroupRouter.use(authMiddleware);

taskGroupRouter.get('/taskGroups', taskGroupController.getTaskGroups);
taskGroupRouter.get('/taskGroups/:id', taskGroupController.getTaskGroupById);
taskGroupRouter.get('/taskGroups/:id/tasks', taskGroupController.getTaskGroupsTasks);
taskGroupRouter.post('/taskGroups', validate(TaskGroupSchema), taskGroupController.createTaskGroup);
taskGroupRouter.patch(
  '/taskGroups/:id',
  validate(UpdateTaskGroupSchema),
  taskGroupController.updateTaskGroup,
);
taskGroupRouter.delete('/taskGroups/:id', taskGroupController.deleteTaskGroup);

export default taskGroupRouter;
