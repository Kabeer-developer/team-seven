import { useEffect, useState } from "react";
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../services/eventService";
import {
  createChallenge,
  deleteChallenge,
  getChallenges,
  updateChallenge,
} from "../services/challengeService";
import { getUsers, updateUserAdmin } from "../services/userService";
import {
  getSubmissions,
  gradeSubmission,
} from "../services/submissionService";
import { addImage } from "../services/galleryService"; // ✅ FIXED
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from "../services/announcementService";
import {
  createProject,
  deleteProject,
  getProjects,
  setProjectFeatured,
  updateProject,
} from "../services/projectService";

const Admin = () => {
  const [event, setEvent] = useState({ title: "", description: "" });
  const [challenge, setChallenge] = useState({
    title: "",
    description: "",
  });

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
    const usersData = await getUsers();
    const subs = await getSubmissions();
    const eventsData = await getEvents();
    const challengesData = await getChallenges();
    const projectsData = await getProjects();
    const announcementsData = await getAnnouncements();

    setUsers(usersData);
    setSubmissions(subs);
    setEvents(eventsData);
    setChallenges(challengesData);
    setProjects(projectsData);
    setAnnouncements(announcementsData);
  };

  // CREATE EVENT
  const handleEvent = async () => {
    await createEvent(event);
    alert("Event Created ✅");
    setEvent({ title: "", description: "" });
  };

  // CREATE CHALLENGE
  const handleChallenge = async () => {
    await createChallenge(challenge);
    alert("Challenge Created ✅");
    setChallenge({ title: "", description: "" });
  };

  const handleProject = async () => {
    await createProject(project);
    alert("Project Created ✅");
    setProject({ title: "", description: "" });
    loadData();
  };

  // ADD IMAGE (GALLERY)
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

  // GIVE SCORE
  const handleScore = async (id) => {
    const score = prompt("Enter score:");
    if (!score) return;

    await gradeSubmission(id, score); // ✅ correct
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
    <div style={{ padding: "20px" }}>
      <h2>Admin Panel</h2>

      {/* EVENTS */}
      <h3>Create Event</h3>
      <input
        placeholder="Title"
        value={event.title}
        onChange={(e) =>
          setEvent({ ...event, title: e.target.value })
        }
      />
      <input
        placeholder="Description"
        value={event.description}
        onChange={(e) =>
          setEvent({ ...event, description: e.target.value })
        }
      />
      <button onClick={handleEvent}>Create Event</button>

      {/* CHALLENGES */}
      <h3>Create Challenge</h3>
      <input
        placeholder="Title"
        value={challenge.title}
        onChange={(e) =>
          setChallenge({ ...challenge, title: e.target.value })
        }
      />
      <input
        placeholder="Description"
        value={challenge.description}
        onChange={(e) =>
          setChallenge({ ...challenge, description: e.target.value })
        }
      />
      <button onClick={handleChallenge}>Create Challenge</button>

      {/* PROJECTS */}
      <h3>Create Project</h3>
      <input
        placeholder="Title"
        value={project.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />
      <input
        placeholder="Description"
        value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
      />
      <button onClick={handleProject}>Create Project</button>

      {/* USERS */}
      <h3>All Members</h3>
      {users.map((u) => (
        <div
          key={u._id}
          style={{
            border: "1px solid #ccc",
            margin: "5px",
            padding: "5px",
          }}
        >
          <p>
            {u.name} - {u.email}
          </p>
          <p>Score: {u.score}</p>
          <p>Status: {u.isActive ? "Active" : "Banned"}</p>
          <button onClick={() => handlePromote(u._id, "admin")}>Make Admin</button>
          <button onClick={() => handlePromote(u._id, "member")}>Make Member</button>
          <button onClick={() => handleToggleBan(u._id, u.isActive)}>
            {u.isActive ? "Ban User" : "Unban User"}
          </button>
        </div>
      ))}

      {/* SUBMISSIONS */}
      <h3>Submissions</h3>
      {submissions.map((s) => (
        <div
          key={s._id}
          style={{
            border: "1px solid #ddd",
            margin: "5px",
            padding: "5px",
          }}
        >
          <p>User: {s.user?.name}</p>
          <p>Challenge: {s.challenge?.title}</p>
          <p>Score: {s.score}</p>

          <button onClick={() => handleScore(s._id)}>
            Give Score
          </button>
        </div>
      ))}

      {/* GALLERY */}
      <h3>Add Gallery Image</h3>
      <input
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleUpload}>Add Image</button>

      {/* ANNOUNCEMENTS */}
      <h3>Create Announcement</h3>
      <input
        placeholder="Title"
        value={announcement.title}
        onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
      />
      <input
        placeholder="Content"
        value={announcement.content}
        onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
      />
      <button onClick={handleAnnouncementCreate}>Create Announcement</button>

      {/* EVENT CRUD */}
      <h3>Manage Events</h3>
      {events.map((item) => (
        <div key={item._id}>
          {item.title}
          <button onClick={() => handleEventEdit(item)}>Edit</button>
          <button onClick={() => deleteEvent(item._id).then(loadData)}>Delete</button>
        </div>
      ))}

      {/* CHALLENGE CRUD */}
      <h3>Manage Challenges</h3>
      {challenges.map((item) => (
        <div key={item._id}>
          {item.title}
          <button onClick={() => handleChallengeEdit(item)}>Edit</button>
          <button onClick={() => deleteChallenge(item._id).then(loadData)}>Delete</button>
        </div>
      ))}

      {/* PROJECT CRUD */}
      <h3>Manage Projects</h3>
      {projects.map((item) => (
        <div key={item._id}>
          {item.title} | Featured: {item.isFeatured ? "Yes" : "No"}
          <button onClick={() => handleProjectEdit(item)}>Edit</button>
          <button onClick={() => deleteProject(item._id).then(loadData)}>Delete</button>
          <button onClick={() => setProjectFeatured(item._id, !item.isFeatured).then(loadData)}>
            {item.isFeatured ? "Unfeature" : "Feature"}
          </button>
        </div>
      ))}

      {/* ANNOUNCEMENT CRUD */}
      <h3>Manage Announcements</h3>
      {announcements.map((item) => (
        <div key={item._id}>
          {item.title}
          <button onClick={() => handleAnnouncementEdit(item)}>Edit</button>
          <button onClick={() => deleteAnnouncement(item._id).then(loadData)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;