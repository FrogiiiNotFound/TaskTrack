import type { NextFunction, Request, Response } from 'express';
import ApiError from '../ultils/exeptions/ApiError';
import TokenService from '../services/TokenService';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw ApiError.Unauthorized();

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Формат токена неверный или токен отсутствует' });
  }

  try {
    const userData = TokenService.validateAccessToken(token);
    if (!userData) {
      return res.status(401).json({ message: 'Невалидный токен' });
    }

    req.user = userData;

    next();
  } catch (e) {
    return res.status(401).json({ message: 'Невалидный токен' });
  }
};
