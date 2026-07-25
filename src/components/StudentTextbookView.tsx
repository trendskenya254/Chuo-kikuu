import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Lightbulb, Users, Home, CheckCircle2, Bookmark, Flame, CheckSquare, Square, Award, Trophy, Clock } from 'lucide-react';
import { CBCFullBook } from '../types';
import { RenderMarkdown } from '../lib/markdown';

interface StudentTextbookViewProps {
  book: CBCFullBook;
}

export const StudentTextbookView: React.FC<StudentTextbookViewProps> = ({ book }) => {
  const chapter = book.chapters[0];
  if (!chapter) return null;

  // Local state for tracking completed workbook tasks for this book ID
  const storageKey = `student_progress_${book.id}`;
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const tasksList = [
    { id: 'read_textbook', label: '1. Read Textbook Explanation & Key Concepts' },
    { id: 'review_vocab', label: '2. Memorize Key Vocabulary & Definitions' },
    { id: 'group_practical', label: '3. Complete Hands-on Practical Activity' },
    { id: 'home_csl', label: '4. Perform Home-Based Extended Task' },
    { id: 'worksheet_cat', label: '5. Answer CAT Worksheet Questions' },
    { id: 'comp_quiz', label: '6. Complete 5-Question Comprehension Quiz' },
  ];

  const totalTasks = tasksList.length;
  const completedCount = tasksList.filter((t) => completedTasks[t.id]).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const toggleTask = (id: string) => {
    const updated = { ...completedTasks, [id]: !completedTasks[id] };
    setCompletedTasks(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  };

  const createdDateFormatted = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '25 July 2026';

  return (
    <div className="space-y-8 print:space-y-6">
      
      {/* Student Module Banner with Official Print Metadata */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-2xl border border-emerald-700 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-700/80 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-white/30">
                Student Coursebook Module
              </span>
              <span className="text-xs text-emerald-200 font-medium">{book.grade} • {book.subject}</span>
            </div>
            <h2 className="text-2xl font-black text-white leading-tight">
              {chapter.title}
            </h2>
            <p className="text-xs text-emerald-100 mt-1 max-w-2xl">
              {book.studentSummaryNotes}
            </p>
          </div>

          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-600/50 text-right text-[11px] font-mono shrink-0 space-y-0.5">
            <div className="text-emerald-300 font-bold">{book.qualityStatus || 'Official KICD Approved'}</div>
            <div className="text-emerald-100">REF: {book.documentRefId || 'KICD-CBC-REF-883291'}</div>
            <div className="text-emerald-200/80 text-[10px]">Created: {createdDateFormatted}</div>
          </div>
        </div>

        {/* Administrative Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-medium text-emerald-100 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-700/50">
          <div>
            <span className="text-emerald-300/80 block text-[10px] uppercase font-bold">Curriculum Version</span>
            <span className="text-white font-semibold">{book.curriculumVersion || 'KICD CBC Ed. 4.2'}</span>
          </div>
          <div>
            <span className="text-emerald-300/80 block text-[10px] uppercase font-bold">School Reg. Code</span>
            <span className="text-white font-semibold">{book.schoolCode || 'SCH-NBO-4029'}</span>
          </div>
          <div>
            <span className="text-emerald-300/80 block text-[10px] uppercase font-bold">School Name</span>
            <span className="text-white font-semibold">{book.branding?.schoolName}</span>
          </div>
          <div>
            <span className="text-emerald-300/80 block text-[10px] uppercase font-bold">Target Class</span>
            <span className="text-white font-semibold">{book.branding?.className || book.grade}</span>
          </div>
        </div>
      </div>

      {/* Visual Student Workbook Progress Tracker */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 print:hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">
                Student Workbook Progress Tracker
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Track learner completion across reading lessons, practical tasks, and comprehension quizzes
              </p>
            </div>
          </div>

          {/* Badge & Percentage */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border ${
              progressPercent === 100
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : progressPercent >= 50
                ? 'bg-blue-100 text-blue-800 border-blue-300'
                : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}>
              {progressPercent === 100 ? '🎉 Module Mastered!' : `${completedCount} of ${totalTasks} Lessons Done`}
            </span>
            <span className="text-lg font-black text-slate-900 font-mono">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-100 rounded-full h-3.5 p-0.5 border border-slate-200 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-semibold text-slate-400">
            <span>Start Module</span>
            <span>50% Midpoint</span>
            <span>100% Certificate Ready</span>
          </div>
        </div>

        {/* Checkable Task Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
          {tasksList.map((task) => {
            const isDone = !!completedTasks[task.id];
            return (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition flex items-center gap-2.5 cursor-pointer ${
                  isDone
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300 shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {isDone ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
                <span className={isDone ? 'line-through text-emerald-800' : ''}>
                  {task.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Textbook Reading Sections */}
      <div className="space-y-6">
        {chapter.textbookContent?.map((section, idx) => (
          <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            
            <div className="border-b border-slate-200 pb-3">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-emerald-600" />
                {section.sectionTitle}
              </h3>
            </div>

            {/* Markdown Body Content */}
            <div className="prose prose-slate max-w-none text-slate-800">
              <RenderMarkdown content={section.bodyMarkdown} />
            </div>

            {/* Fun Facts Callout */}
            {section.funFacts && section.funFacts.length > 0 && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-xs uppercase text-amber-950 tracking-wider">
                    CBC Did You Know?
                  </h4>
                  {section.funFacts.map((fact, fIdx) => (
                    <p key={fIdx} className="text-xs text-amber-900 font-medium mt-0.5 leading-relaxed">
                      {fact}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Vocabulary Table / Cards */}
            {section.keyVocabulary && section.keyVocabulary.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <h4 className="text-xs font-black uppercase text-slate-700 tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Key Vocabulary & Definitions:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {section.keyVocabulary.map((vocab, vIdx) => (
                    <div key={vIdx} className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                      <strong className="text-emerald-800 block font-bold">{vocab.term}:</strong>
                      <span className="text-slate-600 leading-tight block mt-0.5">{vocab.definition}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Practical & Group Activities Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Hands-On Practical & Collaborative Learning
            </h3>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            CBC Activity Based
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapter.practicalActivities?.map((act, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl border-2 flex flex-col justify-between ${
                act.type === 'Home-Based CSL'
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-indigo-50/50 border-indigo-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    act.type === 'Home-Based CSL'
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-indigo-600 text-white border-indigo-700'
                  }`}>
                    {act.type === 'Home-Based CSL' ? '🏠 Home & Parent Activity' : '👥 Group Project'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Competency: {act.competencyAssessed}
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-slate-900 leading-tight">
                  {act.title}
                </h4>

                <div>
                  <strong className="text-xs font-bold text-slate-700 uppercase block mb-1">
                    Materials Needed:
                  </strong>
                  <div className="flex flex-wrap gap-1">
                    {act.materialsNeeded?.map((mat, mIdx) => (
                      <span key={mIdx} className="bg-white px-2 py-0.5 rounded-md text-[11px] font-semibold text-slate-700 border border-slate-200">
                        • {mat}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <strong className="text-xs font-bold text-slate-700 uppercase block mb-1">
                    Step-by-Step Instructions:
                  </strong>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-800 leading-relaxed">
                    {act.stepByStepGuide?.map((step, sIdx) => (
                      <li key={sIdx} className="pl-1">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs">
                <strong className="text-slate-900 font-bold">Expected Output / Portfolio Deliverable:</strong>
                <p className="text-slate-700 italic mt-0.5">{act.expectedOutput}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
