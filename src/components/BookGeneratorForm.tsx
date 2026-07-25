import React, { useState, useEffect } from 'react';
import { Sparkles, BookOpen, GraduationCap, School, CheckCircle2, ArrowRight, Lightbulb, Loader2, Save, RotateCcw, Compass, Book } from 'lucide-react';
import { GradeLevel, CBCSubject, TargetAudience, SchoolBranding, GenerationRequest, DifficultyLevel, CurriculumSystem, BookCategory } from '../types';
import { GenerationProgressBar } from './GenerationProgressBar';

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
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState<GradeLevel>('Grade 4');
  const [subject, setSubject] = useState<CBCSubject>('Agriculture & Nutrition');
  const [curriculumSystem, setCurriculumSystem] = useState<CurriculumSystem>('CBC');
  const [bookCategory, setBookCategory] = useState<BookCategory>('Student Textbook & Notes');
  const [strand, setStrand] = useState('');
  const [subStrand, setSubStrand] = useState('');
  const [audience, setAudience] = useState<TargetAudience>('Full Book');
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('Standard');
  const [lastAutoSaved, setLastAutoSaved] = useState<string | null>(null);

  // Restore draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.topic) setTopic(parsed.topic);
        if (parsed.grade) setGrade(parsed.grade);
        if (parsed.subject) setSubject(parsed.subject);
        if (parsed.curriculumSystem) setCurriculumSystem(parsed.curriculumSystem);
        if (parsed.bookCategory) setBookCategory(parsed.bookCategory);
        if (parsed.strand) setStrand(parsed.strand);
        if (parsed.subStrand) setSubStrand(parsed.subStrand);
        if (parsed.audience) setAudience(parsed.audience);
        if (parsed.savedAt) setLastAutoSaved(parsed.savedAt);
      }
    } catch (e) {
      console.warn('Failed to restore draft from localStorage:', e);
    }
  }, []);

  // Auto-save whenever form inputs change
  useEffect(() => {
    if (!topic.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const draftData = {
      topic,
      grade,
      subject,
      curriculumSystem,
      bookCategory,
      strand,
      subStrand,
      audience,
      savedAt: now,
    };
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
      setLastAutoSaved(now);
    } catch (e) {
      console.warn('Failed to auto-save draft to localStorage:', e);
    }
  }, [topic, grade, subject, curriculumSystem, bookCategory, strand, subStrand, audience]);

  const handleClearDraft = () => {
    setTopic('');
    setStrand('');
    setSubStrand('');
    setLastAutoSaved(null);
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  const QUICK_PROMPTS = [
    { label: 'Grade 4 Agriculture: Soil Erosion & Mulching', grade: 'Grade 4' as GradeLevel, subject: 'Agriculture & Nutrition' as CBCSubject },
    { label: 'Grade 1 Holiday Homework: English, Maths & Environmental', grade: 'Grade 1' as GradeLevel, subject: 'Environmental Activities' as CBCSubject },
    { label: 'Grade 7 Science: Lab Safety & Hazard Symbols', grade: 'Grade 7' as GradeLevel, subject: 'Science & Technology' as CBCSubject },
    { label: 'Grade 5 Maths: Fractions, Decimals & Percentages', grade: 'Grade 5' as GradeLevel, subject: 'Mathematics' as CBCSubject },
    { label: 'Grade 6 Kiswahili: Kusoma na Kuandika Insha', grade: 'Grade 6' as GradeLevel, subject: 'Kiswahili Language' as CBCSubject },
    { label: 'Grade 8 Pre-Tech & Coding: Introduction to Python & AI', grade: 'Grade 8' as GradeLevel, subject: 'Coding, Robotics & AI' as CBCSubject },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden space-y-0">
      
      {/* Form Header */}
      <div className="bg-slate-900 p-6 text-white border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">CBC Material & Book Generator Studio</h2>
              <p className="text-xs text-slate-300">
                Type any lesson topic or paste syllabus notes to synthesize complete curriculum materials
              </p>
            </div>
          </div>

          {/* Auto-save status badge */}
          {lastAutoSaved && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-3 py-1.5 rounded-xl shrink-0">
              <Save className="w-3.5 h-3.5" />
              <span>Draft Auto-Saved ({lastAutoSaved})</span>
              <button
                type="button"
                onClick={handleClearDraft}
                className="ml-1 text-[11px] underline hover:text-white text-emerald-300 cursor-pointer"
                title="Clear saved draft inputs"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Visual Progress Bar while AI is generating */}
      {isLoading ? (
        <div className="p-6">
          <GenerationProgressBar isLoading={isLoading} />
        </div>
      ) : (
        /* Form Content */
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Main Prompt Input Box */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Lesson Topic / Subject Prompt / Syllabus Notes *</span>
              <span className="text-[10px] text-blue-600 font-semibold lowercase">Input auto-saves locally</span>
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="w-full p-3.5 text-sm border-2 border-slate-200 rounded-xl focus:border-blue-600 focus:ring-0 focus:outline-none transition shadow-xs text-slate-900 font-medium placeholder:text-slate-400"
              placeholder="e.g. Soil Conservation and Compost Making in Grade 4 Agriculture, including water runoff experiments and home mulching tasks..."
              required
            />
          </div>

          {/* Quick Inspiration Pills */}
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Quick CBC Sample Prompts:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((item, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    setTopic(item.label);
                    setGrade(item.grade);
                    setSubject(item.subject);
                  }}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-800 text-slate-700 font-semibold border border-slate-200 transition cursor-pointer text-left"
                >
                  + {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Curriculum Framework & Book Format Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600" />
                <span>Curriculum Framework</span>
              </label>
              <select
                value={curriculumSystem}
                onChange={(e) => setCurriculumSystem(e.target.value as CurriculumSystem)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800 cursor-pointer"
              >
                <option value="CBC">Kenyan CBC (Competency-Based Curriculum)</option>
                <option value="8-4-4 (Archive)">8-4-4 System (Archive Reference)</option>
                <option value="Cambridge">Cambridge International</option>
                <option value="IGCSE">IGCSE Curriculum</option>
                <option value="KCPE">KCPE Revision Framework</option>
                <option value="KCSE">KCSE National Exam Framework</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Book className="w-3.5 h-3.5 text-blue-600" />
                <span>Book Type & Format</span>
              </label>
              <select
                value={bookCategory}
                onChange={(e) => setBookCategory(e.target.value as BookCategory)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800 cursor-pointer"
              >
                <option value="Student Textbook & Notes">Student Textbook & Explanatory Notes</option>
                <option value="Teacher Guide & Schemes">Teacher Instructional Guide & Schemes of Work</option>
                <option value="Holiday Homework Workbook">Holiday Homework Workbook & Parent Section</option>
                <option value="Mid-Term / End-Term Exam & Marking Scheme">Mid-Term / End-Term Exam & Marking Scheme</option>
                <option value="Revision & Topical Practice">Revision & Topical Question Bank</option>
                <option value="Practical, STEM & Coding Book">Practical Activity, STEM & Coding Guide</option>
                <option value="Early Years Coloring & Tracing">Early Years Activity, Tracing & Coloring Book</option>
              </select>
            </div>
          </div>

          {/* Grade & Subject Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                Grade Level & Education Stage
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800 cursor-pointer"
              >
                <optgroup label="Early Years / Pre-Primary">
                  <option value="PP1">PP1 (Pre-Primary 1)</option>
                  <option value="PP2">PP2 (Pre-Primary 2)</option>
                </optgroup>
                <optgroup label="Lower Primary">
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                </optgroup>
                <optgroup label="Upper Primary">
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                </optgroup>
                <optgroup label="Junior Secondary (JSS)">
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                </optgroup>
                <optgroup label="Senior Secondary">
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                </optgroup>
                <optgroup label="Teacher & Administrative Resources">
                  <option value="Teacher Resources">Teacher Resources & Guide</option>
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
                Subject Area
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as CBCSubject)}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold text-slate-800 cursor-pointer"
              >
                <optgroup label="Core Sciences & Mathematics">
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science & Technology">Science & Technology</option>
                  <option value="Integrated Science">Integrated Science</option>
                  <option value="Environmental Activities">Environmental Activities</option>
                </optgroup>
                <optgroup label="Languages & Humanities">
                  <option value="English Language Arts">English Language Arts</option>
                  <option value="Kiswahili Language">Kiswahili Language</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Religious Education (CRE/IRE/HRE)">Religious Education (CRE/IRE/HRE)</option>
                  <option value="Foreign Languages (French/German/Mandarin)">Foreign Languages (French / German / Mandarin)</option>
                </optgroup>
                <optgroup label="Applied Sciences, Tech & Business">
                  <option value="Agriculture & Nutrition">Agriculture & Nutrition</option>
                  <option value="Computer Studies">Computer Studies & Digital Literacy</option>
                  <option value="Coding, Robotics & AI">Coding, Robotics & AI</option>
                  <option value="Business Studies">Business Studies</option>
                  <option value="Financial Literacy">Financial Literacy</option>
                  <option value="Home Science">Home Science</option>
                </optgroup>
                <optgroup label="Creative Arts, Sports & Life Skills">
                  <option value="Creative Arts & Sports">Creative Arts & Sports</option>
                  <option value="Physical Education">Physical Education</option>
                </optgroup>
              </select>
            </div>

          </div>

          {/* Difficulty Level Selector */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
              Difficulty & Differentiation Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { level: 'Remedial' as DifficultyLevel, color: 'emerald', label: 'Remedial', desc: 'Step-by-step guidance & simplified vocabulary' },
                { level: 'Standard' as DifficultyLevel, color: 'blue', label: 'Standard', desc: 'Core KICD CBC grade level curriculum' },
                { level: 'Enrichment' as DifficultyLevel, color: 'amber', label: 'Enrichment', desc: 'Advanced inquiry & extended challenge tasks' }
              ].map((item) => (
                <button
                  type="button"
                  key={item.level}
                  onClick={() => setDifficultyLevel(item.level)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    difficultyLevel === item.level
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900">
                    <span className={`w-2 h-2 rounded-full ${
                      item.level === 'Remedial' ? 'bg-emerald-500' : item.level === 'Enrichment' ? 'bg-amber-500' : 'bg-blue-500'
                    }`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience View Selector */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1.5">
              Target Book Scope & Edition
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'Full Book', title: 'Full Book', desc: 'Cover + Teacher + Student + Rubrics' },
                { id: 'Teacher Edition', title: 'Teacher Edition', desc: 'Schemes & Detailed Lesson Plans' },
                { id: 'Student Edition', title: 'Student Edition', desc: 'Textbook + Practical Tasks' },
                { id: 'School Assessment', title: 'School Assessment', desc: 'Worksheets & CBC Rubrics' }
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setAudience(item.id as TargetAudience)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    audience === item.id
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">{item.title}</div>
                  <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Current Branding Summary Badge */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-blue-600" />
              <span>
                Branding on Book: <strong className="text-slate-900">{branding.schoolName}</strong> ({branding.teacherName})
              </span>
            </div>
            <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-md font-semibold text-slate-700 uppercase">
              {branding.term} {branding.year}
            </span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !topic.trim()}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate Full CBC Lesson Book & Material</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
