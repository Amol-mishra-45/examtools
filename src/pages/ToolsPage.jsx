import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ToolCard from '../components/ToolCard';
import SearchBar from '../components/SearchBar';
import { allTools, categories } from '../data/tools';
import SEO from '../components/SEO';

export default function ToolsPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const filteredTools = allTools.filter((tool) => {
    const matchesQuery =
      query === '' ||
      tool.title.toLowerCase().includes(query.toLowerCase()) ||
      (tool.description || '').toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="max-w-6xl mx-auto px-6 py-16 transition-colors duration-300">
      <SEO 
        title="All Useful Tools"
        description="Search through our free suite of tools including signature resizers, PDF mergers, and photo scalers for secure exam form submissions."
        keywords="resize image to 50kb, compress pdf for ssc form, free online toolkit, merge pdf"
        url="https://examtools.in/tools"
      />
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white tracking-tight mb-4 transition-colors">
          All <span className="text-blue-600 dark:text-blue-400">Tools</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors">
          Search through our free suite of tools below and handle your application forms faster.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12">
        <SearchBar
          placeholder="Search by tool name..."
          onSearch={(q) => setQuery(q)}
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-3 justify-center mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 hover:-translate-y-0.5 ${
              activeCategory === cat
                ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm max-w-2xl mx-auto transition-colors duration-300">
          <div className="text-6xl mb-6">🔍</div>
          <p className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight mb-2 transition-colors">
            No tools found for "{query}"
          </p>
          <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">
            Try searching for generic terms like "PDF" or "Resize".
          </p>
          <button 
            onClick={() => { setQuery(''); setActiveCategory('All'); }}
            className="mt-6 font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline transition-colors"
          >
            Clear Search
          </button>
        </div>
      )}
    </main>
  );
}
