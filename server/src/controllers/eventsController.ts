import type { NextFunction, Request, Response } from 'express';
import { EventModel } from '../models/EventModel';

export const eventsController = {
  async getDayEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const { date } = req.query as { date: string }; // "2026-02-11"
      const userId = req.user?.id;
      if (!date) {
        return res.status(400).json({ message: 'Дата не указана' });
      }

      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      const dayEvents = await EventModel.find({
        userId,
        startDate: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      }).sort({ startDate: 1 });

      return res.json(dayEvents);
    } catch (e) {
      next(e);
    }
  },
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const event = await EventModel.findOne({ _id: id, userId });
      if (!event) return res.status(404).json({ message: 'Событие не найдено' });

      return res.status(200).json(event);
    } catch (e) {
      next(e);
    }
  },
  async addEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, startDate, endDate } = req.body;
      const userId = req.user?.id;

      const event = await EventModel.create({
        name,
        description,
        startDate,
        endDate,
        userId,
      });

      return res.status(201).json(event);
    } catch (e) {
      next(e);
    }
  },
  async changeEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, startDate, endDate } = req.body;
      const { id } = req.params;
      const userId = req.user?.id;

      const event = await EventModel.findOneAndUpdate(
        { _id: id, userId },
        {
          $set: { name, description, startDate, endDate },
        },
        { new: true, runValidators: true },
      );
      if (!event) return res.status(404).json({ message: 'Событие не найдено' });

      return res.status(200).json({ message: 'Событие успешно изменено', event });
    } catch (e) {
      next(e);
    }
  },
  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      const event = await EventModel.findOneAndDelete({ _id: id, userId });
      if (!event) return res.status(404).json({ message: 'Событие не найдено' });

      return res.status(200).json({ message: 'Событие успешно удалено', event });
    } catch (e) {
      next(e);
    }
  },
};
