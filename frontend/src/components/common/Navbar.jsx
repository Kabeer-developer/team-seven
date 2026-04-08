import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "15px", padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ color: "#fff" }}>Home</Link>
      <Link to="/events" style={{ color: "#fff" }}>Events</Link>
      <Link to="/challenges" style={{ color: "#fff" }}>Challenges</Link>
      <Link to="/leaderboard" style={{ color: "#fff" }}>Leaderboard</Link>
      <Link to="/projects" style={{ color: "#fff" }}>Projects</Link>
      <Link to="/gallery" style={{ color: "#fff" }}>Gallery</Link>

      {user ? (
        <>
          <Link to="/profile" style={{ color: "#fff" }}>Profile</Link>
          {user.role === "admin" && (
            <Link to="/admin" style={{ color: "#fff" }}>Admin</Link>
          )}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "#fff" }}>Login</Link>
          <Link to="/register" style={{ color: "#fff" }}>Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;