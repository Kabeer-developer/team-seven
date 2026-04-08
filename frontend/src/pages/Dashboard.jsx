import { useEffect, useState } from "react";
import { getProfile } from "../services/userService";
import {
  getMySubmissions,
  getSubmissions,
  gradeSubmission,
} from "../services/submissionService";
import { getLeaderboard } from "../services/leaderboardService";
import { createAnnouncement } from "../services/announcementService";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [allSubmissions, setAllSubmissions] = useState([]);
  const [rank, setRank] = useState(null);
  const [scoreMap, setScoreMap] = useState({});
  const [announcement, setAnnouncement] = useState({ title: "", content: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const profile = await getProfile();
    const subs = await getMySubmissions();
    const leaderboard = await getLeaderboard();

    setUser(profile);
    setSubmissions(subs);
    if (profile.role === "admin") {
      const adminSubs = await getSubmissions();
      setAllSubmissions(adminSubs);
    }

    // Find rank
    const index = leaderboard.findIndex(
      (l) => l.user?._id === profile._id
    );
    setRank(index !== -1 ? index + 1 : "Unranked");
  };

  const handlePublishAnnouncement = async () => {
    await createAnnouncement(announcement);
    setAnnouncement({ title: "", content: "" });
    alert("Announcement published");
  };

  const handleGrade = async (submissionId) => {
    const score = Number(scoreMap[submissionId] || 0);
    await gradeSubmission(submissionId, score);
    await loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Dashboard
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Welcome back! Here's your activity overview.
          </p>
        </div>

        {/* USER INFO CARD */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                👤
              </div>
              <span>Profile</span>
            </h3>
            <div className="space-y-4 text-lg">
              <p><span className="font-semibold text-gray-900">Name:</span> {user?.name}</p>
              <p><span className="font-semibold text-gray-900">Email:</span> {user?.email}</p>
              
              <p className="text-xl font-bold text-green-600">
                Rank: <span className="text-3xl">{rank}</span>
              </p>
            </div>
          </div>

          {/* MY SUBMISSIONS */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                📝
              </div>
              <span>My Submissions ({submissions.length})</span>
            </h3>
            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-3xl flex items-center justify-center text-4xl">📭</div>
                <p className="text-xl text-gray-500">No submissions yet</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {submissions.map((s) => (
                  <div key={s._id} className="group bg-gray-50 hover:bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                    <h4 className="font-semibold text-lg text-gray-900 mb-2">{s.challenge?.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">Score: <span className="font-bold text-emerald-600">{s.score}</span></p>
                    <a 
                      href={s.githubLink} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <span>🌐 GitHub</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ADMIN PANEL */}
        {user?.role === "admin" && (
          <div className="space-y-8">
            {/* CREATE ANNOUNCEMENT */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-3xl font-bold mb-8 flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">📢</div>
                <span>Create Announcement</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
  <input
   className="md:col-span-1 rounded-2xl border-0 px-6 py-4 text-lg 
bg-white/90 dark:bg-white/10 
text-gray-900 dark:text-white 
placeholder-gray-500 dark:placeholder-gray-400
backdrop-blur-sm shadow-xl 
focus:ring-4 focus:ring-purple-200/50 focus:ring-offset-2 
focus:outline-none transition-all duration-200 hover:shadow-2xl"
    placeholder="Announcement Title"
    value={announcement.title}
    onChange={(e) => setAnnouncement((prev) => ({ ...prev, title: e.target.value }))}
  />
  <input
   className="md:col-span-2 rounded-2xl border-0 px-6 py-4 text-lg 
bg-white/90 dark:bg-white/10 
text-gray-900 dark:text-white 
placeholder-gray-500 dark:placeholder-gray-400
backdrop-blur-sm shadow-xl 
focus:ring-4 focus:ring-purple-200/50 focus:ring-offset-2 
focus:outline-none transition-all duration-200 hover:shadow-2xl"
    placeholder="Announcement Content"
    value={announcement.content}
    onChange={(e) => setAnnouncement((prev) => ({ ...prev, content: e.target.value }))}
  />
  <button 
    className="md:col-span-full bg-white/90 backdrop-blur-sm text-purple-700 font-black text-xl px-12 py-4 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 hover:bg-white/100 border-2 border-purple-200/50 transition-all duration-300 active:scale-95"
    onClick={handlePublishAnnouncement}
  >
    🚀 Publish Announcement
  </button>
</div>
            </div>

            {/* GRADE SUBMISSIONS */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                  ⭐
                </div>
                <span>Grade Submissions ({allSubmissions.length})</span>
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {allSubmissions.map((s) => (
                  <div key={s._id} className="group bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{s.user?.name}</p>
                        <p className="text-sm text-gray-600">{s.challenge?.title}</p>
                      </div>
                      <p className="text-xl font-bold text-emerald-600 md:text-center">
                        Current: {s.score}
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="number"
                          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="New score"
                          value={scoreMap[s._id] ?? ""}
                          onChange={(e) =>
                            setScoreMap((prev) => ({ ...prev, [s._id]: e.target.value }))
                          }
                        />
                        <button 
                          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          onClick={() => handleGrade(s._id)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;