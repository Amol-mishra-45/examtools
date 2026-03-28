import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ToolCard from '../components/ToolCard';
import SEO from '../components/SEO';
import { popularTools, quickTools } from '../data/tools';
import { blogPosts } from '../data/blogs';

export default function Home() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <main className="bg-[#f8fafc] dark:bg-slate-900 min-h-screen pb-16 transition-colors duration-300">
      <SEO 
        title="Home"
        description="Simplify your exam preparation with fast, secure, and professional tools for students to resize photos, and compress PDFs."
        keywords="resize image to 50kb, compress pdf for ssc form, online free tool, exam preparation, free web tools"
        url="https://examtools.in"
      />
      {/* ── Hero Section ─────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 py-24 px-6 text-center border-b border-gray-100 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 dark:bg-blue-900 rounded-full blur-3xl"></div>
          <div className="absolute top-32 -right-32 w-80 h-80 bg-green-100 dark:bg-green-900 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight tracking-tight mb-4 transition-colors duration-300">
            Simplify Your <span className="text-blue-600 dark:text-blue-400">Exam Preparation</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-2xl mx-auto font-medium transition-colors duration-300">
            Fast, secure, and professional tools for students to resize photos, compress PDFs, and prepare application forms instantly.
          </p>
          <SearchBar placeholder="What tool are you looking for?" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-20 mt-16">
        {/* ── Popular Tools ────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2 transition-colors duration-300">
              <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Popular Tools
            </h2>
            <Link to="/tools" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold text-sm hover:underline flex items-center gap-1 transition-colors relative z-20">
              Browse All
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* ── Quick Tools ──────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2 transition-colors duration-300">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Tools
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {quickTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} compact={true} />
            ))}
          </div>
        </section>

        {/* ── Latest Blog Posts ────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight flex items-center gap-2 transition-colors duration-300">
              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              Latest Guides
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none hover:shadow-xl dark:hover:shadow-lg dark:hover:shadow-slate-800/50 hover:-translate-y-1.5 transition-all duration-300 border border-gray-100 dark:border-slate-700 group flex flex-col h-full"
              >
                {/* Image Cover */}
                <div
                  className={`h-48 bg-gradient-to-br ${post.coverColor} dark:opacity-80 flex items-center justify-center text-6xl relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                  <span className="relative z-20 group-hover:scale-110 transition-transform duration-300">
                    {post.icon}
                  </span>
                </div>
                
                {/* Post Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3 text-sm">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-gray-400 dark:text-slate-500 font-medium">{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg leading-snug mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed flex-grow transition-colors">{post.excerpt}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 text-sm text-gray-400 dark:text-slate-500 font-medium transition-colors">
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold px-8 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:-translate-y-0.5"
            >
              View All Posts
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
