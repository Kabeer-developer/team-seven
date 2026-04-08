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
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <div className="max-w-sm">
        <label className="mb-1 block text-sm text-slate-600 dark:text-slate-300">
          Minimum points (0 shows all members)
        </label>
        <input
          type="number"
          min={0}
          value={minPoints}
          onChange={(e) => setMinPoints(Number(e.target.value) || 0)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        />
      </div>
      {filtered.map((l, i) => (
        <div key={l.user?._id || i} className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
          {i + 1}. {l.user?.name} - {l.totalScore}
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;