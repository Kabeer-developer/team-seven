import { useEffect, useState } from "react";
import { getStats } from "../services/statsService";

const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-2xl font-semibold text-gray-700">Loading stats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-6">
            Platform Stats
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Real-time insights into our community growth and activity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent mb-4">
              {stats.users.toLocaleString()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-gray-600">Active community members</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent mb-4">
              {stats.events.toLocaleString()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Events</h3>
            <p className="text-gray-600">Organized activities</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent mb-4">
              {stats.challenges.toLocaleString()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Challenges</h3>
            <p className="text-gray-600">Coding problems solved</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-4">
              {stats.projects.toLocaleString()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Projects</h3>
            <p className="text-gray-600">Showcase portfolio</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 md:col-span-2 lg:col-span-1">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent mb-4">
              {stats.submissions.toLocaleString()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Total Submissions</h3>
            <p className="text-gray-600">Challenge solutions</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 md:col-span-2 lg:col-span-1">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent mb-4">
              {stats.gallery.toLocaleString()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Gallery Images</h3>
            <p className="text-gray-600">Creative submissions</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 md:col-span-2 lg:col-span-1">
            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent mb-4">
              {stats.announcements.toLocaleString()}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Announcements</h3>
            <p className="text-gray-600">Platform updates</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;