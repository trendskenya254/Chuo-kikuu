import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { PRESET_CBC_BOOKS } from './src/data/presetBooks';
import { GenerationRequest, CBCFullBook } from './src/types';
import { pesapalRouter } from './src/server/pesapal';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Mount PesaPal Payment Gateway Routes
  app.use('/api/pesapal', pesapalRouter);

  // Shared Gemini client instance
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is missing.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  };

  // API Route: Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route: Fetch Preset CBC Books
  app.get('/api/cbc/presets', (req, res) => {
    res.json({ success: true, data: PRESET_CBC_BOOKS });
  });

  // API Route: Generate CBC Full Book via Gemini
  app.post('/api/cbc/generate', async (req, res) => {
    try {
      const payload: GenerationRequest = req.body;
      const { topic, grade, subject, strand, subStrand, branding, audience } = payload;

      if (!topic || !topic.trim()) {
        res.status(400).json({ error: 'Topic/Prompt is required.' });
        return;
      }

      const ai = getGenAI();

      const systemInstruction = `You are a Senior Curriculum Specialist and Master Educator specializing in the Competency-Based Curriculum (CBC).
Your task is to generate a full, highly detailed, pedagogical, and production-ready CBC Coursebook / Learning Resource Module in strict JSON format.

Every CBC resource MUST adhere to these official standards:
1. CURRICULUM FRAMEWORK:
   - Grade Level: ${grade || 'Grade 4'}
   - Subject: ${subject || 'General Science'}
   - Strand & Sub-strand
   - 7 Core Competencies (Communication & Collaboration, Critical Thinking & Problem Solving, Creativity & Imagination, Self-efficacy, Digital Literacy, Citizenship, Learning to Learn)
   - Values (Love, Respect, Unity, Integrity, Responsibility, Patriotism, Peace)
   - Pertinent & Contemporary Issues (PCIs - Environmental, Health, Financial Literacy, Safety)
   - Key Inquiry Questions (KIQs - open-ended, thought-provoking questions)
   - Specific Learning Outcomes (Knowledge, Skills, Attitudes)

2. TEACHER'S LESSON PLAN (40 mins):
   - Introduction (5 mins) with diagnostic starter
   - Lesson Development (25 mins) with active learner participation
   - Conclusion & Reflection (10 mins) with exit checks
   - Key Vocabulary Section at the end of the lesson plan (3-5 core terms with definitions for student mastery)
   - Differentiated learning notes (Fast learners, slow learners, special needs)

3. STUDENT TEXTBOOK MODULE:
   - Clear explanatory sections written at the appropriate reading age for ${grade}
   - Key Vocabulary with definitions
   - CBC "Did You Know?" / "Fun Facts" callouts

4. HANDS-ON PRACTICAL ACTIVITIES:
   - Individual investigation
   - Group collaboration activity (peer teamwork)
   - Home-Based Extended Learning Task (parental & community involvement)

5. ASSESSMENT, COMPREHENSION QUIZ & RUBRICS:
   - 5-Question Comprehension Quiz (5 multiple-choice questions testing student mastery, each with 4 options, exact correct answer, and explanation)
   - 4-Tier Rubric Matrix (Exceeding Expectations, Meeting Expectations, Approaching Expectations, Below Expectations)
   - Worksheets with MCQs, fill-in-the-blanks, short answer questions, and full answer keys.
   - Quick-revision Flashcards.

Make the content comprehensive, highly educational, engaging, realistic, and rich in detail. Return ONLY valid JSON adhering to the provided schema.`;

      const userPrompt = `Generate a full Learning Book & Module for the following request:
Topic / Prompt: "${topic}"
Curriculum System: ${req.body.curriculumSystem || 'CBC'}
Book Type / Category: ${req.body.bookCategory || 'Student Textbook & Notes'}
Target Grade: ${grade}
Subject: ${subject}
Strand: ${strand || 'Core Concept Strand'}
Sub-Strand: ${subStrand || 'Key Sub-Strand'}
Audience View: ${audience || 'Full Book'}
Difficulty Level: ${req.body.difficultyLevel || 'Standard'}
School Name: ${branding?.schoolName || 'CHUO KIKUU ACADEMY'}
Teacher Name: ${branding?.teacherName || 'Mwalimu'}

Generate 1 comprehensive chapter packed with detailed textbook explanations, 40-min lesson plan with end-of-plan key vocabulary, group practicals, home-based activity, 5-question comprehension quiz with answer key, worksheet with answer key, rubrics, and flashcards.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              strand: { type: Type.STRING },
              subStrand: { type: Type.STRING },
              teacherOverviewNotes: { type: Type.STRING },
              studentSummaryNotes: { type: Type.STRING },
              chapters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    chapterNumber: { type: Type.INTEGER },
                    title: { type: Type.STRING },
                    subStrand: { type: Type.STRING },
                    keyInquiryQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                    learningOutcomes: {
                      type: Type.OBJECT,
                      properties: {
                        knowledge: { type: Type.ARRAY, items: { type: Type.STRING } },
                        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
                        attitudes: { type: Type.ARRAY, items: { type: Type.STRING } }
                      },
                      required: ['knowledge', 'skills', 'attitudes']
                    },
                    coreCompetencies: { type: Type.ARRAY, items: { type: Type.STRING } },
                    values: { type: Type.ARRAY, items: { type: Type.STRING } },
                    pertinentIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
                    textbookContent: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          sectionTitle: { type: Type.STRING },
                          bodyMarkdown: { type: Type.STRING },
                          keyVocabulary: {
                            type: Type.ARRAY,
                            items: {
                              type: Type.OBJECT,
                              properties: {
                                term: { type: Type.STRING },
                                definition: { type: Type.STRING }
                              },
                              required: ['term', 'definition']
                            }
                          },
                          funFacts: { type: Type.ARRAY, items: { type: Type.STRING } }
                        },
                        required: ['sectionTitle', 'bodyMarkdown', 'keyVocabulary', 'funFacts']
                      }
                    },
                    lessonPlan: {
                      type: Type.OBJECT,
                      properties: {
                        learningResources: { type: Type.ARRAY, items: { type: Type.STRING } },
                        steps: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              phase: { type: Type.STRING },
                              teacherActivities: { type: Type.STRING },
                              learnerActivities: { type: Type.STRING },
                              assessmentStrategy: { type: Type.STRING }
                            },
                            required: ['phase', 'teacherActivities', 'learnerActivities', 'assessmentStrategy']
                          }
                        },
                        differentiationNotes: {
                          type: Type.OBJECT,
                          properties: {
                            fastLearners: { type: Type.STRING },
                            slowLearners: { type: Type.STRING },
                            specialNeeds: { type: Type.STRING }
                          },
                          required: ['fastLearners', 'slowLearners', 'specialNeeds']
                        },
                        keyVocabulary: {
                          type: Type.ARRAY,
                          items: {
                            type: Type.OBJECT,
                            properties: {
                              term: { type: Type.STRING },
                              definition: { type: Type.STRING }
                            },
                            required: ['term', 'definition']
                          }
                        }
                      },
                      required: ['learningResources', 'steps', 'differentiationNotes']
                    },
                    practicalActivities: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          type: { type: Type.STRING },
                          materialsNeeded: { type: Type.ARRAY, items: { type: Type.STRING } },
                          stepByStepGuide: { type: Type.ARRAY, items: { type: Type.STRING } },
                          expectedOutput: { type: Type.STRING },
                          competencyAssessed: { type: Type.STRING }
                        },
                        required: ['title', 'type', 'materialsNeeded', 'stepByStepGuide', 'expectedOutput', 'competencyAssessed']
                      }
                    },
                    worksheetQuestions: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          type: { type: Type.STRING },
                          question: { type: Type.STRING },
                          options: { type: Type.ARRAY, items: { type: Type.STRING } },
                          answer: { type: Type.STRING },
                          explanation: { type: Type.STRING },
                          points: { type: Type.INTEGER }
                        },
                        required: ['id', 'type', 'question', 'answer', 'points']
                      }
                    },
                    comprehensionQuiz: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.INTEGER },
                          question: { type: Type.STRING },
                          options: { type: Type.ARRAY, items: { type: Type.STRING } },
                          answer: { type: Type.STRING },
                          explanation: { type: Type.STRING }
                        },
                        required: ['id', 'question', 'options', 'answer', 'explanation']
                      }
                    },
                    rubric: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          criterion: { type: Type.STRING },
                          levels: {
                            type: Type.OBJECT,
                            properties: {
                              exceeding: { type: Type.STRING },
                              meeting: { type: Type.STRING },
                              approaching: { type: Type.STRING },
                              below: { type: Type.STRING }
                            },
                            required: ['exceeding', 'meeting', 'approaching', 'below']
                          }
                        },
                        required: ['criterion', 'levels']
                      }
                    },
                    flashcards: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          front: { type: Type.STRING },
                          back: { type: Type.STRING }
                        },
                        required: ['front', 'back']
                      }
                    }
                  },
                  required: [
                    'chapterNumber', 'title', 'subStrand', 'keyInquiryQuestions',
                    'learningOutcomes', 'coreCompetencies', 'values', 'pertinentIssues',
                    'textbookContent', 'lessonPlan', 'practicalActivities',
                    'worksheetQuestions', 'rubric', 'flashcards'
                  ]
                }
              }
            },
            required: ['title', 'strand', 'subStrand', 'teacherOverviewNotes', 'studentSummaryNotes', 'chapters']
          }
        }
      });

      const rawJson = response.text || '{}';
      const parsedData = JSON.parse(rawJson);

      const generatedBook: CBCFullBook = {
        id: 'cbc-book-' + Date.now(),
        title: parsedData.title || `${grade} ${subject}: ${topic}`,
        grade: grade,
        subject: subject,
        strand: parsedData.strand || strand || 'Core Curriculum Strand',
        subStrand: parsedData.subStrand || subStrand || 'Sub-strand Focus',
        topicPrompt: topic,
        targetAudience: audience || 'Full Book',
        curriculumSystem: req.body.curriculumSystem || 'CBC',
        bookCategory: req.body.bookCategory || 'Student Textbook & Notes',
        difficultyLevel: req.body.difficultyLevel || 'Standard',
        createdAt: new Date().toISOString(),
        branding: branding || {
          schoolName: 'CHUO KIKUU ACADEMY',
          motto: 'Striving for Excellence',
          teacherName: 'Mwalimu',
          className: grade,
          term: 'Term 1',
          year: new Date().getFullYear().toString(),
          coverTheme: 'emerald'
        },
        chapters: parsedData.chapters || [],
        teacherOverviewNotes: parsedData.teacherOverviewNotes || 'Teacher guide for competency development.',
        studentSummaryNotes: parsedData.studentSummaryNotes || 'Key takeaways and revision notes for learners.',
        curriculumVersion: 'KICD CBC Standard Ed. 4.2 (2026 Revision)',
        documentRefId: 'KICD-CBC-REF-' + Math.floor(100000 + Math.random() * 900000),
        schoolCode: 'SCH-KEN-' + Math.floor(1000 + Math.random() * 9000),
        qualityStatus: 'Official KICD Approved Classroom Material'
      };

      res.json({ success: true, book: generatedBook });
    } catch (err: any) {
      console.error('Error generating CBC book:', err);
      res.status(500).json({ error: err.message || 'Failed to generate CBC book' });
    }
  });

  // Vite middleware in dev or static serving in prod
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CBC Material Generator server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
