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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            Events
          </h2>
          <p className="text-gray-600">Discover and register for upcoming events</p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {events.map((e) => (
            <div
              key={e._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                  {e.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {e.description || "No description available."}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleRegister(e._id)}
                    disabled={loadingId === e._id}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    {loadingId === e._id ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Registering...
                      </span>
                    ) : (
                      "Register"
                    )}
                  </button>
                  <Link
                    to={`/events/${e._id}`}
                    className="px-6 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:border-indigo-500 hover:text-indigo-600 transition-all hover:shadow-md"
                  >
                    Details
                  </Link>
                </div>
              </div>

              {/* Decorative Bottom Border */}
              <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No events available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;