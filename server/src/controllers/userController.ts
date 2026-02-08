import type { NextFunction, Request, Response } from 'express';
import UserService from '../services/UserService';
import { CLIENT_URL } from '../config/constants';

export const userController = {
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
