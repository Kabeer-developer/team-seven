import { registerEvent } from "../../services/eventService";
import  Button  from "../common/Button";
import { useState } from "react";

const EventCard = ({ event }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await registerEvent(event._id);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/20 border border-gray-100 dark:border-gray-800 hover:border-emerald-200 dark:hover:border-emerald-800/50 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden relative group">
      
      {/* Date Badge */}
      <div className="absolute top-6 right-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm">
          {formatDate(event.date)}
        </div>
      </div>

      {/* Event Icon */}
      <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl mx-auto group-hover:scale-110 transition-transform duration-500">
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300">
          {event.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 line-clamp-3 h-20 px-4">
          {event.description}
        </p>

        {/* Event Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
          <div className="flex flex-col items-center p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
            <svg className="w-6 h-6 text-emerald-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-semibold text-gray-900 dark:text-white">{event.capacity || '100+'}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Capacity</span>
          </div>
          
          <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800/50">
            <svg className="w-6 h-6 text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold text-gray-900 dark:text-white">{event.duration || '2 hours'}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Duration</span>
          </div>
        </div>

        {/* Register Button */}
        <Button
          variant="success"
          size="lg"
          fullWidth
          loading={isRegistering}
          onClick={handleRegister}
          className="group-hover:shadow-emerald-500/50 backdrop-blur-sm"
          iconRight={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          }
        >
          {isRegistering ? "Registering..." : "Register Now"}
        </Button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-teal-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10 animate-pulse"></div>
      
      {/* Top Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-600"></div>
    </div>
  );
};

export default EventCard;