import { type Event } from './../ultils/validation/eventValidation';
import { EventModel } from '../models/EventModel';
import ApiError from '../ultils/exeptions/ApiError';

class EventsService {
  async getDayEvents(date: string, userId: string) {
    if (!date) throw ApiError.BadRequest('Дата не указана');

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

    return dayEvents;
  }

  async getEventById(eventId: string, userId: string) {
    const event = await EventModel.findOne({ _id: eventId, userId });
    if (!event) throw ApiError.NotFound('Событие не найдено');

    return event;
  }

  async addEvent(eventData: Event, userId: string) {
    const event = await EventModel.create({
      ...eventData,
      user_id: userId,
    });

    return event;
  }

  async changeEvent(eventDto: Event, eventId: string, userId: string) {
    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: eventId, userId },
      {
        $set: eventDto,
      },
      { new: true, runValidators: true },
    );
    if (!updatedEvent) throw ApiError.NotFound('Событие не найдено');

    return updatedEvent;
  }

  async deleteEvent(eventId: string, userId: string) {
    const event = await EventModel.findOneAndDelete({ _id: eventId, userId });
    if (!event) throw ApiError.NotFound('Событие не найдено');

    return event;
  }
}

export default new EventsService();
