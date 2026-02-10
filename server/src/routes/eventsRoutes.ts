import { Router } from 'express';
import { eventsController } from '../controllers/eventsController';

const eventsRouter = Router();

eventsRouter.get('/events', eventsController.getAllEvents);
eventsRouter.get('/events/:id', eventsController.getEvent);
eventsRouter.post('/events', eventsController.addEvent);
eventsRouter.post('/events/:id', eventsController.changeEvent);
eventsRouter.delete('/events/:id', eventsController.deleteEvent);

export default eventsRouter;
