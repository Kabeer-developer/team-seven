import {
  calculateGlobalLeaderboard,
  calculateChallengeLeaderboard,
} from "../services/leaderboardService.js";
import mongoose from "mongoose";

// GET /api/leaderboard
export const getLeaderboard = async (req, res) => {
  const { challengeId } = req.query;

  if (challengeId) {
    if (!mongoose.Types.ObjectId.isValid(challengeId)) {
      return res.status(400).json({ message: "Invalid challengeId" });
    }
    const data = await calculateChallengeLeaderboard(challengeId);
    return res.json(data);
  }

  const data = await calculateGlobalLeaderboard();
  res.json(data);
};