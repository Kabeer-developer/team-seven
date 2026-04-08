import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [skillsInput, setSkillsInput] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile().then((res) => { setUser(res); setSkillsInput(res.skills?.join(", ") || ""); });
  }, []);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      await updateProfile({ ...user, skills: skillsInput.split(",").map(s=>s.trim()).filter(Boolean) });
      setEditMode(false);
    } catch { alert("Error updating profile"); }
    finally { setSaving(false); }
  };

  if (!user) return (
    <div style={S.page}>
      <div style={S.spinner}/>
    </div>
  );

  const initials = user.name?.split(" ").map(n=>n[0]).join("").toUpperCase() || "?";
  const formatUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return "https://" + url;
};
  return (
    <div style={S.page}>
      <style>{CSS}</style>
      <div style={S.card}>

        {/* Avatar strip */}
        <div style={S.strip}>
          <div style={S.avatarRing}>
            {user.avatar
              ? <img src={user.avatar} alt="avatar" style={S.avatarImg}/>
              : <span style={S.initials}>{initials}</span>}
          </div>
          {!editMode && (
            <>
              <p style={S.name}>{user.name || "—"}</p>
              <p style={S.email}>{user.email}</p>
            </>
          )}
        </div>

        {/* Body */}
        <div style={S.body}>
          {editMode ? (
            <div style={S.form}>
              <Field label="Avatar URL"><Input value={user.avatar||""} onChange={v=>setUser({...user,avatar:v})} placeholder="https://…"/></Field>
              <Field label="Name"><Input value={user.name||""} onChange={v=>setUser({...user,name:v})} placeholder="Full name"/></Field>
              <Field label="Bio"><Input value={user.bio||""} onChange={v=>setUser({...user,bio:v})} placeholder="Short bio…" area/></Field>
              <Field label="Skills"><Input value={skillsInput} onChange={setSkillsInput} placeholder="React, Node.js, Python…"/></Field>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                <Field label="GitHub"><Input value={user.github||""} onChange={v=>setUser({...user,github:v})} placeholder="github.com/…"/></Field>
                <Field label="LinkedIn"><Input value={user.linkedin||""} onChange={v=>setUser({...user,linkedin:v})} placeholder="linkedin.com/in/…"/></Field>
              </div>
              <div style={{display:"flex",gap:10,marginTop:8}}>
                <button onClick={handleUpdate} disabled={saving} style={{...S.btn,...S.btnPrimary}}>{saving?"Saving…":"Save changes"}</button>
                <button onClick={()=>setEditMode(false)} style={{...S.btn,...S.btnGhost}}>Cancel</button>
              </div>
            </div>
          ) : (
            <div style={S.view}>
              {user.bio && <p style={S.bio}>{user.bio}</p>}
              {user.skills?.length > 0 && (
                <div style={S.skillsWrap}>
                  {user.skills.map((s,i)=><span key={i} style={S.skill}>{s}</span>)}
                </div>
              )}
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                {user.github && (
  <a
    href={formatUrl(user.github)}
    target="_blank"
    rel="noopener noreferrer"
    style={{ ...S.btn, ...S.btnDark }}
  >
    GitHub ↗
  </a>
)}

{user.linkedin && (
  <a
    href={formatUrl(user.linkedin)}
    target="_blank"
    rel="noopener noreferrer"
    style={{ ...S.btn, ...S.btnBlue }}
  >
    LinkedIn ↗
  </a>
)}
              </div>
              <button onClick={()=>setEditMode(true)} style={{...S.btn,...S.btnPrimary,marginTop:8}}>Edit profile</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Field = ({label,children}) => (
  <div>
    <label style={{fontSize:12,fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"#94a3b8",display:"block",marginBottom:6}}>{label}</label>
    {children}
  </div>
);

const Input = ({value,onChange,placeholder,area}) => {
  const s = {width:"100%",padding:"10px 14px",background:"#0f172a",border:"1px solid #1e293b",borderRadius:10,color:"#f1f5f9",fontSize:14,outline:"none",resize:area?"vertical":"none",minHeight:area?80:undefined,fontFamily:"inherit",boxSizing:"border-box"};
  return area
    ? <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={s}/>
    : <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={s}/>;
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  input::placeholder,textarea::placeholder{color:#475569}
  input:focus,textarea:focus{border-color:#6366f1!important;box-shadow:0 0 0 3px rgba(99,102,241,.2)}
  a{text-decoration:none}
`;

const S = {
  page:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#020617",fontFamily:"'Inter',sans-serif",padding:20},
  spinner:{width:36,height:36,border:"3px solid #1e293b",borderTop:"3px solid #6366f1",borderRadius:"50%",animation:"spin 0.8s linear infinite"},
  card:{width:"100%",maxWidth:480,background:"#0a0f1e",border:"1px solid #1e293b",borderRadius:24,overflow:"hidden",animation:"up .3s ease"},
  strip:{background:"linear-gradient(135deg,#1e1b4b,#0f172a)",padding:"36px 32px 28px",textAlign:"center",borderBottom:"1px solid #1e293b"},
  avatarRing:{width:88,height:88,borderRadius:"50%",background:"linear-gradient(135deg,#6366f1,#a855f7)",padding:3,margin:"0 auto 14px",display:"flex",alignItems:"center",justifyContent:"center"},
  avatarImg:{width:"100%",height:"100%",borderRadius:"50%",objectFit:"cover",display:"block"},
  initials:{fontSize:28,fontWeight:700,color:"#fff"},
  name:{color:"#f1f5f9",fontSize:20,fontWeight:700,margin:"0 0 4px"},
  email:{color:"#64748b",fontSize:13},
  body:{padding:28},
  form:{display:"flex",flexDirection:"column",gap:14},
  view:{display:"flex",flexDirection:"column",gap:16},
  bio:{color:"#94a3b8",fontSize:14,lineHeight:1.7,background:"#0f172a",borderRadius:12,padding:"14px 16px",margin:0},
  skillsWrap:{display:"flex",flexWrap:"wrap",gap:8},
  skill:{padding:"5px 12px",background:"rgba(99,102,241,.15)",border:"1px solid rgba(99,102,241,.3)",borderRadius:20,color:"#a5b4fc",fontSize:13,fontWeight:500},
  btn:{padding:"10px 20px",borderRadius:10,fontSize:14,fontWeight:600,cursor:"pointer",border:"none",transition:"opacity .15s",display:"inline-flex",alignItems:"center",gap:6},
  btnPrimary:{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",flex:1,justifyContent:"center"},
  btnGhost:{background:"#1e293b",color:"#94a3b8"},
  btnDark:{background:"#1e293b",color:"#f1f5f9"},
  btnBlue:{background:"#1d4ed8",color:"#fff"},
};

export default Profile;