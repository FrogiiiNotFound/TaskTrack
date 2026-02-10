import type { NextFunction, Request, Response } from 'express';
import ApiError from '../ultils/exeptions/ApiError';
import { TaskGroupModel } from '../models/TaskGroupModel';
import { TaskModel } from '../models/TaskModel';

export const taskGroupController = {
  getGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;

      const groups = await TaskGroupModel.find({ userId }).sort({ title: 1 }).lean();

      return res.status(200).json(groups);
    } catch (e) {
      next(e);
    }
  },
  getGroupTasks: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { groupId } = req.params;
      const userId = req.user?.id;

      const tasks = await TaskModel.find({ groupId, userId }).sort({ createdAt: -1 });

      return res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  },
  createGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, bannerUrl, color } = req.body;
      if (!name) throw ApiError.BadRequest('Имя обязательно');
      const userId = req.user?.id;

      const candidate = await TaskGroupModel.findOne({ name, user: userId });
      if (candidate) throw ApiError.BadRequest('Группа с таким именем уже существует');

      const group = await TaskGroupModel.create({
        name,
        bannerUrl,
        color,
        userId,
      });

      return res.status(201).json(group);
    } catch (e) {
      next(e);
    }
  },
  updateGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, bannerUrl, color } = req.body;
      const { id } = req.params;
      const userId = req.user?.id;

      if (name) {
        const candidate = await TaskGroupModel.findOne({
          name,
          user: userId,
          _id: { $ne: id },
        });
        if (candidate) throw ApiError.BadRequest('Группа с таким именем уже существует');
      }

      const updatedGroup = await TaskGroupModel.findOneAndUpdate(
        { _id: id, userId },
        { name, bannerUrl, color },
        { new: true, runValidators: true },
      );
      if (!updatedGroup) return res.status(404).json({ message: 'Группа не найдена' });

      return res.status(200).json({
        message: 'Группа успешно изменена',
        updatedGroup,
      });
    } catch (e) {
      next(e);
    }
  },
  deleteGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const group = await TaskGroupModel.findOne({ _id: id, userId });
      if (!group) return res.status(404).json({ message: 'Группа не найдена' });

      await TaskModel.deleteMany({ taskGroupId: id, userId });

      await TaskGroupModel.deleteOne({ _id: id, userId });

      return res.status(200).json({
        message: 'Группа успешно удалена',
        deletedGroupId: id,
      });
    } catch (e) {
      next(e);
    }
  },
};
