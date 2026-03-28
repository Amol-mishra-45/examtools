import { useState, useRef } from 'react';

export default function BackgroundRemover() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [originalSize, setOriginalSize] = useState(0);
  const [userApiKey, setUserApiKey] = useState('');
  const fileInputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFile = (selectedFile) => {
    setError('');
    // Check if it's an image
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG).');
      return;
    }
    // Size limit check (Remove.bg limit is usually 12 MB for free accounts but let's set 5MB to be safe for a web tool)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please upload a smaller image.');
      return;
    }

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setResult(null); // Reset previous result

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const removeBackground = async () => {
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      const apiKey = userApiKey.trim() || import.meta.env.VITE_REMOVE_BG_API_KEY;
      
      if (!apiKey) {
        throw new Error("Missing API Key! Please securely paste your free Remove.bg API key into the new input field below to continue.");
      }

      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('size', 'auto');

      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-Api-Key': apiKey,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.errors?.[0]?.title || 'Failed to remove background. Ensure API key is valid.');
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setResult(objectUrl);
    } catch (err) {
      console.error("Background Removal Error:", err);
      setError(err.message || 'An unexpected error occurred during processing.');
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadResult = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result;
    link.download = `removed_bg_${file?.name || 'image.png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full mt-8 fade-in">
      <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl rounded-[2rem] p-6 md:p-10 shadow-lg border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
        
        {/* Upload Area */}
        {!preview && (
          <div 
            className="border-2 border-dashed border-pink-300 dark:border-pink-800 bg-pink-50/50 dark:bg-pink-900/10 rounded-[1.5rem] p-12 text-center cursor-pointer hover:bg-pink-100/50 dark:hover:bg-pink-900/20 transition-all group"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
            <div className="text-5xl mb-4 group-hover:-translate-y-1 transition-transform">🎨</div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Drag & Drop Image</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-6">or click to browse from your device (Max: 5MB)</p>
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg">
              Select Image
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 rounded-r-xl font-medium flex items-center gap-3">
             <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
             {error}
          </div>
        )}

        {/* Workspace */}
        {preview && (
          <div className="mt-8 space-y-8 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col md:flex-row gap-6 items-stretch justify-center">
              
              {/* Original Image */}
              <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 text-center">Original Image ({formatSize(originalSize)})</p>
                <div 
                   className="aspect-square md:aspect-auto md:h-64 w-full relative flex items-center justify-center bg-slate-200 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-300/50 dark:border-slate-700/50"
                   style={{
                     backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)',
                     backgroundSize: '20px 20px',
                     backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px'
                   }}
                >
                  <img src={preview} alt="Original" className="max-w-full max-h-full object-contain relative z-10" />
                  <div className="absolute inset-0 bg-white dark:bg-slate-800 opacity-90 z-0 text-transparent">bg</div>
                </div>
              </div>

              {/* Arrow or Spinner */}
              <div className="flex items-center justify-center shrink-0">
                {loading ? (
                   <div className="w-12 h-12 rounded-full border-4 border-pink-100 dark:border-pink-900/30 border-t-pink-600 animate-spin"></div>
                ) : (
                   <div className="hidden md:flex w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-400 dark:text-slate-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </div>
                )}
              </div>

              {/* Result Image */}
              <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3 text-center">{result ? 'Transparent PNG' : 'Ready to Process'}</p>
                <div 
                   className="aspect-square md:aspect-auto md:h-64 w-full relative flex items-center justify-center bg-slate-200 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-300/50 dark:border-slate-700/50"
                   style={{
                     backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(135deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(135deg, transparent 75%, #ccc 75%)',
                     backgroundSize: '20px 20px',
                     backgroundPosition: '0 0, 10px 0, 10px -10px, 0px 10px',
                     boxShadow: 'inset 0 0 20px rgba(0,0,0,0.05)'
                   }}
                >
                  {result ? (
                    <img src={result} alt="Result" className="max-w-full max-h-full object-contain relative z-10" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-white dark:bg-slate-800 opacity-90 z-0 text-transparent">bg</div>
                      <div className="text-slate-400 flex flex-col items-center relative z-10">
                        <svg className="w-12 h-12 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="text-xs font-medium uppercase tracking-wider">Empty Canvas</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-4 pt-4">
            
              {!import.meta.env.VITE_REMOVE_BG_API_KEY && !result && (
                <div className="w-full max-w-sm mb-2 opacity-95 hover:opacity-100 transition-opacity animate-in slide-in-from-bottom-2 fade-in">
                  <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wider text-center">Bring Your Own API Key</label>
                  <input
                    type="password"
                    value={userApiKey}
                    onChange={(e) => setUserApiKey(e.target.value)}
                    placeholder="Paste Remove.bg API key..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all font-mono text-sm text-center shadow-sm"
                  />
                  <p className="text-[11px] text-slate-400 mt-2 text-center font-medium">Get 50 free removals/month at <a href="https://www.remove.bg/api" target="_blank" rel="noreferrer" className="text-pink-500 font-semibold hover:underline">remove.bg</a>.</p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button 
                  onClick={() => {
                    setPreview(null);
                    setResult(null);
                    setFile(null);
                    setError('');
                  }}
                  disabled={loading}
                  className="px-6 py-3 rounded-xl font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  Start Over
                </button>

                {!result ? (
                  <button 
                    onClick={removeBackground}
                    disabled={loading}
                    className="px-8 py-3 rounded-xl font-bold text-white bg-pink-600 hover:bg-pink-700 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? 'Processing AI...' : '✨ Remove Background'}
                  </button>
                ) : (
                  <button 
                    onClick={downloadResult}
                    className="px-8 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download PNG
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
