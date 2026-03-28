import { useState, useMemo } from 'react';

export default function SGPAToCGPA() {
  const [semesters, setSemesters] = useState([
    { id: 1, name: 'Semester 1', sgpa: '', credit: '' },
    { id: 2, name: 'Semester 2', sgpa: '', credit: '' },
  ]);
  
  const [multiplier, setMultiplier] = useState(9.5);
  const [resultCgpa, setResultCgpa] = useState(null);
  const [resultPercentage, setResultPercentage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-calculated live sum of credits
  const totalCreditsValue = useMemo(() => {
    return semesters.reduce((sum, sem) => sum + (Number(sem.credit) || 0), 0);
  }, [semesters]);

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters([...semesters, { id: Date.now(), name: `Semester ${nextNum}`, sgpa: '', credit: '' }]);
    setResultCgpa(null);
  };

  const removeSemester = (idToRemove) => {
    if (semesters.length <= 1) return;
    setSemesters(semesters.filter(s => s.id !== idToRemove));
    setResultCgpa(null);
  };

  const updateSemester = (id, field, value) => {
    setSemesters(semesters.map(s => s.id === id ? { ...s, [field]: value } : s));
    setResultCgpa(null);
  };

  const resetCalculator = () => {
    setSemesters([
      { id: 1, name: 'Semester 1', sgpa: '', credit: '' },
      { id: 2, name: 'Semester 2', sgpa: '', credit: '' },
    ]);
    setResultCgpa(null);
    setResultPercentage(null);
    setError('');
  };

  const calculate = () => {
    setError('');
    setResultCgpa(null);
    setResultPercentage(null);
    setLoading(true);

    // Minor delay to simulate calculation/loading state
    setTimeout(() => {
      let totalGradePoints = 0;
      let sumOfCredits = 0;
      
      for (const sem of semesters) {
        if (sem.sgpa === '' || isNaN(sem.sgpa) || sem.sgpa < 0 || sem.sgpa > 10) {
          setError('Please ensure all SGPA values are correctly entered between 0 and 10.');
          setLoading(false);
          return;
        }
        if (sem.credit === '' || isNaN(sem.credit) || sem.credit <= 0) {
          setError('Please enter valid credits (greater than 0) for all semesters.');
          setLoading(false);
          return;
        }
        
        const sgpa = Number(sem.sgpa);
        const credit = Number(sem.credit);
        
        totalGradePoints += (sgpa * credit);
        sumOfCredits += credit;
      }

      if (sumOfCredits === 0) {
        setError('Total credits cannot be zero.');
        setLoading(false);
        return;
      }

      const finalCgpa = (totalGradePoints / sumOfCredits).toFixed(2);
      setResultCgpa(finalCgpa);
      
      // Typical heuristic conversion using dynamic multiplier state
      setResultPercentage((finalCgpa * multiplier).toFixed(2));
      setLoading(false);
    }, 400);
  };

  return (
    <div className="animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors">SGPA to CGPA Converter</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 transition-colors">Formula: Σ (SGPA × Credits) / Σ (Credits)</p>
        </div>
        <button
          onClick={resetCalculator}
          className="font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 active:scale-95 border border-indigo-100 dark:border-indigo-900/50"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-800/50 transition-colors">
          ⚠️ {error}
        </div>
      )}

      {/* Percentage Multiplier Settings Toggle */}
      <div className="mb-6 max-w-sm">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Conversion Multiplier</label>
        <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
          <button
            onClick={() => { setMultiplier(9.5); setResultCgpa(null); }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all text-center ${
              multiplier === 9.5
                ? 'bg-white dark:bg-slate-700 shadow text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-indigo-500 dark:hover:text-indigo-400'
            }`}
          >
            × 9.5
          </button>
          <button
            onClick={() => { setMultiplier(10); setResultCgpa(null); }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-sm transition-all text-center ${
              multiplier === 10
                ? 'bg-white dark:bg-slate-700 shadow text-indigo-700 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-indigo-500 dark:hover:text-indigo-400'
            }`}
          >
            × 10.0
          </button>
        </div>
      </div>

      {/* Dynamic Semester Rows */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-4 px-6 border border-gray-100 dark:border-slate-700 mb-8 transition-colors">
        
        {/* Table Headers for Desktop */}
        <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_auto] gap-4 mb-3 px-2 text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center">
          <div className="text-left">Semester</div>
          <div>SGPA (0-10)</div>
          <div>Credits</div>
          <div className="w-10"></div>
        </div>

        <div className="space-y-4 sm:space-y-2">
          {semesters.map((sem, index) => (
            <div key={sem.id} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-center bg-white dark:bg-slate-800 p-4 sm:p-2 sm:bg-transparent sm:dark:bg-transparent rounded-xl border border-gray-100 dark:border-slate-700 sm:border-none transition-colors shadow-sm sm:shadow-none relative">
              
              {/* Semester Name Area */}
              <div className="w-full relative">
                <span className="sm:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Semester Name</span>
                <input
                  type="text"
                  placeholder="e.g. Sem 1"
                  value={sem.name}
                  onChange={(e) => updateSemester(sem.id, 'name', e.target.value)}
                  className="w-full bg-slate-50 sm:bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none font-semibold transition-all shadow-sm"
                />
              </div>

              {/* SGPA Area */}
              <div className="w-full relative">
                <span className="sm:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">SGPA (0-10)</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  placeholder="SGPA (0-10)"
                  value={sem.sgpa}
                  onChange={(e) => updateSemester(sem.id, 'sgpa', e.target.value)}
                  className="w-full bg-slate-50 sm:bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none font-semibold transition-all shadow-sm text-center sm:text-left"
                />
              </div>

              {/* Credits Area */}
              <div className="w-full relative">
                <span className="sm:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">Credits</span>
                <input
                  type="number"
                  min="1"
                  placeholder="Total Credits"
                  value={sem.credit}
                  onChange={(e) => updateSemester(sem.id, 'credit', e.target.value)}
                  className="w-full bg-slate-50 sm:bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none font-semibold transition-all shadow-sm text-center sm:text-left"
                />
              </div>

              {/* Remove Action */}
              <div className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0">
                <button
                  onClick={() => removeSemester(sem.id)}
                  disabled={semesters.length <= 1}
                  className={`p-2 sm:p-2.5 shrink-0 rounded-lg flex items-center justify-center transition-all ${
                     semesters.length <= 1 
                      ? 'bg-transparent text-slate-300 dark:text-slate-600 cursor-not-allowed opacity-50' 
                      : 'bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 hover:text-red-700 dark:hover:bg-red-900/40 border border-red-100 dark:border-red-900/50 shadow-sm'
                  }`}
                  aria-label="Remove Semester"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={addSemester}
            className="w-full sm:w-auto border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <span>➕</span> Add Semester
          </button>
          
          <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm px-4 py-2 rounded-lg flex items-center gap-3 w-full sm:w-auto transition-colors">
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Credits:</span>
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{totalCreditsValue}</span>
          </div>
        </div>
      </div>

      <button 
        onClick={calculate}
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 text-lg tracking-wide mb-8 shadow-md flex items-center justify-center gap-2 ${
          loading 
            ? 'bg-indigo-400 dark:bg-indigo-700 cursor-not-allowed shadow-none' 
            : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-0.5'
        }`}
      >
        {loading ? 'Crunching Numbers...' : 'Calculate Now'}
      </button>

      {/* Interactive Result Card */}
      {resultCgpa && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800 p-8 rounded-[1.5rem] shadow-sm transform transition-all duration-500 animate-[fadeIn_0.5s_ease-out]">
          <h3 className="text-center text-sm font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-widest mb-6">Final Assessment Result</h3>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Total CGPA</p>
              <div className="text-5xl md:text-6xl font-black text-indigo-600 dark:text-indigo-400 drop-shadow-sm">{resultCgpa}</div>
            </div>
            
            <div className="hidden md:block w-px h-16 bg-indigo-200 dark:bg-indigo-800"></div>
            
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Estimated Percentage</p>
              <div className="text-4xl md:text-5xl font-black text-purple-600 dark:text-purple-400 drop-shadow-sm">{resultPercentage}%</div>
            </div>
          </div>
          
          {/* Added Discalimer Requirement */}
          <p className="text-[11px] font-semibold text-center text-slate-400 dark:text-slate-500 mt-6 pt-4 border-t border-indigo-200/50 dark:border-indigo-800/50 transition-colors">
            ⚠️ Percentage is calculated using standard formula (CGPA × {multiplier}). Actual percentage mappings may vary depending exactly on your target university guidelines.
          </p>
        </div>
      )}
    </div>
  );
}
