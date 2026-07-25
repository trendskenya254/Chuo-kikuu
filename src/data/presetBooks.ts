import { CBCFullBook } from '../types';

export const PRESET_CBC_BOOKS: CBCFullBook[] = [
  {
    id: 'preset-cbc-1',
    title: 'Grade 4 Science & Agriculture: Soil Conservation & Farming Practices',
    grade: 'Grade 4',
    subject: 'Agriculture & Nutrition',
    strand: 'Environment and Natural Resources',
    subStrand: 'Soil Conservation Methods in School & Home',
    topicPrompt: 'Soil Conservation, Compost Making, and Drip Irrigation in Grade 4 Agriculture',
    targetAudience: 'Full Book',
    difficultyLevel: 'Standard',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'CHUO KIKUU ACADEMY',
      motto: 'Knowledge is Power & Conservation is Life',
      teacherName: 'Mwalimu J. Mwangi',
      className: 'Grade 4 East',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'emerald'
    },
    teacherOverviewNotes: 'This CBC resource module covers Soil Conservation for Grade 4 learners, incorporating hands-on practical activities, environmental stewardship values, and group collaborative learning.',
    studentSummaryNotes: 'Learn how to protect topsoil from erosion using compost making, mulching, and simple drip irrigation with recycled plastic bottles!',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Types of Soil and Causes of Soil Erosion',
        subStrand: 'Soil Types and Erosion Control',
        keyInquiryQuestions: [
          'Why is topsoil important for plants and farming?',
          'What causes soil to be washed away during heavy rainfall?',
          'How can learners help conserve soil at school and home?'
        ],
        learningOutcomes: {
          knowledge: [
            'Identify sand, clay, and loam soil characteristics.',
            'Explain causes of water and wind soil erosion in the local environment.'
          ],
          skills: [
            'Demonstrate simple soil conservation techniques including mulching and grass planting.',
            'Construct a miniature soil erosion model using recycled plastic containers.'
          ],
          attitudes: [
            'Appreciate the role of soil in food security.',
            'Show responsibility toward preserving environmental resources.'
          ]
        },
        coreCompetencies: [
          'Critical Thinking & Problem Solving (Analyzing soil erosion causes)',
          'Communication & Collaboration (Group practical erosion experiment)',
          'Digital Literacy (Photographing local soil conservation methods)'
        ],
        values: [
          'Responsibility (Caring for the garden plots)',
          'Unity (Working in teams during compost pile setup)',
          'Patriotism (Protecting national natural resources)'
        ],
        pertinentIssues: [
          'Environmental Awareness & Climate Change Preparedness',
          'Disaster Risk Reduction (Preventing soil landslides)'
        ],
        textbookContent: [
          {
            sectionTitle: '1.1 Introduction to Soil & Topsoil Protection',
            bodyMarkdown: `Soil is the uppermost fertile layer of the Earth's crust that supports plant growth. In CBC Agriculture, we classify soil into three main types: **Loam Soil**, **Clay Soil**, and **Sand Soil**.

**Loam Soil** is rich in organic humus and retains just enough moisture, making it ideal for growing crops like maize, kales (sukuma wiki), and beans.

### What is Soil Erosion?
Soil erosion is the gradual washing away or blowing away of topsoil by natural agents like **flowing water** and **strong winds**, or by human activities like deforestation and overgrazing.

> **CBC Fun Fact!** It takes over 500 years for nature to form just 2.5 centimeters of fertile topsoil, but a single heavy rainstorm can wash it away if unprotected!`,
            keyVocabulary: [
              { term: 'Erosion', definition: 'The removal of fertile topsoil by wind or running water.' },
              { term: 'Mulching', definition: 'Covering bare soil with dry grass, leaves, or crop residue to retain moisture and stop erosion.' },
              { term: 'Humus', definition: 'Decayed plant and animal matter that makes soil dark and fertile.' }
            ],
            funFacts: [
              'Earthworms till the soil naturally, creating small tunnels that allow air and water to penetrate deep roots!'
            ]
          },
          {
            sectionTitle: '1.2 Soil Conservation Techniques',
            bodyMarkdown: `To prevent soil erosion, learners can practice the following low-cost CBC conservation methods:

1. **Mulching**: Spreading dry vegetation over cultivated soil beds.
2. **Cover Cropping**: Planting fast-growing groundcover plants like sweet potatoes or beans.
3. **Contour Farming**: Digging terraces or trench lines across sloped land.
4. **Tree Planting (Afforestation)**: Tree roots bind soil particles firmly together.`,
            keyVocabulary: [
              { term: 'Terrace', definition: 'A step-like structure built along a slope to catch rainwater and hold soil.' },
              { term: 'Cover Crop', definition: 'A plant grown specifically to cover bare ground and prevent topsoil wash-off.' }
            ],
            funFacts: [
              'Grass roots form an underground net that can hold up to 10 times their weight in wet soil!'
            ]
          }
        ],
        lessonPlan: {
          learningResources: [
            '3 Plastic bottles cut horizontally',
            'Loam soil, dry leaves, grass turf',
            'Watering can or clean water',
            'Manila paper and markers'
          ],
          steps: [
            {
              phase: 'Introduction (5 mins)',
              teacherActivities: 'Displays two soil samples (bare soil vs grass-covered soil). Asks learners: "What happens when rain falls on bare ground?"',
              learnerActivities: 'Observe samples, state prior knowledge, and answer Key Inquiry Questions in pairs.',
              assessmentStrategy: 'Diagnostic questioning & oral feedback.'
            },
            {
              phase: 'Lesson Development (25 mins)',
              teacherActivities: 'Guides learners in conducting the 3-bottle soil runoff experiment. Demonstrates how mulch and plant roots stop muddy runoff.',
              learnerActivities: 'Perform group experiment pouring water into bottle 1 (bare), bottle 2 (mulched), and bottle 3 (grassed). Measure runoff clarity.',
              assessmentStrategy: 'Observation rubric evaluating group teamwork and experimental procedure.'
            },
            {
              phase: 'Conclusion & Reflection (10 mins)',
              teacherActivities: 'Summarizes key observations. Assigns Home-Based Extended Learning Task for school garden bed mulching.',
              learnerActivities: 'Record summary in CBC exercise books and clean up experimental materials responsibly.',
              assessmentStrategy: 'Self-assessment exit ticket & workbook check.'
            }
          ],
          differentiationNotes: {
            fastLearners: 'Design a simple drip irrigation system using a perforated bottle suspended over a mulched crop.',
            slowLearners: 'Provide matching cards with pictures of erosion vs picture of mulched gardens.',
            specialNeeds: 'Assign tactile soil texture matching tasks with guided buddy support.'
          },
          keyVocabulary: [
            { term: 'Runoff Water', definition: 'Rainwater that flows over land surfaces carrying loose soil particles with it.' },
            { term: 'Mulching Barrier', definition: 'A protective layer of dry plant material placed on topsoil to suppress weeds and retain soil moisture.' },
            { term: 'Organic Humus', definition: 'Decomposed plant and animal matter that enriches topsoil with essential crop nutrients.' },
            { term: 'Contour Line', definition: 'An imaginary line connecting points of equal elevation on sloped farmland to guide terrace digging.' }
          ]
        },
        practicalActivities: [
          {
            title: 'Group Investigation: The 3-Bottle Water Runoff Test',
            type: 'Group Collaboration',
            materialsNeeded: ['3 plastic bottles', 'Loam soil', 'Dry grass mulch', 'Sod of growing grass', '3 clear plastic cups', 'Water'],
            stepByStepGuide: [
              'Fill bottle A with bare soil only.',
              'Fill bottle B with soil and cover with 2cm layer of dry grass mulch.',
              'Fill bottle C with intact soil containing living grass roots.',
              'Tilt all 3 bottles equally over a table edge with clear cups underneath.',
              'Pour 200ml of water slowly over each bottle top.',
              'Compare the color and volume of runoff water collected in each cup.'
            ],
            expectedOutput: 'Clear water in cup C (grass), slightly colored water in cup B (mulch), and dark muddy water in cup A (bare soil).',
            competencyAssessed: 'Critical Thinking, Scientific Inquiry, and Teamwork'
          },
          {
            title: 'Home-Based Activity: Mulching Household Kitchen Garden',
            type: 'Home-Based CSL',
            materialsNeeded: ['Dry maize stalks or grass', 'Small hoe or hands', 'Water'],
            stepByStepGuide: [
              'With parental guidance, inspect your home kitchen garden or potted plants.',
              'Gather clean, dry grass or crop leaves.',
              'Carefully place a 2-inch layer of mulch around plant bases, avoiding direct contact with main stems.',
              'Lightly water the mulched plants.',
              'Take a photo or draw a diagram in your CBC activity portfolio.'
            ],
            expectedOutput: 'A well-mulched garden bed at home verified by parent sign-off.',
            competencyAssessed: 'Parental Engagement, Environmental Stewardship'
          }
        ],
        worksheetQuestions: [
          {
            id: 'q1',
            type: 'mcq',
            question: 'Which type of soil contains the highest level of organic humus and is best for farming?',
            options: ['A) Sand Soil', 'B) Clay Soil', 'C) Loam Soil', 'D) Rocky Gravel'],
            answer: 'C) Loam Soil',
            explanation: 'Loam soil has a balanced mix of sand, silt, clay, and organic humus that holds moisture and nutrients well.',
            points: 2
          },
          {
            id: 'q2',
            type: 'fill',
            question: 'Covering bare soil with dry leaves or grass to retain moisture is called ________.',
            answer: 'Mulching',
            explanation: 'Mulching protects soil from direct heat and water splash erosion.',
            points: 2
          },
          {
            id: 'q3',
            type: 'short',
            question: 'State two negative consequences of allowing topsoil erosion on a school farm.',
            answer: '1) Loss of plant nutrients leading to poor crop yield. 2) Creation of deep gullies that make land difficult to cultivate.',
            points: 4
          },
          {
            id: 'q4',
            type: 'practical',
            question: 'Describe how you constructed a simple drip irrigation bottle for your Grade 4 crop project.',
            answer: 'Puncture small pinholes in the cap of a plastic water bottle, fill with water, invert near plant roots, and secure with a stick.',
            points: 5
          }
        ],
        rubric: [
          {
            criterion: 'Understanding Soil Erosion Control Methods',
            levels: {
              exceeding: 'Correctly explains all 4 conservation methods with local real-life examples and designs an innovative soil model independently.',
              meeting: 'Accurately identifies 3 soil conservation methods and explains how mulching prevents erosion.',
              approaching: 'Identifies 1 to 2 soil conservation methods with minimal guidance from teacher.',
              below: 'Requires continuous support to differentiate between eroded soil and mulched soil.'
            }
          },
          {
            criterion: 'Execution of Group Practical Experiment',
            levels: {
              exceeding: 'Leads the team efficiently, follows safety rules, records precise water runoff metrics, and presents findings clearly.',
              meeting: 'Participates actively in setting up bottles and records correct experimental observations.',
              approaching: 'Participates in group work with encouragement but needs assistance in recording results.',
              below: 'Passive during group experiment; struggles to follow safety instructions.'
            }
          }
        ],
        flashcards: [
          { front: 'Soil Erosion', back: 'The removal of topsoil by wind or flowing water.' },
          { front: 'Mulching', back: 'Covering bare soil with organic material like dry grass to keep moisture and prevent erosion.' },
          { front: 'Loam Soil', back: 'Fertile soil with humus, ideal for crop farming.' },
          { front: 'Contour Bunds', back: 'Ridges constructed along sloped land to slow down rainwater runoff.' }
        ],
        comprehensionQuiz: [
          {
            id: 1,
            question: 'What is the primary cause of topsoil wash-off on sloped school garden beds during heavy rain?',
            options: ['A) Over-watering with drip cans', 'B) Unprotected bare soil exposure to flowing rainwater runoff', 'C) Excessive earthworm activity', 'D) Planting too many legumes'],
            answer: 'B) Unprotected bare soil exposure to flowing rainwater runoff',
            explanation: 'Flowing rainwater strikes bare soil directly, dislodging soil particles and carrying them downhill as muddy runoff.'
          },
          {
            id: 2,
            question: 'Which soil type is most recommended for growing crops in Grade 4 CBC agricultural plots due to its humus content?',
            options: ['A) Coarse Sand Soil', 'B) Heavy Clay Soil', 'C) Rich Loam Soil', 'D) Dry Gravel'],
            answer: 'C) Rich Loam Soil',
            explanation: 'Loam soil contains organic humus, providing optimal water retention and aeration for root systems.'
          },
          {
            id: 3,
            question: 'How does applying a 2-inch layer of dry grass mulch protect growing plants?',
            options: ['A) It increases soil temperature to burn weeds', 'B) It shields soil from direct heat, conserves moisture, and prevents erosion', 'C) It attracts pests to feed on crop stems', 'D) It turns clay soil into sand instantly'],
            answer: 'B) It shields soil from direct heat, conserves moisture, and prevents erosion',
            explanation: 'Mulch forms a physical barrier that cushions rain impacts, reduces evaporation, and maintains moisture.'
          },
          {
            id: 4,
            question: 'In the 3-bottle water runoff experiment, which bottle produced the cleanest runoff water?',
            options: ['A) The bottle with bare soil', 'B) The bottle filled with dry rocks', 'C) The bottle containing intact living grass turf', 'D) The empty plastic bottle'],
            answer: 'C) The bottle containing intact living grass turf',
            explanation: 'Dense grass roots bind topsoil particles firmly together, filtering rainwater so runoff remains clear.'
          },
          {
            id: 5,
            question: 'Which CBC value is demonstrated when learners collaborate to mulch garden beds at school and home?',
            options: ['A) Patriotism & Environmental Responsibility', 'B) Indifference', 'C) Competitiveness', 'D) Isolation'],
            answer: 'A) Patriotism & Environmental Responsibility',
            explanation: 'Conserving soil protects Kenya’s natural resources and ensures food security for future generations.'
          }
        ]
      }
    ],
    curriculumVersion: 'KICD CBC Standard Ed. 4.2 (2026 Revision)',
    documentRefId: 'KICD-CBC-REF-883291',
    schoolCode: 'SCH-NBO-4029',
    qualityStatus: 'Official KICD Approved Classroom Resource'
  },
  {
    id: 'preset-cbc-2',
    title: 'Grade 7 Integrated Science: Properties of Matter & Safety in the Science Laboratory',
    grade: 'Grade 7',
    subject: 'Integrated Science',
    strand: 'Matter and Energy',
    subStrand: 'Classification of Matter & Laboratory Hazard Symbols',
    topicPrompt: 'States of Matter, Density Experiments, and Laboratory Safety Procedures in Grade 7',
    targetAudience: 'Full Book',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'Saint Augustine Junior Secondary',
      motto: 'Excellence in Science, Faith, & Integrity',
      teacherName: 'Dr. E. Ochieng',
      className: 'Grade 7 West',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'navy'
    },
    teacherOverviewNotes: 'Comprehensive Junior Secondary (JSS) CBC Module on Laboratory Safety Protocols, Hazard Symbols, States of Matter, and Density Measurements.',
    studentSummaryNotes: 'Master science lab safety rules, identify dangerous chemical hazard signs, and investigate solid, liquid, and gas particle behavior!',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Laboratory Safety Protocols & Hazard Symbols',
        subStrand: 'Science Laboratory Rules & Safety Tools',
        keyInquiryQuestions: [
          'Why are safety rules necessary in a Science Laboratory?',
          'What do the warning symbols on chemical bottles signify?',
          'How should a learner handle emergency burns or chemical splashes?'
        ],
        learningOutcomes: {
          knowledge: [
            'Identify standard laboratory equipment and safety appliances.',
            'Interpret common laboratory hazard warning symbols (Toxic, Flammable, Corrosive, Explosive).'
          ],
          skills: [
            'Demonstrate proper lighting and adjusting of a Bunsen burner flame.',
            'Execute safe handling and disposal of laboratory chemicals.'
          ],
          attitudes: [
            'Promote a culture of safety and responsibility in peer group experiments.',
            'Adhere strictly to laboratory regulations at all times.'
          ]
        },
        coreCompetencies: [
          'Digital Literacy (Scanning hazard QR tags or safety charts)',
          'Critical Thinking & Problem Solving (Assessing emergency spill scenarios)',
          'Self-Efficacy (Confident operation of laboratory apparatus)'
        ],
        values: [
          'Responsibility (Wearing protective goggles and lab coats)',
          'Respect (Observing partner personal space in crowded labs)',
          'Integrity (Reporting broken glassware immediately)'
        ],
        pertinentIssues: [
          'Occupational Safety & Health (OSH) Standards',
          'Disaster Risk Preparedness (Fire extinguisher handling)'
        ],
        textbookContent: [
          {
            sectionTitle: '1.1 The Science Laboratory Environment',
            bodyMarkdown: `A **Science Laboratory** is a specialized room equipped with tools, apparatus, and reagents designed for scientific testing, experimentations, and empirical measurements.

### Golden Rules of Laboratory Safety
1. **Never eat, drink, or taste chemicals** in the science laboratory.
2. **Wear Personal Protective Equipment (PPE)**: Lab coat, safety goggles, and closed-toe shoes.
3. **Know the location of emergency equipment**: First Aid kit, Eye wash station, and Fire Extinguisher.
4. **Report all breakages, spills, or accidents** to the teacher immediately.`,
            keyVocabulary: [
              { term: 'Reagent', definition: 'A substance or chemical used in laboratory reactions.' },
              { term: 'Corrosive', definition: 'A substance that can burn skin or eat through metals and clothing.' },
              { term: 'Toxic', definition: 'Poisonous substance capable of causing severe health harm if inhaled or ingested.' }
            ],
            funFacts: [
              'The blue non-luminous flame of a Bunsen burner reaches temperatures over 1,500 degrees Celsius!'
            ]
          }
        ],
        lessonPlan: {
          learningResources: ['Bunsen burner', 'Safety goggles', 'Hazard symbol wall chart', 'Beakers', 'First Aid box'],
          steps: [
            {
              phase: 'Introduction (5 mins)',
              teacherActivities: 'Displays a chemical bottle with a skull and crossbones icon. Asks JSS learners: "What does this symbol warn us about?"',
              learnerActivities: 'Brainstorm symbol meanings, state safety rules from prior upper primary science lessons.',
              assessmentStrategy: 'Diagnostic review & group discussion.'
            },
            {
              phase: 'Lesson Development (25 mins)',
              teacherActivities: 'Demonstrates lighting a Bunsen burner safely (strike match first, turn on gas tap, adjust air hole). Guides learners in matching hazard symbols to descriptions.',
              learnerActivities: 'In groups of 4, sketch laboratory apparatus, classify hazard symbols, and practice adjusting air holes for luminous vs non-luminous flames.',
              assessmentStrategy: 'Practical checklist evaluating Bunsen burner operation.'
            },
            {
              phase: 'Conclusion & Reflection (10 mins)',
              teacherActivities: 'Summarizes key takeaway points. Administers 5-minute safety exit check.',
              learnerActivities: 'Complete exit check and clean lab workstations according to protocol.',
              assessmentStrategy: 'Rubric scoring & workstation cleanup audit.'
            }
          ],
          differentiationNotes: {
            fastLearners: 'Research the chemical contents of household cleaners (bleach, acid) and draw their hazard labels.',
            slowLearners: 'Use flashcard games matching hazard icons with color-coded safety meanings.',
            specialNeeds: 'Provide enlarged visual tactile safety maps of the laboratory floor plan.'
          }
        },
        practicalActivities: [
          {
            title: 'Practical 1: Bunsen Burner Operation & Flame Testing',
            type: 'Group Collaboration',
            materialsNeeded: ['Bunsen burner', 'Splint matches', 'Heatproof mat', 'Safety glasses'],
            stepByStepGuide: [
              'Check gas tube connection securely.',
              'Ensure air hole is completely CLOSED before lighting match.',
              'Hold lit match 2cm above top of chimney, then turn on gas tap slowly.',
              'Observe the yellow luminous flame (sooty, quiet, cool).',
              'Slowly open the air hole and observe the blue non-luminous flame (hot, non-sooty, noisy).'
            ],
            expectedOutput: 'Successful lighting and distinction between luminous and non-luminous flames with safety compliance.',
            competencyAssessed: 'Practical Skill & Safety Compliance'
          }
        ],
        worksheetQuestions: [
          {
            id: 'q1',
            type: 'mcq',
            question: 'A chemical container bearing a symbol with a flaming ball indicates that the chemical is:',
            options: ['A) Highly Toxic', 'B) Corrosive Acid', 'C) Flammable / Oxidizing', 'D) Radioactive'],
            answer: 'C) Flammable / Oxidizing',
            explanation: 'Flammable substances easily catch fire in the presence of sparks or open flames.',
            points: 2
          },
          {
            id: 'q2',
            type: 'short',
            question: 'Why must the air hole of a Bunsen burner be CLOSED before turning on the gas tap during ignition?',
            answer: 'To prevent strike-back (fire burning inside the tube) and ensure a quiet, controllable yellow pilot flame at startup.',
            points: 3
          }
        ],
        rubric: [
          {
            criterion: 'Laboratory Safety Rule Application',
            levels: {
              exceeding: 'Strictly complies with all PPE guidelines, identifies subtle hazard icons, and assists peers in safe lab setup.',
              meeting: 'Follows safety procedures accurately without needing teacher warnings.',
              approaching: 'Follows basic safety rules but occasionally needs reminders on wearing safety glasses.',
              below: 'Shows disregard for safety rules; requires direct supervision.'
            }
          }
        ],
        flashcards: [
          { front: 'Corrosive Symbol', back: 'Indicates chemicals that cause severe skin burns or metal destruction.' },
          { front: 'Non-Luminous Flame', back: 'Hot, blue, quiet flame produced when the Bunsen burner air hole is OPEN.' }
        ]
      }
    ]
  }
];
