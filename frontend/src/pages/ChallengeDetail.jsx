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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {challenge?.title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-12 leading-relaxed">
            {challenge?.description}
          </p>

          <div className="space-y-4">
            <input
              placeholder="GitHub Link"
              className="w-full rounded-xl border border-gray-200 px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm"
              onChange={(e) => setForm({ ...form, githubLink: e.target.value })}
            />
            <input
              placeholder="Live Link"
              className="w-full rounded-xl border border-gray-200 px-5 py-4 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white shadow-sm"
              onChange={(e) => setForm({ ...form, liveLink: e.target.value })}
            />

            <button 
              className="w-full sm:w-auto block sm:inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={submitting} 
              onClick={handleSubmit}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;