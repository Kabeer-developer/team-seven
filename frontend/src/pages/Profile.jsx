import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState({});
  const [skills, setSkills] = useState("");

  useEffect(() => {
    getProfile().then((res) => {
      setUser(res);
      setSkills(res.skills?.join(","));
    });
  }, []);

  const handleUpdate = async () => {
    await updateProfile({
      ...user,
      skills: skills.split(","),
    });
    alert("Updated!");
  };

  return (
    <div>
      <h2>Profile</h2>
      <input
        value={user.name || ""}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="React,Node"
      />
      <button onClick={handleUpdate}>Save</button>
    </div>
  );
};

export default Profile;