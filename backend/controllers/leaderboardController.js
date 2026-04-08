import {
  calculateGlobalLeaderboard,
  calculateChallengeLeaderboard,
} from "../services/leaderboardService.js";

// GET /api/leaderboard
export const getLeaderboard = async (req, res) => {
  const { challengeId } = req.query;

  if (challengeId) {
    const data = await calculateChallengeLeaderboard(challengeId);
    return res.json(data);
  }

  const data = await calculateGlobalLeaderboard();
  res.json(data);
};