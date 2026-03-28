import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function ResizeSignature() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [compressedFile, setCompressedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid signature image (JPG, PNG).');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError('');
    setCompressedFile(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setError('');

    try {
      const options = {
        maxSizeMB: 0.02, // 20KB target
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };

      const result = await imageCompression(file, options);
      setCompressedFile(result);
    } catch (err) {
      setError('Failed to resize signature. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!compressedFile) return;
    const url = URL.createObjectURL(compressedFile);
    const link = document.createElement('a');
    link.href = url;
    link.download = `signature_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 p-8 mt-8 transition-colors duration-300">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 transition-colors">Resize Signature to 20KB</h3>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-800/50 transition-colors">
          {error}
        </div>
      )}

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-[1.5rem] p-10 text-center bg-blue-50/50 dark:bg-blue-900/20 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors relative mb-8">
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
        <div className="text-4xl mb-3">✍️</div>
        <p className="text-slate-800 dark:text-slate-200 font-bold text-base mb-1 transition-colors">Click or drag signature to upload</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">Max original size: 5MB</p>
        
        {file && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors">
            ✅ {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>

      {/* Preview Section */}
      {preview && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-100 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50 text-center transition-colors">
            <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide transition-colors">Original</h4>
            <img src={preview} alt="Original Signature" className="max-h-32 mx-auto border border-gray-200 dark:border-slate-600 shadow-sm" />
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-3 font-medium transition-colors">Size: {(file.size / 1024).toFixed(1)} KB</p>
          </div>
          
          <div className="border border-gray-100 dark:border-slate-700 rounded-2xl p-4 bg-blue-50 dark:bg-blue-900/20 text-center flex flex-col items-center justify-center transition-colors">
            <h4 className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-3 uppercase tracking-wide transition-colors">Result</h4>
            {compressedFile ? (
              <>
                <img src={URL.createObjectURL(compressedFile)} alt="Compressed" className="max-h-32 mx-auto border border-gray-200 dark:border-slate-600 shadow-md" />
                <p className="text-xs text-green-600 dark:text-green-400 mt-3 font-bold transition-colors">New Size: {(compressedFile.size / 1024).toFixed(1)} KB</p>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm font-medium transition-colors">
                {loading ? 'Processing...' : 'Ready to resize'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 border-t border-gray-100 dark:border-slate-700 pt-6 transition-colors">
        <div className="flex gap-4 w-full">
          <button 
            onClick={handleCompress}
            disabled={!file || loading}
            className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2
              ${!file || loading 
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none text-slate-500 dark:text-slate-400' 
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg'}`}
          >
            {loading ? 'Resizing...' : 'Resize Now'}
          </button>

          {compressedFile && (
            <button 
              onClick={downloadFile}
              className="flex-1 py-3.5 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              ↓ Download 
            </button>
          )}
        </div>
        
        {compressedFile && (
          <div className="text-center text-sm font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 py-3.5 px-4 rounded-xl border border-green-200 dark:border-green-800/50 mt-1">
            Your signature has been resized successfully! ✨ Your files are processed securely in your browser. No upload required.
          </div>
        )}
      </div>
    </div>
  );
}
