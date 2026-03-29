import { useState } from 'react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  // Core Calculations
  const calculateStats = (input) => {
    if (!input.trim()) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsWithoutSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
      };
    }

    const words = input.trim().split(/\s+/).filter(word => word.length > 0).length;
    const charsWithSpaces = input.length;
    const charsWithoutSpaces = input.replace(/\s+/g, '').length;
    const sentences = input.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const paragraphs = input.split(/\n+/).filter(para => para.trim().length > 0).length;
    
    // Average reading speed is ~200 words per minute
    const readingTime = Math.ceil(words / 200);

    return { words, charsWithSpaces, charsWithoutSpaces, sentences, paragraphs, readingTime };
  };

  const stats = calculateStats(text);

  const handleClear = () => {
    setText('');
    setCopySuccess(false);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Copy failed silently — clipboard may be unavailable
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 p-8 mt-8 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors">Real-Time Word Counter</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            disabled={!text}
            className={`font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-sm ${
              !text 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-transparent' 
                : copySuccess
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-gray-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95'
            }`}
          >
            {copySuccess ? 'Copied! ✓' : 'Copy Text'}
          </button>
          
          <button
            onClick={handleClear}
            disabled={!text}
            className={`font-semibold text-sm px-4 py-2 rounded-lg transition-all shadow-sm ${
              !text 
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-95 border border-red-100 dark:border-red-900/50'
            }`}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Main Text Area */}
      <div className="relative mb-8">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-64 md:h-80 bg-yellow-50/30 dark:bg-yellow-900/5 border border-yellow-200 dark:border-yellow-900/30 text-slate-800 dark:text-slate-200 rounded-[1.5rem] p-6 focus:ring-4 focus:ring-yellow-500/20 dark:focus:ring-yellow-500/10 focus:border-yellow-500 dark:focus:border-yellow-600 focus:outline-none transition-all resize-y text-lg leading-relaxed shadow-inner placeholder-slate-400 dark:placeholder-slate-600"
        />
        <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-sm transition-colors">
          ~{stats.readingTime} min read
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Words */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center transition-colors">
          <span className="text-3xl font-black text-yellow-600 dark:text-yellow-500 mb-1 transition-colors">{stats.words}</span>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Words</span>
        </div>

        {/* Characters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center transition-colors relative group">
          <span className="text-3xl font-black text-blue-600 dark:text-blue-500 mb-1 transition-colors">{stats.charsWithSpaces}</span>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Characters</span>
          {/* Tooltip for no-spaces */}
          <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 dark:bg-slate-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none">
            {stats.charsWithoutSpaces} without spaces
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-700"></div>
          </div>
        </div>

        {/* Sentences */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center transition-colors">
          <span className="text-3xl font-black text-green-600 dark:text-green-500 mb-1 transition-colors">{stats.sentences}</span>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Sentences</span>
        </div>

        {/* Paragraphs */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col items-center justify-center transition-colors">
          <span className="text-3xl font-black text-purple-600 dark:text-purple-500 mb-1 transition-colors">{stats.paragraphs}</span>
          <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider transition-colors">Paragraphs</span>
        </div>

      </div>
    </div>
  );
}
