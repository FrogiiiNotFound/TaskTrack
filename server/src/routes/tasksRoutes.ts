import { Router } from 'express';
import { taskController } from '../controllers/tasksController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { UpdateTaskSchema } from '../ultils/validation/updateTaskValidation';
import { TaskSchema } from '../ultils/validation/taskValidation';

const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.get('/tasks/:taskId', taskController.getTaskById);
taskRouter.post('/tasks', validate(TaskSchema), taskController.createTask);
taskRouter.patch('/tasks/:taskId', validate(UpdateTaskSchema), taskController.updateTask);
taskRouter.delete('/tasks/:taskId', taskController.deleteTask);

export default taskRouter;
