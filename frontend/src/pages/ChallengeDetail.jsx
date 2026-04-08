import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChallengeById } from "../services/challengeService";
import { submitSolution } from "../services/submissionService";

const ChallengeDetail = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [form, setForm] = useState({ githubLink: "", liveLink: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getChallengeById(id).then(setChallenge);
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await submitSolution({ challengeId: id, ...form });
      alert("Submitted!");
    } catch (error) {
      alert(error?.response?.data?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{challenge?.title}</h2>
      <p className="text-slate-700 dark:text-slate-300">{challenge?.description}</p>

      <input
        placeholder="GitHub Link"
        className="mr-2 rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
      />
      <input
        placeholder="Live Link"
        className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
        onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
      />

      <button className="block rounded-md bg-indigo-600 px-3 py-2 text-white" disabled={submitting} onClick={handleSubmit}>
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default ChallengeDetail;