import { Router } from 'express';
import { taskController } from '../controllers/taskController';

const taskRouter = Router();

taskRouter.get('/tasks', taskController.getAllTasks);
taskRouter.get('/tasks/:id', taskController.getTaskById);
taskRouter.post('/tasks', taskController.createTask);
taskRouter.patch('/tasks/:id', taskController.updateTask);
taskRouter.delete('/tasks/:id', taskController.deleteTask);

export default taskRouter;
