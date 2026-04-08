import mongoose from "mongoose";

const gallerySchema = mongoose.Schema(
  {
    image: String,
    album: { type: String, default: "General" },
    caption: { type: String, default: "" },
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);