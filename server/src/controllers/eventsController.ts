import type { NextFunction, Request, Response } from 'express';
import { EventModel } from '../models/EventModel';

export const eventsController = {
  async getAllEvents(req: Request, res: Response, next: NextFunction) {},
  async getEvent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.user?.id;

    const event = await EventModel.findOne({ _id: id, userId });
    if (!event) return res.status(404).json({ message: 'Событие не найдено' });

    return res.status(200).json(event);
  },
  async addEvent(req: Request, res: Response, next: NextFunction) {
    const { name, description, endDate } = req.body;
    const userId = req.user?.id;

    const event = await EventModel.create({
      name,
      description,
      endDate,
    });

    return res.status(200).json(event);
  },
  async changeEvent(req: Request, res: Response, next: NextFunction) {
    const { name, description, endDate } = req.body;
    const { id } = req.params;
    const userId = req.user?.id;

    const event = EventModel.findOneAndUpdate(
      { _id: id, userId },
      { name, description, endDate },
      { new: true, runValidators: true },
    );
    if (!event) return res.status(404).json({ message: 'Событие не найдено' });

    return res.status(200).json({ message: 'Событие успешно изменено', event });
  },
  async deleteEvent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const userId = req.user?.id;

    const event = await EventModel.findOneAndDelete({ _id: id, userId });
    if (!event) return res.status(404).json({ message: 'Событие не найдено' });

    return res.status(200).json({ message: 'Событие успешно удалено', event });
  },
};
