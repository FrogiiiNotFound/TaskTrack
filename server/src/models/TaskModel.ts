import mongoose, { type InferSchemaType, Model } from "mongoose";
import { Status } from "../types/taskStatus";

export type ITask = InferSchemaType<typeof TaskSchema>;

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    text: String,
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
      default: "inProgress",
    },
    taskGroup_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskGroup",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const TaskModel: Model<ITask> = mongoose.model<ITask>("Task", TaskSchema);
