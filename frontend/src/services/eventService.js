import api from "./api";

export const getEvents = async () => {
  const res = await api.get("/events");
  return res.data;
};

export const createEvent = async (data) => {
  const res = await api.post("/events", data);
  return res.data;
};

export const registerEvent = async (id) => {
  const res = await api.post(`/events/${id}/register`);
  return res.data;
};