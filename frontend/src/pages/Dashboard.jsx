import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import { getMySubmissions } from "../services/submissionService";
import { getLeaderboard } from "../services/leaderboardService";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profile = await getProfile();
    const subs = await getMySubmissions();
    const leaderboard = await getLeaderboard();

    setUser(profile);
    setSubmissions(subs);

    // Find rank
    const index = leaderboard.findIndex(
      (l) => l.user?._id === profile._id
    );
    setRank(index !== -1 ? index + 1 : "Unranked");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* USER INFO */}
      <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
        <h3>{user?.name}</h3>
        <p>Email: {user?.email}</p>
        <p>Score: {user?.score}</p>
        <p>Rank: {rank}</p>
      </div>

      {/* SUBMISSIONS */}
      <div>
        <h3>My Submissions</h3>
        {submissions.length === 0 && <p>No submissions yet</p>}

        {submissions.map((s) => (
          <div key={s._id} style={{ border: "1px solid #ddd", margin: "5px", padding: "5px" }}>
            <p>Challenge: {s.challenge?.title}</p>
            <p>Score: {s.score}</p>
            <a href={s.githubLink} target="_blank">GitHub</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;