import mongoose from 'mongoose';

const EventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  end_date: {
    type: Date,
  },
  user_id: {
    type: String,
  },
});

export const EventModel = mongoose.model('Event', EventsSchema);
