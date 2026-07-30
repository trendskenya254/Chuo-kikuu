import { CBCFullBook } from '../types';

export type BookScope = 'full' | 'teacher' | 'student' | 'assessment';

export function generateRichHTMLContent(book: CBCFullBook, scope: BookScope = 'full'): string {
  const chapter = book.chapters[0];
  const dateStr = new Date(book.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const includeTeacher = scope === 'full' || scope === 'teacher';
  const includeStudent = scope === 'full' || scope === 'student';
  const includeAssessment = scope === 'full' || scope === 'assessment';
  const includeCover = scope === 'full' || scope === 'teacher';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${book.title} - CBC Coursebook</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #f8fafc; color: #0f172a; }
    @media print {
      body { background-color: white; padding: 0; }
      .page-break { page-break-after: always; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body class="p-4 sm:p-8 md:p-12 max-w-5xl mx-auto space-y-10">

  <!-- Download Header Bar -->
  <header class="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
    <div>
      <div className="flex items-center gap-2">
        <span class="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
          Kenya CBC Curriculum Package (KES 49 Paid)
        </span>
        <span class="text-xs text-slate-400 font-mono">Scope: ${scope.toUpperCase()} EDITION</span>
      </div>
      <h1 class="text-xl font-black text-white mt-1">${book.title}</h1>
      <p class="text-xs text-slate-300">${book.branding?.schoolName} • ${book.grade} • ${book.subject}</p>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="window.print()" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer">
        Print / Save as PDF
      </button>
    </div>
  </header>

  ${
    includeCover
      ? `
  <!-- COVER PAGE -->
  <section class="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl border border-indigo-800 shadow-2xl space-y-8 page-break">
    <div class="flex items-center justify-between border-b border-indigo-700/50 pb-4">
      <span class="bg-amber-400 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
        Official CBC Coursebook
      </span>
      <span class="text-xs font-extrabold text-indigo-200 uppercase tracking-wider">
        ${book.branding?.term || 'Term 1'} ${book.branding?.year || '2026'}
      </span>
    </div>

    <div class="space-y-4 py-6">
      <div class="inline-block bg-blue-500/20 text-blue-300 text-xs font-bold px-3 py-1 rounded-lg border border-blue-400/30">
        ${book.grade} • ${book.subject}
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
        ${book.title}
      </h1>
      <p class="text-sm sm:text-base text-indigo-100 font-medium max-w-2xl">
        Strand: ${book.strand} — Sub-Strand: ${book.subStrand}
      </p>
    </div>

    <div class="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
      <div>
        <span class="text-indigo-300 font-bold uppercase block text-[10px]">Institution</span>
        <span class="text-white font-extrabold text-sm block">${book.branding?.schoolName}</span>
        <span class="text-indigo-200 italic text-[11px]">"${book.branding?.motto}"</span>
      </div>
      <div>
        <span class="text-indigo-300 font-bold uppercase block text-[10px]">Instructor / Class</span>
        <span class="text-white font-extrabold text-sm block">${book.branding?.teacherName}</span>
        <span class="text-indigo-200 text-[11px]">${book.branding?.className}</span>
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- CURRICULUM OVERVIEW -->
  <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 page-break">
    <div class="border-b border-slate-200 pb-3 flex items-center justify-between">
      <div>
        <span class="text-[10px] font-black uppercase text-blue-600 tracking-wider block">
          Curriculum Overview & Architecture
        </span>
        <h2 class="text-2xl font-black text-slate-900">Table of Contents & Module Structure</h2>
      </div>
      <span class="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
        ${book.grade} • ${book.subject}
      </span>
    </div>

    <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs leading-relaxed text-slate-700">
      <h3 class="font-extrabold text-slate-900 uppercase mb-1">Teacher Overview & Pedagogy</h3>
      <p>${book.teacherOverviewNotes}</p>
    </div>
  </section>

  ${
    includeTeacher
      ? `
  <!-- SECTION 1: TEACHER INSTRUCTIONAL GUIDE -->
  <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 page-break">
    <div class="border-b border-slate-200 pb-3">
      <span class="text-[10px] font-black uppercase text-blue-600 tracking-wider block">Section 1</span>
      <h2 class="text-2xl font-black text-slate-900">Teacher Instructional Guide & Schemes</h2>
    </div>

    <!-- Alignment Matrix -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
      <div class="bg-blue-50/60 p-4 rounded-xl border border-blue-100">
        <h4 class="font-extrabold text-blue-950 uppercase mb-2">Core Competencies</h4>
        <ul class="space-y-1 text-blue-900 font-medium">
          ${chapter?.coreCompetencies?.map((c) => `<li>• ${c}</li>`).join('') || ''}
        </ul>
      </div>
      <div class="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
        <h4 class="font-extrabold text-emerald-950 uppercase mb-2">Values</h4>
        <ul class="space-y-1 text-emerald-900 font-medium">
          ${chapter?.values?.map((v) => `<li>• ${v}</li>`).join('') || ''}
        </ul>
      </div>
      <div class="bg-amber-50/60 p-4 rounded-xl border border-amber-100">
        <h4 class="font-extrabold text-amber-950 uppercase mb-2">PCIs</h4>
        <ul class="space-y-1 text-amber-900 font-medium">
          ${chapter?.pertinentIssues?.map((p) => `<li>• ${p}</li>`).join('') || ''}
        </ul>
      </div>
    </div>

    <!-- KIQs -->
    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
      <h3 class="text-xs font-black text-slate-900 uppercase">Key Inquiry Questions (KIQs)</h3>
      <ol class="list-decimal list-inside text-xs font-semibold text-slate-800 space-y-1">
        ${chapter?.keyInquiryQuestions?.map((q) => `<li>${q}</li>`).join('') || ''}
      </ol>
    </div>

    <!-- Lesson Plan Table -->
    <div class="space-y-3">
      <h3 class="text-xs font-black text-slate-900 uppercase">40-Minute Step-by-Step Lesson Plan</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-slate-800 text-white font-bold">
              <th class="p-3 rounded-tl-xl">Phase</th>
              <th class="p-3">Teacher Activities</th>
              <th class="p-3">Learner Activities</th>
              <th class="p-3 rounded-tr-xl">Assessment</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-slate-800">
            ${
              chapter?.lessonPlan?.steps
                ?.map(
                  (s, idx) => `
              <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}">
                <td class="p-3 font-extrabold text-blue-900 whitespace-nowrap">${s.phase}</td>
                <td class="p-3">${s.teacherActivities}</td>
                <td class="p-3">${s.learnerActivities}</td>
                <td class="p-3 font-medium text-slate-600">${s.assessmentStrategy}</td>
              </tr>
            `
                )
                .join('') || ''
            }
          </tbody>
        </table>
      </div>
    </div>
  </section>
  `
      : ''
  }

  ${
    includeStudent
      ? `
  <!-- SECTION 2: STUDENT TEXTBOOK & PRACTICALS -->
  <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 page-break">
    <div class="border-b border-slate-200 pb-3">
      <span class="text-[10px] font-black uppercase text-emerald-600 tracking-wider block">Section 2</span>
      <h2 class="text-2xl font-black text-slate-900">Student Textbook & Practical Investigations</h2>
    </div>

    ${
      chapter?.textbookContent
        ?.map(
          (sec) => `
      <div class="space-y-4 border-b border-slate-100 pb-6">
        <h3 class="text-lg font-black text-slate-900">${sec.sectionTitle}</h3>
        <div class="prose max-w-none text-xs leading-relaxed text-slate-800">
          ${sec.bodyMarkdown.replace(/\n/g, '<br/>')}
        </div>

        ${
          sec.keyVocabulary?.length
            ? `
          <div class="bg-emerald-50/80 p-4 rounded-xl border border-emerald-200 space-y-2">
            <h4 class="text-xs font-black text-emerald-950 uppercase">Key Vocabulary</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              ${sec.keyVocabulary
                .map(
                  (v) => `
                <div>
                  <span class="font-extrabold text-emerald-900">${v.term}:</span>
                  <span class="text-emerald-800 font-medium">${v.definition}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `
            : ''
        }
      </div>
    `
        )
        .join('') || ''
    }

    <!-- Practicals -->
    ${
      chapter?.practicalActivities?.length
        ? `
      <div class="space-y-4 pt-4">
        <h3 class="text-sm font-black text-slate-900 uppercase">Hands-on Practical Activities</h3>
        ${chapter.practicalActivities
          .map(
            (p) => `
          <div class="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-3 text-xs">
            <div class="flex items-center justify-between">
              <h4 class="font-extrabold text-amber-950 text-sm">${p.title} (${p.type})</h4>
              <span class="bg-amber-200 text-amber-950 font-bold px-2.5 py-0.5 rounded-full">${p.competencyAssessed}</span>
            </div>
            <div>
              <span class="font-bold text-amber-900 block">Materials Needed:</span>
              <p class="text-amber-800">${p.materialsNeeded.join(', ')}</p>
            </div>
            <div>
              <span class="font-bold text-amber-900 block">Guide:</span>
              <ol class="list-decimal list-inside space-y-1 text-amber-900 font-medium">
                ${p.stepByStepGuide.map((step) => `<li>${step}</li>`).join('')}
              </ol>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `
        : ''
    }
  </section>
  `
      : ''
  }

  ${
    includeAssessment
      ? `
  <!-- SECTION 3: WORKSHEETS & RUBRICS -->
  <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 page-break">
    <div class="border-b border-slate-200 pb-3">
      <span class="text-[10px] font-black uppercase text-amber-600 tracking-wider block">Section 3</span>
      <h2 class="text-2xl font-black text-slate-900">Worksheets & Assessment Rubrics</h2>
    </div>

    <!-- Worksheet Questions -->
    <div class="space-y-4">
      <h3 class="text-xs font-black text-slate-900 uppercase">Formative Assessment Questions</h3>
      ${
        chapter?.worksheetQuestions
          ?.map(
            (q, idx) => `
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div class="flex items-center justify-between font-bold">
            <span class="text-slate-900">Question ${idx + 1} (${q.type.toUpperCase()})</span>
            <span class="text-blue-700 bg-blue-100 px-2 py-0.5 rounded">${q.points} Marks</span>
          </div>
          <p class="font-semibold text-slate-900">${q.question}</p>
          ${
            q.options
              ? `
            <div class="grid grid-cols-2 gap-2 font-medium text-slate-700 pt-1">
              ${q.options.map((opt) => `<div>${opt}</div>`).join('')}
            </div>
          `
              : ''
          }
          <div class="pt-2 border-t border-slate-200 text-slate-600 text-[11px]">
            <span class="font-bold text-emerald-800">Answer: ${q.answer}</span>
            ${q.explanation ? `<p class="italic text-slate-500 mt-0.5">Explanation: ${q.explanation}</p>` : ''}
          </div>
        </div>
      `
          )
          .join('') || ''
      }
    </div>

    <!-- 4-Tier Rubric Table -->
    <div class="space-y-3 pt-4">
      <h3 class="text-xs font-black text-slate-900 uppercase">Official 4-Tier CBC Assessment Rubric</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-xs border-collapse">
          <thead>
            <tr class="bg-slate-800 text-white font-bold">
              <th class="p-2.5">Criterion</th>
              <th class="p-2.5 bg-emerald-800">Exceeding (4)</th>
              <th class="p-2.5 bg-blue-800">Meeting (3)</th>
              <th class="p-2.5 bg-amber-800">Approaching (2)</th>
              <th class="p-2.5 bg-rose-800">Below (1)</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-slate-800">
            ${
              chapter?.rubric
                ?.map(
                  (r) => `
              <tr>
                <td class="p-2.5 font-extrabold text-slate-900 bg-slate-100">${r.criterion}</td>
                <td class="p-2.5 bg-emerald-50">${r.levels.exceeding}</td>
                <td class="p-2.5 bg-blue-50">${r.levels.meeting}</td>
                <td class="p-2.5 bg-amber-50">${r.levels.approaching}</td>
                <td class="p-2.5 bg-rose-50">${r.levels.below}</td>
              </tr>
            `
                )
                .join('') || ''
            }
          </tbody>
        </table>
      </div>
    </div>
  </section>
  `
      : ''
  }

  <!-- FOOTER -->
  <footer class="text-center text-xs text-slate-400 py-6 border-t border-slate-200 no-print">
    <p>Generated with Kenya CBC Curriculum Architect — ${dateStr}</p>
  </footer>

</body>
</html>`;
}

export function downloadBookAsRichHTML(book: CBCFullBook, scope: BookScope = 'full'): void {
  const htmlContent = generateRichHTMLContent(book, scope);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = `${book.grade}_${book.subject}_${scope}_edition`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, 50);
  link.setAttribute('download', `${safeFilename}_cbc_book.html`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
