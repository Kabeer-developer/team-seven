import { useEffect, useState } from "react";
import { getChallenges } from "../services/challengeService";
import { Link } from "react-router-dom";

const Challenges = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getChallenges().then(setData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((c) => (
            <div 
              key={c._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 leading-tight">
                {c.title}
              </h3>
              <Link 
                to={`/challenges/${c._id}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-colors duration-200"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;