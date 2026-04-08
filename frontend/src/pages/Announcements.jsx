import { useEffect, useState } from "react";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement,
} from "../services/announcementService";

// This page displays club-wide announcements published by admins.
const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const user = JSON.parse(localStorage.getItem("user"));

  const loadAnnouncements = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data);
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleCreate = async () => {
    await createAnnouncement(form);
    setForm({ title: "", content: "" });
    await loadAnnouncements();
  };

  const handleEdit = async (item) => {
    const title = prompt("Update title:", item.title || "");
    const content = prompt("Update content:", item.content || item.message || "");
    if (title === null || content === null) return;
    await updateAnnouncement(item._id, { title, content });
    await loadAnnouncements();
  };

  const handleDelete = async (id) => {
    await deleteAnnouncement(id);
    await loadAnnouncements();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Announcements</h2>
      {user?.role === "admin" && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="mb-2 text-lg font-semibold">Create Announcement</h3>
          <div className="grid gap-2 md:grid-cols-2">
            <input
              className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
            />
            <input
              className="rounded-md border border-slate-300 px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
            />
          </div>
          <button className="mt-2 rounded-md bg-indigo-600 px-3 py-2 text-white" onClick={handleCreate}>
            Create
          </button>
        </div>
      )}
      {announcements.length === 0 && <p>No announcements yet.</p>}
      {announcements.map((item) => (
        <div key={item._id} className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {item.content || item.message}
          </p>
          {user?.role === "admin" && (
            <div className="mt-3 flex gap-2">
              <button className="rounded-md bg-amber-600 px-3 py-1.5 text-sm text-white" onClick={() => handleEdit(item)}>
                Edit
              </button>
              <button className="rounded-md bg-rose-600 px-3 py-1.5 text-sm text-white" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Announcements;
