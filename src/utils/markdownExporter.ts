import { CBCFullBook } from '../types';

export function convertBookToMarkdown(book: CBCFullBook): string {
  const chapter = book.chapters[0];
  const dateStr = new Date(book.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  let md = `# ${book.title.toUpperCase()}
*Competency-Based Curriculum (CBC) Coursebook & Material*

**Grade Level:** ${book.grade}  
**Subject Area:** ${book.subject}  
**Strand:** ${book.strand}  
**Sub-Strand:** ${book.subStrand}  
**Target Scope:** ${book.targetAudience}  
**Date Generated:** ${dateStr}  

---

## SCHOOL BRANDING & ADMINISTRATIVE DETAILS
- **School Name:** ${book.branding.schoolName}
- **School Motto:** "${book.branding.motto}"
- **Instructor / Teacher:** ${book.branding.teacherName}
- **Class / Stream:** ${book.branding.className}
- **Academic Term:** ${book.branding.term}, ${book.branding.year}

---

## CURRICULUM OVERVIEW
${book.teacherOverviewNotes}

---

## SECTION 1: TEACHER INSTRUCTIONAL GUIDE & SCHEMES

### Curriculum Alignment Matrix
- **Core Competencies:** ${chapter?.coreCompetencies?.join(', ') || 'Critical thinking, Creativity, Collaboration'}
- **Values:** ${chapter?.values?.join(', ') || 'Responsibility, Integrity, Respect'}
- **Pertinent & Contemporary Issues (PCIs):** ${chapter?.pertinentIssues?.join(', ') || 'Environmental conservation, Health education'}

### Key Inquiry Questions (KIQs)
${chapter?.keyInquiryQuestions?.map((q, i) => `${i + 1}. ${q}`).join('\n') || ''}

### Learning Outcomes
#### Knowledge
${chapter?.learningOutcomes?.knowledge?.map((k) => `- ${k}`).join('\n') || ''}

#### Skills
${chapter?.learningOutcomes?.skills?.map((s) => `- ${s}`).join('\n') || ''}

#### Attitudes
${chapter?.learningOutcomes?.attitudes?.map((a) => `- ${a}`).join('\n') || ''}

### Timetabled 40-Minute Step-by-Step Lesson Plan
**Learning Resources Required:**  
${chapter?.lessonPlan?.learningResources?.map((r) => `- ${r}`).join('\n') || ''}

| Phase | Teacher Activities | Learner Activities | Assessment Strategy |
| --- | --- | --- | --- |
${
  chapter?.lessonPlan?.steps
    ?.map(
      (s) =>
        `| **${s.phase}** | ${s.teacherActivities.replace(/\n/g, ' ')} | ${s.learnerActivities.replace(/\n/g, ' ')} | ${s.assessmentStrategy.replace(/\n/g, ' ')} |`
    )
    .join('\n') || ''
}

### Differentiated Learning Strategies
- **Fast Learners (Extended Enrichment):** ${chapter?.lessonPlan?.differentiationNotes?.fastLearners || ''}
- **Slow Learners (Remedial Support):** ${chapter?.lessonPlan?.differentiationNotes?.slowLearners || ''}
- **Special Needs & Inclusivity:** ${chapter?.lessonPlan?.differentiationNotes?.specialNeeds || ''}

---

## SECTION 2: STUDENT TEXTBOOK & PRACTICAL ACTIVITIES

${
  chapter?.textbookContent
    ?.map(
      (sec, idx) => `
### ${idx + 1}. ${sec.sectionTitle}

${sec.bodyMarkdown}

#### Key Vocabulary
${sec.keyVocabulary?.map((v) => `- **${v.term}**: ${v.definition}`).join('\n')}

#### CBC "Did You Know?"
${sec.funFacts?.map((f) => `> 💡 ${f}`).join('\n')}
`
    )
    .join('\n\n') || ''
}

### Hands-On Practical Investigations & CSL Tasks
${
  chapter?.practicalActivities
    ?.map(
      (p, i) => `
#### Practical ${i + 1}: ${p.title} (${p.type})
- **Competency Assessed:** ${p.competencyAssessed}
- **Materials Needed:** ${p.materialsNeeded.join(', ')}
- **Step-by-Step Guide:**
${p.stepByStepGuide.map((step, sIdx) => `  ${sIdx + 1}. ${step}`).join('\n')}
- **Expected Output:** ${p.expectedOutput}
`
    )
    .join('\n') || ''
}

---

## SECTION 3: WORKSHEETS & ASSESSMENT RUBRICS

### Formative Assessment & CAT Questions
${
  chapter?.worksheetQuestions
    ?.map(
      (q, i) => `
**Q${i + 1} (${q.points} Marks) - [${q.type.toUpperCase()}]:**  
${q.question}
${q.options ? q.options.map((opt, oIdx) => `  ${String.fromCharCode(65 + oIdx)}. ${opt}`).join('\n') : ''}  
*Answer Key:* ${q.answer}  
*Teacher Explanation:* ${q.explanation || 'N/A'}
`
    )
    .join('\n---\n') || ''
}

### Official 4-Tier CBC Assessment Rubric Matrix
| Assessment Criteria | Exceeding Expectations (4) | Meeting Expectations (3) | Approaching Expectations (2) | Below Expectations (1) |
| --- | --- | --- | --- | --- |
${
  chapter?.rubric
    ?.map(
      (r) =>
        `| **${r.criterion}** | ${r.levels.exceeding} | ${r.levels.meeting} | ${r.levels.approaching} | ${r.levels.below} |`
    )
    .join('\n') || ''
}

---

## SECTION 4: REVISION FLASHCARDS & SUMMARY

### Key Term Flashcards
${
  chapter?.flashcards
    ?.map((fc, i) => `**Card ${i + 1}:**  \n- **Concept:** ${fc.front}  \n- **Definition:** ${fc.back}\n`)
    .join('\n') || ''
}

### Student Summary Notes
${book.studentSummaryNotes}

---
*Generated with Kenya CBC Full Book Generator Studio*
`;

  return md;
}

export function downloadBookAsMarkdown(book: CBCFullBook): void {
  const mdContent = convertBookToMarkdown(book);
  const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = `${book.grade}_${book.subject}_${book.title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .slice(0, 50);
  link.setAttribute('download', `${safeFilename}_cbc_book.md`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
