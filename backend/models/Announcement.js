import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    title: String,
    message: String,
    content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);