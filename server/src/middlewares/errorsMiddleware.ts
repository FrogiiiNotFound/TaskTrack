import type { NextFunction, Request, Response } from 'express';

export const errorsHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if ((err.name = 'ValidationError')) {
    return res.status(400).json({ message: 'Ошибка валидации БД', errors: err.errors });
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
