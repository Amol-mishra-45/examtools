/**
 * © 2026 Amol Mishra (CodeCraftAmol). All rights reserved.
 * Website: https://examtools.in
 * Unauthorized copying or reuse of this file is prohibited.
 */

import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full relative bg-gradient-to-b from-[#0a0f1c] to-[#040810] border-t border-slate-800 shadow-[0_-10px_30px_-15px_rgba(59,130,246,0.2)] py-10 px-5 flex flex-col items-center justify-center z-10">
      <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 tracking-tight">
            ExamTools.in
          </span>
        </div>

        {/* Tagline */}
        <p className="text-slate-500 text-xs sm:text-sm font-medium max-w-sm leading-relaxed">
          Free, secure, and private tools for Indian students to ace their exam form preparations.
        </p>

        {/* Navigation Links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
          <span className="text-slate-700" aria-hidden>·</span>
          <Link to="/tools" className="hover:text-blue-400 transition-colors duration-200">Tools</Link>
          <span className="text-slate-700" aria-hidden>·</span>
          <Link to="/blog" className="hover:text-blue-400 transition-colors duration-200">Blog</Link>
          <span className="text-slate-700" aria-hidden>·</span>
          <Link to="/about" className="hover:text-blue-400 transition-colors duration-200">About</Link>
          <span className="text-slate-700" aria-hidden>·</span>
          <Link to="/terms" className="hover:text-blue-400 transition-colors duration-200">Terms of Use</Link>
        </nav>

        {/* Divider */}
        <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Copyright */}
        <p className="text-slate-300 text-sm sm:text-base font-semibold tracking-wide">
          © {year} ExamTools.in. All rights reserved.
        </p>

        {/* Made by */}
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
            aria-label="CodeCraftAmol GitHub Profile"
            className="group relative inline-flex items-center ml-0.5"
          >
            <span className="font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:from-cyan-300 group-hover:to-blue-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              CodeCraftAmol
            </span>
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full rounded-full opacity-80 group-hover:shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>
          </a>
        </div>

        {/* Legal micro-notice */}
        <p className="text-slate-600 text-[11px] font-medium mt-1 leading-relaxed max-w-sm">
          All content, tools, and code on this site are proprietary.{' '}
          <Link to="/terms" className="underline underline-offset-2 hover:text-slate-400 transition-colors">
            Unauthorized copying or reuse is prohibited.
          </Link>
        </p>

      </div>
    </footer>
  );
}
