import api from "./api";

export const getLeaderboard = async (challengeId) => {
  const params = challengeId ? { challengeId } : {};
  const res = await api.get("/leaderboard", { params });
  return res.data;
};