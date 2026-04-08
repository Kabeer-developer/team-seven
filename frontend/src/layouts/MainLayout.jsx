import { Outlet, Link } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, [user]);
  // Use context first, but fallback to localStorage to avoid missing nav links on stale context.
  const effectiveUser = user || storedUser;
  const isAdminUser = (effectiveUser?.role || "").toLowerCase() === "admin";

  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <nav className="border-b border-slate-200 bg-white/95 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3">
          <Link to="/" className="font-semibold text-indigo-600 dark:text-indigo-400">Club Hub</Link>
          <Link to="/events">Events</Link>
          <Link to="/challenges">Challenges</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/announcements">Announcements</Link>
          <Link to="/stats">Stats</Link>
          {effectiveUser && <Link to="/dashboard">Dashboard</Link>}
          {effectiveUser && <Link to="/profile">Profile</Link>}
          {isAdminUser && <Link to="/team">Team</Link>}
          {isAdminUser && <Link to="/admin">Admin</Link>}
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              className="rounded-md border border-slate-300 px-3 py-1 text-sm dark:border-slate-700"
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
            {effectiveUser ? (
              <button onClick={logout} className="rounded-md bg-rose-600 px-3 py-1 text-sm text-white">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="rounded-md border border-slate-300 px-3 py-1 text-sm dark:border-slate-700">Login</Link>
                <Link to="/register" className="rounded-md bg-indigo-600 px-3 py-1 text-sm text-white">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </div>

      <footer className="border-t border-slate-200 py-4 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © Club Hub 2026
      </footer>
    </div>
  );
};

export default MainLayout;