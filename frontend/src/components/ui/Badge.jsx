const Badge = ({ 
  text, 
  color = "gray", 
  variant = "solid",
  size = "md",
  className = "",
  pill = false 
}) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-105 active:scale-95";

  const colors = {
    gray: {
      solid: "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700",
      outline: "bg-transparent text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/50",
      gradient: "bg-gradient-to-r from-gray-500 to-gray-700 text-white border border-gray-400/30"
    },
    green: {
      solid: "bg-gradient-to-r from-emerald-500 to-green-600 text-white border border-emerald-400/30 hover:from-emerald-600 hover:to-green-700",
      outline: "bg-transparent text-emerald-700 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border border-emerald-400/30"
    },
    red: {
      solid: "bg-gradient-to-r from-rose-500 to-red-600 text-white border border-rose-400/30 hover:from-rose-600 hover:to-red-700",
      outline: "bg-transparent text-rose-700 dark:text-rose-400 border-2 border-rose-300 dark:border-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20",
      gradient: "bg-gradient-to-r from-rose-500 to-pink-600 text-white border border-rose-400/30"
    },
    blue: {
      solid: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border border-blue-400/30 hover:from-blue-600 hover:to-indigo-700",
      outline: "bg-transparent text-blue-700 dark:text-blue-400 border-2 border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-600 text-white border border-blue-400/30"
    },
    purple: {
      solid: "bg-gradient-to-r from-purple-500 to-violet-600 text-white border border-purple-400/30 hover:from-purple-600 hover:to-violet-700",
      outline: "bg-transparent text-purple-700 dark:text-purple-400 border-2 border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-600 text-white border border-purple-400/30"
    },
    orange: {
      solid: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border border-orange-400/30 hover:from-orange-600 hover:to-amber-700",
      outline: "bg-transparent text-orange-700 dark:text-orange-400 border-2 border-orange-300 dark:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20",
      gradient: "bg-gradient-to-r from-orange-500 to-red-600 text-white border border-orange-400/30"
    }
  };

  const sizes = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-sm"
  };

  const shape = pill ? "rounded-full" : "rounded-lg";

  return (
    <span 
      className={`
        ${baseStyles}
        ${colors[color]?.[variant] || colors.gray.solid}
        ${sizes[size]}
        ${shape}
        ${className}
      `}
    >
      {text}
    </span>
  );
};

export default Badge;