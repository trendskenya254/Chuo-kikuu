import React from 'react';
import { CBCFullBook } from '../types';
import { CheckCircle2, MessageSquare, ShieldCheck, Award, Star, UserCheck, HeartHandshake, FileCheck, BookmarkCheck } from 'lucide-react';

interface ProgressAndTrackerViewProps {
  book: CBCFullBook;
  showTeacherRemarks?: boolean;
}

export const ProgressAndTrackerView: React.FC<ProgressAndTrackerViewProps> = ({
  book,
  showTeacherRemarks = true,
}) => {
  const chapter = book.chapters[0];
  const branding = book.branding;

  return (
    <div className="space-y-8 print:space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-blue-500/20 text-blue-300 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-blue-400/30">
            Master Assessment & Reporting
          </span>
          <span className="text-xs text-slate-400 font-semibold">{book.grade} • {book.subject}</span>
        </div>
        <h2 className="text-xl font-black text-white">
          Progress Tracker, Teacher Remarks & Parent Feedback
        </h2>
        <p className="text-xs text-slate-300 mt-0.5">
          Standardized learner performance record, parent-teacher feedback log, and official master verification
        </p>
      </div>

      {/* 1. Student Competency Progress Tracker Matrix */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Award className="w-5 h-5 text-blue-600" />
          <h3 className="text-base font-extrabold text-slate-900 uppercase">
            1. Learner Competency Progress Tracker
          </h3>
        </div>

        <p className="text-xs text-slate-600">
          This tracking table records the learner's performance level across core strands, sub-strands, and practical assignments.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-extrabold border-b border-slate-300 uppercase tracking-wider">
                <th className="p-3 border border-slate-200">Strand / Sub-Strand</th>
                <th className="p-3 border border-slate-200 text-center">Exceeding (4)</th>
                <th className="p-3 border border-slate-200 text-center">Meeting (3)</th>
                <th className="p-3 border border-slate-200 text-center">Approaching (2)</th>
                <th className="p-3 border border-slate-200 text-center">Below (1)</th>
                <th className="p-3 border border-slate-200">Date & Initial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-slate-900">
                  {book.strand || 'Core Concept Strand'}
                </td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-slate-400 italic">___/___/20__</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-slate-900">
                  {book.subStrand || 'Key Sub-Strand Focus'}
                </td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-slate-400 italic">___/___/20__</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-slate-900">
                  Hands-on Practical & Group Collaboration
                </td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-slate-400 italic">___/___/20__</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-slate-900">
                  Home-Based Extended Learning Task
                </td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-slate-400 italic">___/___/20__</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold text-slate-900">
                  Formative Comprehension Quiz & CAT
                </td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-center text-slate-300">[ &nbsp; ]</td>
                <td className="p-3 border border-slate-200 text-slate-400 italic">___/___/20__</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Teacher Remarks & Parent Feedback Section */}
      {showTeacherRemarks && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Teacher Remarks Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <UserCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-extrabold text-slate-900 uppercase">
                2. Teacher's Assessment & Remarks
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-extrabold text-slate-800 uppercase block mb-1">
                  Teacher Name: <span className="text-emerald-700">{branding.teacherName || 'Mwalimu'}</span>
                </span>
                <p className="text-slate-600 italic border-l-2 border-emerald-500 pl-3 py-1 bg-emerald-50/50 rounded-r-lg">
                  "The learner demonstrated good understanding of core principles in {book.subject}. Continued practice at home is recommended."
                </p>
              </div>

              <div className="pt-2">
                <span className="font-extrabold text-slate-800 uppercase block mb-1">General Recommendations / Action Plan:</span>
                <div className="border border-dashed border-slate-300 rounded-xl p-3 min-h-[80px] text-slate-400 italic">
                  [Teacher feedback, remedial strategies, or encouragement notes...]
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[11px]">
                <span>Sign: __________________________</span>
                <span>Date: ____/____/20__</span>
              </div>
            </div>
          </div>

          {/* Parent / Guardian Feedback Box */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              <h3 className="text-base font-extrabold text-slate-900 uppercase">
                3. Parent / Guardian Feedback & Signature
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-extrabold text-slate-800 uppercase block mb-1">
                  Home Project & Extended Task Observations:
                </span>
                <p className="text-slate-600">
                  Please comment on how the learner completed the home-based activity with family support:
                </p>
              </div>

              <div className="border border-dashed border-slate-300 rounded-xl p-3 min-h-[80px] text-slate-400 italic">
                [Parent/Guardian feedback, home activity comments, or questions for teacher...]
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-[11px]">
                <span>Parent Sign: __________________________</span>
                <span>Date: ____/____/20__</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 3. Official End Page & Publishing Certification */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white p-8 rounded-3xl border border-slate-800 shadow-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-black uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Internal Education Brain • Master Publication Standards
        </div>

        <div className="max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-black text-white">
            {branding.schoolName} Digital Coursebook & Workbook
          </h3>
          <p className="text-xs text-slate-300">
            {branding.motto || 'Knowledge is Power & Conservation is Life'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left text-xs bg-white/5 p-4 rounded-2xl border border-white/10">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Curriculum</span>
            <span className="font-bold text-white">{book.curriculumSystem || 'CBC'}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Grade & Term</span>
            <span className="font-bold text-white">{book.grade} • {branding.term}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Subject</span>
            <span className="font-bold text-white">{book.subject}</span>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block">Year & Status</span>
            <span className="font-bold text-emerald-400">{branding.year} • VERIFIED</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic max-w-xl mx-auto">
          Generated, formatted, typeset, and preserved offline by the Internal Education Brain publishing house. All learning materials are aligned to official national curriculum frameworks and ready for print and classroom distribution.
        </p>

        <div className="pt-2 text-[10px] text-slate-500 font-mono tracking-widest uppercase">
          Document ID: {book.id} • Master Copy Registered in Local Library
        </div>
      </div>

    </div>
  );
};
