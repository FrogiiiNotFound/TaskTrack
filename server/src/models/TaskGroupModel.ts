import mongoose from 'mongoose';

export interface ITaskGroup {
  name: string;
  banner_url: string;
  color: string;
  is_activated: boolean;
  user_id: mongoose.Schema.Types.ObjectId;
}

const TaskGroupSchema = new mongoose.Schema<ITaskGroup>({
  name: {
    type: String,
    require: true,
  },
  banner_url: {
    type: String,
  },
  color: {
    type: String,
    enum: ['#880d1e', '#606c38', '#f26a8d', '#7f5539', '#0077b6', '#5a189a', '#fdf0d5'],
    default: '#0077b6',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

export const TaskGroupModel = mongoose.model('TaskGroup', TaskGroupSchema);
