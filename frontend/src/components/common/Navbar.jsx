import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo || "https://via.placeholder.com/40"}
            className="w-10 h-10 rounded-xl"
          />
          <span className="font-bold text-lg dark:text-white">ClubHub</span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/challenges">Challenges</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/gallery">Gallery</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme}>🌙</button>

          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/profile">Profile</Link>
              {user.role === "admin" && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;