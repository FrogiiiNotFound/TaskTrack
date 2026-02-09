import { Router } from 'express';
import { taskController } from '../controllers/taskController';

const taskRoutes = Router();

taskRoutes.post('/tasks', taskController.createTask);
taskRoutes.patch('/tasks/:id', taskController.updateTask);
taskRoutes.delete('/tasks/:id', taskController.deleteTask);

export default taskRoutes;
