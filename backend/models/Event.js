import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    category: String,
    image: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);