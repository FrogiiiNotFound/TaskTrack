import type { NextFunction, Request, Response } from 'express';
import TaskGroupsService from '../services/TaskGroupsService';

export const taskGroupController = {
  getTaskGroups: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      const groups = await TaskGroupsService.getTaskGroups(userId);

      return res.status(200).json(groups);
    } catch (e) {
      next(e);
    }
  },
  getTaskGroupById: async (
    req: Request<{ groupid: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { groupid } = req.params;
      const userId = req.user!.id;

      const group = await TaskGroupsService.getTaskGroupById(groupid, userId);

      return res.status(200).json(group);
    } catch (e) {
      next(e);
    }
  },
  getTaskGroupsTasks: async (
    req: Request<{ groupId: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { groupId } = req.params;
      const userId = req.user!.id;

      const tasks = await TaskGroupsService.getTaskGroupTasks(groupId, userId);

      return res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  },
  createTaskGroup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const groupData = req.body;
      const userId = req.user!.id;

      const group = await TaskGroupsService.createTaskGroup(groupData, userId);

      return res.status(201).json(group);
    } catch (e) {
      next(e);
    }
  },
  updateTaskGroup: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const dto = req.body;
      const { id } = req.params;
      const userId = req.user!.id;

      const updatedGroup = TaskGroupsService.updateTaskGroup(id, userId, dto);

      return res.status(200).json({
        message: 'Группа успешно изменена',
        data: updatedGroup,
      });
    } catch (e) {
      next(e);
    }
  },
  deleteTaskGroup: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      await TaskGroupsService.deleteTaskGroup(id, userId);

      return res.status(200).json({
        message: 'Группа успешно удалена',
        deletedGroupId: id,
      });
    } catch (e) {
      next(e);
    }
  },
};
