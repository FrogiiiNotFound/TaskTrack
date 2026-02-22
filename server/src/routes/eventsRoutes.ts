import { Router } from 'express';
import { eventsController } from '../controllers/eventsController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validationMiddleware';
import { EventSchema } from '../ultils/validation/eventValidation';

const eventsRouter = Router();

eventsRouter.use(authMiddleware);

eventsRouter.get('/events/:eventId', eventsController.getEvent);
eventsRouter.put('/events/:eventId', validate(EventSchema), eventsController.changeEvent);
eventsRouter.delete('/events/:eventId', eventsController.deleteEvent);

export default eventsRouter;
