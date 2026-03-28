import { useState, useRef } from 'react';

export default function ImageConverter() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [outputFormat, setOutputFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(90);
  
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);
  const [convertedSize, setConvertedSize] = useState(null);
  const [convertedExt, setConvertedExt] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const imageRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setError('');
    setSuccess('');
    setConvertedFileUrl(null);
    setConvertedSize(null);
  };

  const handleConvert = () => {
    if (!file || !imageRef.current) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Native HTML Canvas API for 100% frontend zero-upload conversion
    const canvas = document.createElement('canvas');
    const img = imageRef.current;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    
    // Fill background with white if converting PNG with transparency to JPG
    if (outputFormat === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.drawImage(img, 0, 0);

    try {
      // Use standard dataURL API to generate the requested format map
      const dataUrl = canvas.toDataURL(outputFormat, quality / 100);
      
      // Calculate exact byte size mathematically from Base64 string payload
      const base64Length = dataUrl.length - (dataUrl.indexOf(',') + 1);
      const padding = (dataUrl.charAt(dataUrl.length - 2) === '=') ? 2 : ((dataUrl.charAt(dataUrl.length - 1) === '=') ? 1 : 0);
      const sizeInBytes = (base64Length * 0.75) - padding;

      const extension = outputFormat.split('/')[1];

      setConvertedFileUrl(dataUrl);
      setConvertedSize(sizeInBytes);
      setConvertedExt(extension);
      setSuccess('Your image has been converted successfully! Your files are processed securely in your browser. No upload required.');
    } catch (err) {
      console.error(err);
      setError('Failed to convert image. The image might be too large or corrupted.');
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!convertedFileUrl) return;
    const link = document.createElement('a');
    link.href = convertedFileUrl;
    
    // Replace old extension with the newly converted extension logically
    const originalName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    link.download = `converted_${originalName}.${convertedExt}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 p-8 mt-8 transition-colors duration-300">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 transition-colors">Format Converter</h3>
      
      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-800/50 transition-colors">
          {error}
        </div>
      )}

      {/* Upload Zone */}
      <div className="border-2 border-dashed border-green-200 dark:border-green-800 rounded-[1.5rem] p-10 text-center bg-green-50/50 dark:bg-green-900/10 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors relative mb-8">
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
        />
        <div className="text-4xl mb-3">🔄</div>
        <p className="text-slate-800 dark:text-slate-200 font-bold text-base mb-1 transition-colors">Click or drag image to upload</p>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium transition-colors">Supports JPG, PNG, WEBP, GIF, etc.</p>
        
        {file && (
          <div className="mt-4 inline-flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors">
            ✅ {file.name} ({(file.size / 1024).toFixed(1)} KB)
          </div>
        )}
      </div>

      {preview && (
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Preview Panel */}
          <div className="border border-gray-100 dark:border-slate-700 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50 text-center transition-colors">
            <h4 className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wide transition-colors">Original Image</h4>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center p-2 min-h-[160px]">
              <img 
                ref={imageRef} 
                src={preview} 
                alt="Source preview" 
                className="max-h-48 object-contain drop-shadow-sm mix-blend-multiply dark:mix-blend-normal" 
                crossOrigin="anonymous" 
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium transition-colors">Original Size: {(file.size / 1024).toFixed(1)} KB</p>
          </div>
          
          {/* Controls Panel */}
          <div className="flex flex-col gap-5 justify-center">
            
            {/* Format Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">Select Target Format</label>
              <select 
                value={outputFormat} 
                onChange={(e) => {
                  setOutputFormat(e.target.value);
                  setConvertedFileUrl(null);
                  setSuccess('');
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-slate-800 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none font-semibold transition-colors transition-shadow cursor-pointer shadow-sm focus:shadow-md"
              >
                <option value="image/jpeg">JPG (.jpeg)</option>
                <option value="image/png">PNG (.png)</option>
                <option value="image/webp">WEBP (.webp)</option>
              </select>
            </div>

            {/* Quality Slider (Disabled for PNG because HTML logic natively ignores PNG quality scale) */}
            {outputFormat !== 'image/png' && (
              <div>
                <label className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">
                  <span>Compression Quality</span>
                  <span className="text-green-600 dark:text-green-400">{quality}%</span>
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => {
                    setQuality(Number(e.target.value));
                    setConvertedFileUrl(null);
                    setSuccess('');
                  }}
                  className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-600 dark:accent-green-500"
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium transition-colors">Higher quality means larger file size.</p>
              </div>
            )}

            {convertedFileUrl && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4 mt-2 transition-colors">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-green-800 dark:text-green-300 transition-colors">Final Size:</span>
                  <span className="text-sm font-extrabold text-green-600 dark:text-green-400 transition-colors">{(convertedSize / 1024).toFixed(1)} KB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-green-800 dark:text-green-300 transition-colors">Format:</span>
                  <span className="text-xs font-bold bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-0.5 rounded uppercase tracking-wider transition-colors">{convertedExt}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-4 border-t border-gray-100 dark:border-slate-700 pt-6 transition-colors">
        <div className="flex gap-4 w-full">
          <button 
            onClick={handleConvert}
            disabled={!file || loading}
            className={`flex-1 py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-md flex items-center justify-center gap-2
              ${!file || loading 
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed shadow-none text-slate-500 dark:text-slate-400' 
                : 'bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 hover:-translate-y-0.5 hover:shadow-lg'}`}
          >
            {loading ? 'Converting...' : 'Convert Image'}
          </button>

          {convertedFileUrl && (
            <button 
              onClick={downloadFile}
              className="flex-1 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
            >
              ↓ Download 
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
