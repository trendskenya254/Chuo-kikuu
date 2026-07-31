export interface CBCTier {
  id: string;
  name: string;
  grades: string[];
  description: string;
  badgeColor: string;
  subjects: {
    name: string;
    code: string;
    description: string;
    category: 'Core' | 'Pathway' | 'Activity' | 'Elective';
    icon: string;
  }[];
}

export interface CBCResourceType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  badge: string;
}

export const OFFICIAL_CBC_RESOURCE_TYPES: CBCResourceType[] = [
  {
    id: 'Curriculum Designs',
    title: 'Curriculum Designs (KICD Guidelines)',
    subtitle: 'Official KICD Syllabus Framework',
    description: 'Specifies learning outcomes, strand/sub-strands, core competencies, values, PCIs, and suggested assessment methods.',
    icon: '📜',
    badge: 'KICD Guideline',
  },
  {
    id: 'Approved Course Materials',
    title: 'Approved Course Materials (Orange Book)',
    subtitle: 'Textbooks & Teacher Guides',
    description: 'KICD-approved student books and comprehensive teacher instructional guides listed in the official Orange Book.',
    icon: '📙',
    badge: 'Orange Book Standard',
  },
  {
    id: 'Schemes of Work & Lesson Plans',
    title: 'Schemes of Work & Lesson Plans',
    subtitle: 'Termly & Weekly Operational Breakdown',
    description: 'Operational breakdowns mapping syllabus topics week-by-week with 40-minute lesson plans and diagnostic starters.',
    icon: '📅',
    badge: 'Teacher Operational',
  },
  {
    id: 'Assessment Rubrics & Tools',
    title: 'Assessment Rubrics & Tools (KPSEA/KJSEA)',
    subtitle: 'CATs, Formative Tools & Rubrics',
    description: 'Continuous Assessment Tests (CATs), formative observation schedules, task templates, and national KPSEA/KJSEA frameworks.',
    icon: '📝',
    badge: 'Assessment Framework',
  },
  {
    id: 'Topical Revision Notes & Worksheets',
    title: 'Topical Revision Notes & Worksheets',
    subtitle: 'Summaries & Question Banks',
    description: 'Chapter-by-chapter summaries, topical practice exercises, multiple choice questions, and full marking keys.',
    icon: '📋',
    badge: 'Exam Prep',
  },
  {
    id: 'Digital Learning Repositories',
    title: 'Digital Learning Repositories (KEC Cloud)',
    subtitle: 'Interactive & E-Book Content',
    description: 'Platform hosting interactive content, educational summary notes, and e-books aligned with the Kenya Education Cloud.',
    icon: '💻',
    badge: 'KEC Digital Cloud',
  },
];

export const CBC_EDUCATIONAL_TIERS: CBCTier[] = [
  {
    id: 'pre-primary',
    name: 'A. Pre-Primary (PP1 & PP2 - Early Years)',
    grades: ['PP1', 'PP2'],
    description: 'Foundational learning focusing on sensory, motor, language, and early mathematical play activities.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    subjects: [
      { name: 'Mathematical Activities', code: 'MATH_PP', description: 'Early number concept, shapes, counting and measurement play', category: 'Core', icon: '🔢' },
      { name: 'Language Activities / Indigenous Language', code: 'LANG_PP', description: 'Listening, speaking, pre-reading and indigenous communication skills', category: 'Core', icon: '🗣️' },
      { name: 'Environmental Activities', code: 'ENV_PP', description: 'Exploring immediate surroundings, weather, plants, animals and care', category: 'Core', icon: '🌱' },
      { name: 'Psychomotor and Creative Activities', code: 'PSYCH_PP', description: 'Fine & gross motor development, music, movement, drawing and modeling', category: 'Core', icon: '🎨' },
      { name: 'Religious Education Activities (CRE/IRE/HRE)', code: 'REL_PP', description: 'Basic moral values, spiritual growth, respect and togetherness', category: 'Core', icon: '🙏' },
    ],
  },
  {
    id: 'lower-primary',
    name: 'B. Lower Primary (Grades 1, 2 & 3)',
    grades: ['Grade 1', 'Grade 2', 'Grade 3'],
    description: 'Building literacy, numeracy, health, environmental awareness and creative expressions.',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    subjects: [
      { name: 'Mathematics', code: 'MATH_LP', description: 'Operations, fractions, geometry, measurement and problem solving', category: 'Core', icon: '📐' },
      { name: 'English Language', code: 'ENG_LP', description: 'Reading comprehension, grammar, vocabulary, oral and creative writing', category: 'Core', icon: '📖' },
      { name: 'Kiswahili Language / Kenya Sign Language', code: 'KISW_LP', description: 'Kusoma, kuandika, msamiati, sarufi na lugha ya ishara', category: 'Core', icon: '🇰🇪' },
      { name: 'Environmental Activities', code: 'ENV_LP', description: 'Care of soil, water, weather patterns, safety, energy and community', category: 'Core', icon: '🌿' },
      { name: 'Hygiene and Nutrition Activities', code: 'HYG_LP', description: 'Personal hygiene, healthy foods, dental health, safety and sanitation', category: 'Core', icon: '🍎' },
      { name: 'Religious Education (CRE / IRE / HRE)', code: 'REL_LP', description: 'Christian, Islamic or Hindu Religious Education values and ethics', category: 'Core', icon: '🕊️' },
      { name: 'Movement and Creative Activities', code: 'MOVE_LP', description: 'Physical fitness, athletics, gymnastics, music and visual arts', category: 'Core', icon: '⚽' },
    ],
  },
  {
    id: 'upper-primary',
    name: 'C. Upper Primary (Grades 4, 5 & 6)',
    grades: ['Grade 4', 'Grade 5', 'Grade 6'],
    description: 'Scientific inquiry, agricultural practice, social studies, digital literacy and advanced skills.',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    subjects: [
      { name: 'Mathematics', code: 'MATH_UP', description: 'Algebraic concepts, geometry, statistics, percentages and problem solving', category: 'Core', icon: '📊' },
      { name: 'English', code: 'ENG_UP', description: 'Advanced grammar, literary analysis, composition writing and public speaking', category: 'Core', icon: '📚' },
      { name: 'Kiswahili (or Kenya Sign Language)', code: 'KISW_UP', description: 'Lugha na Fasihi, insha, Ufahamu, Sarufi na Ushairi', category: 'Core', icon: '✍️' },
      { name: 'Science and Technology', code: 'SCI_UP', description: 'Living things, matter, forces, energy, digital devices and coding basics', category: 'Core', icon: '🔬' },
      { name: 'Agriculture and Nutrition', code: 'AGRI_UP', description: 'Crop production, soil conservation, domestic animals, food preparation', category: 'Core', icon: '🌾' },
      { name: 'Social Studies (Citizenship, Geography, History)', code: 'SS_UP', description: 'Physical environment, Kenya governance, history, trade and citizenship', category: 'Core', icon: '🌍' },
      { name: 'Creative Arts (Music, Art & Craft)', code: 'ARTS_UP', description: 'Drawing, painting, weaving, musical instruments and performing arts', category: 'Core', icon: '🎭' },
      { name: 'Religious Education (CRE / IRE / HRE)', code: 'REL_UP', description: 'Moral integrity, scripture studies, social responsibility and community', category: 'Core', icon: '📖' },
    ],
  },
  {
    id: 'junior-school',
    name: 'D. Junior School (Grades 7, 8 & 9 - Lower Secondary)',
    grades: ['Grade 7', 'Grade 8', 'Grade 9'],
    description: 'Transition to broader academic disciplines, pre-technical skills, integrated sciences and career preparation.',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    subjects: [
      { name: 'English', code: 'ENG_JS', description: 'Advanced literature, functional writing, oral skills and critical reading', category: 'Core', icon: '📘' },
      { name: 'Kiswahili / Kenya Sign Language', code: 'KISW_JS', description: 'Fasihi ya Kiswahili, Isimu Jamii, Sarufi Fafanuzi na Insha', category: 'Core', icon: '📕' },
      { name: 'Mathematics', code: 'MATH_JS', description: 'Real numbers, geometry, algebra, trigonometry, matrices and statistics', category: 'Core', icon: '📈' },
      { name: 'Integrated Science (Biology, Chemistry, Physics)', code: 'ISCI_JS', description: 'Scientific investigation, cells, chemical reactions, forces, energy & electricity', category: 'Core', icon: '🧪' },
      { name: 'Health Education', code: 'HEALTH_JS', description: 'Human anatomy, disease prevention, mental health, first aid & wellness', category: 'Core', icon: '🩺' },
      { name: 'Social Studies', code: 'SS_JS', description: 'African geography, world history, constitution, human rights & climate action', category: 'Core', icon: '🗺️' },
      { name: 'Religious Education (CRE/IRE/HRE)', code: 'REL_JS', description: 'Ethics, contemporary moral issues, faith traditions and interfaith harmony', category: 'Core', icon: '📜' },
      { name: 'Business Studies', code: 'BUS_JS', description: 'Entrepreneurship, financial accounting, commerce, money & banking', category: 'Core', icon: '💼' },
      { name: 'Agriculture', code: 'AGRI_JS', description: 'Agribusiness, livestock husbandry, soil science, crop management & irrigation', category: 'Core', icon: '🌽' },
      { name: 'Pre-Technical Studies', code: 'PRETECH_JS', description: 'Technical drawing, materials science, electronics, woodwork & basic engineering', category: 'Core', icon: '🛠️' },
      { name: 'Creative Arts and Sports', code: 'ARTS_JS', description: 'Visual arts, music composition, theatre arts, physical fitness & sports science', category: 'Core', icon: '🎨' },
    ],
  },
  {
    id: 'senior-school',
    name: 'E. Senior School (Grades 10, 11 & 12 - Upper Secondary Pathways)',
    grades: ['Grade 10', 'Grade 11', 'Grade 12'],
    description: 'Specialization across 3 main academic & technical pathways to prepare for university and career excellence.',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    subjects: [
      // Core Compulsory
      { name: 'English (Core Compulsory)', code: 'ENG_SS', description: 'Compulsory across all pathways - Advanced Literature & Communication', category: 'Core', icon: '📚' },
      { name: 'Kiswahili / KSL (Core Compulsory)', code: 'KISW_SS', description: 'Compulsory across all pathways - Lugha na Fasihi ya Kiswahili', category: 'Core', icon: '🇰🇪' },
      { name: 'Physical Education & CSL (Core Compulsory)', code: 'PE_CSL', description: 'Community Service Learning, leadership, fitness and civic engagement', category: 'Core', icon: '🏅' },
      // STEM Pathway
      { name: 'STEM: Pure Sciences (Biology, Chemistry, Physics)', code: 'STEM_PURE', description: 'Advanced Pure Sciences for medical, engineering and research careers', category: 'Pathway', icon: '⚡' },
      { name: 'STEM: Applied Sciences & Technology', code: 'STEM_APP', description: 'Agriculture, Computer Science, Aviation, Marine Science & Home Economics', category: 'Pathway', icon: '💻' },
      { name: 'STEM: Technical & Engineering Studies', code: 'STEM_ENG', description: 'Building technology, electrical technology, mechanical and metalwork', category: 'Pathway', icon: '⚙️' },
      // Social Sciences Pathway
      { name: 'Social Sciences: Humanities & Citizenship', code: 'SOC_HUM', description: 'History & Government, Geography, Religious Studies and Philosophy', category: 'Pathway', icon: '🏛️' },
      { name: 'Social Sciences: Business & Commerce', code: 'SOC_BUS', description: 'Economics, Accounting, Business Management & Entrepreneurship', category: 'Pathway', icon: '📊' },
      { name: 'Social Sciences: Languages & Literature', code: 'SOC_LANG', description: 'French, German, Arabic, Mandarin, Literature in English and Linguistics', category: 'Pathway', icon: '🌐' },
      // Arts & Sports Science Pathway
      { name: 'Arts & Sports Science: Sports Science', code: 'ARTS_SPORT', description: 'Kinesiology, sports management, athletic coaching and physical therapy', category: 'Pathway', icon: '⚽' },
      { name: 'Arts & Sports Science: Visual & Fine Arts', code: 'ARTS_FINE', description: 'Graphic design, painting, sculpture, photography and digital arts', category: 'Pathway', icon: '🖼️' },
      { name: 'Arts & Sports Science: Performing Arts', code: 'ARTS_PERF', description: 'Music theory & performance, theatre arts, film production and dance', category: 'Pathway', icon: '🎬' },
    ],
  },
];
