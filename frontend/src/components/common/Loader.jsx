const Loader = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50/50 via-blue-50/50 to-indigo-100/50 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-slate-900/50 backdrop-blur-sm">
      {/* Main Spinner */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-gradient-to-r border-t-from-blue-500 border-t-to-purple-500 dark:border-t-from-blue-400 dark:border-t-to-purple-400 rounded-full animate-ping-slow"></div>
      </div>

      {/* Pulse Dots */}
      <div className="flex space-x-2 mt-6">
        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse-slow"></div>
        <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse-slow animation-delay-200"></div>
        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full animate-pulse-slow animation-delay-400"></div>
      </div>

      {/* Text */}
      <div className="mt-8 space-y-2 text-center">
        <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Loading...
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">
          Preparing your experience
        </p>
      </div>

      {/* Subtle shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-black/20 animate-shimmer -z-10 rounded-3xl blur-xl"></div>
    </div>
  );
};

export default Loader;