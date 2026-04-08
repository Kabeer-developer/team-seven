import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["visitor", "member", "admin"],
      default: "member",
    },
    avatar: String,
    bio: String,
    skills: [String],
    github: String,
    linkedin: String,
    score: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },

    roleInClub: String, // Lead/Core/Member
    batch: String,
    domain: String,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);