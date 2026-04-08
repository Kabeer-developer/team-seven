import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ stats, setStats, announcements, setAnnouncements }}
    >
      {children}
    </GlobalContext.Provider>
  );
};