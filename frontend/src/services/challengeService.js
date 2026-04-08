import api from "./api";

export const getChallenges = async (params = {}) => {
  const res = await api.get("/challenges", { params });
  return res.data.items || [];
};

export const getChallengeById = async (id) => {
  const res = await api.get(`/challenges/${id}`);
  return res.data;
};

export const createChallenge = async (data) => {
  const res = await api.post("/challenges", data);
  return res.data;
};

export const updateChallenge = async (id, data) => {
  const res = await api.put(`/challenges/${id}`, data);
  return res.data;
};

export const deleteChallenge = async (id) => {
  const res = await api.delete(`/challenges/${id}`);
  return res.data;
};