import api from "./api";

export const getGallery = async () => {
  const res = await api.get("/gallery");
  return res.data.items || [];
};

// 🔥 supports BOTH file + URL
export const addImage = async (data, isFile = false) => {
  const res = await api.post("/gallery", data, {
    headers: isFile
      ? { "Content-Type": "multipart/form-data" }
      : {},
  });
  return res.data;
};