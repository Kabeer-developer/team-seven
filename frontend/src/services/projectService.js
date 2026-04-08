import api from "./api";

export const getProjects = async (params = {}) => {
  const res = await api.get("/projects", { params });
  return res.data.items || [];
};

export const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data;
};

export const toggleProjectLike = async (id) => {
  const res = await api.post(`/projects/${id}/like`);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await api.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

export const setProjectFeatured = async (id, isFeatured) => {
  const res = await api.patch(`/projects/${id}/featured`, { isFeatured });
  return res.data;
};