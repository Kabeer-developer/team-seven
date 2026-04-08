import { useState } from "react";
import { createEvent } from "../services/eventService";
import { createChallenge } from "../services/challengeService";

const Admin = () => {
  const [event, setEvent] = useState({ title: "", description: "" });
  const [challenge, setChallenge] = useState({ title: "", description: "" });

  const handleEvent = async () => {
    await createEvent(event);
    alert("Event Created");
  };

  const handleChallenge = async () => {
    await createChallenge(challenge);
    alert("Challenge Created");
  };

  return (
    <div>
      <h2>Admin Panel</h2>

      <h3>Create Event</h3>
      <input
        placeholder="Title"
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      <input
        placeholder="Description"
        onChange={(e) =>
          setEvent({ ...event, description: e.target.value })
        }
      />
      <button onClick={handleEvent}>Create</button>

      <h3>Create Challenge</h3>
      <input
        placeholder="Title"
        onChange={(e) =>
          setChallenge({ ...challenge, title: e.target.value })
        }
      />
      <input
        placeholder="Description"
        onChange={(e) =>
          setChallenge({ ...challenge, description: e.target.value })
        }
      />
      <button onClick={handleChallenge}>Create</button>
    </div>
  );
};

export default Admin;