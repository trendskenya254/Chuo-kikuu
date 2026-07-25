import React from 'react';
import { BookOpen, Compass, CheckCircle2, Clock, Users, ShieldAlert, Sparkles, HeartHandshake, HelpCircle, Layers, FileCheck, Bookmark } from 'lucide-react';
import { CBCFullBook } from '../types';

interface TeacherGuideViewProps {
  book: CBCFullBook;
}

export const TeacherGuideView: React.FC<TeacherGuideViewProps> = ({ book }) => {
  const chapter = book.chapters[0];
  if (!chapter) return null;

  // Fallback for lesson plan key vocabulary if not present on lessonPlan object
  const lessonVocab = chapter.lessonPlan?.keyVocabulary && chapter.lessonPlan.keyVocabulary.length > 0
    ? chapter.lessonPlan.keyVocabulary
    : chapter.textbookContent?.[0]?.keyVocabulary || [];

  const createdDateFormatted = book.createdAt
    ? new Date(book.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '25 July 2026';

  return (
    <div className="space-y-8 print:space-y-6">
      
      {/* Official Administrative Record Header Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Teacher's Instructional Guide
              </span>
              <span className="text-xs text-slate-400 font-semibold">{book.grade} • {book.subject}</span>
            </div>
            <h2 className="text-xl font-black text-white">
              Scheme of Work & 40-Minute Lesson Plan
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Curriculum Alignment Matrix, Timetabled Execution, and Differentiated Learning Strategies
            </p>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-right text-[11px] font-mono shrink-0 space-y-0.5">
            <div className="text-emerald-400 font-bold">{book.qualityStatus || 'Official KICD Approved'}</div>
            <div className="text-slate-300">REF: {book.documentRefId || 'KICD-CBC-REF-883291'}</div>
          </div>
        </div>

        {/* Administrative Metadata Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-medium text-slate-300 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Date Created</span>
            <span className="text-white font-semibold">{createdDateFormatted}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Curriculum Version</span>
            <span className="text-emerald-400 font-semibold">{book.curriculumVersion || 'KICD CBC Ed. 4.2'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">School Reg. Code</span>
            <span className="text-white font-semibold">{book.schoolCode || 'SCH-NBO-4029'}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Lead Educator</span>
            <span className="text-white font-semibold">{book.branding?.teacherName || 'Mwalimu'}</span>
          </div>
        </div>
      </div>

      {/* Curriculum Alignment Framework Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Core Competencies & Values */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Compass className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              1. Core Competencies & Values
            </h3>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-1.5">Core Competencies:</h4>
            <ul className="space-y-1">
              {chapter.coreCompetencies?.map((comp, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-1.5">National Values:</h4>
            <div className="flex flex-wrap gap-1.5">
              {chapter.values?.map((val, idx) => (
                <span key={idx} className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-2.5 py-0.5 rounded-lg">
                  ♥ {val}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Inquiry Questions & PCIs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              2. Key Inquiry Questions (KIQs) & PCIs
            </h3>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-1.5">Key Inquiry Questions:</h4>
            <ul className="space-y-1.5">
              {chapter.keyInquiryQuestions?.map((kiq, idx) => (
                <li key={idx} className="text-xs font-medium text-slate-800 bg-indigo-50/50 p-2 rounded-lg border border-indigo-100">
                  ❓ {kiq}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase mb-1.5">Pertinent & Contemporary Issues (PCIs):</h4>
            <div className="flex flex-wrap gap-1.5">
              {chapter.pertinentIssues?.map((pci, idx) => (
                <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md border border-slate-200">
                  🌐 {pci}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Specific Learning Outcomes */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          3. Specific Learning Outcomes (Knowledge, Skills & Attitudes)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 uppercase mb-1.5">Knowledge & Understanding:</h4>
            <ul className="space-y-1 text-slate-700">
              {chapter.learningOutcomes?.knowledge?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 uppercase mb-1.5">Practical Skills:</h4>
            <ul className="space-y-1 text-slate-700">
              {chapter.learningOutcomes?.skills?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100">
            <h4 className="font-bold text-amber-900 uppercase mb-1.5">Attitudes & Values:</h4>
            <ul className="space-y-1 text-slate-700">
              {chapter.learningOutcomes?.attitudes?.map((item, idx) => (
                <li key={idx}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Timetabled 40-Minute Lesson Plan Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="bg-slate-900 px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h3 className="font-extrabold text-sm uppercase tracking-wider">
              4. 40-Minute Step-by-Step Lesson Execution Plan
            </h3>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
            Standard CBC 40m
          </span>
        </div>

        {/* Resources list */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs">
          <strong className="text-slate-800 uppercase block mb-1">Teaching & Learning Resources Needed:</strong>
          <div className="flex flex-wrap gap-1.5">
            {chapter.lessonPlan?.learningResources?.map((res, idx) => (
              <span key={idx} className="bg-white px-2.5 py-1 rounded-md border border-slate-200 text-slate-700 font-medium">
                📦 {res}
              </span>
            ))}
          </div>
        </div>

        {/* Steps Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <th className="p-3 w-1/4">Phase / Time</th>
                <th className="p-3 w-1/3">Teacher's Guided Activities</th>
                <th className="p-3 w-1/3">Learner's Active Participation</th>
                <th className="p-3 w-1/4">Assessment Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {chapter.lessonPlan?.steps?.map((step, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="p-3 font-bold text-emerald-800 bg-emerald-50/30 align-top">
                    {step.phase}
                  </td>
                  <td className="p-3 text-slate-700 align-top leading-relaxed">
                    {step.teacherActivities}
                  </td>
                  <td className="p-3 text-slate-700 align-top leading-relaxed">
                    {step.learnerActivities}
                  </td>
                  <td className="p-3 text-slate-700 align-top font-medium">
                    {step.assessmentStrategy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Differentiated Learning Strategies */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Users className="w-5 h-5 text-indigo-600" />
          5. Differentiated Learning & Inclusive Education Strategies
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-1">Fast Learners / High Achievers:</h4>
            <p className="text-slate-700">{chapter.lessonPlan?.differentiationNotes?.fastLearners}</p>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
            <h4 className="font-bold text-amber-900 mb-1">Slow / Average Learners:</h4>
            <p className="text-slate-700">{chapter.lessonPlan?.differentiationNotes?.slowLearners}</p>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-1">Learners with Special Needs:</h4>
            <p className="text-slate-700">{chapter.lessonPlan?.differentiationNotes?.specialNeeds}</p>
          </div>
        </div>
      </div>

      {/* End of Lesson Plan: Key Vocabulary for Students */}
      {lessonVocab && lessonVocab.length > 0 && (
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 rounded-2xl border border-blue-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-blue-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider">
                6. End-of-Lesson Key Vocabulary for Student Mastery
              </h3>
            </div>
            <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
              Lesson Summary Terms ({lessonVocab.length})
            </span>
          </div>

          <p className="text-xs text-blue-200">
            Ensure learners copy these key vocabulary terms and definitions into their CBC exercise journals at the end of the 40-minute lesson.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {lessonVocab.map((vocab, vIdx) => (
              <div key={vIdx} className="bg-slate-900/80 p-3 rounded-xl border border-blue-700/50 space-y-1">
                <strong className="text-amber-400 block font-bold text-sm">
                  📌 {vocab.term}
                </strong>
                <p className="text-slate-200 leading-relaxed text-xs">
                  {vocab.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
