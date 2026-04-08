import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

const Team = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h2>Team Members</h2>

      {users.length === 0 && <p>No members found</p>}

      {users.map((u) => (
        <div key={u._id}>
          <p><strong>{u.name}</strong></p>
          <p>Role: {u.role}</p>
          <p>Email: {u.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Team;