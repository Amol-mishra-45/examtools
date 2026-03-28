import { Link } from 'react-router-dom';

export default function SearchBar({ placeholder = 'Search tools...', onSearch }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl bg-white dark:bg-slate-800 flex items-center p-1.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      <div className="pl-4 pr-3 text-gray-400 dark:text-slate-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1 0 4.5 4.5a7.5 7.5 0 0 0 12.15 12.15z"></path>
        </svg>
      </div>
      <input
        type="search"
        placeholder={placeholder}
        onChange={(e) => onSearch && onSearch(e.target.value)}
        className="w-full flex-grow py-3 text-gray-700 dark:text-slate-200 bg-transparent border-none outline-none focus:ring-0 placeholder-gray-400 dark:placeholder-slate-500 font-medium transition-colors"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors hover:shadow-md hidden sm:block"
      >
        Search
      </button>
    </div>
  );
}
