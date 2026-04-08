const MemberCard = ({ member }) => {
  const getDomainColor = (domain) => {
    const colors = {
      design: "from-pink-500 to-rose-600",
      development: "from-blue-500 to-indigo-600",
      marketing: "from-emerald-500 to-teal-600",
      management: "from-purple-500 to-violet-600",
      content: "from-orange-500 to-amber-600"
    };
    return colors[domain?.toLowerCase()] || "from-gray-500 to-gray-600";
  };

  const getDomainIcon = (domain) => {
    const icons = {
      design: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
      development: "M13 10V3L4 14h7v7l9-11h-7z",
      marketing: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      management: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      content: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zM11.25 10.5L9 13.5m2.25-3v6m-2.25 0h4.5"
    };
    return icons[domain?.toLowerCase()] || "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z";
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:shadow-gradient-to-r hover:shadow-purple-500/10 dark:hover:shadow-pink-500/20 border border-gray-100 dark:border-gray-800 hover:border-purple-200 dark:hover:border-purple-800/50 transform hover:-translate-y-3 transition-all duration-700 overflow-hidden">
      
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getDomainColor(member.domain)} opacity-0 group-hover:opacity-5 transition-opacity duration-700 blur-xl -z-10`}></div>
      
      {/* Avatar */}
      <div className="relative mx-auto mb-6 w-24 h-24 group-hover:scale-110 transition-transform duration-500">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 shadow-2xl border-4 border-white dark:border-gray-800 absolute inset-0 opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
        <div className={`w-24 h-24 rounded-3xl shadow-2xl border-4 border-white/50 dark:border-gray-800/50 flex items-center justify-center text-3xl font-bold text-white ${getDomainColor(member.domain)}`}>
          {member.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform duration-300">
          {member.name}
        </h3>
        
        <div className="mb-6">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r ${getDomainColor(member.domain)} text-white shadow-lg mb-3`}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getDomainIcon(member.domain)} />
            </svg>
            {member.domain}
          </div>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {member.roleInClub}
          </p>
        </div>

        {/* Social Stats */}
        <div className="flex items-center justify-center gap-8 mb-8 text-sm">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Lead Team</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Active</span>
          </div>
        </div>

        {/* Connect Button */}
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 translate-y-4 group-hover:translate-y-0">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-purple-200 dark:border-purple-800/50 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-700/50 backdrop-blur-sm"
          >
            Connect
          </Button>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full group-hover:animate-bounce"></div>
      <div className="absolute bottom-4 right-4 w-3 h-3 bg-white/20 rounded-full group-hover:animate-ping delay-100"></div>
    </div>
  );
};

export default MemberCard;