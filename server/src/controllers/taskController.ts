import type { NextFunction, Request, Response } from 'express';
import ApiError from '../ultils/exeptions/ApiError';
import { TaskModel } from '../models/TaskModel';
import { TaskGroupModel } from '../models/TaskGroupModel';

interface UserPayload {
  id: string;
  email: string;
  isActivated: boolean;
}

interface AuthRequest extends Request {
  user?: UserPayload;
}

export const taskController = {
  createTask: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { name, text, taskGroupId } = req.body;
      if (!name) throw ApiError.BadRequest('Title is required');
      if (!taskGroupId) throw ApiError.BadRequest('Task group is required');

      const userId = req.user?.id;

      const group = await TaskGroupModel.findOne({ _id: taskGroupId, user: userId });
      if (!group) throw ApiError.BadRequest('Task group not found');

      const task = await TaskModel.create({
        name,
        text,
        taskGroupId,
        userId,
      });

      return res.status(201).json(task);
    } catch (e) {
      next(e);
    }
  },
  updateTask: async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const userId = req.user?.id;
    const { name, text, status, taskGroupId } = req.body;

    if (taskGroupId) {
      const group = await TaskGroupModel.findOne({ _id: taskGroupId, user: userId });
      if (!group) throw ApiError.BadRequest('Task Group not found');
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      { name, text, status, taskGroupId },
      { new: true, runValidators: true },
    );
    if (!updatedTask) throw ApiError.BadRequest('Task not found');

    return res.status(200).json(updatedTask);
  },
  deleteTask: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { taskId } = req.params;
      const userId = req.user?.id;

      const task = await TaskModel.findOneAndDelete({ _id: taskId, user: userId });
      if (!task) throw ApiError.BadRequest('Task not found');

      return res.status(200).json({
        message: 'Task deleted successfully',
        id: taskId,
      });
    } catch (e) {
      next(e);
    }
  },
};
