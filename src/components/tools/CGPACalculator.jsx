import { useState } from 'react';
import SGPAToCGPA from './SGPAToCGPA';

export default function CGPACalculator() {
  const [calcMode, setCalcMode] = useState('cgpa'); // 'cgpa' or 'sgpa'
  const [system, setSystem] = useState('mumbai'); 
  const [multiplier, setMultiplier] = useState(9.5); // Natively support 9.5 array vs 10 multiple calculations
  const [subjects, setSubjects] = useState([
    { id: 1, mark: '', credit: 3 }, // Default to theory
    { id: 2, mark: '', credit: 3 },
    { id: 3, mark: '', credit: 3 },
    { id: 4, mark: '', credit: 1 }, // Default to practical
    { id: 5, mark: '', credit: 1 },
  ]);
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), mark: '', credit: 3 }]);
    setResult(null);
  };

  const removeSubject = (idToRemove) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter(s => s.id !== idToRemove));
    setResult(null);
  };

  const updateMark = (id, value) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, mark: value } : s));
    setResult(null);
  };

  const updateCredit = (id, value) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, credit: value } : s));
    setResult(null);
  };

  const resetCalculator = () => {
    setSubjects([
      { id: 1, mark: '', credit: 3 },
      { id: 2, mark: '', credit: 3 },
      { id: 3, mark: '', credit: 3 },
      { id: 4, mark: '', credit: 1 },
      { id: 5, mark: '', credit: 1 },
    ]);
    setResult(null);
    setError('');
  };

  // Official Mumbai University Grade Logic with Theory vs Practical detection
  const getGradeAndPoint = (markValue, creditValue) => {
    if (markValue === '' || isNaN(markValue)) return { grade: '-', point: 0 };
    
    const mark = Number(markValue);
    const credit = Number(creditValue) || 1;
    
    // Convert to percentage based on subject type classification
    let percentage = mark;
    if (credit === 1) {
      // Practical subject (Out of 50)
      percentage = (mark / 50) * 100;
    }

    if (percentage >= 80) return { grade: 'O', point: 10 };
    if (percentage >= 70) return { grade: 'A+', point: 9 };
    if (percentage >= 60) return { grade: 'A', point: 8 };
    if (percentage >= 55) return { grade: 'B+', point: 7 };
    if (percentage >= 50) return { grade: 'B', point: 6 };
    if (percentage >= 45) return { grade: 'C', point: 5 };
    if (percentage >= 40) return { grade: 'D', point: 4 };
    return { grade: 'F', point: 0 };
  };

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'O': return 'text-green-600 dark:text-green-400 font-black';
      case 'A+': return 'text-emerald-600 dark:text-emerald-400 font-bold';
      case 'A': return 'text-teal-600 dark:text-teal-400 font-bold';
      case 'B+': return 'text-blue-600 dark:text-blue-400 font-bold';
      case 'B': return 'text-indigo-600 dark:text-indigo-400 font-bold';
      case 'C': return 'text-violet-600 dark:text-violet-400 font-bold';
      case 'D': return 'text-orange-500 font-bold';
      case 'F': return 'text-red-600 dark:text-red-500 font-black';
      default: return 'text-slate-500 dark:text-slate-400';
    }
  };

  const calculate = () => {
    setError('');
    setResult(null);

    let totalPoints = 0; // Σ(gradePoint × credits)
    let totalCredits = 0; // Σ(credits)
    let totalMarks = 0; // Used for percentage system natively
    let maxPossibleMarks = 0; 
    
    for (const sub of subjects) {
      const credit = Number(sub.credit) || 1;
      const maxMarks = credit === 1 ? 50 : 100;

      if (sub.mark === '' || isNaN(sub.mark) || sub.mark < 0 || sub.mark > maxMarks) {
        setError(`Ensure marks are valid. Theory (credits ≥ 2) is out of 100. Practical (1 credit) is out of 50.`);
        return;
      }
      
      const mark = Number(sub.mark);
      
      if (system === 'mumbai') {
        const { point } = getGradeAndPoint(mark, credit);
        totalPoints += (point * credit);
      } else {
        totalMarks += mark;
        maxPossibleMarks += maxMarks;
      }
      totalCredits += credit;
    }

    if (system === 'mumbai') {
      const cgpa = totalPoints / totalCredits;
      setResult({
        totalCreditPoints: totalPoints,
        totalCredits: totalCredits,
        cgpa: cgpa.toFixed(2),
        percentage: (cgpa * multiplier).toFixed(2)
      });
    } else {
      const finalPercentage = (totalMarks / maxPossibleMarks) * 100;
      setResult({
        totalCreditPoints: '-',
        totalCredits: '-',
        cgpa: (finalPercentage / 9.5).toFixed(2), // Natively assume 9.5 scale back calculation
        percentage: finalPercentage.toFixed(2)
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-sm border border-gray-100 dark:border-slate-700 p-8 mt-8 transition-colors duration-300">
      
      {/* Dynamic Toggle Mode Switcher */}
      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setCalcMode(calcMode === 'cgpa' ? 'sgpa' : 'cgpa')}
          className="group flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          {calcMode === 'cgpa' ? (
            <>
              Calculate total CGPA using multiple Semesters? <span className="group-hover:translate-x-1 transition-transform">→</span>
            </>
          ) : (
            <>
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Subject Marks Calculator
            </>
          )}
        </button>
      </div>

      {calcMode === 'sgpa' ? (
        <SGPAToCGPA />
      ) : (
        <div className="animate-[fadeIn_0.5s_ease-out]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white transition-colors">CGPA Calculator</h3>
            <button
              onClick={resetCalculator}
              className="font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-95 border border-red-100 dark:border-red-900/50"
            >
              Reset Fields
            </button>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 dark:border-red-800/50 transition-colors">
              ⚠️ {error}
            </div>
          )}

          {/* Settings Grid */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Grading System Selector */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Select Grading System</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => { setSystem('mumbai'); setResult(null); }}
                  className={`p-4 rounded-xl font-bold text-sm transition-all shadow-sm border ${
                    system === 'mumbai'
                      ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Mumbai University (10-Pt)
                </button>
                <button
                  onClick={() => { setSystem('percentage'); setResult(null); }}
                  className={`p-4 rounded-xl font-bold text-sm transition-all shadow-sm border ${
                    system === 'percentage'
                      ? 'bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  Standard Percentage System
                </button>
              </div>
            </div>

            {/* Percentage Multiplier Selector (Mumbai Mode Only) */}
            {system === 'mumbai' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 transition-colors">Percentage Conversion Multiplier</label>
                <div className="flex bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => { setMultiplier(9.5); setResult(null); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all text-center ${
                      multiplier === 9.5
                        ? 'bg-white dark:bg-slate-700 shadow text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-indigo-500 dark:hover:text-indigo-400'
                    }`}
                  >
                    × 9.5 (Standard)
                  </button>
                  <button
                    onClick={() => { setMultiplier(10); setResult(null); }}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-sm transition-all text-center ${
                      multiplier === 10
                        ? 'bg-white dark:bg-slate-700 shadow text-indigo-700 dark:text-indigo-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50 hover:text-indigo-500 dark:hover:text-indigo-400'
                    }`}
                  >
                    × 10.0
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Subject Inputs Table/Grid */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl py-4 px-6 border border-gray-100 dark:border-slate-700 mb-8 transition-colors">
            
            {/* Headers for Desktop view */}
            <div className="hidden sm:grid grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-4 mb-3 px-2 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-center items-center">
              <div className="text-left w-20">Type</div>
              <div className="text-left">Marks</div>
              {system === 'mumbai' && (
                <>
                  <div>Credits</div>
                  <div>Grade / Point</div>
                  <div>Credit Pts</div>
                </>
              )}
              <div className="w-10"></div>
            </div>

            <div className="space-y-4 sm:space-y-2">
              {subjects.map((sub, index) => {
                const creditNum = Number(sub.credit) || 1;
                const isPractical = creditNum === 1;
                const { grade, point } = system === 'mumbai' ? getGradeAndPoint(sub.mark, sub.credit) : { grade: '-', point: 0 };
                const creditPoints = system === 'mumbai' && sub.mark !== '' && !isNaN(sub.mark) 
                  ? point * creditNum 
                  : '-';

                return (
                  <div key={sub.id} className="grid grid-cols-1 sm:grid-cols-[auto_1fr_1fr_1fr_1fr_auto] gap-3 items-center bg-white dark:bg-slate-800 p-4 sm:p-2 sm:bg-transparent sm:dark:bg-transparent rounded-xl border border-gray-100 dark:border-slate-700 sm:border-none transition-colors shadow-sm sm:shadow-none relative">
                    
                    {/* Dynamic Concept Badge */}
                    <div className="hidden sm:flex text-slate-400 dark:text-slate-500 font-bold text-[10px] w-20 pl-1 uppercase tracking-widest items-center">
                      <span className={`px-2 py-1 rounded-md text-center w-full shadow-sm border ${
                        isPractical 
                          ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50' 
                          : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50'
                      }`}>
                        {isPractical ? 'Practical' : 'Theory'}
                      </span>
                    </div>

                    <div className="w-full relative">
                      <div className="sm:hidden flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Subject #{index + 1}</span>
                         <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            isPractical 
                              ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50' 
                              : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50'
                          }`}>
                            {isPractical ? 'Practical' : 'Theory'}
                         </span>
                      </div>
                      
                      <input
                        type="number"
                        placeholder={isPractical ? "Marks (out of 50)" : "Marks (out of 100)"}
                        value={sub.mark}
                        onChange={(e) => updateMark(sub.id, e.target.value)}
                        className={`w-full bg-slate-50 sm:bg-white dark:bg-slate-900 border text-slate-800 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:outline-none font-semibold transition-all shadow-sm ${
                          isPractical 
                            ? 'border-green-200 focus:ring-green-500/30 focus:border-green-500 dark:border-slate-600 dark:focus:border-green-500' 
                            : 'border-blue-200 focus:ring-blue-500/30 focus:border-blue-500 dark:border-slate-600 dark:focus:border-blue-500'
                        }`}
                      />
                    </div>

                    {system === 'mumbai' && (
                      <>
                        <div className="w-full relative">
                          <span className="sm:hidden text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block mt-2">Credits (1 = Practical)</span>
                          <input
                            type="number"
                            min="1"
                            placeholder="Credits"
                            value={sub.credit}
                            onChange={(e) => updateCredit(sub.id, e.target.value)}
                            className="w-full bg-slate-50 sm:bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-600 text-slate-800 dark:text-white rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-none font-semibold transition-all shadow-sm text-center"
                          />
                        </div>

                        {/* Live Grades / Points */}
                        <div className="flex justify-between sm:justify-center items-center py-2 sm:py-0 border-t sm:border-t-0 border-gray-100 dark:border-slate-700 mt-2 sm:mt-0">
                          <span className="sm:hidden text-xs font-bold text-slate-400 uppercase tracking-wider">Grade (Pt)</span>
                          <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700/50 text-sm flex items-center gap-2">
                            <span className={getGradeColor(grade)}>{grade}</span>
                            <span className="text-slate-300 dark:text-slate-600">|</span>
                            <span className="text-slate-600 dark:text-slate-300 font-semibold">{point}</span>
                          </div>
                        </div>

                        {/* Credit Points */}
                        <div className="flex justify-between sm:justify-center items-center py-1 sm:py-0">
                          <span className="sm:hidden text-xs font-bold text-slate-400 uppercase tracking-wider">Credit Pts</span>
                          <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{creditPoints}</span>
                        </div>
                      </>
                    )}

                    <div className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0">
                      <button
                        onClick={() => removeSubject(sub.id)}
                        disabled={subjects.length <= 1}
                        className={`p-2 shrink-0 rounded-lg flex items-center justify-center transition-all border
                          ${subjects.length <= 1 
                            ? 'bg-transparent text-slate-300 dark:text-slate-600 border-transparent cursor-not-allowed opacity-50' 
                            : 'bg-white dark:bg-slate-800 text-red-400 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 border-gray-200 dark:border-slate-700 shadow-sm'}`}
                        aria-label="Remove subject"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={addSubject}
              className="mt-6 w-full sm:w-auto border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10 font-bold px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>➕</span> Add New Subject
            </button>
          </div>

          <button 
            onClick={calculate}
            className="w-full py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-lg tracking-wide mb-8"
          >
            Calculate CGPA
          </button>

          {result && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-100 dark:border-indigo-800 p-8 rounded-[1.5rem] shadow-sm transform transition-all duration-500 animate-[fadeIn_0.5s_ease-out]">
              <h3 className="text-center text-sm font-bold text-indigo-800 dark:text-indigo-300 uppercase tracking-widest mb-6">Final Assessment Result</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">Total CGPA</p>
                  <div className="text-5xl md:text-6xl font-black text-indigo-600 dark:text-indigo-400 drop-shadow-sm">{result.cgpa}</div>
                </div>
                
                <div className="hidden md:block w-px h-20 bg-indigo-200 dark:bg-indigo-800"></div>
                
                <div className="flex flex-col gap-4 text-center md:text-left">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5">Estimated Percentage</p>
                    <div className="text-2xl font-black text-purple-600 dark:text-purple-400 drop-shadow-sm">{result.percentage}%</div>
                  </div>
                  
                  {system === 'mumbai' && (
                    <div className="flex gap-4 border-t border-indigo-200/50 dark:border-indigo-800/50 pt-3 flex-wrap justify-center md:justify-start">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Credit Pts</p>
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{result.totalCreditPoints}</p>
                      </div>
                      <div className="w-px h-full bg-indigo-200/50 dark:bg-indigo-800/50"></div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total Credits</p>
                        <p className="text-lg font-bold text-slate-700 dark:text-slate-300">{result.totalCredits}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Added Discalimer Requirement */}
              <p className="text-[11px] font-semibold text-center text-slate-400 dark:text-slate-500 mt-6 pt-4 border-t border-indigo-200/50 dark:border-indigo-800/50 transition-colors">
                ⚠️ Percentage is calculated using standard formula (CGPA × {multiplier}). Actual percentage mappings may vary depending exactly on your target university guidelines.
              </p>
            </div>
          )}
          
          {system === 'mumbai' && (
            <div className="mt-8 border-t border-gray-100 dark:border-slate-700 pt-8 transition-colors">
              <h4 className="text-sm font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-4 transition-colors">Official Mumbai University Grading System</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>≥ 80</span> <strong className="text-green-600 dark:text-green-400 text-sm">O (10)</strong></div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>70 - 79.99</span> <strong className="text-emerald-600 dark:text-emerald-400 text-sm">A+ (9)</strong></div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>60 - 69.99</span> <strong className="text-teal-600 dark:text-teal-400 text-sm">A (8)</strong></div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>55 - 59.99</span> <strong className="text-blue-600 dark:text-blue-400 text-sm">B+ (7)</strong></div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>50 - 54.99</span> <strong className="text-indigo-600 dark:text-indigo-400 text-sm">B (6)</strong></div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>45 - 49.99</span> <strong className="text-violet-600 dark:text-violet-400 text-sm">C (5)</strong></div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>40 - 44.99</span> <strong className="text-orange-500 text-sm">D (4)</strong></div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/80 flex justify-between items-center transition-colors"><span>&lt; 40</span> <strong className="text-red-500 text-sm">F (0)</strong></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
