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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      {/* USER INFO */}
      <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <h3>{user?.name}</h3>
        <p>Email: {user?.email}</p>
        <p>Score: {user?.score}</p>
        <p>Rank: {rank}</p>
      </div>

      {/* SUBMISSIONS */}
      <div>
        <h3 className="mb-2 text-lg font-semibold">My Submissions</h3>
        {submissions.length === 0 && <p>No submissions yet</p>}

        {submissions.map((s) => (
          <div key={s._id} className="mb-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
            <p>Challenge: {s.challenge?.title}</p>
            <p>Score: {s.score}</p>
            <a href={s.githubLink} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        ))}
      </div>

      {user?.role === "admin" && (
        <>
          <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
            <h3 className="mb-2 text-lg font-semibold">Create Announcement</h3>
            <div className="grid gap-2 md:grid-cols-2">
              <input
                className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                placeholder="Title"
                value={announcement.title}
                onChange={(e) => setAnnouncement((prev) => ({ ...prev, title: e.target.value }))}
              />
              <input
                className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                placeholder="Content"
                value={announcement.content}
                onChange={(e) => setAnnouncement((prev) => ({ ...prev, content: e.target.value }))}
              />
            </div>
            <button className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-white" onClick={handlePublishAnnouncement}>
              Publish
            </button>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-semibold">Members Submissions</h3>
            {allSubmissions.map((s) => (
              <div key={s._id} className="mb-2 rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <p>User: {s.user?.name}</p>
                <p>Challenge: {s.challenge?.title}</p>
                <p>Current Score: {s.score}</p>
                <div className="mt-2 flex gap-2">
                  <input
                    type="number"
                    className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
                    placeholder="Set score"
                    value={scoreMap[s._id] ?? ""}
                    onChange={(e) =>
                      setScoreMap((prev) => ({ ...prev, [s._id]: e.target.value }))
                    }
                  />
                  <button className="rounded-md bg-emerald-600 px-3 py-2 text-white" onClick={() => handleGrade(s._id)}>
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;