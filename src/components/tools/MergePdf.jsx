import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [mergedPdf, setMergedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    const validFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    if (validFiles.length < selectedFiles.length) {
      setError('Some files were ignored because they are not valid PDF files.');
    } else {
      setError('');
    }

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      setSuccess('');
      setMergedPdf(null);
    }
    
    e.target.value = '';
  };

  const removeFile = (indexToRemove) => {
    setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    setMergedPdf(null);
    setSuccess('');
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('You need at least 2 PDF files to merge them.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const mergedDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedDoc.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedDoc.addPage(page));
      }

      const mergedPdfBytes = await mergedDoc.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const optimizedFile = new File([blob], 'merged_completed.pdf', { type: 'application/pdf' });
      
      setMergedPdf(optimizedFile);
      setSuccess('Your PDFs have been merged successfully! Your files are processed securely in your browser. No upload required.');
    } catch (err) {
      console.error(err);
      setError('Failed to merge PDFs. One of them may be password-protected or corrupted.');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!mergedPdf) return;
    const url = URL.createObjectURL(mergedPdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = `merged_${Math.floor(Date.now() / 1000)}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 p-8 mt-8 transition-colors duration-300">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex justify-between items-center transition-colors">
        Merge PDF Files
        <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 text-xs px-3 py-1 rounded-full uppercase tracking-wider font-bold transition-colors">
          {files.length} Added
        </span>
      </h3>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-800/50 transition-colors">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl mb-6 text-sm font-medium border border-green-100 dark:border-green-800/50 transition-colors">
          {success}
        </div>
      )}

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-orange-200 dark:border-orange-800 rounded-[1.5rem] p-10 text-center bg-orange-50/50 dark:bg-orange-900/20 hover:bg-orange-50 dark:hover:bg-orange-900/40 transition-colors relative mb-8">
        <input 
          type="file" 
          accept="application/pdf"
          multiple
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
        <div className="text-4xl mb-3">📑</div>
        <p className="text-slate-800 dark:text-slate-200 font-bold text-base mb-1 transition-colors">Click or drag multiple PDFs</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">Select multiple files at once.</p>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 max-h-64 overflow-y-auto transition-colors">
          <ul className="space-y-3">
            {files.map((f, i) => (
              <li key={i} className="flex justify-between items-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 px-4 py-3 rounded-xl shadow-sm transition-colors">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-md text-xs transition-colors">{i + 1}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm truncate max-w-[150px] sm:max-w-xs transition-colors">{f.name}</span>
                </div>
                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 transition-colors">{(f.size / 1024 / 1024).toFixed(2)} MB</span>
                  <button 
                    onClick={() => removeFile(i)} 
                    className="text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 p-1 bg-red-50 dark:bg-red-900/20 rounded-md transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 border-t border-gray-100 dark:border-slate-700 pt-6 transition-colors">
        <button 
          onClick={handleMerge}
          disabled={files.length < 2 || loading}
          className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2
            ${files.length < 2 || loading 
              ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none text-slate-500 dark:text-slate-400' 
              : 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 hover:-translate-y-0.5 hover:shadow-lg'}`}
        >
          {loading ? 'Merging...' : 'Merge PDFs'}
        </button>

        {mergedPdf && (
          <button 
            onClick={downloadFile}
            className="flex-1 py-3.5 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
          >
            ↓ Download 
          </button>
        )}
      </div>
    </div>
  );
}
