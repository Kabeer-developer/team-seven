import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../services/eventService";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEventById(id).then(setEvent);
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {event?.title}
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
          {event?.description}
        </p>
      </div>
    </div>
  );
};

export default EventDetail;