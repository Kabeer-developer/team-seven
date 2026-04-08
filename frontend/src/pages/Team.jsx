import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

const Team = () => {
  const [users, setUsers] = useState([]);
  const [roleInClub, setRoleInClub] = useState("");

  useEffect(() => {
    getUsers({ roleInClub: roleInClub || undefined }).then(setUsers);
  }, [roleInClub]);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-gray-50 via-indigo-50 to-blue-100 dark:from-slate-900 dark:to-black">
      
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Team Members
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Meet our amazing club team 🚀
        </p>
      </div>

      {/* FILTER */}
      <div className="max-w-xs mx-auto mb-8">
        <select
          value={roleInClub}
          onChange={(e) => setRoleInClub(e.target.value)}
          className="w-full rounded-xl px-4 py-3 bg-white dark:bg-slate-800 
          text-gray-900 dark:text-white 
          border border-gray-300 dark:border-slate-700 
          shadow-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <option value="">All Roles</option>
          <option value="Lead">Lead</option>
          <option value="Core">Core</option>
          <option value="Member">Member</option>
          <option value="Alumni">Alumni</option>
        </select>
      </div>

      {/* EMPTY STATE */}
      {users.length === 0 ? (
        <div className="text-center mt-20">
          <div className="text-6xl mb-4">👥</div>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            No members found
          </p>
        </div>
      ) : (
        /* GRID */
        <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {users.map((u) => (
            <div
              key={u._id}
              className="group p-6 rounded-2xl bg-white/70 dark:bg-white/10 backdrop-blur-lg 
              shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* AVATAR */}
              <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                {u.name?.charAt(0)?.toUpperCase()}
              </div>

              {/* INFO */}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {u.name}
              </h3>

              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mt-1">
                {u.roleInClub || "Member"}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 break-all">
                {u.email}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Team;