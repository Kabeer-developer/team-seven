const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
  variant = "outline",
  size = "md",
  className = "",
  disabled = false,
  error = false,
  iconLeft,
  iconRight,
  label,
  helperText,
  ...props
}) => {
  const baseStyles = "w-full transition-all duration-200 focus:outline-none focus:ring-4 peer placeholder:text-gray-400 dark:placeholder:text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 resize-none";

  const variants = {
    outline: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 hover:border-gray-300 dark:hover:border-gray-600",
    filled: "bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20",
    ghost: "bg-transparent border border-transparent focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 hover:bg-gray-50 dark:hover:bg-gray-800/30"
  };

  const sizes = {
    xs: "px-2.5 py-1.5 text-xs h-9",
    sm: "px-3 py-2 text-sm h-10",
    md: "px-4 py-2.5 text-sm h-11",
    lg: "px-4 py-3.5 text-base h-13",
    xl: "px-5 py-4 text-lg h-14"
  };

  const errorStyles = error 
    ? "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20 dark:focus:ring-red-400/20" 
    : "";

  return (
    <div className="w-full space-y-1.5">
      {/* Label */}
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1.5">
          {label}
        </label>
      )}
      
      {/* Input Wrapper */}
      <div className="relative">
        {iconLeft && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {iconLeft}
            </svg>
          </div>
        )}
        
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            ${baseStyles}
            ${variants[variant]}
            ${sizes[size]}
            ${errorStyles}
            ${iconLeft ? "pl-10" : ""}
            ${iconRight ? "pr-10" : ""}
            ${className}
          `}
          {...props}
        />
        
        {iconRight && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {iconRight}
          </div>
        )}
      </div>

      {/* Helper Text / Error */}
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-2 0v4a1 1 0 102 0V5z" clipRule="evenodd" />
          </svg>
          {helperText || "Please enter a valid value"}
        </p>
      )}
    </div>
  );
};

export default Input;