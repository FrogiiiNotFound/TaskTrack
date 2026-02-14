import mongoose from 'mongoose';

const EventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  userId: {
    type: String,
  },
});

export const EventModel = mongoose.model('Event', EventsSchema);
