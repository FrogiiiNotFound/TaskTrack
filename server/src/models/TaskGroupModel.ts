import mongoose from 'mongoose';

const TaskGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  bannerUrl: {
    type: String,
  },
  color: {
    type: String,
    enum: ['#880d1e', '#606c38', '#f26a8d', '#7f5539', '#0077b6', '#5a189a', '#fdf0d5'],
    require: true,
    createdAt: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

export const TaskGroupModel = mongoose.model('TaskGroup', TaskGroupSchema);
