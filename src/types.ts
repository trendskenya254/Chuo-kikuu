export type GradeLevel = 
  | 'PP1' | 'PP2' // Pre-Primary / Early Years
  | 'Grade 1' | 'Grade 2' | 'Grade 3' // Lower Primary
  | 'Grade 4' | 'Grade 5' | 'Grade 6' // Upper Primary
  | 'Grade 7' | 'Grade 8' | 'Grade 9' // Junior Secondary
  | 'Grade 10' | 'Grade 11' | 'Grade 12' // Senior Secondary
  | 'Teacher Resources'; // Pedagogical & Administrative Resources

export type CurriculumSystem = 
  | 'CBC' 
  | '8-4-4 (Archive)' 
  | 'Cambridge' 
  | 'IGCSE' 
  | 'KCPE' 
  | 'KCSE';

export type BookCategory = 
  | 'Curriculum Designs'
  | 'Approved Course Materials'
  | 'Schemes of Work & Lesson Plans'
  | 'Assessment Rubrics & Tools'
  | 'Topical Revision Notes & Worksheets'
  | 'Digital Learning Repositories'
  | 'Student Textbook & Notes'
  | 'Teacher Guide & Schemes'
  | 'Holiday Homework Workbook'
  | 'Mid-Term / End-Term Exam & Marking Scheme'
  | 'Revision & Topical Practice'
  | 'Practical, STEM & Coding Book'
  | 'Early Years Coloring & Tracing';

export type CBCSubject = 
  | 'Mathematical Activities'
  | 'Language Activities / Indigenous Language'
  | 'Environmental Activities'
  | 'Psychomotor and Creative Activities'
  | 'Religious Education Activities (CRE/IRE/HRE)'
  | 'Mathematics'
  | 'English Language'
  | 'English'
  | 'Kiswahili Language / Kenya Sign Language'
  | 'Kiswahili Language'
  | 'Kiswahili'
  | 'Hygiene and Nutrition Activities'
  | 'Religious Education (CRE / IRE / HRE)'
  | 'Movement and Creative Activities'
  | 'Science and Technology'
  | 'Science & Technology'
  | 'Agriculture and Nutrition'
  | 'Agriculture & Nutrition'
  | 'Social Studies'
  | 'Social Studies (Citizenship, Geography, History)'
  | 'Creative Arts (Music, Art & Craft)'
  | 'Creative Arts & Sports'
  | 'Integrated Science'
  | 'Integrated Science (Biology, Chemistry, Physics)'
  | 'Health Education'
  | 'Business Studies'
  | 'Agriculture'
  | 'Pre-Technical Studies'
  | 'Coding, Robotics & AI'
  | 'Physical Education'
  | 'Computer Studies'
  | 'Home Science'
  | 'Foreign Languages (French/German/Mandarin)'
  | 'Financial Literacy'
  | 'STEM: Pure Sciences'
  | 'STEM: Applied Sciences & Technology'
  | 'STEM: Technical & Engineering'
  | 'Social Sciences: Humanities & Citizenship'
  | 'Social Sciences: Business & Commerce'
  | 'Arts & Sports Science'
  | string;

export type TargetAudience = 'Full Book' | 'Teacher Edition' | 'Student Edition' | 'School Assessment';

export interface SchoolBranding {
  schoolName: string;
  motto: string;
  teacherName: string;
  className: string;
  term: string;
  year: string;
  coverTheme: 'emerald' | 'crimson' | 'navy' | 'amber' | 'purple';
}

export interface AssessmentRubricLevel {
  exceeding: string;
  meeting: string;
  approaching: string;
  below: string;
}

export interface RubricCriteria {
  criterion: string;
  levels: AssessmentRubricLevel;
}

export interface WorksheetQuestion {
  id: string;
  type: 'mcq' | 'short' | 'fill' | 'practical';
  question: string;
  options?: string[]; // for MCQs
  answer: string;
  explanation?: string;
  points: number;
}

export interface PracticalActivity {
  title: string;
  type: 'Individual' | 'Group Collaboration' | 'Home-Based CSL';
  materialsNeeded: string[];
  stepByStepGuide: string[];
  expectedOutput: string;
  competencyAssessed: string;
}

export interface LessonPlanStep {
  phase: 'Introduction (5 mins)' | 'Lesson Development (25 mins)' | 'Conclusion & Reflection (10 mins)';
  teacherActivities: string;
  learnerActivities: string;
  assessmentStrategy: string;
}

export interface ComprehensionQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface CBCBookChapter {
  chapterNumber: number;
  title: string;
  subStrand: string;
  keyInquiryQuestions: string[];
  learningOutcomes: {
    knowledge: string[];
    skills: string[];
    attitudes: string[];
  };
  coreCompetencies: string[];
  values: string[];
  pertinentIssues: string[]; // PCIs
  textbookContent: {
    sectionTitle: string;
    bodyMarkdown: string;
    keyVocabulary: { term: string; definition: string }[];
    funFacts: string[];
  }[];
  lessonPlan: {
    learningResources: string[];
    steps: LessonPlanStep[];
    keyVocabulary?: { term: string; definition: string }[];
    differentiationNotes: {
      fastLearners: string;
      slowLearners: string;
      specialNeeds: string;
    };
  };
  practicalActivities: PracticalActivity[];
  worksheetQuestions: WorksheetQuestion[];
  comprehensionQuiz?: ComprehensionQuestion[];
  rubric: RubricCriteria[];
  flashcards: { front: string; back: string }[];
}

export type DifficultyLevel = 'Remedial' | 'Standard' | 'Enrichment';

export interface ExternalResource {
  id: string;
  title: string;
  type: 'link' | 'note' | 'video' | 'book';
  url?: string;
  note?: string;
  createdAt: string;
}

export interface CBCFullBook {
  id: string;
  title: string;
  grade: GradeLevel;
  subject: CBCSubject;
  strand: string;
  subStrand: string;
  topicPrompt: string;
  targetAudience: TargetAudience;
  curriculumSystem?: CurriculumSystem;
  bookCategory?: BookCategory;
  difficultyLevel?: DifficultyLevel;
  createdAt: string;
  branding: SchoolBranding;
  chapters: CBCBookChapter[];
  teacherOverviewNotes: string;
  studentSummaryNotes: string;
  externalResources?: ExternalResource[];

  // Administrative metadata fields
  curriculumVersion?: string;
  documentRefId?: string;
  schoolCode?: string;
  qualityStatus?: string;
  isProcessing?: boolean;
  processingProgress?: number;
  indexingStatus?: 'complete' | 'indexing' | 'pending';
}

export interface GenerationRequest {
  topic: string;
  grade: GradeLevel;
  subject: CBCSubject;
  strand?: string;
  subStrand?: string;
  curriculumSystem?: CurriculumSystem;
  bookCategory?: BookCategory;
  difficultyLevel?: DifficultyLevel;
  branding: SchoolBranding;
  audience: TargetAudience;
}
