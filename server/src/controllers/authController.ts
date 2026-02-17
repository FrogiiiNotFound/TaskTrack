import type { NextFunction, Request, Response } from 'express';
import { ACTIVATE_URL } from '../config/constants';
import AuthService from '../services/AuthService';
import type { Auth } from '../ultils/validation/authValidation';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: Auth = req.body;
      const data = await AuthService.register(email, password);

      res.cookie('refreshToken', data.tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.status(201).json({
        user: data.user,
        accessToken: data.tokens.accessToken,
      });
    } catch (e) {
      next(e);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password }: Auth = req.body;
      const data = await AuthService.login(email, password);

      res.cookie('refreshToken', data.tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.status(200).json({
        tokens: data.tokens,
        user: data.userDto,
      });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);

      res.clearCookie(refreshToken);

      res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);

      res.cookie('refreshToken', userData.tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.status(200).json({
        user: userData.user,
        accessToken: userData.tokens.accessToken,
      });
    } catch (e) {
      next(e);
    }
  },
  activate: async (req: Request<{ link: string }>, res: Response, next: NextFunction) => {
    try {
      const link = req.params.link;
      await AuthService.activate(link);

      res.status(200).redirect(ACTIVATE_URL as string);
    } catch (e) {
      next(e);
    }
  },
};
