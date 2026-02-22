import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    created_at: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
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

export const EventModel = mongoose.model("Event", EventsSchema);
