import { useEffect, useState } from "react";
import { getEvents, registerEvent } from "../services/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <div>
      <h2>Events</h2>
      {events.map((e) => (
        <div key={e._id}>
          <h3>{e.title}</h3>
          <button onClick={() => registerEvent(e._id)}>Register</button>
        </div>
      ))}
    </div>
  );
};

export default Events;