const Modal = ({ isOpen, onClose, children, title, size = "md", className = "" }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl"
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in zoom-in duration-200"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 dark:bg-black/60" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/30 border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto ${sizeClasses[size]} w-full max-w-full mx-4 ${className} animate-in slide-in-from-top-4 duration-200`}>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 rounded-t-2xl px-6 py-4">
          <div className="flex items-center justify-between">
            {title && (
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 lg:p-8 max-h-[60vh] overflow-y-auto">
          {children}
        </div>

        {/* Footer - Optional */}
        <div className="sticky bottom-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 rounded-b-2xl px-6 py-4 flex flex-wrap items-center gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 border border-blue-500/20 hover:from-blue-700 hover:to-indigo-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;