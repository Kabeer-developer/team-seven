import  Button  from "../common/Button";

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/20 border border-gray-100 dark:border-gray-800 hover:border-indigo-200 dark:hover:border-indigo-800/50 overflow-hidden transform hover:-translate-y-3 transition-all duration-700">
      
      {/* Image/Tech Stack Preview */}
      <div className="relative mb-8 h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 group-hover:scale-105 transition-transform duration-700">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project?.techStack?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-900 rounded-full shadow-md animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-all duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 line-clamp-3 h-20">
          {project.description}
        </p>

        {/* Project Stats */}
        <div className="flex items-center justify-between mb-8 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>{project.stars || '★ 1.2k'}</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{project.forks || '★ 280'}</span>
            </div>
          </div>
          <div className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full font-semibold">
            {project.status || 'Live'}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            size="md"
            fullWidth
            className="group-hover:shadow-indigo-500/50 flex-1"
            iconRight={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            }
            as="a"
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Button>
          
          <Button
            variant="secondary"
            size="md"
            fullWidth
            className="border-indigo-200 dark:border-indigo-800/50 flex-1 hover:shadow-indigo-500/25"
            as="a"
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </Button>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/5 to-purple-500/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl -z-10"></div>
      
      {/* Top Tech Gradient */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600"></div>
      
      {/* Floating Stars */}
      <div className="absolute top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 group-hover:opacity-40 blur-xl group-hover:animate-pulse -z-10"></div>
    </div>
  );
};

export default ProjectCard;