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
    <div>
      <h2>{event?.title}</h2>
      <p>{event?.description}</p>
    </div>
  );
};

export default EventDetail;