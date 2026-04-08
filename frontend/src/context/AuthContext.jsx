import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { getProfile } from "../services/userService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const hydrateUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) return;

      // Start with cached auth user for instant UI.
      setUser(storedUser);

      // Refresh from backend so role changes (like promote to admin) reflect in navbar.
      try {
        const profile = await getProfile();
        const mergedUser = {
          ...storedUser,
          ...profile,
          token: storedUser.token,
        };
        setUser(mergedUser);
        localStorage.setItem("user", JSON.stringify(mergedUser));
      } catch {
        // Keep cached user if profile refresh fails temporarily.
        setUser(storedUser);
      }
    };

    hydrateUser();
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