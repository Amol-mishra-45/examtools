import { Link } from 'react-router-dom';

export default function ToolCard({ tool, compact = false }) {
  if (compact) {
    return (
      <Link
        to={`/tools/${tool.id}`}
        className="bg-white dark:bg-slate-800 rounded-xl p-6 flex flex-col items-center gap-4 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center group h-full relative"
      >
        <div className={`${tool.color} dark:bg-opacity-20 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm transition-transform group-hover:scale-110`}>
          {tool.icon}
        </div>
        <span className="font-bold text-gray-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors px-1">
          {tool.title}
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={`/tools/${tool.id}`}
      className="bg-white dark:bg-slate-800 rounded-xl p-5 md:p-6 flex items-start gap-4 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full relative overflow-hidden"
    >
      {/* Icon */}
      <div
        className={`${tool.color} dark:bg-opacity-20 min-w-[56px] h-[56px] md:min-w-[64px] md:h-[64px] rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-sm transition-transform group-hover:scale-110`}
      >
        {tool.icon}
      </div>

      {/* Content wrapper without massive right padding, ensuring descriptions flow full-width */}
      <div className="flex-1 min-w-0 pt-0.5">
        {/* Title has independent right padding only so it avoids the absolute badge above, but lets description stretch */}
        <h3 className="font-bold text-gray-800 dark:text-slate-100 text-[15px] md:text-base leading-normal mb-1.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pr-12 md:pr-16">
          {tool.title}
        </h3>
        
        {/* Description completely without truncation or lines clamping limits */}
        {tool.description && (
          <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed">{tool.description}</p>
        )}
      </div>

      {/* Badges Overlay smartly positioned higher */}
      {tool.tag && (
        <div className="absolute top-2.5 right-2.5 md:top-3 md:right-3">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] md:text-[11px] font-bold uppercase tracking-wider ${
            tool.tag.toLowerCase() === 'popular' 
              ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400' 
              : tool.tag.toLowerCase() === 'new'
              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
              : 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400'
          }`}>
            {tool.tag}
          </span>
        </div>
      )}
    </Link>
  );
}
