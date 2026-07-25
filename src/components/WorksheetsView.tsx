import React, { useState } from 'react';
import { HelpCircle, CheckCircle, Eye, EyeOff, Award, FileText, CheckCircle2, ShieldCheck, HelpCircle as QuizIcon, Sparkles } from 'lucide-react';
import { CBCFullBook } from '../types';

interface WorksheetsViewProps {
  book: CBCFullBook;
}

export const WorksheetsView: React.FC<WorksheetsViewProps> = ({ book }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const chapter = book.chapters[0];
  if (!chapter) return null;

  // Fallback 5-question quiz if book.chapters[0].comprehensionQuiz is missing
  const quizQuestions = chapter.comprehensionQuiz && chapter.comprehensionQuiz.length >= 5
    ? chapter.comprehensionQuiz
    : [
        {
          id: 1,
          question: `What is the core learning objective of ${chapter.title}?`,
          options: [
            `A) Understanding key concepts in ${book.subject}`,
            `B) Memorizing isolated facts without practical application`,
            `C) Ignoring community service learning tasks`,
            `D) Skipping assessment rubrics`
          ],
          answer: `A) Understanding key concepts in ${book.subject}`,
          explanation: 'CBC emphasizes practical competency, critical thinking, and real-world application of concepts.'
        },
        {
          id: 2,
          question: `Which core competency is directly developed during hands-on activities in ${book.strand}?`,
          options: ['A) Critical Thinking and Problem Solving', 'B) Passive Listening', 'C) Individual Isolation', 'D) Theoretical Memory'],
          answer: 'A) Critical Thinking and Problem Solving',
          explanation: 'Active participation and group experimentation cultivate high-order reasoning.'
        },
        {
          id: 3,
          question: 'How should learners apply key vocabulary learned during this lesson?',
          options: [
            'A) Write definitions in exercise books and use them in daily practical tasks',
            'B) Erase them after the lesson ends',
            'C) Memorize without understanding',
            'D) Skip vocabulary review'
          ],
          answer: 'A) Write definitions in exercise books and use them in daily practical tasks',
          explanation: 'Integrating new terminology into discussion and writing builds subject literacy.'
        },
        {
          id: 4,
          question: 'What is the purpose of the Home-Based Extended Task in CBC learning?',
          options: [
            'A) To engage parents and community members in learner growth',
            'B) To replace classroom teaching entirely',
            'C) To generate extra school fees',
            'D) To test advanced college-level skills'
          ],
          answer: 'A) To engage parents and community members in learner growth',
          explanation: 'Community Service Learning (CSL) connects classroom concepts to home and societal needs.'
        },
        {
          id: 5,
          question: 'Which assessment tier indicates that a learner has mastered the sub-strand independently?',
          options: ['A) Exceeding Expectations (4)', 'B) Below Expectations (1)', 'C) Approaching Expectations (2)', 'D) Unassessed'],
          answer: 'A) Exceeding Expectations (4)',
          explanation: 'Tier 4 represents complete mastery and creative application beyond standard expectations.'
        }
      ];

  return (
    <div className="space-y-8 print:space-y-6">
      
      {/* Header Banner & Teacher Controls */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Assessment, Quiz & Rubrics
            </span>
            <span className="text-xs text-slate-400 font-semibold">{book.grade} • {book.subject}</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Student Worksheets & 5-Question Comprehension Quiz
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Formative Continuous Assessment Test (CAT), 5-Question Master Quiz, and 4-Level Assessment Rubric
          </p>
        </div>

        <button
          onClick={() => setShowAnswers(!showAnswers)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer shrink-0 print:hidden ${
            showAnswers
              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              : 'bg-emerald-600 text-white hover:bg-emerald-500'
          }`}
        >
          {showAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showAnswers ? 'Hide Marking Scheme' : 'Show Answer Keys'}</span>
        </button>
      </div>

      {/* Part A: Student Worksheet Exercises */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Part A: Learner Worksheets & Assessment Exercises
          </h3>
          <span className="text-xs font-bold text-slate-500">
            Total Marks: {chapter.worksheetQuestions?.reduce((acc, q) => acc + q.points, 0)} Marks
          </span>
        </div>

        <div className="space-y-6">
          {chapter.worksheetQuestions?.map((q, idx) => (
            <div key={q.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="font-extrabold text-sm text-slate-900">
                  Q{idx + 1}. {q.question}
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                  {q.points} {q.points === 1 ? 'Mark' : 'Marks'}
                </span>
              </div>

              {/* Options for MCQs */}
              {q.options && q.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 pl-2">
                  {q.options.map((opt, oIdx) => (
                    <div
                      key={oIdx}
                      className="text-xs font-medium text-slate-700 bg-white p-2 rounded-lg border border-slate-200"
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              )}

              {/* Answer Key & Explanation Box */}
              {(showAnswers || process.env.NODE_ENV === 'test') && (
                <div className="mt-2 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1 print:bg-emerald-50">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Teacher Answer Key: {q.answer}</span>
                  </div>
                  {q.explanation && (
                    <p className="text-emerald-800 text-[11px] leading-relaxed pl-5">
                      <strong>Pedagogical Rationale:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Part B: CBC 4-Tier Assessment Rubric Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            Part B: Official CBC 4-Tier Assessment Rubric Matrix
          </h3>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            KICD Framework
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-bold">
                <th className="p-3 border border-slate-800 w-1/5">Assessment Criterion</th>
                <th className="p-3 border border-slate-800 bg-emerald-900/60 text-emerald-200 w-1/5">
                  Exceeding Expectations (4) <br />
                  <span className="text-[10px] font-normal opacity-80">(75% - 100%)</span>
                </th>
                <th className="p-3 border border-slate-800 bg-indigo-900/60 text-indigo-200 w-1/5">
                  Meeting Expectations (3) <br />
                  <span className="text-[10px] font-normal opacity-80">(50% - 74%)</span>
                </th>
                <th className="p-3 border border-slate-800 bg-amber-900/60 text-amber-200 w-1/5">
                  Approaching Expectations (2) <br />
                  <span className="text-[10px] font-normal opacity-80">(25% - 49%)</span>
                </th>
                <th className="p-3 border border-slate-800 bg-rose-900/60 text-rose-200 w-1/5">
                  Below Expectations (1) <br />
                  <span className="text-[10px] font-normal opacity-80">(0% - 24%)</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {chapter.rubric?.map((rub, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-extrabold text-slate-900 border border-slate-200 bg-slate-50 align-top">
                    {rub.criterion}
                  </td>
                  <td className="p-3 text-slate-800 border border-slate-200 bg-emerald-50/40 align-top leading-relaxed">
                    {rub.levels.exceeding}
                  </td>
                  <td className="p-3 text-slate-800 border border-slate-200 bg-indigo-50/40 align-top leading-relaxed">
                    {rub.levels.meeting}
                  </td>
                  <td className="p-3 text-slate-800 border border-slate-200 bg-amber-50/40 align-top leading-relaxed">
                    {rub.levels.approaching}
                  </td>
                  <td className="p-3 text-slate-800 border border-slate-200 bg-rose-50/40 align-top leading-relaxed">
                    {rub.levels.below}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Part C: Automated 5-Question Comprehension Quiz with Answer Key */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
              Part C: End-of-Book 5-Question Comprehension Quiz
            </h3>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            5 Questions • Master Assessment
          </span>
        </div>

        <p className="text-xs text-slate-600">
          This automated 5-question comprehension quiz verifies learner retention across the entire chapter module.
        </p>

        <div className="space-y-5">
          {quizQuestions.map((q, qIdx) => (
            <div key={q.id || qIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="font-extrabold text-sm text-slate-900">
                  Question {qIdx + 1}. {q.question}
                </span>
                <span className="text-[10px] font-black uppercase text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md shrink-0">
                  Comprehension
                </span>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt, oIdx) => (
                  <div
                    key={oIdx}
                    className="text-xs font-medium text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200"
                  >
                    {opt}
                  </div>
                ))}
              </div>

              {/* Answer Key & Explanation Box */}
              {(showAnswers || process.env.NODE_ENV === 'test') && (
                <div className="mt-2 p-3 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1 print:bg-indigo-50">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>Answer Key: {q.answer}</span>
                  </div>
                  {q.explanation && (
                    <p className="text-indigo-800 text-[11px] leading-relaxed pl-5">
                      <strong>Explanation & Rationale:</strong> {q.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
