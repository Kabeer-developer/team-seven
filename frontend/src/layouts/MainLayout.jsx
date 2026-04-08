import { Outlet, Link } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);

  // ✅ FIX: moved here
  const [isOpen, setIsOpen] = useState(false);

  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  }, [user]);

  const effectiveUser = user || storedUser;
  const isAdminUser =
    (effectiveUser?.role || "").toLowerCase() === "admin";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}
      <nav className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-6xl">

          {/* TOP BAR */}
          <div className="flex items-center justify-between">
            <Link to="/" className="font-semibold text-indigo-600">
              Club Hub
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-4">
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

              {effectiveUser ? (
                <button
                  onClick={logout}
                  className="bg-rose-600 px-3 py-1 text-sm text-white rounded-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link className="border px-3 py-1 rounded-md" to="/login">
                    Login
                  </Link>
                  <Link
                    className="bg-indigo-600 text-white px-3 py-1 rounded-md"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* HAMBURGER BUTTON */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="mt-4 flex flex-col gap-3 md:hidden">
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

              {effectiveUser ? (
                <button
                  onClick={logout}
                  className="bg-rose-600 px-3 py-2 text-white rounded-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link className="border px-3 py-2 rounded-md" to="/login">
                    Login
                  </Link>
                  <Link
                    className="bg-indigo-600 text-white px-3 py-2 rounded-md"
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* CONTENT */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <Outlet />
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
        © Club Hub 2026
      </footer>
    </div>
  );
};

export default MainLayout;