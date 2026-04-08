import { useState } from "react";

const Tabs = ({ tabs, defaultActive = 0, variant = "default", size = "md", className = "" }) => {
  const [active, setActive] = useState(defaultActive);

  const baseTabStyles = "relative px-6 py-3 font-semibold text-sm uppercase tracking-wide transition-all duration-300 cursor-pointer flex-1 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-blue-500/20";

  const variants = {
    default: {
      inactive: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 border-b-2 border-transparent",
      active: "text-blue-600 dark:text-blue-400 border-b-2 border-blue-500 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm"
    },
    underline: {
      inactive: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-transparent after:group-hover:w-full after:transition-all after:duration-300",
      active: "text-indigo-600 dark:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-2 after:bg-gradient-to-r after:from-indigo-500 after:to-purple-600 dark:after:from-indigo-400 dark:after:to-purple-400 after:rounded-t-full shadow-sm"
    },
    pill: {
      inactive: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-full",
      active: "text-white bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 shadow-lg hover:shadow-xl hover:from-indigo-600 hover:to-purple-700 rounded-full transform -translate-y-1"
    },
    enclosed: {
      inactive: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg",
      active: "text-indigo-700 dark:text-indigo-300 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 border-2 border-indigo-300 dark:border-indigo-600 shadow-md hover:shadow-lg"
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Tab Headers */}
      <div 
        className={`flex bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-1 shadow-lg border border-gray-200/50 dark:border-gray-800/50 ${
          variant === 'pill' ? 'rounded-3xl p-2' : 'rounded-2xl'
        }`}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`
              ${baseTabStyles}
              ${variants[variant].inactive}
              ${active === index && variants[variant].active}
              ${size === 'sm' ? 'px-4 py-2 text-xs' : size === 'lg' ? 'px-8 py-4 text-base' : ''}
            `}
            aria-selected={active === index}
            role="tab"
          >
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {active === index && (
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            
            {/* Active Indicator */}
            {active === index && variant !== 'enclosed' && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm -z-10 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 p-6 lg:p-8 bg-gradient-to-b from-white/60 to-gray-50/60 dark:from-gray-900/60 dark:to-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/30 dark:border-gray-700/30 shadow-inner">
        <div className="animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
          {tabs[active].content}
        </div>
      </div>

      {/* Tab Indicator (Underline variant only) */}
      {variant === 'underline' && (
        <div className="flex border-b border-gray-200 dark:border-gray-800 mt-1 -mb-px">
          <div 
            className="h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-t-full transition-all duration-500 ease-out"
            style={{ width: `${100 / tabs.length}%`, transform: `translateX(${active * 100}%)` }}
          />
        </div>
      )}
    </div>
  );
};

export default Tabs;