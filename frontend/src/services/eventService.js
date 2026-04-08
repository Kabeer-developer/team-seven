import api from "./api";

export const getEvents = async (params = {}) => {
  const res = await api.get("/events", { params });
  return res.data.items || [];
};

export const getEventById = async (id) => {
  const res = await api.get(`/events/${id}`);
  return res.data;
};

export const createEvent = async (data) => {
  const res = await api.post("/events", data);
  return res.data;
};

export const updateEvent = async (id, data) => {
  const res = await api.put(`/events/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};

export const registerEvent = async (id) => {
  const res = await api.post(`/events/${id}/register`);
  return res.data;
};