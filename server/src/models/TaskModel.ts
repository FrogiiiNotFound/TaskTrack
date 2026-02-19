import mongoose from 'mongoose';

export interface ITask {
  name: string;
  text: string;
  status: string;
  taskGroup_id: mongoose.Schema.Types.ObjectId;
  user_id: mongoose.Schema.Types.ObjectId;
}

const TaskSchema = new mongoose.Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    status: {
      type: String,
      enum: ['inProgress', 'marked', 'done'],
      required: true,
      default: 'inProgress',
    },
    taskGroup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaskGroup',
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TaskModel = mongoose.model('Task', TaskSchema);
