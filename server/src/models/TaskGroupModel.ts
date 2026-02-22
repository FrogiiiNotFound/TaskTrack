import mongoose, { Types } from "mongoose";
import { Colors } from "../types/groupColors";

export interface ITaskGroup {
  name: string;
  banner_url: string;
  color: string;
  is_activated: boolean;
  user_id: Types.ObjectId;
}

const TaskGroupSchema = new mongoose.Schema<ITaskGroup>({
  name: {
    type: String,
    required: true,
  },
  banner_url: {
    type: String,
  },
  color: {
    type: String,
    enum: Object.values(Colors),
    default: Colors.BLUE,
  },
  is_activated: {
    type: Boolean,
    default: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const TaskGroupModel = mongoose.model<ITaskGroup>("TaskGroup", TaskGroupSchema);
