import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, FlaskConical, Atom, BookOpen, RefreshCw, Beaker } from 'lucide-react';
import { MoleculeScene } from './components/MoleculeScene';
import { MOLECULE_DATABASE, ELEMENT_PROPERTIES } from './constants';
import { explainMolecule, explainReaction } from './services/geminiService';
import { IMolecule, MoleculeCategory, IAtom, AtomType } from './types';
import Markdown from 'react-markdown';

export default function App() {
  const [activeTab, setActiveTab] = useState<'library' | 'lab'>('library');
  
  // Library State
  const [selectedMolecule, setSelectedMolecule] = useState<IMolecule>(MOLECULE_DATABASE[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MoleculeCategory | 'All'>('All');
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  
  // Lab/Reaction State
  const [currentAtoms, setCurrentAtoms] = useState<IAtom[]>(selectedMolecule.atoms);
  const [selectedReactant, setSelectedReactant] = useState<AtomType.Cl | AtomType.Br | null>(null);
  
  // AI State
  const [aiInfo, setAiInfo] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  // When selected molecule changes, reset the lab state
  useEffect(() => {
    setCurrentAtoms(selectedMolecule.atoms);
    setSelectedReactant(null);
    
    // Fetch initial molecule info
    let isMounted = true;
    const fetchInfo = async () => {
      setLoadingAi(true);
      setAiInfo('');
      const info = await explainMolecule(selectedMolecule.name, selectedMolecule.formula, selectedMolecule.category);
      if (isMounted) {
        setAiInfo(info);
        setLoadingAi(false);
      }
    };
    fetchInfo();
    return () => { isMounted = false; };
  }, [selectedMolecule]);

  // Handle Reaction Click (Substitution)
  const handleAtomClick = async (atomId: string, atomType: AtomType) => {
    if (activeTab !== 'lab' || !selectedReactant) return;
    
    if (atomType !== AtomType.H) {
      // Only Hydrogens can be substituted in this basic simulation
      alert("Chỉ có thể thay thế nguyên tử Hydro trong phản ứng này!");
      return;
    }

    // 1. Perform substitution visual update
    const newAtoms = currentAtoms.map(atom => 
      atom.id === atomId ? { ...atom, type: selectedReactant } : atom
    );
    setCurrentAtoms(newAtoms);

    // 2. Calculate precise formula for AI (Hill system: C, H, then alphabetical)
    const counts = newAtoms.reduce((acc, atom) => {
      acc[atom.type] = (acc[atom.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const getCountStr = (count: number) => count > 1 ? count.toString() : '';
    
    let formula = '';
    // Carbon
    if (counts[AtomType.C]) formula += `C${getCountStr(counts[AtomType.C])}`;
    // Hydrogen
    if (counts[AtomType.H]) formula += `H${getCountStr(counts[AtomType.H])}`;
    
    // Others (Br, Cl, etc) - Sort alphabetically
    Object.keys(counts)
      .filter(t => t !== AtomType.C && t !== AtomType.H)
      .sort()
      .forEach(type => {
        formula += `${type}${getCountStr(counts[type])}`;
      });

    // 3. Trigger AI explanation for the product
    setLoadingAi(true);
    const reactantName = ELEMENT_PROPERTIES[selectedReactant].name;
    
    const explanation = await explainReaction(
      selectedMolecule.name, 
      reactantName, 
      formula
    );
    setAiInfo(explanation);
    setLoadingAi(false);
  };

  const handleResetLab = () => {
    setCurrentAtoms(selectedMolecule.atoms);
    setSelectedReactant(null);
    setAiInfo("Đã làm mới mô hình. Hãy chọn chất phản ứng để bắt đầu.");
  };

  // Filter Logic
  const filteredMolecules = useMemo(() => {
    return MOLECULE_DATABASE.filter(mol => {
      const matchCategory = selectedCategory === 'All' || mol.category === selectedCategory;
      const query = searchQuery.toLowerCase();
      const matchSearch = mol.name.toLowerCase().includes(query) || mol.formula.toLowerCase().includes(query);
      return matchCategory && matchSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* LEFT PANEL: 3D VIEWER */}
      <div className="flex-1 relative border-b md:border-b-0 md:border-r border-slate-800 flex flex-col min-h-0 order-1">
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 p-4 md:p-6 z-10 w-full pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-600/20 flex items-center justify-center border border-blue-500/50 backdrop-blur">
              <FlaskConical className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
               <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md">{selectedMolecule.name}</h1>
               <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm drop-shadow-md">
                 <span className="font-mono bg-slate-800/80 px-1.5 py-0.5 rounded text-blue-300 border border-slate-700">{selectedMolecule.formula}</span>
                 <span>•</span>
                 <span>{selectedMolecule.category}</span>
               </div>
            </div>
          </div>
        </div>

        {/* 3D Scene */}
        <div className="flex-1 h-full relative">
          <MoleculeScene 
            atoms={currentAtoms} 
            onAtomClick={handleAtomClick}
            canInteract={activeTab === 'lab' && !!selectedReactant}
          />
        </div>

        {/* Bottom AI Info Panel */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:w-[500px] bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-xl p-4 md:p-5 shadow-2xl animate-fade-in-up z-10 max-h-[30%] md:max-h-none flex flex-col">
           <div className="flex items-center gap-2 mb-2 text-emerald-400 font-medium text-xs md:text-sm uppercase tracking-wide shrink-0">
             <BookOpen className="w-4 h-4" />
             <span>{activeTab === 'lab' ? 'Phân Tích Phản Ứng (AI)' : 'Hồ Sơ Hợp Chất (AI)'}</span>
           </div>
           <div className="prose prose-invert prose-sm overflow-y-auto custom-scrollbar md:max-h-[150px]">
             {loadingAi ? (
               <div className="space-y-2 animate-pulse mt-2">
                 <div className="h-2 bg-slate-700 rounded w-full"></div>
                 <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                 <div className="h-2 bg-slate-700 rounded w-4/6"></div>
               </div>
             ) : (
               <Markdown>{aiInfo}</Markdown>
             )}
           </div>
        </div>
      </div>

      {/* RIGHT PANEL: CONTROLS */}
      <div className="w-full md:w-[400px] h-[45vh] md:h-auto flex flex-col shadow-2xl z-20 bg-slate-900 border-t border-slate-800 md:border-t-0 order-2">
        
        {/* Tab Switcher */}
        <div className="flex border-b border-slate-800 shrink-0">
          <button 
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-3 md:py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'library' 
              ? 'border-blue-500 text-blue-400 bg-slate-800/50' 
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Thư Viện
          </button>
          <button 
             onClick={() => setActiveTab('lab')}
             className={`flex-1 py-3 md:py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'lab' 
              ? 'border-emerald-500 text-emerald-400 bg-emerald-900/10' 
              : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Thí Nghiệm
          </button>
        </div>

        {/* TAB CONTENT: LIBRARY */}
        {activeTab === 'library' && (
          <>
            <div className="p-3 md:p-5 border-b border-slate-800 bg-slate-900/50 shrink-0">
              <div className="flex gap-2 relative">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 placeholder:text-slate-600"
                  />
                </div>
                
                <button 
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className={`p-2 rounded-lg border transition-colors ${
                    selectedCategory !== 'All' 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400' 
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                </button>

                {showCategoryMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="p-2 space-y-1">
                      {['All', 'Alkane', 'Alkene', 'Alkyne'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat as any);
                            setShowCategoryMenu(false);
                          }}
                          className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedCategory === cat 
                            ? 'bg-blue-600 text-white' 
                            : 'text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {cat === 'All' ? 'Tất cả' : cat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3 md:p-4 custom-scrollbar">
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {filteredMolecules.map((mol) => (
                  <button
                    key={mol.id}
                    onClick={() => {
                      setSelectedMolecule(mol);
                      setActiveTab('library'); // Optional: Stay in library or auto-switch
                    }}
                    className={`relative group p-3 rounded-xl border text-left transition-all duration-200 ${
                      selectedMolecule.id === mol.id
                      ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                          mol.category === 'Alkane' ? 'bg-emerald-900/30 border-emerald-800 text-emerald-500' :
                          mol.category === 'Alkene' ? 'bg-amber-900/30 border-amber-800 text-amber-500' :
                          'bg-rose-900/30 border-rose-800 text-rose-500'
                      }`}>
                        {mol.category}
                      </span>
                    </div>
                    <div className="font-mono text-lg md:text-xl font-bold text-white tracking-tight mb-1">{mol.formula}</div>
                    <div className="text-xs text-slate-400 font-medium truncate group-hover:text-blue-300 transition-colors">{mol.name}</div>
                    {selectedMolecule.id === mol.id && (
                      <div className="absolute top-3 right-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB CONTENT: LAB */}
        {activeTab === 'lab' && (
          <div className="flex-1 flex flex-col p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto">
             <div>
               <h2 className="text-base md:text-lg font-semibold text-emerald-400 flex items-center gap-2 mb-1">
                 <Beaker className="w-5 h-5" />
                 Phản Ứng Thế (1:1)
               </h2>
               <p className="text-xs text-slate-400">Chọn chất phản ứng và nhấp vào nguyên tử H để thay thế.</p>
             </div>

             <div className="space-y-2 md:space-y-3">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chất Phản Ứng</label>
               <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedReactant(AtomType.Cl)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-xl border transition-all ${
                    selectedReactant === AtomType.Cl 
                      ? 'bg-emerald-900/40 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#22c55e] shadow-lg"></div>
                  {/* Fixed Markdown Label: using unicode subscripts */}
                  <span className="font-medium text-sm md:text-base">Clo (Cl₂)</span>
                </button>
                
                <button
                  onClick={() => setSelectedReactant(AtomType.Br)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-xl border transition-all ${
                    selectedReactant === AtomType.Br
                      ? 'bg-red-900/40 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#991b1b] shadow-lg"></div>
                  {/* Fixed Markdown Label: using unicode subscripts */}
                  <span className="font-medium text-sm md:text-base">Brom (Br₂)</span>
                </button>
               </div>
             </div>

             <div className="bg-slate-800/50 rounded-lg p-3 md:p-4 border border-slate-700/50">
               <h3 className="text-sm font-semibold text-white mb-2">Trạng thái</h3>
               <ul className="space-y-2 text-xs text-slate-400">
                 <li className="flex justify-between">
                   <span>Chất nền:</span>
                   <span className="text-white font-mono">{selectedMolecule.name}</span>
                 </li>
                 <li className="flex justify-between">
                   <span>Tác nhân:</span>
                   <span className={`${selectedReactant ? 'text-white' : 'text-slate-600'}`}>
                     {selectedReactant ? ELEMENT_PROPERTIES[selectedReactant].name : '(Chưa chọn)'}
                   </span>
                 </li>
               </ul>
             </div>

             <div className="mt-auto pt-4">
               <button 
                 onClick={handleResetLab}
                 className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium text-sm md:text-base"
               >
                 <RefreshCw className="w-4 h-4" />
                 Làm lại thí nghiệm
               </button>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}