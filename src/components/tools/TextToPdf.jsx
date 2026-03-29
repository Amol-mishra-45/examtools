import { useState } from 'react';
import { jsPDF } from 'jspdf';

export default function TextToPdf() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(14);
  
  const [generatedPdf, setGeneratedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleGenerate = () => {
    if (!text.trim()) {
      setError('Please enter some text to generate a PDF.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Initialize basic jsPDF document
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      
      let cursorY = margin;
      
      // 1. Add Title Header if exists
      if (title.trim()) {
        doc.setFontSize(fontSize + 8);
        doc.setFont("helvetica", "bold");
        
        const titleLines = doc.splitTextToSize(title, maxWidth);
        doc.text(titleLines, margin, cursorY);
        
        // Approximate Y axis jump based on font size multipliers
        cursorY += (titleLines.length * (fontSize + 8) * 0.4) + 12; 
      }
      
      // 2. Setup normal body font
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", "normal");
      
      // 3. Process Text strictly maintaining paragraph spacing
      const paragraphs = text.split('\n');
      
      for (let i = 0; i < paragraphs.length; i++) {
        const para = paragraphs[i];
        
        // Handle physical empty newlines cleanly
        if (para.trim() === '') {
          cursorY += fontSize * 0.4;
          continue;
        }
        
        // Native jsPDF layout wrapping engine
        const lines = doc.splitTextToSize(para, maxWidth);
        
        for (let j = 0; j < lines.length; j++) {
          // Automatic Page Break logic trigger
          if (cursorY > pageHeight - margin - 10) { 
            doc.addPage();
            cursorY = margin;
            // Reset font settings on new page just in case
            doc.setFontSize(fontSize);
            doc.setFont("helvetica", "normal");
          }
          
          doc.text(lines[j], margin, cursorY);
          cursorY += (fontSize * 0.45); // Line height spacing
        }
        cursorY += (fontSize * 0.3); // Paragraph gap spacing
      }
      
      // 4. Inject automated footers globally
      const pageCount = doc.internal.getNumberOfPages();
      doc.setFontSize(9);
      doc.setTextColor(150); // Muted gray color
      
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.text('Generated via ExamTools.in (Secure Frontend Optimizer)', margin, pageHeight - 12);
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - margin - 25, pageHeight - 12);
      }
      
      // Generate blob payload directly natively
      const blob = doc.output('blob');
      
      // Construct file payload natively
      const safeTitle = title.trim() ? `${title.substring(0,25).replace(/[^a-z0-9]/gi, '_').toLowerCase()}` : 'document';
      const optimizedFile = new File([blob], `${safeTitle}.pdf`, { type: 'application/pdf' });
      
      setGeneratedPdf(optimizedFile);
      setSuccess('Your PDF has been successfully generated! Your text was processed entirely securely in your browser. No data was uploaded anywhere.');
    } catch {
      setError('Failed to generate PDF. The text input might contain unsupported special characters.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText('');
    setTitle('');
    setGeneratedPdf(null);
    setError('');
    setSuccess('');
  };

  const downloadFile = () => {
    if (!generatedPdf) return;
    const url = URL.createObjectURL(generatedPdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = generatedPdf.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 p-8 mt-8 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors">Generate PDF Layout</h3>
        <button
          onClick={handleClear}
          disabled={!text && !title}
          className={`font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm ${
            (!text && !title)
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-95 border border-red-100 dark:border-red-900/50'
          }`}
        >
          Clear Fields
        </button>
      </div>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-800/50 transition-colors">
          {error}
        </div>
      )}

      {/* Editor Panel */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 border-b border-gray-100 dark:border-slate-700 pb-8 transition-colors">
        
        {/* Settings Block */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Document Title (Optional)</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setGeneratedPdf(null);
                setSuccess('');
              }}
              placeholder="e.g. Project Essay 1"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 dark:focus:border-purple-500 focus:outline-none font-semibold transition-all placeholder-slate-400 dark:placeholder-slate-500 shadow-sm"
            />
          </div>

          <div>
            <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
              <span>Body Font Size</span>
              <span className="text-purple-600 dark:text-purple-400">{fontSize}pt</span>
            </label>
            <input 
              type="range" 
              min="10" 
              max="24" 
              value={fontSize} 
              onChange={(e) => {
                setFontSize(Number(e.target.value));
                setGeneratedPdf(null);
                setSuccess('');
              }}
              className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600 dark:accent-purple-500"
            />
          </div>
        </div>

        {/* Text Area Body */}
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setGeneratedPdf(null);
              setSuccess('');
            }}
            placeholder="Type or paste the main text content for your PDF document here..."
            className="w-full h-72 lg:h-80 bg-purple-50/30 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800/50 text-slate-800 dark:text-slate-200 rounded-2xl p-6 focus:ring-4 focus:ring-purple-500/20 dark:focus:ring-purple-500/10 focus:border-purple-500 dark:focus:border-purple-600 focus:outline-none transition-all resize-y text-sm sm:text-base leading-relaxed shadow-sm placeholder-slate-400 dark:placeholder-slate-500"
          />
          <div className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur text-[10px] font-extrabold uppercase tracking-wide px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 shadow-sm transition-colors pointer-events-none">
            {text.length} Chars
          </div>
        </div>
      </div>

      {/* Results Section */}
      {generatedPdf && (
        <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-700 dark:text-slate-400 text-sm transition-colors">Generated PDF File:</span>
            <span className="font-bold text-slate-900 dark:text-white transition-colors">{generatedPdf.name}</span>
          </div>
          <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200 dark:border-slate-600 transition-colors">
            <span className="font-semibold text-slate-700 dark:text-slate-400 text-sm transition-colors">Final Size Output:</span>
            <span className="font-bold text-green-600 dark:text-green-400 transition-colors">{(generatedPdf.size / 1024).toFixed(1)} KB</span>
          </div>
        </div>
      )}

      {/* Actions Layer */}
      <div className="flex flex-col gap-4 transition-colors">
        <div className="flex gap-4 w-full">
          <button 
            onClick={handleGenerate}
            disabled={!text || loading}
            className={`flex-1 py-4 rounded-xl font-bold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2
              ${!text || loading 
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none text-slate-500 dark:text-slate-400' 
                : 'bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 hover:-translate-y-0.5 hover:shadow-lg'}`}
          >
            {loading ? 'Crunching Text Data...' : 'Generate PDF'}
          </button>

          {generatedPdf && (
            <button 
              onClick={downloadFile}
              className="flex-1 py-4 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              ↓ Download Securely
            </button>
          )}
        </div>
        
        {success && (
          <div className="text-center text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 py-3.5 px-4 rounded-xl border border-green-200 dark:border-green-800/50 mt-1">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
