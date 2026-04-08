import { Link } from "react-router-dom";

const ChallengeCard = ({ challenge }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{challenge.title}</h3>
      <p>{challenge.description}</p>
      <p>Difficulty: {challenge.difficulty}</p>

      <Link to={`/challenges/${challenge._id}`}>
        <button>View</button>
      </Link>
    </div>
  );
};

export default ChallengeCard;