import type { NextFunction, Request, Response } from 'express';
import TasksService from '../services/TasksService';

export const taskController = {
  getTaskById: async (req: Request<{ taskId: string }>, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const userId = req.user!.id;

      const task = await TasksService.getTaskById(taskId, userId);

      return res.status(200).json(task);
    } catch (e) {
      next(e);
    }
  },
  createTask: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData = req.body;
      const userId = req.user!.id;

      const task = await TasksService.createTask(taskData, userId);

      return res.status(201).json(task);
    } catch (e) {
      next(e);
    }
  },
  updateTask: async (req: Request<{ taskId: string }>, res: Response, next: NextFunction) => {
    const taskDto = req.body;
    const { taskId } = req.params;
    const userId = req.user!.id;

    const updatedTask = await TasksService.updateTask(taskDto, taskId, userId);

    return res.status(200).json(updatedTask);
  },
  deleteTask: async (req: Request<{ taskId: string }>, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const userId = req.user!.id;

      const deletedTask = await TasksService.deleteTask(taskId, userId);

      return res.status(200).json({
        message: 'Задача успешно удалена',
        id: deletedTask._id,
      });
    } catch (e) {
      next(e);
    }
  },
};
