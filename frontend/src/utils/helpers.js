// Format date (for events)
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Truncate long text
export const truncateText = (text, length = 100) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

// Capitalize first letter
export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// Get user from localStorage
export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Logout helper
export const logoutUser = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
};