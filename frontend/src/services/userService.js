import api from "./api";

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data;
};

export const getUsers = async (params = {}) => {
  const res = await api.get("/users", { params });
  return res.data.items || [];
};

export const updateUserAdmin = async (id, data) => {
  const res = await api.patch(`/users/${id}/admin`, data);
  return res.data;
};