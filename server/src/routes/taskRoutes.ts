import { Router } from 'express';
import { taskController } from '../controllers/taskController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { UpdateTaskSchema } from '../ultils/validation/updateTaskValidation';
import { TaskSchema } from '../ultils/validation/taskValidation';

const taskRouter = Router();

taskRouter.use(authMiddleware);

taskRouter.get('/tasks', taskController.getAllTasks);
taskRouter.get('/tasks/:id', taskController.getTaskById);

taskRouter.post('/tasks', validate(TaskSchema), taskController.createTask);
taskRouter.patch('/tasks/:id', validate(UpdateTaskSchema), taskController.updateTask);
taskRouter.delete('/tasks/:id', taskController.deleteTask);

export default taskRouter;
