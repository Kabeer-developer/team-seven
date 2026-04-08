const Button = ({ 
  children, 
  onClick, 
  type = "button",
  variant = "primary",
  size = "md",
  shape = "rounded",
  loading = false,
  disabled = false,
  className = "",
  fullWidth = false,
  iconLeft,
  iconRight
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-500/20 hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500/50 dark:focus:ring-blue-400/50",
    secondary: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 focus:ring-blue-500/30 dark:focus:ring-blue-400/30",
    success: "bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-500/20 hover:from-emerald-700 hover:to-teal-700 focus:ring-emerald-500/50 dark:focus:ring-emerald-400/50",
    danger: "bg-gradient-to-r from-rose-600 to-red-600 text-white border border-rose-500/20 hover:from-rose-700 hover:to-red-700 focus:ring-rose-500/50 dark:focus:ring-rose-400/50",
    warning: "bg-gradient-to-r from-orange-600 to-amber-600 text-white border border-orange-500/20 hover:from-orange-700 hover:to-amber-700 focus:ring-orange-500/50 dark:focus:ring-orange-400/50",
    ghost: "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 focus:ring-blue-500/30 dark:focus:ring-blue-400/30 border border-transparent",
    outline: "bg-transparent text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 focus:ring-blue-500/30 dark:focus:ring-blue-400/30"
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  const shapes = {
    rounded: "rounded-xl",
    pill: "rounded-full",
    square: "rounded-lg"
  };

  const loadingContent = (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${shapes[shape]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
        ${loading ? 'cursor-wait' : ''}
      `}
      aria-label={loading ? 'Loading...' : children}
    >
      <span className="flex items-center gap-2">
        {iconLeft && !loading && iconLeft}
        {loading ? loadingContent : children}
        {iconRight && !loading && iconRight}
      </span>
    </button>
  );
};

export default Button;