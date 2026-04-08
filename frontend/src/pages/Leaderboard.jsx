import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const [minPoints, setMinPoints] = useState(0);

  useEffect(() => {
    getLeaderboard().then(setData);
  }, []);

  const filtered = data.filter((row) => (row.totalScore || 0) >= minPoints);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-12 text-center">
          Leaderboard
        </h2>
        
        <div className="max-w-md mx-auto mb-12">
          <label className="mb-3 block text-lg font-semibold text-gray-700">
            Minimum points (0 shows all members)
          </label>
          <input
            type="number"
            min={0}
            value={minPoints}
            onChange={(e) => setMinPoints(Number(e.target.value) || 0)}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 text-xl font-semibold text-gray-900 focus:ring-4 focus:ring-blue-200 focus:border-blue-500 shadow-lg transition-all duration-200"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((l, i) => (
            <div 
              key={l.user?._id || i} 
              className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 hover:bg-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    #{i + 1}
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">
                      {l.user?.name}
                    </div>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {l.totalScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;