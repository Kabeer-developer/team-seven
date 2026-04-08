import { useEffect, useState } from "react";
import {
  createEvent, deleteEvent, getEvents, updateEvent,
} from "../services/eventService";
import {
  createChallenge, deleteChallenge, getChallenges, updateChallenge,
} from "../services/challengeService";
import { getUsers, updateUserAdmin } from "../services/userService";
import {
  getSubmissions, gradeSubmission,
} from "../services/submissionService";
import { addImage } from "../services/galleryService";
import {
  createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement,
} from "../services/announcementService";
import {
  createProject, deleteProject, getProjects, setProjectFeatured, updateProject,
} from "../services/projectService";

const Admin = () => {
  const [event, setEvent] = useState({ title: "", description: "" });
  const [challenge, setChallenge] = useState({ title: "", description: "" });
  const [users, setUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [events, setEvents] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [projects, setProjects] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [announcement, setAnnouncement] = useState({ title: "", content: "" });
  const [project, setProject] = useState({ title: "", description: "" });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [usersData, subs, eventsData, challengesData, projectsData, announcementsData] = await Promise.all([
      getUsers(),
      getSubmissions(),
      getEvents(),
      getChallenges(),
      getProjects(),
      getAnnouncements()
    ]);

    setUsers(usersData);
    setSubmissions(subs);
    setEvents(eventsData);
    setChallenges(challengesData);
    setProjects(projectsData);
    setAnnouncements(announcementsData);
  };

  // Event handlers...
  const handleEvent = async () => {
    await createEvent(event);
    alert("Event Created ✅");
    setEvent({ title: "", description: "" });
    loadData();
  };

  const handleChallenge = async () => {
    await createChallenge(challenge);
    alert("Challenge Created ✅");
    setChallenge({ title: "", description: "" });
    loadData();
  };

  const handleProject = async () => {
    await createProject(project);
    alert("Project Created ✅");
    setProject({ title: "", description: "" });
    loadData();
  };

  const handleUpload = async () => {
    if (!imageUrl) return alert("Enter image URL");
    await addImage({ image: imageUrl, album: "Admin Uploads" });
    alert("Image Added ✅");
    setImageUrl("");
  };

  const handlePromote = async (id, role) => {
    await updateUserAdmin(id, { role });
    loadData();
  };

  const handleToggleBan = async (id, currentStatus) => {
    await updateUserAdmin(id, { isActive: !currentStatus });
    loadData();
  };

  const handleScore = async (id) => {
    const score = prompt("Enter score:");
    if (!score) return;
    await gradeSubmission(id, parseInt(score));
    alert("Score Updated ✅");
    loadData();
  };

  const handleEventEdit = async (item) => {
    const title = prompt("New event title:", item.title);
    if (!title) return;
    await updateEvent(item._id, { title });
    loadData();
  };

  const handleChallengeEdit = async (item) => {
    const title = prompt("New challenge title:", item.title);
    if (!title) return;
    await updateChallenge(item._id, { title });
    loadData();
  };

  const handleProjectEdit = async (item) => {
    const title = prompt("New project title:", item.title);
    if (!title) return;
    await updateProject(item._id, { title });
    loadData();
  };

  const handleAnnouncementCreate = async () => {
    await createAnnouncement(announcement);
    setAnnouncement({ title: "", content: "" });
    loadData();
  };

  const handleAnnouncementEdit = async (item) => {
    const title = prompt("New title:", item.title);
    const content = prompt("New content:", item.content || item.message || "");
    if (!title || !content) return;
    await updateAnnouncement(item._id, { title, content });
    loadData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Admin Panel
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Complete control over events, challenges, users, and content
          </p>
        </div>

        {/* CREATE SECTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Events */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">📅</div>
              Create Event
            </h3>
            <div className="space-y-4">
              <input
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 text-lg"
                placeholder="Event Title"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
              />
              <input
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-200 focus:border-blue-400 text-lg"
                placeholder="Description"
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
              />
              <button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                onClick={handleEvent}
              >
                🚀 Create Event
              </button>
            </div>
          </div>

          {/* Challenges */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">⚡</div>
              Create Challenge
            </h3>
            <div className="space-y-4">
              <input
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 text-lg"
                placeholder="Challenge Title"
                value={challenge.title}
                onChange={(e) => setChallenge({ ...challenge, title: e.target.value })}
              />
              <input
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 text-lg"
                placeholder="Description"
                value={challenge.description}
                onChange={(e) => setChallenge({ ...challenge, description: e.target.value })}
              />
              <button 
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                onClick={handleChallenge}
              >
                🎯 Create Challenge
              </button>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">🚀</div>
              Create Project
            </h3>
            <div className="space-y-4">
              <input
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 text-lg"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
              />
              <input
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 text-lg"
                placeholder="Description"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
              />
              <button 
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                onClick={handleProject}
              >
                💎 Create Project
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Upload */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg">🖼️</div>
            Gallery Upload
          </h3>
          <div className="flex gap-4">
            <input
              className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-pink-200 focus:border-pink-400 text-lg"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <button 
              className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold py-4 px-12 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 whitespace-nowrap"
              onClick={handleUpload}
            >
              📸 Add Image
            </button>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg">📢</div>
            Create Announcement
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 text-lg"
              placeholder="Title"
              value={announcement.title}
              onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
            />
            <input
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 text-lg"
              placeholder="Content"
              value={announcement.content}
              onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
            />
          </div>
          <button 
            className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            onClick={handleAnnouncementCreate}
          >
            📣 Publish Announcement
          </button>
        </div>

        {/* Users Management */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">👥</div>
            Members ({users.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((u) => (
              <div key={u._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                    {u.name?.split(" ")[0][0]}{u.name?.split(" ").slice(-1)[0][0] || ""}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{u.name}</h4>
                    <p className="text-sm text-gray-600">{u.email}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <p><span className="font-semibold">Score:</span> {u.score || 0}</p>
                  <p><span className="font-semibold">Status:</span> 
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${u.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {u.isActive ? 'Active' : 'Banned'}
                    </span>
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                  <button className="py-2 px-4 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold rounded-xl transition-all duration-200" onClick={() => handlePromote(u._id, "admin")}>
                    Admin
                  </button>
                  <button className="py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-200" onClick={() => handlePromote(u._id, "member")}>
                    Member
                  </button>
                  <button className={`py-2 px-4 text-sm font-bold rounded-xl transition-all duration-200 ${u.isActive ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`} onClick={() => handleToggleBan(u._id, u.isActive)}>
                    {u.isActive ? 'Ban' : 'Unban'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submissions */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">📝</div>
            Submissions ({submissions.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissions.map((s) => (
              <div key={s._id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100">
                <h4 className="font-bold text-lg text-gray-900 mb-2">{s.user?.name}</h4>
                <p className="text-gray-600 mb-2">{s.challenge?.title}</p>
                <p className="text-2xl font-bold text-emerald-600 mb-4">Score: {s.score || 0}</p>
                <button 
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => handleScore(s._id)}
                >
                  🎯 Update Score
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Management Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Events List */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Manage Events ({events.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {events.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-900">{item.title}</span>
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => handleEventEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => deleteEvent(item._id).then(loadData)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges List */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Manage Challenges ({challenges.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {challenges.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-900">{item.title}</span>
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => handleChallengeEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => deleteChallenge(item._id).then(loadData)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projects List */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Manage Projects ({projects.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {projects.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div>
                    <span className="font-medium text-gray-900">{item.title}</span>
                    <span className={`ml-3 px-3 py-1 rounded-full text-xs font-bold ${item.isFeatured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}>
                      {item.isFeatured ? '⭐ Featured' : 'Normal'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => handleProjectEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => setProjectFeatured(item._id, !item.isFeatured).then(loadData)}
                    >
                      {item.isFeatured ? 'Unfeature' : 'Feature'}
                    </button>
                    <button 
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => deleteProject(item._id).then(loadData)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements List */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Manage Announcements ({announcements.length})</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {announcements.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <span className="font-medium text-gray-900">{item.title}</span>
                  <div className="flex gap-2">
                    <button 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => handleAnnouncementEdit(item)}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
                      onClick={() => deleteAnnouncement(item._id).then(loadData)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;