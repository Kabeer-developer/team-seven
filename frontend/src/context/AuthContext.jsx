import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Login
  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res);
    localStorage.setItem("user", JSON.stringify(res));
  };

  // Register
  const register = async (data) => {
    const res = await registerUser(data);
    setUser(res);
    localStorage.setItem("user", JSON.stringify(res));
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};