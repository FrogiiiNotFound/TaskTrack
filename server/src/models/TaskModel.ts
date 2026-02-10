import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
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
    taskGroupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TaskGroup',
      required: true,
    },
    userId: {
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
