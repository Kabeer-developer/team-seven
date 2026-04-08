import api from "./api";

export const getGallery = async () => {
  const res = await api.get("/gallery");
  return res.data.items || [];
};

export const addImage = async (data) => {
  const res = await api.post("/gallery", data);
  return res.data;
};