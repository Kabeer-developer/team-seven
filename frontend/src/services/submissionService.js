import api from "./api";

// USER: submit solution
export const submitSolution = async (data) => {
  const res = await api.post("/submissions", data);
  return res.data;
};

// USER: get own submissions
export const getMySubmissions = async () => {
  const res = await api.get("/submissions/me");
  return res.data;
};

// ADMIN: get all submissions
export const getSubmissions = async () => {
  const res = await api.get("/submissions");
  return res.data;
};

// ADMIN: give score
export const gradeSubmission = async (id, score) => {
  const res = await api.put(`/submissions/${id}/grade`, { score });
  return res.data;
};