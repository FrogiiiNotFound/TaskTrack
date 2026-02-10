import mongoose from 'mongoose';

const EventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  endDate: {
    type: String,
  },
  userId: {
    type: String,
  },
});

export const EventModel = mongoose.model('Event', EventsSchema);
