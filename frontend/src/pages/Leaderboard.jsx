import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboardService";

const Leaderboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getLeaderboard().then(setData);
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {data.map((l, i) => (
        <div key={i}>
          {l.user?.name} - {l.totalScore}
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;