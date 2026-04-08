import { Link } from "react-router-dom";
import  Button  from "../common/Button";

const ChallengeCard = ({ challenge }) => {
  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: "from-emerald-500 to-green-600",
      medium: "from-amber-500 to-orange-600",
      hard: "from-rose-500 to-red-600"
    };
    return colors[difficulty?.toLowerCase()] || "from-gray-500 to-gray-600";
  };

  const getDifficultyText = (difficulty) => {
    const text = {
      easy: "Easy",
      medium: "Medium", 
      hard: "Hard"
    };
    return text[difficulty?.toLowerCase()] || "Unknown";
  };

  return (
    <Link 
      to={`/challenges/${challenge._id}`}
      className="group block"
    >
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/10 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800/50 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
        
        {/* Badge */}
        <div className="absolute top-6 right-6">
          <div className={`px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r ${getDifficultyColor(challenge.difficulty)} text-white shadow-lg`}>
            {getDifficultyText(challenge.difficulty)}
          </div>
        </div>

        {/* Challenge Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 mx-auto">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform duration-300">
            {challenge.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 line-clamp-3 h-20">
            {challenge.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {challenge.duration || '2-4 weeks'}
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {challenge.participants || '50+'} participants
            </div>
          </div>

          {/* Action Button */}
          <Button 
            variant="primary" 
            size="lg" 
            fullWidth
            className="group-hover:bg-gradient-to-r group-hover:from-blue-700 group-hover:to-indigo-700"
          >
            <span className="flex items-center gap-2">
              View Challenge
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Button>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 animate-pulse"></div>
      </div>
    </Link>
  );
};

export default ChallengeCard;