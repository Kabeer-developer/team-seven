import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, registerEvent } from "../services/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loadingId, setLoadingId] = useState("");

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  const handleRegister = async (eventId) => {
    setLoadingId(eventId);
    try {
      const res = await registerEvent(eventId);
      alert(res.message || "Registered successfully");
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoadingId("");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Events</h2>
      {events.map((e) => (
        <div key={e._id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="text-lg font-semibold">{e.title}</h3>
          <p className="my-2 text-sm text-slate-600 dark:text-slate-300">{e.description || "No description available."}</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleRegister(e._id)}
              disabled={loadingId === e._id}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-white disabled:opacity-60"
            >
              {loadingId === e._id ? "Registering..." : "Register"}
            </button>
            <Link to={`/events/${e._id}`} className="rounded-md border border-slate-300 px-3 py-1.5 dark:border-slate-700">
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Events;