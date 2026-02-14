import { Router } from 'express';
import { eventsController } from '../controllers/eventsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const eventsRouter = Router();

eventsRouter.use(authMiddleware);

eventsRouter.get('/events', eventsController.getDayEvents);
eventsRouter.get('/events/:id', eventsController.getEvent);
eventsRouter.post('/events', eventsController.addEvent);
eventsRouter.post('/events/:id', eventsController.changeEvent);
eventsRouter.delete('/events/:id', eventsController.deleteEvent);

export default eventsRouter;
