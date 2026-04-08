import Submission from "../models/Submission.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Global leaderboard (all users)
export const calculateGlobalLeaderboard = async () => {
  const leaderboard = await Submission.aggregate([
    {
      $group: {
        _id: "$user",
        totalScore: { $sum: "$score" },
      },
    },
    {
      $sort: { totalScore: -1 },
    },
  ]);

  // Populate user details
  const populated = await Promise.all(
    leaderboard.map(async (entry) => {
      const user = await User.findById(entry._id).select("name email avatar");

      return {
        user,
        totalScore: entry.totalScore,
      };
    })
  );

  return populated;
};

// Challenge-specific leaderboard
export const calculateChallengeLeaderboard = async (challengeId) => {
  const challengeObjectId = new mongoose.Types.ObjectId(challengeId);

  const leaderboard = await Submission.aggregate([
    {
      $match: {
        challenge: challengeObjectId,
      },
    },
    {
      $group: {
        _id: "$user",
        totalScore: { $sum: "$score" },
      },
    },
    {
      $sort: { totalScore: -1 },
    },
  ]);

  const populated = await Promise.all(
    leaderboard.map(async (entry) => {
      const user = await User.findById(entry._id).select("name email");

      return {
        user,
        totalScore: entry.totalScore,
      };
    })
  );

  return populated;
};