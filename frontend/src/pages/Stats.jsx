import { useEffect, useState } from "react";
import { getStats } from "../services/statsService";

// This page gives quick insight into platform usage numbers.
const Stats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  return (
    <div>
      <h2>Platform Stats</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Events: {stats.events}</p>
      <p>Total Challenges: {stats.challenges}</p>
      <p>Total Submissions: {stats.submissions}</p>
      <p>Total Projects: {stats.projects}</p>
      <p>Total Gallery Images: {stats.gallery}</p>
      <p>Total Announcements: {stats.announcements}</p>
    </div>
  );
};

export default Stats;
