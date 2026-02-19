import type { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { CLIENT_URL, IMAGE_PATH } from '../config/constants';
import ApiError from '../ultils/exeptions/ApiError';

export const userController = {
  getUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.id;

      const user = await UserService.getUser(userId);

      return user;
    } catch (e) {
      next(e);
    }
  },
  changeNickname: async (req: Request, res: Response, next: NextFunction) => {
    const { nickname } = req.body;
    const userId = req.user!.id;

    const userData = await UserService.updateAvatar(nickname, userId);

    return userData;
  },
  changeAvatar: async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
    if (!file) throw ApiError.BadRequest('Файл необходим');
    const userId = req.user!.id;

    const userData = await UserService.updateAvatar(`${IMAGE_PATH}${req.file?.filename}`, userId);

    return userData;
  },
  deleteAvatar: async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const deletedAvatar = await UserService.deleteAvatar(userId);

    return deletedAvatar;
  },
  activate: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const activationLink = req.params.link as string;

      await UserService.activate(activationLink);

      return res.redirect(CLIENT_URL as string);
    } catch (e) {
      next(e);
    }
  },
};
