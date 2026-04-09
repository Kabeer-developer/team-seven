import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [skillsInput, setSkillsInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile().then((res) => { 
      setUser(res); 
      setSkillsInput(res.skills?.join(", ") || ""); 
    });
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateProfile({ 
        ...user, 
        skills: skillsInput.split(",").map(s=>s.trim()).filter(Boolean) 
      });
      setEditMode(false);
    } catch { 
      alert("Error updating profile"); 
    }
    finally { 
      setSaving(false); 
    }
  };

  if (!user) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8">
      <div className="w-16 h-16 border-4 border-slate-700 border-t-indigo-400 rounded-full animate-spin"></div>
    </div>
  );

  const initials = user.name?.split(" ").map(n=>n[0]).join("").toUpperCase() || "?";
  const formatUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return "https://" + url;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          
          {/* Avatar Header */}
          <div className="bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-purple-700/90 p-10 text-center border-b border-white/10">
            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-white/20 to-transparent p-2 shadow-2xl">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt="avatar" 
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center text-2xl font-black text-slate-800 shadow-2xl">
                  {initials}
                </div>
              )}
            </div>
            {!editMode && (
              <>
                <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                  {user.name || "—"}
                </h1>
                <p className="text-lg text-white/80">{user.email}</p>
              </>
            )}
          </div>

          {/* Content Body */}
          <div className="p-10 md:p-12">
            {editMode ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                    Avatar URL
                  </label>
                  <input 
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-lg text-white placeholder-white/60 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300"
                    placeholder="https://..."
                    value={user.avatar||""} 
                    onChange={(e)=>setUser({...user,avatar:e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                    Name
                  </label>
                  <input 
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-lg text-white placeholder-white/60 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300"
                    placeholder="Full name"
                    value={user.name||""} 
                    onChange={(e)=>setUser({...user,name:e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                    Bio
                  </label>
                  <textarea 
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-lg text-white placeholder-white/60 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 resize-vertical min-h-[100px] transition-all duration-300"
                    placeholder="Tell us about yourself..."
                    value={user.bio||""} 
                    onChange={(e)=>setUser({...user,bio:e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                    Skills
                  </label>
                  <input 
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-lg text-white placeholder-white/60 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300"
                    placeholder="React, Node.js, Python..."
                    value={skillsInput} 
                    onChange={(e)=>setSkillsInput(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                      GitHub
                    </label>
                    <input 
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-lg text-white placeholder-white/60 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300"
                      placeholder="github.com/username"
                      value={user.github||""} 
                      onChange={(e)=>setUser({...user,github:e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
                      LinkedIn
                    </label>
                    <input 
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-lg text-white placeholder-white/60 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all duration-300"
                      placeholder="linkedin.com/in/username"
                      value={user.linkedin||""} 
                      onChange={(e)=>setUser({...user,linkedin:e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleUpdate} 
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "💾 Save Changes"}
                  </button>
                  <button 
                    className="flex-1 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-8 rounded-2xl border border-white/30 hover:border-white/50 transition-all duration-300"
                    onClick={()=>setEditMode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {user.bio && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                    <p className="text-lg text-white/90 leading-relaxed">{user.bio}</p>
                  </div>
                )}
                
                {user.skills?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white/90 mb-4 flex items-center gap-2">
                      🛠️ Skills
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {user.skills.map((s,i)=>(
                        <span key={i} className="px-6 py-2 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-500/30 rounded-2xl text-white/90 font-medium text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-4">
                  {user.github && (
                    <a
                      href={formatUrl(user.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-700/50"
                    >
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.058-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.176 2.873.171 3.176.768.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}

                  {user.linkedin && (
                    <a
                      href={formatUrl(user.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-600/50"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>

                <button 
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 mt-8"
                  onClick={()=>setEditMode(true)}
                >
                  ✏️ Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;