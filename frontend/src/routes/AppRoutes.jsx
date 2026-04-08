import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

import Events from "../pages/Events";
import EventDetail from "../pages/EventDetail";

import Challenges from "../pages/Challenges";
import ChallengeDetail from "../pages/ChallengeDetail";

import Leaderboard from "../pages/Leaderboard";

import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";

import Gallery from "../pages/Gallery";
import Admin from "../pages/Admin";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>

        {/* PUBLIC */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />

          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:id" element={<ChallengeDetail />} />

          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />

          <Route path="/gallery" element={<Gallery />} />
        </Route>

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* ADMIN */}
        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRoutes;