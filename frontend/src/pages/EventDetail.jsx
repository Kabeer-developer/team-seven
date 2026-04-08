import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../services/eventService";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEvents().then((data) => {
      const found = data.find((e) => e._id === id);
      setEvent(found);
    });
  }, [id]);

  return (
    <div>
      <h2>{event?.title}</h2>
      <p>{event?.description}</p>
    </div>
  );
};

export default EventDetail;