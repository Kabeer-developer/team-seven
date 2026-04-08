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
    <div>
      <h1>Club Hub 🚀</h1>

      <h2>Upcoming Events</h2>
      {events.slice(0, 3).map((e) => (
        <div key={e._id}>{e.title}</div>
      ))}

      <h2>Top Users</h2>
      {leaders.slice(0, 5).map((l, i) => (
        <div key={i}>
          {l.user?.name} - {l.totalScore}
        </div>
      ))}
    </div>
  );
};

export default Home;