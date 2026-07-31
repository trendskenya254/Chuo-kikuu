import React, { useState, useEffect, useMemo } from 'react';
import {
  Sparkles,
  BookOpen,
  GraduationCap,
  School,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
  Loader2,
  Save,
  Compass,
  Book,
  Layers,
  Zap,
  CheckSquare,
  Square,
  FileText,
  Bookmark,
  Award,
} from 'lucide-react';
import {
  GradeLevel,
  CBCSubject,
  TargetAudience,
  SchoolBranding,
  GenerationRequest,
  DifficultyLevel,
  CurriculumSystem,
  BookCategory,
} from '../types';
import {
  CBC_EDUCATIONAL_TIERS,
  OFFICIAL_CBC_RESOURCE_TYPES,
  CBCTier,
} from '../data/cbcCurriculumData';
import { GenerationProgressBar } from './GenerationProgressBar';
import {
  saveGeneratorDraftToIDB,
  getGeneratorDraftFromIDB,
  clearGeneratorDraftFromIDB,
  GeneratorDraftState,
} from '../lib/idb';

interface BookGeneratorFormProps {
  branding: SchoolBranding;
  onGenerate: (req: GenerationRequest) => Promise<void>;
  isLoading: boolean;
  onClose?: () => void;
}

const DRAFT_STORAGE_KEY = 'cbc_generator_studio_draft';

export const BookGeneratorForm: React.FC<BookGeneratorFormProps> = ({
  branding,
  onGenerate,
  isLoading,
  onClose,
}) => {
  // Generation Mode: Single Subject Book vs Batch All Subjects Kit
  const [generationMode, setGenerationMode] = useState<'single' | 'batch'>('single');

  // Tier & Grade State
  const [activeTierId, setActiveTierId] = useState<string>('upper-primary');
  const [grade, setGrade] = useState<GradeLevel>('Grade 4');

  // Active Tier Object
  const currentTier: CBCTier = useMemo(() => {
    return (
      CBC_EDUCATIONAL_TIERS.find((t) => t.id === activeTierId) ||
      CBC_EDUCATIONAL_TIERS[2]
    );
  }, [activeTierId]);

  // Subject State (Single Mode)
  const [subject, setSubject] = useState<CBCSubject>('Agriculture and Nutrition');

  // Batch Mode Selected Subjects State
  const [batchSubjectSelection, setBatchSubjectSelection] = useState<string[]>([]);

  // Curriculum & Resource Category State
  const [curriculumSystem, setCurriculumSystem] = useState<CurriculumSystem>('CBC');
  const [bookCategory, setBookCategory] = useState<BookCategory>(
    'Approved Course Materials'
  );
  const [audience, setAudience] = useState<TargetAudience>('Full Book');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('Standard');

  // Input Prompts State
  const [topic, setTopic] = useState('');
  const [strand, setStrand] = useState('');
  const [subStrand, setSubStrand] = useState('');
  const [lastAutoSaved, setLastAutoSaved] = useState<string | null>(null);

  // Batch Generation Internal Loading State
  const [batchStatus, setBatchStatus] = useState<{
    isGenerating: boolean;
    currentIndex: number;
    total: number;
    currentSubject: string;
  } | null>(null);

  // Sync available subjects when active tier changes
  useEffect(() => {
    if (currentTier.subjects.length > 0) {
      setSubject(currentTier.subjects[0].name as CBCSubject);
      setBatchSubjectSelection(currentTier.subjects.map((s) => s.name));
    }
  }, [currentTier]);

  // Sync tier when grade dropdown changes
  const handleGradeChange = (newGrade: GradeLevel) => {
    setGrade(newGrade);
    const matchedTier = CBC_EDUCATIONAL_TIERS.find((t) =>
      t.grades.includes(newGrade)
    );
    if (matchedTier && matchedTier.id !== activeTierId) {
      setActiveTierId(matchedTier.id);
    }
  };

  // Restore draft from IndexedDB (or fallback to localStorage) on mount
  useEffect(() => {
    let isMounted = true;

    async function restoreDraft() {
      try {
        // Try IndexedDB first
        const idbDraft = await getGeneratorDraftFromIDB();
        if (idbDraft && isMounted) {
          if (idbDraft.generationMode) setGenerationMode(idbDraft.generationMode);
          if (idbDraft.activeTierId) setActiveTierId(idbDraft.activeTierId);
          if (idbDraft.grade) setGrade(idbDraft.grade as GradeLevel);
          if (idbDraft.subject) setSubject(idbDraft.subject as CBCSubject);
          if (idbDraft.batchSubjectSelection) setBatchSubjectSelection(idbDraft.batchSubjectSelection);
          if (idbDraft.curriculumSystem) setCurriculumSystem(idbDraft.curriculumSystem as CurriculumSystem);
          if (idbDraft.bookCategory) setBookCategory(idbDraft.bookCategory as BookCategory);
          if (idbDraft.audience) setAudience(idbDraft.audience as TargetAudience);
          if (idbDraft.difficultyLevel) setDifficultyLevel(idbDraft.difficultyLevel as DifficultyLevel);
          if (idbDraft.topic) setTopic(idbDraft.topic);
          if (idbDraft.strand) setStrand(idbDraft.strand);
          if (idbDraft.subStrand) setSubStrand(idbDraft.subStrand);
          if (idbDraft.savedAt) setLastAutoSaved(idbDraft.savedAt);
          return;
        }

        // Fallback to localStorage
        const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
        if (saved && isMounted) {
          const parsed = JSON.parse(saved);
          if (parsed.topic) setTopic(parsed.topic);
          if (parsed.grade) setGrade(parsed.grade);
          if (parsed.subject) setSubject(parsed.subject);
          if (parsed.curriculumSystem) setCurriculumSystem(parsed.curriculumSystem);
          if (parsed.bookCategory) setBookCategory(parsed.bookCategory);
          if (parsed.audience) setAudience(parsed.audience);
          if (parsed.savedAt) setLastAutoSaved(parsed.savedAt);
        }
      } catch (e) {
        console.warn('Failed to restore draft from storage:', e);
      }
    }

    restoreDraft();

    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-save form draft state periodically & on state changes to IndexedDB
  useEffect(() => {
    if (!topic.trim() && batchSubjectSelection.length === 0) return;

    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const draftState: GeneratorDraftState = {
      id: 'current_draft',
      generationMode,
      activeTierId,
      grade,
      subject,
      batchSubjectSelection,
      curriculumSystem,
      bookCategory,
      audience,
      difficultyLevel,
      topic,
      strand,
      subStrand,
      savedAt: now,
      updatedAtTimestamp: Date.now(),
    };

    // Save to IndexedDB
    saveGeneratorDraftToIDB(draftState).then(() => {
      setLastAutoSaved(now);
    }).catch((err) => {
      console.warn('IndexedDB auto-save warning:', err);
    });

    // Also mirror to localStorage for redundancy
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftState));
    } catch (e) {
      // ignore
    }
  }, [
    topic,
    strand,
    subStrand,
    generationMode,
    activeTierId,
    grade,
    subject,
    batchSubjectSelection,
    curriculumSystem,
    bookCategory,
    audience,
    difficultyLevel,
  ]);

  const handleClearDraft = async () => {
    setTopic('');
    setStrand('');
    setSubStrand('');
    setLastAutoSaved(null);
    try {
      await clearGeneratorDraftFromIDB();
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  // Toggle single subject selection for batch mode
  const toggleBatchSubject = (subjectName: string) => {
    setBatchSubjectSelection((prev) =>
      prev.includes(subjectName)
        ? prev.filter((s) => s !== subjectName)
        : [...prev, subjectName]
    );
  };

  // Select / Deselect all subjects for current tier
  const handleToggleSelectAllBatch = () => {
    if (batchSubjectSelection.length === currentTier.subjects.length) {
      setBatchSubjectSelection([]);
    } else {
      setBatchSubjectSelection(currentTier.subjects.map((s) => s.name));
    }
  };

  const QUICK_PROMPTS = [
    {
      label: 'PP1 & PP2 Mathematical Activities: Number Recognition & Counting Play',
      tierId: 'pre-primary',
      grade: 'PP1' as GradeLevel,
      subject: 'Mathematical Activities' as CBCSubject,
      category: 'Approved Course Materials' as BookCategory,
    },
    {
      label: 'Lower Primary Grade 2 Hygiene & Nutrition: Healthy Eating & Dental Care',
      tierId: 'lower-primary',
      grade: 'Grade 2' as GradeLevel,
      subject: 'Hygiene and Nutrition Activities' as CBCSubject,
      category: 'Approved Course Materials' as BookCategory,
    },
    {
      label: 'Upper Primary Grade 4 Agriculture: Soil Erosion & Mulching Techniques',
      tierId: 'upper-primary',
      grade: 'Grade 4' as GradeLevel,
      subject: 'Agriculture and Nutrition' as CBCSubject,
      category: 'Curriculum Designs' as BookCategory,
    },
    {
      label: 'Junior School Grade 7 Integrated Science: Lab Safety & Hazard Symbols',
      tierId: 'junior-school',
      grade: 'Grade 7' as GradeLevel,
      subject: 'Integrated Science (Biology, Chemistry, Physics)' as CBCSubject,
      category: 'Assessment Rubrics & Tools' as BookCategory,
    },
    {
      label: 'Senior School Grade 10 STEM: Applied Computer Science & Programming',
      tierId: 'senior-school',
      grade: 'Grade 10' as GradeLevel,
      subject: 'STEM: Applied Sciences & Technology' as CBCSubject,
      category: 'Digital Learning Repositories' as BookCategory,
    },
  ];

  // Submit Handler: Single vs Batch Mode
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (generationMode === 'single') {
      if (!topic.trim()) return;
      await onGenerate({
        topic: topic.trim(),
        grade,
        subject,
        strand: strand.trim(),
        subStrand: subStrand.trim(),
        curriculumSystem,
        bookCategory,
        difficultyLevel,
        branding,
        audience,
      });
      if (onClose) onClose();
    } else {
      // BATCH MODE: Generate materials across all selected subjects
      if (batchSubjectSelection.length === 0) return;

      const total = batchSubjectSelection.length;
      setBatchStatus({
        isGenerating: true,
        currentIndex: 0,
        total,
        currentSubject: batchSubjectSelection[0],
      });

      for (let i = 0; i < total; i++) {
        const subjName = batchSubjectSelection[i];
        setBatchStatus({
          isGenerating: true,
          currentIndex: i + 1,
          total,
          currentSubject: subjName,
        });

        const customPrompt = topic.trim()
          ? `${topic.trim()} - Focus specifically on official ${grade} ${subjName} curriculum outcomes.`
          : `Complete official CBC curriculum learning book for ${grade} ${subjName}, featuring syllabus strands, lesson plans, textbook explanations, practical activities, and assessment rubrics.`;

        try {
          await onGenerate({
            topic: customPrompt,
            grade,
            subject: subjName as CBCSubject,
            curriculumSystem,
            bookCategory,
            difficultyLevel,
            branding,
            audience,
          });
        } catch (err) {
          console.error(`Batch generation error for subject ${subjName}:`, err);
        }
      }

      setBatchStatus(null);
      if (onClose) onClose();
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden space-y-0 max-w-4xl mx-auto">
      
      {/* Form Header */}
      <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <span>CBC Material Studio & All-Subject Generator</span>
                <span className="text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-md font-black uppercase">
                  Kenya CBC Standard
                </span>
              </h2>
              <p className="text-xs text-slate-300 font-medium">
                Synthesize materials across all educational tiers, subjects, and KICD-approved learning resources.
              </p>
            </div>
          </div>

          {/* Mode Switcher: Single vs Batch All Subjects */}
          <div className="bg-slate-800 p-1 rounded-2xl border border-slate-700 flex items-center gap-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setGenerationMode('single')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                generationMode === 'single'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Single Book</span>
            </button>
            <button
              type="button"
              onClick={() => setGenerationMode('batch')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                generationMode === 'batch'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>⚡ Generate All Subjects</span>
            </button>
          </div>
        </div>

        {/* Auto-save Status */}
        {lastAutoSaved && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Save className="w-3.5 h-3.5 text-emerald-400" />
              <span>IndexedDB Auto-Saved ({lastAutoSaved})</span>
            </span>
            <button
              type="button"
              onClick={handleClearDraft}
              className="text-[11px] underline hover:text-white text-emerald-300 cursor-pointer"
            >
              Clear Draft
            </button>
          </div>
        )}
      </div>

      {/* Progress Bar during AI Generation */}
      {isLoading || (batchStatus && batchStatus.isGenerating) ? (
        <div className="p-8 space-y-4">
          {batchStatus ? (
            <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
                  Generating All Subjects Batch Kit ({batchStatus.currentIndex} of {batchStatus.total})
                </span>
                <span className="text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full font-bold">
                  {Math.round((batchStatus.currentIndex / batchStatus.total) * 100)}%
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                Current Subject: <strong className="text-amber-300">{batchStatus.currentSubject}</strong> ({grade})
              </p>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${(batchStatus.currentIndex / batchStatus.total) * 100}%` }}
                />
              </div>
            </div>
          ) : (
            <GenerationProgressBar isLoading={isLoading} />
          )}
        </div>
      ) : (
        /* Form Body */
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">

          {/* 1. EDUCATIONAL TIER SELECTOR TABS */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>1. Select CBC Educational Tier & Stage</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {CBC_EDUCATIONAL_TIERS.map((tier) => {
                const isSelected = activeTierId === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => {
                      setActiveTierId(tier.id);
                      setGrade(tier.grades[0] as GradeLevel);
                    }}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/30'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${tier.badgeColor}`}>
                        {tier.grades.join(', ')}
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 mt-2 line-clamp-1">{tier.name.split('.')[1] || tier.name}</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium line-clamp-2 mt-1">{tier.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. OFFICIAL LEARNING RESOURCE CATEGORIES */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-blue-600" />
              <span>2. Official & Standard Learning Resource Format</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {OFFICIAL_CBC_RESOURCE_TYPES.map((resType) => {
                const isSelected = bookCategory === (resType.id as BookCategory);
                return (
                  <button
                    key={resType.id}
                    type="button"
                    onClick={() => setBookCategory(resType.id as BookCategory)}
                    className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/30 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{resType.icon}</span>
                      <span className="font-bold text-xs text-slate-900 line-clamp-1">{resType.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium mt-1 line-clamp-2">{resType.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. GRADE & SUBJECT SELECTOR SECTION */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Grade Level Select */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                  Specific Grade Level:
                </label>
                <select
                  value={grade}
                  onChange={(e) => handleGradeChange(e.target.value as GradeLevel)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                >
                  {currentTier.grades.map((g) => (
                    <option key={g} value={g}>
                      {g} ({currentTier.name.split('(')[0]})
                    </option>
                  ))}
                </select>
              </div>

              {/* Single Subject Select (Single Mode Only) */}
              {generationMode === 'single' && (
                <div>
                  <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                    Subject Area (for {currentTier.name.split('(')[0]}):
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as CBCSubject)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-white font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
                  >
                    {currentTier.subjects.map((s) => (
                      <option key={s.code} value={s.name}>
                        {s.icon} {s.name} ({s.category})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* BATCH ALL SUBJECTS CHECKBOX SELECTION LIST */}
            {generationMode === 'batch' && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Select Subjects to Include in {grade} Package:
                  </span>
                  <button
                    type="button"
                    onClick={handleToggleSelectAllBatch}
                    className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    {batchSubjectSelection.length === currentTier.subjects.length
                      ? 'Deselect All'
                      : 'Select All Subjects'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {currentTier.subjects.map((s) => {
                    const isChecked = batchSubjectSelection.includes(s.name);
                    return (
                      <button
                        key={s.code}
                        type="button"
                        onClick={() => toggleBatchSubject(s.name)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-extrabold'
                            : 'bg-white border-slate-200 text-slate-600 font-medium'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-300 shrink-0" />
                        )}
                        <span className="text-xs line-clamp-1">{s.icon} {s.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 4. TOPIC PROMPT INPUT */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>
                {generationMode === 'batch'
                  ? 'Custom Syllabus Focus / Guideline Instructions (Optional for Batch)'
                  : 'Lesson Topic / Subject Prompt / Syllabus Notes *'}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold lowercase">
                Auto-saves draft locally
              </span>
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="w-full p-3.5 text-sm border-2 border-slate-200 rounded-2xl focus:border-emerald-600 focus:ring-0 focus:outline-none transition shadow-xs text-slate-900 font-medium placeholder:text-slate-400"
              placeholder={
                generationMode === 'batch'
                  ? `e.g. Synthesize full Term 1 syllabus materials for all ${grade} subjects adhering to KICD standards...`
                  : `e.g. Soil Erosion, Mulching & Compost Making in ${grade} Agriculture with hands-on runoff experiments...`
              }
              required={generationMode === 'single'}
            />
          </div>

          {/* Quick Prompts */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Quick CBC Tier Prompts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setActiveTierId(item.tierId);
                    setGrade(item.grade);
                    setSubject(item.subject);
                    setBookCategory(item.category);
                    setTopic(item.label);
                  }}
                  className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 font-semibold border border-slate-200 transition cursor-pointer text-left"
                >
                  + {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. DIFFICULTY & AUDIENCE SCOPE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                Differentiation Level:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { level: 'Remedial' as DifficultyLevel, label: 'Remedial' },
                  { level: 'Standard' as DifficultyLevel, label: 'Standard' },
                  { level: 'Enrichment' as DifficultyLevel, label: 'Enrichment' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.level}
                    onClick={() => setDifficultyLevel(item.level)}
                    className={`py-2 px-2 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                      difficultyLevel === item.level
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1.5">
                Target Book Scope:
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'Full Book' as TargetAudience, label: 'Full Book' },
                  { id: 'Teacher Edition' as TargetAudience, label: 'Teacher Edition' },
                  { id: 'Student Edition' as TargetAudience, label: 'Student Edition' },
                  { id: 'School Assessment' as TargetAudience, label: 'Assessment & Rubrics' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setAudience(item.id)}
                    className={`py-2 px-2 rounded-xl border text-center font-bold transition cursor-pointer ${
                      audience === item.id
                        ? 'border-blue-600 bg-blue-50 text-blue-950'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* School Branding Summary Badge */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-emerald-600" />
              <span>
                School Header: <strong className="text-slate-900">{branding.schoolName}</strong> ({branding.teacherName})
              </span>
            </div>
            <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-700 uppercase">
              {branding.term} {branding.year}
            </span>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            {generationMode === 'single' ? (
              <button
                type="submit"
                disabled={isLoading || !topic.trim()}
                className="w-full py-4 px-6 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate Official CBC Module ({grade} • {subject})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading || batchSubjectSelection.length === 0}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-800 to-teal-800 hover:from-emerald-900 hover:to-teal-900 disabled:opacity-50 text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer border border-emerald-400/30"
              >
                <Zap className="w-5 h-5 text-amber-300" />
                <span>
                  ⚡ Batch Generate Complete {grade} Package ({batchSubjectSelection.length} Subjects)
                </span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>

        </form>
      )}

    </div>
  );
};
