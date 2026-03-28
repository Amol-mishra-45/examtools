import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allTools } from '../data/tools';
import ResizeImage from '../components/tools/ResizeImage';
import ResizeSignature from '../components/tools/ResizeSignature';
import CompressPdf from '../components/tools/CompressPdf';
import MergePdf from '../components/tools/MergePdf';
import ImageConverter from '../components/tools/ImageConverter';
import WordCounter from '../components/tools/WordCounter';
import TextToPdf from '../components/tools/TextToPdf';
import CGPACalculator from '../components/tools/CGPACalculator';
import BackgroundRemover from '../components/tools/BackgroundRemover';
import SEO from '../components/SEO';
import TrustBadge from '../components/TrustBadge';
import { trackToolClick } from '../utils/analytics';

export default function ToolDetail() {
  const { id } = useParams();
  const tool = allTools.find((t) => t.id === id);

  // ✅ GA4: Track tool page visit (fires once when the tool loads)
  useEffect(() => {
    if (tool) {
      trackToolClick(tool.title, tool.id);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="text-center py-32 px-6 w-full flex-grow transition-colors duration-300">
        <SEO title="404 - Tool Not Found" />
        <div className="text-7xl mb-6">🔧</div>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight transition-colors">Tool Not Found</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-3 font-medium text-lg transition-colors">We couldn't locate this tool in our database.</p>
        <Link
          to="/tools"
          className="mt-8 inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-500 text-white px-8 py-3.5 rounded-xl text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          ← Explore All Tools
        </Link>
      </div>
    );
  }

  const renderInteractiveTool = () => {
    switch (tool.id) {
      case 'resize-image-50kb':
        return <ResizeImage />;
      case 'resize-signature-20kb':
        return <ResizeSignature />;
      case 'compress-pdf-100kb':
        return <CompressPdf />;
      case 'merge-pdf-free':
        return <MergePdf />;
      case 'image-converter-jpg':
        return <ImageConverter />;
      case 'word-counter-tool':
        return <WordCounter />;
      case 'text-to-pdf-converter':
        return <TextToPdf />;
      case 'cgpa-to-percentage':
        return <CGPACalculator />;
      case 'remove-image-bg':
        return <BackgroundRemover />;
      default:
        return (
          <div className="group border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-[1.5rem] p-12 text-center bg-blue-50/50 dark:bg-blue-900/10 relative mt-8 opacity-75 transition-colors duration-300">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-slate-800 dark:text-slate-200 font-bold text-lg mb-1 transition-colors">Coming Soon</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">This fast online free tool is currently under development.</p>
          </div>
        );
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 transition-colors duration-300">
      <SEO 
        title={tool.title} 
        description={tool.description} 
        keywords={tool.seoKeywords || "online free tool, exam prep"} 
        url={`https://examtools.in/tools/${tool.id}`} 
      />

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 dark:text-slate-500 mb-10 flex items-center gap-2 font-medium bg-white dark:bg-slate-800 px-4 py-2.5 rounded-full shadow-sm border border-gray-100 dark:border-slate-700 w-max transition-colors duration-300">
        <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <Link to="/tools" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tools</Link>
        <span className="text-slate-300 dark:text-slate-600">/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{tool.title}</span>
      </nav>

      {/* UI Top Title Block */}
      <header className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-700 p-8 md:p-12 mb-10 relative overflow-hidden transition-colors duration-300">
        <div className={`absolute top-0 right-0 w-64 h-64 ${tool.color} opacity-30 dark:opacity-10 blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none transition-colors`}></div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          <div className={`${tool.color} dark:bg-opacity-20 w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-5xl shrink-0 shadow-sm border border-white/50 dark:border-slate-700 backdrop-blur-sm transition-colors`}>
            {tool.icon}
          </div>
          <div className="pr-12 text-center md:text-left flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-2 transition-colors">{tool.title}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed font-medium transition-colors">{tool.description}</p>
            
            {/* Global Trust Badge injected into Title Block */}
            <TrustBadge />
          </div>
        </div>

        {renderInteractiveTool()}
      </header>

      {/* SEO Optimized Context Content */}
      <article className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-700 p-8 md:p-12 mb-10 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 tracking-tight flex items-center gap-2 transition-colors">
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Why use this online free tool?
        </h2>
        {tool.paragraphs ? (
          <div className="space-y-6 text-slate-600 dark:text-slate-300 font-medium leading-relaxed transition-colors">
            {tool.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        ) : (
          <div className="space-y-6 text-slate-600 dark:text-slate-300 font-medium leading-relaxed transition-colors">
            <p>Our online free tools are specifically engineered to make application processes flawless. Whether you need to compress pdf for ssc form or shrink image footprints directly inside your browser cache securely.</p>
            <p>This utility ensures you instantly meet server upload restrictions effortlessly.</p>
          </div>
        )}
      </article>

      {/* Internal Linking */}
      <div className="mt-16 text-center">
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-6 transition-colors">Other Essential Tools</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {allTools.filter(t => t.id !== tool.id && t.tag === 'Popular').map(related => (
            <Link key={related.id} to={`/tools/${related.id}`} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-transparent dark:border-slate-700 hover:border-slate-600 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300">
              {related.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
