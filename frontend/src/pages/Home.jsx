import { useEffect, useState } from "react";
import { getEvents } from "../services/eventService";
import { getLeaderboard } from "../services/leaderboardService";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
    getLeaderboard().then(setLeaders);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3">
            Club Hub <span className="inline-block animate-bounce">🚀</span>
          </h1>
          <p className="text-gray-600 text-lg">Discover events and celebrate achievers</p>
        </div>

        {/* Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Events Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">📅</span>
              Upcoming Events
            </h2>
            <div className="space-y-4">
              {events.slice(0, 3).map((e) => (
                <div
                  key={e._id}
                  className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-colors cursor-pointer border border-indigo-100"
                >
                  <h3 className="font-semibold text-gray-800">{e.title}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              Top Users
            </h2>
            <div className="space-y-3">
              {leaders.slice(0, 5).map((l, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl hover:from-amber-100 hover:to-yellow-100 transition-colors border border-amber-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="font-medium text-gray-800">{l.user?.name}</span>
                  </div>
                  <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                    {l.totalScore} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;