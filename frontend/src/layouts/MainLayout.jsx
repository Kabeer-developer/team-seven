import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {/* Navbar */}
      <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#eee" }}>
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/challenges">Challenges</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/gallery">Gallery</Link>

        {/* ❌ REMOVED TEAM */}

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
      </nav>

      {/* Page Content */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "10px" }}>
        © Club Hub 2026
      </footer>
    </div>
  );
};

export default MainLayout;