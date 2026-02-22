import type { NextFunction, Request, Response } from 'express';
import EventsService from '../services/EventsService';

export const eventsController = {
  async getEvent(req: Request<{ eventId: string }>, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.params;
      const userId = req.user!.id;

      const event = await EventsService.getEventById(eventId, userId);

      return res.status(200).json(event);
    } catch (e) {
      next(e);
    }
  },
  async changeEvent(req: Request<{ eventId: string }>, res: Response, next: NextFunction) {
    try {
      const eventDto = req.body;
      const { eventId } = req.params;
      const userId = req.user!.id;

      const event = await EventsService.changeEvent(eventDto, eventId, userId);

      return res.status(200).json({ message: 'Событие успешно изменено', event });
    } catch (e) {
      next(e);
    }
  },
  async deleteEvent(req: Request<{ eventId: string }>, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.params;
      const userId = req.user!.id;

      const deletedEvent = await EventsService.deleteEvent(eventId, userId);

      return res.status(200).json({ message: 'Событие успешно удалено', deletedEvent });
    } catch (e) {
      next(e);
    }
  },
};
