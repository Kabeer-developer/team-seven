import { registerEvent } from "../../services/eventService";

const EventCard = ({ event }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{event.title}</h3>
      <p>{event.description}</p>

      <button onClick={() => registerEvent(event._id)}>
        Register
      </button>
    </div>
  );
};

export default EventCard;