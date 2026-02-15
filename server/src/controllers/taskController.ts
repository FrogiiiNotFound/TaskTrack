import type { NextFunction, Request, Response } from 'express';
import ApiError from '../ultils/exeptions/ApiError';
import { TaskModel } from '../models/TaskModel';
import { TaskGroupModel } from '../models/TaskGroupModel';

export const taskController = {
  getAllTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      const tasks = await TaskModel.find({ userId })
        .populate('taskGroup', 'title color')
        .sort({
          createdAt: -1,
        } as any);

      return res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  },
  getTaskById: async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?.id;

    const task = TaskModel.findOne({ _id: id, userId }).populate('taskGroup');
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    return res.status(200).json(task);
  },
  createTask: async (req: Request, res: Response, next: NextFunction) => {
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
  updateTask: async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    const userId = req.user?.id;
    const { name, text, status, taskGroupId } = req.body;

    if (taskGroupId) {
      const group = await TaskGroupModel.findOne({ _id: taskGroupId, user: userId });
      if (!group) throw ApiError.BadRequest('Task Group not found');
    }

    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, user: userId },
      { $set: { name, text, status, taskGroupId } },
      { new: true, runValidators: true },
    );
    if (!updatedTask) throw ApiError.BadRequest('Task not found');

    return res.status(200).json(updatedTask);
  },
  updateTaskState: async (req: Request, res: Response, next: NextFunction) => {

  },
  deleteTask: async (req: Request, res: Response, next: NextFunction) => {
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
