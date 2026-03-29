import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogs';
import SEO from '../components/SEO';

export default function Blog() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 transition-colors duration-300">
      <SEO
        title="Free Exam Guides & Tips – PDF, Photo Resize, CGPA Help"
        description="Step-by-step guides on compressing PDFs for SSC forms, resizing passport photos to 50KB, converting images, calculating CGPA, and more. Learn with ExamTools.in."
        keywords="how to compress pdf for ssc form, resize passport photo to 50kb guide, cgpa to percentage guide, remove background from photo free, exam form preparation tips india"
        url="https://examtools.in/blog"
      />
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4 transition-colors">
          Exam <span className="text-blue-600 dark:text-blue-400">Guides</span> & Tips
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors">
          Everything you need to know about resizing photos, compressing PDFs, and submitting forms perfectly.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
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
                <span className="text-gray-400 dark:text-slate-500 font-medium transition-colors">{post.readTime}</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl leading-snug mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed flex-grow transition-colors">
                {post.excerpt}
              </p>
              
              <div className="mt-5 pt-5 border-t border-gray-100 dark:border-slate-700 text-sm text-gray-400 dark:text-slate-500 font-medium flex items-center justify-between transition-colors">
                <span>{post.date}</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read 
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
