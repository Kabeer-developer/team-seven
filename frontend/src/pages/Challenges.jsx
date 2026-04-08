import { useEffect, useState } from "react";
import { getChallenges } from "../services/challengeService";
import { Link } from "react-router-dom";

const Challenges = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getChallenges().then(setData);
  }, []);

  return (
    <div>
      <h2>Challenges</h2>
      {data.map((c) => (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <Link to={`/challenges/${c._id}`}>View</Link>
        </div>
      ))}
    </div>
  );
};

export default Challenges;