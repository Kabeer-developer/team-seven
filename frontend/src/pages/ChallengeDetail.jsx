import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChallengeById } from "../services/challengeService";
import { submitSolution } from "../services/submissionService";

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [form, setForm] = useState({ githubLink: "", liveLink: "" });

  useEffect(() => {
    getChallengeById(id).then(setChallenge);
  }, [id]);

  const handleSubmit = async () => {
    await submitSolution({ challengeId: id, ...form });
    alert("Submitted!");
  };

  return (
    <div>
      <h2>{challenge?.title}</h2>
      <p>{challenge?.description}</p>

      <input
        placeholder="GitHub Link"
        onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
      />
      <input
        placeholder="Live Link"
        onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ChallengeDetail;