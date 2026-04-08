import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    title: String,
    message: String,
  },
  { timestamps: true }
);

export default mongoose.model("Announcement", announcementSchema);