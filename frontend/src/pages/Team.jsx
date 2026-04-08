import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

const Team = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>Team</h2>
      {users.map((u) => (
        <div key={u._id}>
          {u.name} - {u.roleInClub}
        </div>
      ))}
    </div>
  );
};

export default Team;