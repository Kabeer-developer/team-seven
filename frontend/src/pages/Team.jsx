import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [roleInClub, setRoleInClub] = useState("");

  useEffect(() => {
    getUsers({ roleInClub: roleInClub || undefined }).then(setUsers);
  }, [roleInClub]);

  return (
    <div>
      <h2>Team Members</h2>
      <select value={roleInClub} onChange={(e) => setRoleInClub(e.target.value)}>
        <option value="">All Roles</option>
        <option value="Lead">Lead</option>
        <option value="Core">Core</option>
        <option value="Member">Member</option>
        <option value="Alumni">Alumni</option>
      </select>

      {users.length === 0 && <p>No members found</p>}

      {users.map((u) => (
        <div key={u._id}>
          <p><strong>{u.name}</strong></p>
          <p>Role: {u.roleInClub || "Member"}</p>
          <p>Email: {u.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Team;