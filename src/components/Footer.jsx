export default function Footer() {
  return (
    <footer className="w-full relative bg-gradient-to-b from-[#0a0f1c] to-[#040810] border-t border-slate-800 shadow-[0_-10px_30px_-15px_rgba(59,130,246,0.2)] py-8 px-5 flex flex-col items-center justify-center z-10">
      <div className="flex flex-col items-center text-center space-y-3">
        {/* First Line */}
        <p className="text-slate-300 text-sm sm:text-base font-medium tracking-wide">
          &copy; 2026 ExamTools.in. All rights reserved.
        </p>

        {/* Second Line */}
        <div className="text-slate-500 text-xs sm:text-sm font-medium flex items-center gap-1.5 flex-wrap justify-center">
          <span>Made with</span>
          <span className="text-red-500 text-base animate-pulse drop-shadow-[0_0_5px_rgba(239,68,68,0.6)]">
            ❤️
          </span>
          <span>by</span>
          <a
            href="https://github.com/CodeCraftAmol"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center ml-0.5"
          >
            <span className="font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:from-cyan-300 group-hover:to-blue-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              CodeCraftAmol
            </span>
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full rounded-full opacity-80 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
