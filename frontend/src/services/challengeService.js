import api from "./api";

export const getChallenges = async () => {
  const res = await api.get("/challenges");
  return res.data;
};

export const getChallengeById = async (id) => {
  const res = await api.get(`/challenges/${id}`);
  return res.data;
};

export const createChallenge = async (data) => {
  const res = await api.post("/challenges", data);
  return res.data;
};