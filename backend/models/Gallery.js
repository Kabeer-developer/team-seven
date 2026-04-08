import mongoose from "mongoose";

const gallerySchema = mongoose.Schema(
  {
    image: String,
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);