import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [compressedPdf, setCompressedPdf] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [warning, setWarning] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    setFile(selectedFile);
    setError('');
    setSuccess('');
    setWarning('');
    setCompressedPdf(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setSuccess('');
    setWarning('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      
      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const optimizedFile = new File([blob], file.name, { type: 'application/pdf' });
      
      setCompressedPdf(optimizedFile);
      
      if (optimizedFile.size >= file.size) {
        setWarning('Basic optimization applied (no significant size reduction).');
      } else {
        setSuccess('Your PDF has been compressed successfully! Your files are processed securely in your browser. No upload required.');
      }
    } catch {
      setError('Failed to compress this PDF. It may be password-protected or corrupted.');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!compressedPdf) return;
    const url = URL.createObjectURL(compressedPdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = `compressed_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 p-8 mt-8 transition-colors duration-300">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 transition-colors">Basic PDF Optimizer (Frontend)</h3>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-800/50 transition-colors">
          {error}
        </div>
      )}

      {warning && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-500 p-4 rounded-xl mb-6 text-sm font-medium border border-yellow-200 dark:border-yellow-800/50 transition-colors">
          ⚠️ {warning}
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl mb-6 text-sm font-medium border border-green-100 dark:border-green-800/50 transition-colors">
          {success}
        </div>
      )}

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-red-200 dark:border-red-800 rounded-[1.5rem] p-10 text-center bg-red-50/50 dark:bg-red-900/20 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors relative mb-6">
        <input 
          type="file" 
          accept="application/pdf"
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
        <div className="text-4xl mb-3">📄</div>
        <p className="text-slate-800 dark:text-slate-200 font-bold text-base mb-1 transition-colors">Click or drag PDF to upload</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">Max original size: 20MB</p>
        
        {file && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors">
            ✅ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </div>
        )}
      </div>

      {/* Helper Note */}
      <div className="mb-8 text-center px-4">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Note: For heavy compression, server-side processing is required. Try our <a href="/tools/resize-image-50kb" className="text-blue-500 hover:underline">image compression tools</a> for better results if your PDF involves photos.
        </p>
      </div>

      {/* Results Section */}
      {file && (
        <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold text-slate-700 dark:text-slate-400 text-sm transition-colors">Original Size:</span>
            <span className="font-bold text-slate-900 dark:text-white transition-colors">{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-600 transition-colors">
            <span className="font-semibold text-slate-700 dark:text-slate-400 text-sm transition-colors">Output Size:</span>
            {compressedPdf ? (
              <span className={`font-bold transition-colors ${compressedPdf.size >= file.size ? 'text-yellow-600 dark:text-yellow-500' : 'text-green-600 dark:text-green-400'}`}>
                {(compressedPdf.size / 1024).toFixed(1)} KB
              </span>
            ) : (
              <span className="text-slate-400 dark:text-slate-500 italic text-sm transition-colors">Pending...</span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 border-t border-gray-100 dark:border-slate-700 pt-6 transition-colors">
        <button 
          onClick={handleCompress}
          disabled={!file || loading}
          className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2
            ${!file || loading 
              ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none text-slate-500 dark:text-slate-400' 
              : 'bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 hover:-translate-y-0.5 hover:shadow-lg'}`}
        >
          {loading ? 'Processing...' : 'Optimize PDF'}
        </button>

        {compressedPdf && (
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
