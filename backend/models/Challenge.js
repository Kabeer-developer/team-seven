import mongoose from "mongoose";

const challengeSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    difficulty: String,
    category: String,
    deadline: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Challenge", challengeSchema);