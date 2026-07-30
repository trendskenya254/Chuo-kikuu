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
  },
  {
    id: 'preset-cbc-3',
    title: 'Grade 5 Mathematics: Fractions, Decimals & Financial Literacy',
    grade: 'Grade 5',
    subject: 'Mathematics',
    strand: 'Numbers & Financial Literacy',
    subStrand: 'Fractions, Decimals, and Budgeting Money',
    topicPrompt: 'Equivalent Fractions, Converting Decimals, and Budgeting for School Events in Grade 5',
    targetAudience: 'Full Book',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'Mombasa Progressive Academy',
      motto: 'Excellence Through Numbers & Discipline',
      teacherName: 'Mwalimu A. Hassan',
      className: 'Grade 5 North',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'amber'
    },
    teacherOverviewNotes: 'Comprehensive Grade 5 Mathematics module covering equivalent fractions, converting fractions to decimals, and practical money management and budgeting skills.',
    studentSummaryNotes: 'Master equivalent fractions, convert fractions to decimals easily, and create a realistic budget for a class party or school trip!',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Equivalent Fractions & Decimal Conversions',
        subStrand: 'Fraction Operations & Money Calculations',
        keyInquiryQuestions: [
          'How do equivalent fractions represent equal quantities?',
          'How do we convert fractions with denominator 10 or 100 into decimals?',
          'Why is financial budgeting important when planning family expenses?'
        ],
        learningOutcomes: {
          knowledge: [
            'Define equivalent fractions using concrete visual fraction strips.',
            'Convert fractions with denominators 10 and 100 into decimals.'
          ],
          skills: [
            'Perform simple addition and subtraction of decimals up to two decimal places.',
            'Prepare a balanced personal budget using virtual Kenyan Shilling currency notes.'
          ],
          attitudes: [
            'Demonstrate financial prudence and honesty in money transactions.',
            'Appreciate the value of saving money.'
          ]
        },
        coreCompetencies: [
          'Critical Thinking & Problem Solving (Budget optimization)',
          'Financial Literacy (Managing daily allowance & savings goals)'
        ],
        values: [
          'Integrity (Honest accounting of class project funds)',
          'Responsibility (Saving pocket money wisely)'
        ],
        pertinentIssues: [
          'Financial Literacy & Economic Empowerment',
          'Consumer Education (Distinguishing needs vs wants)'
        ],
        textbookContent: [
          {
            sectionTitle: '1.1 Equivalent Fractions & Visual Strips',
            bodyMarkdown: `An **equivalent fraction** represents the exact same portion or value of a whole, even though different numbers are used for the numerator (top number) and denominator (bottom number).
            
For example:
$$\\frac{1}{2} = \\frac{2}{4} = \\frac{4}{8} = \\frac{5}{10}$$

> **CBC Activity Hint!** Fold a clean sheet of paper in half to get $\\frac{1}{2}$. Fold it in half again to get quarters $\\frac{1}{4}$. You will observe that two quarters $\\frac{2}{4}$ overlap perfectly with one half $\\frac{1}{2}$!`,
            keyVocabulary: [
              { term: 'Numerator', definition: 'The top number in a fraction indicating how many equal parts are selected.' },
              { term: 'Denominator', definition: 'The bottom number indicating the total number of equal parts in a whole.' },
              { term: 'Equivalent', definition: 'Equal in value or quantity despite having a different appearance.' }
            ],
            funFacts: [
              'Ancient Egyptians only used unit fractions (fractions with a numerator of 1) like 1/2, 1/3, and 1/4!'
            ]
          },
          {
            sectionTitle: '1.2 Decimals & Financial Budgeting',
            bodyMarkdown: `Decimals are special fractions whose denominators are powers of 10 (10, 100, 1000).

When dealing with money in **Kenyan Shillings (KES)**:
- $\\frac{50}{100}$ of a Shilling = **KES 0.50** (50 Cents)
- $\\frac{25}{100}$ of a Shilling = **KES 0.25** (25 Cents)

### Creating a Simple Balanced Budget
A **budget** is an itemized financial plan that balances your **Income** (money coming in) with your **Expenses** (money spent) and **Savings** (money set aside for the future).`,
            keyVocabulary: [
              { term: 'Budget', definition: 'A financial plan estimating income and expenses over a set time.' },
              { term: 'Savings', definition: 'Money kept aside for future emergency needs or long-term goals.' }
            ],
            funFacts: [
              'Kenya was a global pioneer in mobile financial technology with M-Pesa launched in 2007!'
            ]
          }
        ],
        lessonPlan: {
          learningResources: ['Fraction strips', 'Play currency notes (KES)', 'Receipt samples', 'Calculators'],
          steps: [
            {
              phase: 'Introduction (5 mins)',
              teacherActivities: 'Shows two pizza fraction diagrams. Asks learners: "Would you prefer 1/2 of a pizza or 2/4 of the same pizza?"',
              learnerActivities: 'Discuss in pairs and deduce that both portions are equal.',
              assessmentStrategy: 'Oral questioning & diagnostic observation.'
            },
            {
              phase: 'Lesson Development (25 mins)',
              teacherActivities: 'Guides fraction strip folding activity. Demonstrates converting 3/10 to 0.3. Leads class shop budgeting exercise.',
              learnerActivities: 'Construct fraction strips, convert fraction cards into decimals, and create a KES 500 party budget in groups.',
              assessmentStrategy: 'Checklist evaluating accuracy of budget balances.'
            },
            {
              phase: 'Conclusion & Reflection (10 mins)',
              teacherActivities: 'Summarizes key concepts and assigns home savings log task.',
              learnerActivities: 'Record summary notes and present group budget sheets.',
              assessmentStrategy: 'Peer review & portfolio check.'
            }
          ],
          differentiationNotes: {
            fastLearners: 'Calculate percentage savings given income KES 1,000 and expenses KES 750.',
            slowLearners: 'Use plastic fraction tiles and play money coins to practice equal groupings.',
            specialNeeds: 'Provide high-contrast tactile fraction blocks.'
          }
        },
        practicalActivities: [
          {
            title: 'Class Project: The KES 500 School Snack Shop Budget',
            type: 'Group Collaboration',
            materialsNeeded: ['Price list chart', 'Play KES notes', 'Worksheet template'],
            stepByStepGuide: [
              'Each group is allocated a virtual budget of KES 500.',
              'Review the price list: Bread KES 60, Fruit KES 20, Milk KES 45, Juice KES 50.',
              'Select items needed for 5 group members while keeping total expenses under KES 400.',
              'Calculate total savings remaining (Target: At least KES 100 saved).',
              'Convert total expenses into decimal fraction of KES 500.'
            ],
            expectedOutput: 'A complete, balanced financial budget sheet showing income, expenses, and savings.',
            competencyAssessed: 'Financial Literacy & Mathematical Accuracy'
          }
        ],
        worksheetQuestions: [
          {
            id: 'q1',
            type: 'mcq',
            question: 'Which fraction is equivalent to 3/4?',
            options: ['A) 6/8', 'B) 4/3', 'C) 5/10', 'D) 2/5'],
            answer: 'A) 6/8',
            explanation: 'Multiplying numerator 3 and denominator 4 by 2 gives 6/8.',
            points: 2
          },
          {
            id: 'q2',
            type: 'fill',
            question: 'The fraction 7/10 expressed as a decimal is ______.',
            answer: '0.7',
            explanation: 'One decimal place corresponds to a denominator of 10.',
            points: 2
          }
        ],
        rubric: [
          {
            criterion: 'Financial Budgeting & Calculations',
            levels: {
              exceeding: 'Prepares an error-free budget, calculates exact savings, and explains needs vs wants eloquently.',
              meeting: 'Accurately creates a balanced budget within given limits.',
              approaching: 'Creates a budget with minor calculation errors in expense totals.',
              below: 'Requires direct teacher guidance to total up expenses.'
            }
          }
        ],
        flashcards: [
          { front: 'Equivalent Fraction', back: 'Fractions that have equal value, e.g. 1/2 = 2/4.' },
          { front: 'Decimal Point', back: 'A dot used to separate whole numbers from fractional parts (e.g. 0.75).' }
        ]
      }
    ]
  },
  {
    id: 'preset-cbc-4',
    title: 'Grade 8 Social Studies: Kenyan Geography, Climate Systems & Heritage',
    grade: 'Grade 8',
    subject: 'Social Studies',
    strand: 'Natural & Social Environment',
    subStrand: 'Physical Features, Climate Change & Cultural Conservation',
    topicPrompt: 'Rift Valley Geography, Climate Change Mitigation, and Heritage Preservation in Grade 8',
    targetAudience: 'Full Book',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'Nairobi Hill Junior Secondary',
      motto: 'Leadership, Heritage & Global Citizenship',
      teacherName: 'Mwalimu C. Wanjiku',
      className: 'Grade 8 East',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'emerald'
    },
    teacherOverviewNotes: 'Junior Secondary School (Grade 8) Social Studies textbook covering the Great Rift Valley formation, physical feature mapping, climate change impacts, and national heritage sites.',
    studentSummaryNotes: 'Explore the Great Rift Valley, understand climate systems affecting East Africa, and learn how to protect Kenya’s rich cultural heritage sites!',
    chapters: [
      {
        chapterNumber: 1,
        title: 'The Great Rift Valley & Climate Systems of Kenya',
        subStrand: 'Physical Features & Environmental Conservation',
        keyInquiryQuestions: [
          'How was the Great Rift Valley formed by earth movements?',
          'What factors influence rainfall patterns across East Africa?',
          'How can JSS learners actively participate in climate change adaptation?'
        ],
        learningOutcomes: {
          knowledge: [
            'Explain the tectonic block faulting processes that created the Great Rift Valley.',
            'Identify major lakes and volcanic mountains along the Kenyan Rift.'
          ],
          skills: [
            'Draw and label a topographical relief map of Kenya showing physical regions.',
            'Initiate a school tree nursery project for climate action.'
          ],
          attitudes: [
            'Take pride in Kenya’s natural landscape and biodiversity.',
            'Commit to sustainable environmental practices.'
          ]
        },
        coreCompetencies: [
          'Global Citizenship (Climate change awareness)',
          'Communication & Collaboration (Map making in teams)'
        ],
        values: [
          'Patriotism (Appreciating national heritage parks)',
          'Unity (Community conservation efforts)'
        ],
        pertinentIssues: [
          'Climate Change Mitigation & Adaptation',
          'Heritage & Cultural Preservation'
        ],
        textbookContent: [
          {
            sectionTitle: '1.1 Formation of the Great Rift Valley',
            bodyMarkdown: `The **Great Rift Valley** is a massive geological trench stretching over 6,000 kilometers from Syria in the Middle East down to Mozambique in Southern Africa.

### Tectonic Tensional Forces & Faulting
1. Underground convection currents push the Earth's crust in opposite directions (**tensional forces**).
2. Parallel fault lines or cracks open in the crust.
3. The central block subsides (sinks downwards) between the faults, forming a steep-sided valley floor known as a **graben** or **Rift Valley**.`,
            keyVocabulary: [
              { term: 'Faulting', definition: 'The fracturing and displacement of rock layers due to crustal movements.' },
              { term: 'Tensional Forces', definition: 'Forces pulling the Earth’s crust apart in opposite directions.' },
              { term: 'Escarpment', definition: 'A steep cliff or slope resulting from faulting, e.g. Mau Escarpment.' }
            ],
            funFacts: [
              'Lake Turkana in Kenya’s Rift Valley is the largest permanent desert lake in the world!'
            ]
          }
        ],
        lessonPlan: {
          learningResources: ['Wall map of East Africa', 'Clay/Plasticine for relief modeling', 'Atlas'],
          steps: [
            {
              phase: 'Introduction (5 mins)',
              teacherActivities: 'Displays East Africa topographical map. Asks: "Why are so many lakes in Kenya aligned along a single north-south line?"',
              learnerActivities: 'Locate Lake Naivasha, Nakuru, Baringo, and Turkana on the map.',
              assessmentStrategy: 'Map reading check & diagnostic questions.'
            },
            {
              phase: 'Lesson Development (25 mins)',
              teacherActivities: 'Demonstrates faulting using plasticine blocks pulled apart. Explains escarpments and valley floors.',
              learnerActivities: 'Construct 3D plasticine models showing faulting stages and Rift Valley formation in pairs.',
              assessmentStrategy: 'Model evaluation rubric.'
            },
            {
              phase: 'Conclusion & Reflection (10 mins)',
              teacherActivities: 'Summarizes key features and assigns climate action project.',
              learnerActivities: 'Reflect on local environmental changes and record findings.',
              assessmentStrategy: 'Exit slip check.'
            }
          ],
          differentiationNotes: {
            fastLearners: 'Analyze how geothermal power stations at Olkaria utilize volcanic heat from the Rift Valley floor.',
            slowLearners: 'Use simple step-by-step labeled diagrams of faulting.',
            specialNeeds: 'Tactile relief maps with raised boundaries.'
          }
        },
        practicalActivities: [
          {
            title: 'Group Practical: 3D Plasticine Model of Rift Valley Faulting',
            type: 'Group Collaboration',
            materialsNeeded: ['3 colors of plasticine', 'Plastic knife', 'Cardboard base'],
            stepByStepGuide: [
              'Flatten 3 layers of colored plasticine to represent rock strata.',
              'Make two diagonal slits representing parallel fault lines.',
              'Pull the outer blocks outwards to simulate tensional forces.',
              'Observe the middle block drop downwards to form the valley floor.',
              'Label Escarpment, Fault Lines, and Valley Floor using toothpicks and paper tags.'
            ],
            expectedOutput: 'A labeled 3D geological faulting model showing Rift Valley creation.',
            competencyAssessed: 'Spatial Modeling, Geography Concepts'
          }
        ],
        worksheetQuestions: [
          {
            id: 'q1',
            type: 'mcq',
            question: 'Which type of crustal force causes the Earth to fracture and sink forming a Rift Valley?',
            options: ['A) Compressional force', 'B) Tensional force', 'C) Gravitational force', 'D) Magnetic force'],
            answer: 'B) Tensional force',
            explanation: 'Tensional forces pull the crust apart in opposite directions causing central block subsidence.',
            points: 2
          }
        ],
        rubric: [
          {
            criterion: 'Geographical Understanding & Map Skills',
            levels: {
              exceeding: 'Accurately explains faulting, draws precise relief maps, and analyzes geothermal benefits.',
              meeting: 'Explains Rift Valley formation correctly and identifies major lakes.',
              approaching: 'Identifies Rift Valley lakes but struggles to explain faulting steps.',
              below: 'Requires assistance locating the Rift Valley on a map.'
            }
          }
        ],
        flashcards: [
          { front: 'Graben', back: 'The sunken block of land between two parallel fault lines forming a valley.' },
          { front: 'Escarpment', back: 'A steep cliff formed along a fault line, such as the Great Rift Escarpment.' }
        ]
      }
    ]
  },
  {
    id: 'preset-cbc-pp1',
    title: 'PP1 Environmental & Language Activities: Colors, Shapes & My Home Environment',
    grade: 'PP1',
    subject: 'Environmental Activities',
    strand: 'My Environment & Self',
    subStrand: 'Identifying Colors, Shapes, and Family Members',
    topicPrompt: 'Colors, Shapes, and My Immediate Home Environment for PP1 Learners',
    targetAudience: 'Full Book',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'LITTLE ANGELS EARLY YEARS ACADEMY',
      motto: 'Play, Learn & Grow Together',
      teacherName: 'Teacher Mary Wambui',
      className: 'PP1 Red',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'amber'
    },
    teacherOverviewNotes: 'Early Years Education (EYE) PP1 resource module focusing on sensory exploration, basic color recognition, shape tracing, and social interactions at home.',
    studentSummaryNotes: 'Discover primary colors (Red, Blue, Yellow), trace circles and squares, and sing fun action rhymes about family members!',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Primary Colors & Basic Shapes Around Us',
        subStrand: 'Colors & Shapes Recognition',
        keyInquiryQuestions: [
          'What colors do we see in our classroom and garden?',
          'Which objects at home look like circles or squares?'
        ],
        learningOutcomes: {
          knowledge: ['Name primary colors (Red, Yellow, Blue).', 'Identify circular and square shapes.'],
          skills: ['Color objects accurately using crayons.', 'Trace basic geometric shapes.'],
          attitudes: ['Show joy and enthusiasm during group rhymes.', 'Share coloring crayons with peers.']
        },
        coreCompetencies: ['Creativity & Imagination', 'Communication & Collaboration'],
        values: ['Love', 'Sharing', 'Respect'],
        pertinentIssues: ['Health & Hygiene Education'],
        textbookContent: [
          {
            sectionTitle: '1.1 Primary Colors: Red, Yellow & Blue',
            bodyMarkdown: `Look around! The sky is **Blue**, the ripe banana is **Yellow**, and the sweet apple is **Red**.

### Fun Color Matching Game!
* **Red**: Tomato, Strawberry, Fire engine
* **Yellow**: Sun, Lemon, Sunflower
* **Blue**: Sky, River water, Blue bird`,
            keyVocabulary: [
              { term: 'Primary Color', definition: 'Basic colors that can be mixed to form other colors.' },
              { term: 'Circle', definition: 'A round shape like a ball or a clock face.' }
            ],
            funFacts: ['Sunflowers turn their faces to follow the yellow sun all day long!']
          }
        ],
        lessonPlan: {
          learningResources: ['Colored building blocks', 'Crayons and playdough', 'Shape flashcards'],
          steps: [
            { phase: 'Introduction (5 mins)', teacherActivities: 'Sings a color song: "Red and Yellow, Blue and Green..."', learnerActivities: 'Sing along and clap hands to the rhythm.', assessmentStrategy: 'Observation of learner enthusiasm.' },
            { phase: 'Lesson Development (25 mins)', teacherActivities: 'Demonstrates sorting colored wooden blocks into matching buckets.', learnerActivities: 'Sort blocks in small play groups using red, yellow, and blue baskets.', assessmentStrategy: 'Checklist scoring for color recognition.' },
            { phase: 'Conclusion (10 mins)', teacherActivities: 'Praises learners and displays drawings.', learnerActivities: 'Hold up their colored worksheets proudly.', assessmentStrategy: 'Visual inspection.' }
          ],
          differentiationNotes: {
            fastLearners: 'Trace secondary colors (Orange & Green).',
            slowLearners: 'Focus on 2 basic colors first (Red & Yellow).',
            specialNeeds: 'Provide high-contrast large textured shape blocks.'
          }
        },
        practicalActivities: [
          {
            title: 'Playdough Shape & Color Craft',
            type: 'Group Collaboration',
            materialsNeeded: ['Red, Yellow, and Blue Playdough'],
            stepByStepGuide: ['Roll playdough into round balls.', 'Press into flat circle shapes.', 'Name the color of your playdough.'],
            expectedOutput: 'Clean playdough circles of various colors.',
            competencyAssessed: 'Fine Motor Skills & Color Naming'
          }
        ],
        worksheetQuestions: [
          { id: 'q1', type: 'mcq', question: 'What color is a ripe banana?', options: ['A) Blue', 'B) Yellow', 'C) Black', 'D) Purple'], answer: 'B) Yellow', explanation: 'Bananas are yellow when ripe.', points: 2 }
        ],
        rubric: [
          { criterion: 'Color & Shape Recognition', levels: { exceeding: 'Names 5+ colors and 4 shapes independently.', meeting: 'Correctly identifies Red, Yellow, Blue and circles.', approaching: 'Identifies 1 color with teacher prompting.', below: 'Requires step-by-step guidance to hold crayons.' } }
        ],
        flashcards: [{ front: 'Red', back: 'Color of a ripe apple' }, { front: 'Circle', back: 'Round shape like a coin' }]
      }
    ]
  },
  {
    id: 'preset-cbc-grade1',
    title: 'Grade 1 Mathematics: Counting Numbers 1-100 & Basic Addition',
    grade: 'Grade 1',
    subject: 'Mathematics',
    strand: 'Numbers & Operations',
    subStrand: 'Counting 1-100 and Single-Digit Addition',
    topicPrompt: 'Counting Numbers 1 to 100, Number Patterns & Addition in Grade 1',
    targetAudience: 'Full Book',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'SUNSHINE JUNIOR SCHOOL',
      motto: 'Strive to Excel',
      teacherName: 'Mwalimu S. Kariuki',
      className: 'Grade 1 Blue',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'emerald'
    },
    teacherOverviewNotes: 'Grade 1 CBC Mathematics Module developing foundational numeracy, concrete counter grouping, and place value concepts.',
    studentSummaryNotes: 'Count bottle tops and wooden sticks from 1 to 100, master simple addition (+) signs, and solve picture story sums!',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Counting 1-100 & Combining Sets',
        subStrand: 'Number Concepts & Addition',
        keyInquiryQuestions: ['How do we count objects in groups of tens?', 'What happens when we put two groups of items together?'],
        learningOutcomes: {
          knowledge: ['Count numbers 1 to 100 forward and backward.', 'Understand addition as putting items together.'],
          skills: ['Use concrete counters to solve single-digit addition.', 'Write number symbols 1 to 50 correctly.'],
          attitudes: ['Enjoy playing counting games with peers.', 'Show patience when grouping counters.']
        },
        coreCompetencies: ['Critical Thinking', 'Learning to Learn'],
        values: ['Integrity', 'Unity'],
        pertinentIssues: ['Financial Literacy (Understanding money coins)'],
        textbookContent: [
          {
            sectionTitle: '1.1 Counting in Tens & Ones',
            bodyMarkdown: `When we bundle **10 wooden sticks** together, we make **1 Ten**!
1 Ten + 2 Ones = **12** (Twelve).

### Addition (+) Means Putting Together
If Juma has **3 apples** and Maria gives him **2 more apples**:
3 + 2 = **5 apples altogether**!`,
            keyVocabulary: [{ term: 'Addition (+)', definition: 'Combining two or more numbers together to find the total sum.' }, { term: 'Tens', definition: 'A group of ten units or counters bundled together.' }],
            funFacts: ['An octopus has 8 arms, which is 5 + 3 arms!']
          }
        ],
        lessonPlan: {
          learningResources: ['Bottle tops', 'Counting sticks', 'Number cards 1-100'],
          steps: [
            { phase: 'Intro (5 mins)', teacherActivities: 'Asks learners to count their fingers and toes.', learnerActivities: 'Count aloud: 1, 2, 3... 10!', assessmentStrategy: 'Oral counting test.' },
            { phase: 'Development (25 mins)', teacherActivities: 'Guides learners in bundling 10 bottle tops using rubber bands.', learnerActivities: 'Make 5 bundles of 10 counters each.', assessmentStrategy: 'Checklist evaluation.' },
            { phase: 'Conclusion (10 mins)', teacherActivities: 'Reviews simple sums on the blackboard.', learnerActivities: 'Solve sums in exercise books.', assessmentStrategy: 'Workbook check.' }
          ],
          differentiationNotes: { fastLearners: 'Solve double-digit sums (e.g. 12 + 5).', slowLearners: 'Use finger counters for single digits up to 10.', specialNeeds: 'Provide tactile raised number cards.' }
        },
        practicalActivities: [
          { title: 'Bottle Top Counting Bazaar', type: 'Group Collaboration', materialsNeeded: ['100 bottle tops per group', 'Rubber bands'], stepByStepGuide: ['Count 10 bottle tops.', 'Bind with rubber band to form 1 Ten.', 'Count total tens to reach 100.'], expectedOutput: '10 bundles of 10 bottle tops.', competencyAssessed: 'Place Value & Numeracy' }
        ],
        worksheetQuestions: [
          { id: 'q1', type: 'mcq', question: 'What is 4 + 3?', options: ['A) 5', 'B) 6', 'C) 7', 'D) 8'], answer: 'C) 7', explanation: '4 plus 3 equals 7.', points: 2 }
        ],
        rubric: [
          { criterion: 'Counting & Addition Skill', levels: { exceeding: 'Counts to 100 effortlessly and solves mental math addition.', meeting: 'Counts to 100 with counters and adds single digits.', approaching: 'Counts up to 20 with teacher help.', below: 'Struggles to recognize numbers above 5.' } }
        ],
        flashcards: [{ front: '4 + 3', back: '7' }, { front: '1 Ten', back: '10 single units bundled together' }]
      }
    ]
  },
  {
    id: 'preset-cbc-grade10',
    title: 'Grade 10 Senior Secondary Physics: Mechanics, Motion & Vectors',
    grade: 'Grade 10',
    subject: 'Integrated Science',
    strand: 'Physical Sciences & Physics',
    subStrand: 'Kinematics, Force, Momentum & Vectors',
    topicPrompt: 'Newtonian Motion, Distance-Time Graphs & Vector Resolution in Senior Secondary Physics Grade 10',
    targetAudience: 'Full Book',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'KENYA SENIOR HIGH SCHOOL OF SCIENCE',
      motto: 'Veritas, Scientia et Labor',
      teacherName: 'Dr. P. Mutua',
      className: 'Grade 10 Physics 1',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'purple'
    },
    teacherOverviewNotes: 'Advanced Senior Secondary CBC Physics Module covering Scalar/Vector quantities, Equations of Uniformly Accelerated Motion, Newton’s Laws, and Experimental Ticker-Timer Analysis.',
    studentSummaryNotes: 'Master displacement-time graphs, calculate velocity and acceleration ($v = u + at$), apply Newton’s 2nd Law ($F = ma$), and solve vector resolution problems.',
    chapters: [
      {
        chapterNumber: 1,
        title: 'Linear Kinematics & Equations of Motion',
        subStrand: 'Uniform Acceleration & Displacement Analysis',
        keyInquiryQuestions: [
          'How do scalar quantities differ from vector quantities in physical measurements?',
          'How can displacement and acceleration be derived from a velocity-time graph gradient?',
          'What is the relationship between net external force and momentum change?'
        ],
        learningOutcomes: {
          knowledge: [
            'Distinguish between scalar (distance, speed) and vector (displacement, velocity, acceleration) quantities.',
            'Derive the 3 fundamental equations of motion ($v = u + at$, $s = ut + \\frac{1}{2}at^2$, $v^2 = u^2 + 2as$).'
          ],
          skills: [
            'Plot and interpret velocity-time graphs using experimental ticker-timer tape data.',
            'Solve algebraic physics numericals involving uniformly accelerated bodies.'
          ],
          attitudes: [
            'Demonstrate precision, mathematical accuracy, and scientific rigor in laboratory measurements.',
            'Appreciate the role of physics principles in transportation safety and vehicle braking distance.'
          ]
        },
        coreCompetencies: ['Critical Thinking & Problem Solving', 'Digital Literacy', 'Mathematical Reasoning'],
        values: ['Integrity (Accurate experimental reporting)', 'Responsibility'],
        pertinentIssues: ['Road Safety & Transport Hazards (Seatbelts & Inertia)'],
        textbookContent: [
          {
            sectionTitle: '1.1 Kinematics Definitions & Vector Quantities',
            bodyMarkdown: `In Senior Secondary Physics, physical quantities are categorized into **Scalars** (magnitude only) and **Vectors** (magnitude and specific direction).

* **Distance ($s$)**: Total ground covered (Scalar, meters).
* **Displacement ($x$)**: Straight-line distance in a specified direction (Vector, meters).
* **Velocity ($v$)**: Rate of change of displacement ($v = \\frac{dx}{dt}$, $m/s$).
* **Acceleration ($a$)**: Rate of change of velocity ($a = \\frac{v - u}{t}$, $m/s^2$).

### The 3 Equations of Uniform Motion
1. $v = u + at$
2. $s = ut + \\frac{1}{2}at^2$
3. $v^2 = u^2 + 2as$

> **Physics Insight!** The area under a Velocity-Time graph represents the total displacement ($s$) traveled by the object!`,
            keyVocabulary: [
              { term: 'Vector', definition: 'A physical quantity possessing both magnitude and spatial direction.' },
              { term: 'Kinematics', definition: 'The branch of mechanics describing motion without considering underlying forces.' }
            ],
            funFacts: ['The Formula 1 racing car accelerates from 0 to 100 km/h in just 2.4 seconds, exerting over 2g of acceleration!']
          }
        ],
        lessonPlan: {
          learningResources: ['Ticker-timer apparatus', 'Trolleys and inclined tracks', 'Graph paper & scientific calculators'],
          steps: [
            { phase: 'Introduction (5 mins)', teacherActivities: 'Presents a braking car video scenario. Asks learners: "Why does stopping distance increase quadratically with speed?"', learnerActivities: 'Analyze video, recall primary motion concepts, and write initial hypotheses.', assessmentStrategy: 'Diagnostic questioning.' },
            { phase: 'Lesson Development (25 mins)', teacherActivities: 'Demonstrates setup of ticker-timer and trolley along an inclined plane. Guides strip cutting and velocity calculation.', learnerActivities: 'In lab groups of 3, run trolley experiments, measure ticker tape intervals, plot $v-t$ graphs, and calculate acceleration $a$.', assessmentStrategy: 'Practical assessment rubric.' },
            { phase: 'Conclusion (10 mins)', teacherActivities: 'Summarizes derivation of $s = ut + \\frac{1}{2}at^2$. Assigns numerical set.', learnerActivities: 'Present gradient calculation results and clean up lab benches.', assessmentStrategy: 'Numerical Problem Set Submission.' }
          ],
          differentiationNotes: {
            fastLearners: 'Derive motion equations using calculus limits (integration).',
            slowLearners: 'Focus on straight-line constant velocity calculations ($v = s/t$) before accelerated cases.',
            specialNeeds: 'Provide high-visibility digital ticker readout sensors.'
          }
        },
        practicalActivities: [
          {
            title: 'Lab Practical: Ticker-Timer Trolley Acceleration Measurement',
            type: 'Group Collaboration',
            materialsNeeded: ['50Hz Ticker-timer', 'Paper ticker tape', 'Dynamics trolley', 'Inclined ramp', 'Ruler'],
            stepByStepGuide: [
              'Attach ticker tape to trolley and thread through 50Hz timer.',
              'Release trolley down inclined ramp.',
              'Cut tape into 10-dot strips representing 0.2 second intervals.',
              'Measure length of successive 10-dot strips to find average velocity per interval.',
              'Plot velocity vs time graph and calculate acceleration from gradient.'
            ],
            expectedOutput: 'A linear $v-t$ graph with gradient yielding acceleration in $m/s^2$.',
            competencyAssessed: 'Experimental Precision, Graph Analysis, & Kinematic Calculation'
          }
        ],
        worksheetQuestions: [
          {
            id: 'q1',
            type: 'mcq',
            question: 'A car accelerates uniformly from rest ($u = 0$) at $3\\,m/s^2$ for $4\\text{ seconds}$. What is its final velocity $v$?',
            options: ['A) 7 m/s', 'B) 12 m/s', 'C) 24 m/s', 'D) 36 m/s'],
            answer: 'B) 12 m/s',
            explanation: 'Using $v = u + at = 0 + (3 \\times 4) = 12\\text{ m/s}$.',
            points: 3
          }
        ],
        rubric: [
          {
            criterion: 'Kinematics Problem Solving & Laboratory Analysis',
            levels: {
              exceeding: 'Derives calculus relations, plots immaculate graphs, and solves complex multi-stage motion numericals.',
              meeting: 'Applies motion equations accurately and calculates acceleration from graph gradients.',
              approaching: 'Solves basic $v = s/t$ problems but struggles with $v^2 = u^2 + 2as$ substitution.',
              below: 'Unable to distinguish scalar distance from vector displacement.'
            }
          }
        ],
        flashcards: [
          { front: '$v = u + at$', back: 'First equation of motion relating initial velocity, acceleration, and time.' },
          { front: 'Gradient of V-T Graph', back: 'Represents acceleration ($a = \\Delta v / \\Delta t$).' }
        ]
      }
    ]
  },
  {
    id: 'preset-cbc-grade12',
    title: 'Grade 12 Senior Secondary Chemistry: Organic Synthesis & Reaction Kinetics',
    grade: 'Grade 12',
    subject: 'Integrated Science',
    strand: 'Chemical Sciences & Organic Chemistry',
    subStrand: 'Alkanes, Alkenes, Functional Groups & Chemical Kinetics',
    topicPrompt: 'IUPAC Nomenclature, Polymerization, Esterification & Reaction Kinetics in Grade 12 Chemistry',
    targetAudience: 'Full Book',
    createdAt: new Date().toISOString(),
    branding: {
      schoolName: 'NATIONAL ACADEMY OF ADVANCED SCIENCES',
      motto: 'Innovation Through Molecular Mastery',
      teacherName: 'Prof. K. Chemutai',
      className: 'Grade 12 Chem Senior',
      term: 'Term 1',
      year: '2026',
      coverTheme: 'crimson'
    },
    teacherOverviewNotes: 'Cap-stone Senior Secondary (Grade 12) Chemistry Module covering IUPAC Organic Nomenclature, Isomerism, Reaction Pathways, Ester Synthesis, and Rate Law Kinetics.',
    studentSummaryNotes: 'Master IUPAC naming for alkanes, alkenes, alkanols, and carboxylic acids, synthesize ethyl ethanoate ester in lab, and calculate rate constants ($k$).',
    chapters: [
      {
        chapterNumber: 1,
        title: 'IUPAC Organic Nomenclature & Functional Groups',
        subStrand: 'Hydrocarbons & Synthetic Organic Reactions',
        keyInquiryQuestions: [
          'How do functional groups dictate the chemical reactivity of organic molecules?',
          'What are the mechanisms of addition vs substitution reactions in hydrocarbons?',
          'How can esters be synthesized and purified in industrial and laboratory settings?'
        ],
        learningOutcomes: {
          knowledge: [
            'Name organic compounds up to 10 carbon atoms according to IUPAC rules.',
            'Explain structural isomerism and functional group characteristics.'
          ],
          skills: [
            'Perform laboratory esterification of ethanol and ethanoic acid.',
            'Determine reaction rates and order of reaction from initial rate data.'
          ],
          attitudes: [
            'Appreciate the role of organic synthesis in pharmaceutical manufacturing and green chemistry.',
            'Observe strict organic solvent handling safety protocols.'
          ]
        },
        coreCompetencies: ['Critical Thinking', 'Scientific Inquiry', 'Innovation'],
        values: ['Integrity', 'Environmental Stewardship'],
        pertinentIssues: ['Plastic Pollution & Biodegradable Polymers'],
        textbookContent: [
          {
            sectionTitle: '1.1 IUPAC Rules for Hydrocarbons & Alkanols',
            bodyMarkdown: `Organic Chemistry is the study of carbon-containing compounds. IUPAC nomenclature provides a systematic method for naming molecules based on root carbon chains:

* **1 C**: Meth-
* **2 C**: Eth-
* **3 C**: Prop-
* **4 C**: But-
* **5 C**: Pent-

### Esterification Reaction
$$CH_3COOH + C_2H_5OH \\xrightarrow{H_2SO_4} CH_3COOC_2H_5 + H_2O$$
Ethanoic Acid + Ethanol $\\rightarrow$ **Ethyl Ethanoate (Sweet Fruity Ester)** + Water!`,
            keyVocabulary: [
              { term: 'Functional Group', definition: 'An atom or group of atoms responsible for the characteristic chemical reactions of an organic compound.' },
              { term: 'Esterification', definition: 'The reaction between an alkanol and an alkanoic acid in the presence of concentrated sulphuric acid catalyst to yield an ester.' }
            ],
            funFacts: ['Esters give fruits like pineapples, bananas, and apples their sweet characteristic aromas!']
          }
        ],
        lessonPlan: {
          learningResources: ['Water bath', 'Ethanol & Ethanoic acid', 'Concentrated H2SO4', 'Test tubes & reflux condenser'],
          steps: [
            { phase: 'Introduction (5 mins)', teacherActivities: 'Passes around a fruit essence sample. Asks Grade 12 seniors: "Which chemical functional group produces this aroma?"', learnerActivities: 'Identify ester functional group and recall alkanol reactions.', assessmentStrategy: 'Diagnostic review.' },
            { phase: 'Lesson Development (25 mins)', teacherActivities: 'Demonstrates safe heating of ethanol, ethanoic acid, and conc. H2SO4 catalyst in a hot water bath.', learnerActivities: 'Conduct ester synthesis in pairs, pour mixture into sodium carbonate solution, and note fruity odor.', assessmentStrategy: 'Laboratory safety & practical checklist.' },
            { phase: 'Conclusion (10 mins)', teacherActivities: 'Summarizes reaction equation and IUPAC naming.', learnerActivities: 'Draw reaction mechanisms in exercise books.', assessmentStrategy: 'Post-lab report audit.' }
          ],
          differentiationNotes: {
            fastLearners: 'Analyze 2nd order rate equations and activation energy ($E_a$) Arrhenius plots.',
            slowLearners: 'Use 3D plastic ball-and-stick molecular models to construct simple alkanes.',
            specialNeeds: 'Provide digital molecular modeling software with voice descriptions.'
          }
        },
        practicalActivities: [
          {
            title: 'Lab Practical: Synthesis of Ethyl Ethanoate (Fruity Ester)',
            type: 'Group Collaboration',
            materialsNeeded: ['2ml Ethanol', '2ml Ethanoic acid', '5 drops Conc. H2SO4', 'Hot water bath', 'Sodium carbonate solution'],
            stepByStepGuide: [
              'Add 2ml ethanol and 2ml ethanoic acid into a clean test tube.',
              'Carefully add 5 drops of concentrated sulphuric acid catalyst.',
              'Place test tube in a beaker of hot water ($70^\\circ\\text{C}$) for 10 minutes.',
              'Pour contents into a beaker containing sodium carbonate solution to neutralize unreacted acid.',
              'Waft the vapor gently and record the fruity aroma.'
            ],
            expectedOutput: 'Clear fruity ester layer with characteristic sweet perfume odor.',
            competencyAssessed: 'Organic Synthesis, Reflux Setup, & Chemical Safety'
          }
        ],
        worksheetQuestions: [
          {
            id: 'q1',
            type: 'mcq',
            question: 'What is the correct IUPAC name for $CH_3-CH_2-CH_2-OH$?',
            options: ['A) Propan-1-ol', 'B) Ethanol', 'C) Propanone', 'D) Propanoic acid'],
            answer: 'A) Propan-1-ol',
            explanation: 'A 3-carbon chain with an -OH functional group on carbon-1 is Propan-1-ol.',
            points: 3
          }
        ],
        rubric: [
          {
            criterion: 'Organic Chemistry & Reaction Kinetics Mastery',
            levels: {
              exceeding: 'Synthesizes esters flawlessly, explains reaction mechanisms, and solves complex 2nd order kinetics problems.',
              meeting: 'Names organic molecules accurately and completes esterification experiment safely.',
              approaching: 'Names simple alkanes but struggles with branched isomers and ester equations.',
              below: 'Requires direct supervision to identify carbon chain lengths.'
            }
          }
        ],
        flashcards: [
          { front: 'Ester Functional Group', back: '-COO- linkage giving pleasant fruity smells.' },
          { front: 'Concentrated H2SO4 Catalyst', back: 'Dehydrating agent and acid catalyst in esterification.' }
        ]
      }
    ]
  }
];


