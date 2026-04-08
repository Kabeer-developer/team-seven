import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div style={{ display: "flex" }}>
      
      {/* Sidebar */}
      <div style={{ width: "200px", background: "#ddd", padding: "10px" }}>
        <h3>Admin</h3>
        <Link to="/admin">Dashboard</Link>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;