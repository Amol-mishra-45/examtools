export default function TrustBadge() {
  return (
    <div className="mt-6 mb-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 bg-gray-100 dark:bg-slate-800/80 rounded-full px-5 py-2.5 shadow-sm border border-gray-200 dark:border-slate-700 w-max animate-[fadeIn_0.5s_ease-out] transition-colors duration-300 mx-auto md:mx-0">
      
      {/* Secure */}
      <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-slate-300">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        Secure
      </div>
      
      {/* Divider */}
      <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></div>
      
      {/* No Upload */}
      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-slate-400">
        <svg className="w-4 h-4 text-gray-500 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        No Upload
      </div>

      {/* Divider */}
      <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600"></div>

      {/* Fast */}
      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 dark:text-slate-400">
        <svg className="w-4 h-4 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Fast
      </div>

    </div>
  );
}
