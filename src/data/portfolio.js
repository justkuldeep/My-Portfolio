/**
 * Single source of truth for the whole site.
 *
 * Everything is linked through NAV. The order here is the order of:
 *   - the navbar links
 *   - the sections on the page (after the landing hero)
 *   - the scroll-spy highlight and the section numbers
 *
 * Landing -> About Me -> Projects -> Skills -> Education -> Certifications -> Contact
 * (+ the floating Ask AI toggle, which is an action, not a section)
 */

export const PROFILE = {
  name: 'Kuldeep Soni',
  initials: 'KS',
  greeting: 'Hi, I am Kuldeep Soni',
  role: 'A full stack AI Developer',
  email: 'kuldeepsoni.dev@gmail.com',
  github: 'https://github.com/justkuldeep',
  linkedin: 'https://www.linkedin.com/in/justkuldeep',
  substack: 'https://substack.com/@kuldeepsoni',
};

export const NAV = [
  { id: 'about', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills', kicker: 'Technical Toolkit' },
  { id: 'education', label: 'Education', kicker: 'Education & Honors' },
  { id: 'certifications', label: 'Certifications', kicker: 'Credentials' },
  { id: 'contact', label: 'Contact', kicker: 'Get in Touch' },
  { id: 'ask-ai', label: 'Ask AI', action: 'chat' },
];

export const SECTION_NAV = NAV.filter((n) => !n.action);
const NAV_BY_ID = Object.fromEntries(NAV.map((n) => [n.id, n]));
export const navItem = (id) => NAV_BY_ID[id];
/** "03" for the third section etc. — numbering follows NAV order automatically */
export const navNumber = (id) =>
  String(SECTION_NAV.findIndex((n) => n.id === id) + 1).padStart(2, '0');

/* -------------------------------------------------------------------------- */
/* Landing                                                                    */
/* -------------------------------------------------------------------------- */

export const HERO = {
  bio: 'Final-year B.Tech in AI & ML at Indore Institute of Science & Technology. I build reliable AI systems with measured benchmarks, robust Python backends, and high-fidelity interfaces.',
};

/* -------------------------------------------------------------------------- */
/* Projects  (YouTube RAG card design is the template for every card)         */
/* -------------------------------------------------------------------------- */

export const PROJECTS_INTRO = {
  title: 'Projects',
};

export const PROJECTS = [
  {
    id: 'youtube-rag',
    badge: 'AI / RAG PIPELINE · MRR 0.95',
    category: 'AI / Semantic Retrieval',
    title: 'YouTube RAG Agent',
    subtitle:
      'Grounded natural-language Q&A over video transcripts with timestamp-aware context.',
    description:
      'Extracts audio using yt-dlp, performs speech-to-text with Whisper, and indexes 384-d dense vectors in ChromaDB. Exposes a FastAPI endpoint with LLM grounding and evaluated 0.95 MRR retrieval.',
    video: '/assets/videos/youtube-rag.mp4',
    mockup: { type: 'waveform', icon: '⌘', query: 'Query: "How does the indexing pipeline chunk timestamps?"', left: 'Vector Similarity: Cosine 0.942', right: 'top_k = 5 Chunks' },
    highlights: [
      ['RETRIEVAL ACCURACY', '0.95 MRR Evaluation'],
      ['TRANSCRIPTION', 'OpenAI Whisper STT'],
      ['VECTOR STORE', 'ChromaDB (top_k=5)'],
      ['API LAYER', 'FastAPI Service'],
    ],
    tags: ['Python', 'FastAPI', 'Whisper', 'LangChain', 'ChromaDB', 'Gemini API'],
    links: [
      { label: 'GitHub', href: 'https://github.com/justkuldeep/Youtube-RAG', primary: true },
      { label: 'Watch Demo', href: 'https://www.youtube.com/watch?v=GDm_uH6VxPY' },
    ],
  },
  {
    id: 'saisa',
    badge: 'COLLEGE MINOR PROJECT · 18K+ RECORDS',
    category: 'Full-Stack / Student Systems',
    title: 'SAISA — Student Attendance & Information System',
    subtitle:
      'A campus attendance management platform built with React, Node.js, Express & MongoDB.',
    description:
      'Developed as an academic minor project at IIST to solve chronic gaps in college ERP systems. Tested locally with 472 user accounts and over 18,000 real attendance records. Features in-app dispute resolution, bulk attendance upload from faculty spreadsheets, automated parent communication, and strict 75% attendance threshold monitoring with anomaly detection.',
    video: '/assets/videos/saisa.mp4',
    mockup: {
      type: 'hud',
      icon: 'SA',
      tiles: [['430+', 'Students'], ['18,000+', 'Records'], ['33+', 'Issues Solved']],
      left: 'Threshold Guard: 75% Rule',
      right: 'Role: Student / Faculty / Coordinator',
    },
    highlights: [
      ['LOCAL DATABASE', '18,000+ Records'],
      ['TESTED USERS', '472 Accounts'],
      ['DISPUTE RESOLUTION', '33+ Cases Resolved'],
      ['ROLES SUPPORTED', 'Students, Faculty & Coordinators'],
    ],
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Role-Based Auth'],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/justkuldeep/saisa', primary: true },
    ],
  },
  {
    id: 'ghumo-india',
    badge: 'PRODUCTION · LIVE WEB APP',
    category: 'GenAI / Web Application',
    title: 'Ghumo India',
    subtitle:
      'AI-powered travel discovery experience inspired by Incredible India, featuring an intelligent destination guide.',
    description:
      "A responsive web platform designed to celebrate domestic exploration across India. Integrates Google's Gemini API to curate customized travel recommendations, regional cultural highlights, historical insights, and personalized travel schedules based on user preferences.",
    video: '/assets/videos/ghumo-india.mp4',
    mockup: {
      type: 'quote',
      logo: '/assets/ghumo-india-logo.png',
      quote: '"AI Travel Discovery & Cultural Itineraries"',
      color: '#f7a456',
      left: 'Powered by Google Gemini',
      right: 'Vercel Production',
    },
    highlights: [
      ['DEPLOYMENT', 'Vercel Live Preview'],
      ['AI ENGINE', 'Google Gemini API'],
      ['DESIGN', 'Incredible India Inspired'],
      ['FRONTEND', 'Responsive React UI'],
    ],
    tags: ['React', 'JavaScript', 'Google Gemini API', 'Tailwind CSS', 'Vercel'],
    links: [
      { label: 'Visit Live Site', href: 'https://ghumo-india-rho.vercel.app/', primary: true },
      { label: 'GitHub Repository', href: 'https://github.com/justkuldeep/Ghumo-India' },
    ],
  },
  {
    id: 'csv-visualiser',
    badge: 'CLIENT-SIDE TOOL · LIVE PREVIEW',
    category: 'Data / Browser Tool',
    title: 'CSV Visualiser',
    subtitle:
      'Turn complex tabular CSV data into interactive, customizable analytical charts directly in the browser.',
    description:
      'A fast, zero-install data inspection tool built for researchers, analysts, and students. Parses CSV files locally without sending data to external servers, generates dynamic column correlations, summary statistics, and interactive charts (bar, line, scatter) with export capabilities.',
    video: '/assets/videos/csv-visualiser.mp4',
    mockup: {
      type: 'bars',
      icon: '📊',
      bars: [25, 48, 35, 58, 42, 52],
      left: 'Zero Uploads: Private in-browser',
      right: 'Chart.js Engine',
    },
    highlights: [
      ['DATA PRIVACY', '100% Client-Side'],
      ['CHART ENGINE', 'Chart.js & Canvas'],
      ['DEPLOYMENT', 'Vercel Production'],
      ['FILE HANDLING', 'Multi-format CSV Parsing'],
    ],
    tags: ['JavaScript', 'Chart.js', 'HTML5 / CSS3', 'Data Visualization', 'Vercel'],
    links: [
      { label: 'Visit Live Site', href: 'https://csv-visualiser.vercel.app/', primary: true },
      { label: 'GitHub Repository', href: 'https://github.com/justkuldeep/CSV-Visualiser' },
    ],
  },
  {
    id: 'desktop-automation',
    badge: 'PYTHON DESKTOP UTILITY',
    category: 'System Automation / Python',
    title: 'Desktop Automation System',
    subtitle:
      'Voice-controlled desktop workflow automation for hands-free productivity and application management.',
    description:
      'A desktop automation utility in Python exploring speech recognition pipelines and automated operating system macros. Executes voice commands to launch workspaces, manage window layouts, automate routine typing, and coordinate keyboard and mouse sequences.',
    video: '/assets/videos/desktop-automation.mp4',
    mockup: {
      type: 'quote',
      icon: '⌨',
      quote: '$ python -m automation --voice-listen',
      color: '#7aa2f7',
      left: 'PyAutoGUI & SpeechRecognition',
      right: 'System Macros',
    },
    highlights: [
      ['INPUT METHOD', 'Voice & Command Macros'],
      ['OS AUTOMATION', 'PyAutoGUI & Subprocess'],
      ['SPEECH ENGINE', 'SpeechRecognition'],
      ['ARCHITECTURE', 'Modular Action Handlers'],
    ],
    tags: ['Python', 'SpeechRecognition', 'PyAutoGUI', 'OS Scripting', 'Automation'],
    links: [
      { label: 'GitHub Repository', href: 'https://github.com/justkuldeep/Desktop-Automation', primary: true },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* About Me                                                                   */
/* -------------------------------------------------------------------------- */

export const ABOUT = {
  title: 'About Me',
  portrait: '/assets/kuldeep-portrait-cutout.png',
  bio: HERO.bio, // same line as the landing page, one source
};

/* -------------------------------------------------------------------------- */
/* Education                                                                  */
/* -------------------------------------------------------------------------- */

export const EDUCATION_INTRO = {
  title: ['Academic Foundations.', 'Consistent Commitment.'],
  lead: 'Formal education in Artificial Intelligence, Machine Learning, and foundational computer science principles.',
};

export const EDUCATION = [
  {
    year: '2023 — 2027 · IN PROGRESS',
    degree: 'B.Tech — Artificial Intelligence & Machine Learning',
    institution: 'Indore Institute of Science and Technology (IIST), Indore',
    score: '7.7',
    scoreLabel: 'CGPA / 10.0 · Final Year',
    featured: true,
  },
  {
    year: '2022 · MP BOARD',
    degree: 'Senior Secondary (Class XII)',
    institution: 'Padmaja Higher Secondary School, Dewas',
    score: '86.2%',
    scoreLabel: 'Final Academic Score',
  },
  {
    year: '2020 · MP BOARD',
    degree: 'Higher Secondary (Class X)',
    institution: 'Padmaja Higher Secondary School, Dewas',
    score: '91.0%',
    scoreLabel: 'Final Academic Score',
  },
];

/* -------------------------------------------------------------------------- */
/* Skills                                                                     */
/* -------------------------------------------------------------------------- */

export const SKILLS_INTRO = {
  title: ['Core Competencies.', 'Modern Tech Stack.'],
  lead: 'Tools, libraries, and frameworks I use to build scalable machine learning workflows, vector pipelines, and interactive web applications.',
};

/**
 * Order = clockwise around the skills wheel, starting at the top.
 * `lines` is the label printed on the ring; `title` is the full heading shown in the centre.
 */
export const SKILLS = [
  {
    id: 'ai-ml',
    lines: ['AI & ML'],
    title: 'AI, ML & Semantic Retrieval',
    items: ['RAG Architectures', 'Vector Embeddings', 'Vector Databases', 'Transformers', 'LangChain', 'LangGraph', 'Speech To Text (STT)', 'API Keys', 'Ollama', 'Evaluation'],
  },
  {
    id: 'frontend',
    lines: ['Frontend'],
    title: 'Frontend & Interface Craft',
    items: ['React', 'JavaScript (ES6+)', 'Tailwind CSS', 'HTML5 & CSS3', 'Vite', 'Responsive Design', 'Micro-Interactions'],
  },
  {
    id: 'backend',
    lines: ['Backend'],
    title: 'Backend & API Services',
    items: ['Python (FastAPI)', 'Node.js', 'Express.js', 'RESTful APIs', 'Pydantic', 'CORS & Rate Limiting', 'Authentication','Authorization'],
  },
  {
    id: 'database',
    lines: ['Database'],
    title: 'Databases & Storage',
    items: ['MongoDB', 'ChromaDB', 'Supabase', 'MYSQL','SQLite',],
  },
  {
    id: 'languages',
    lines: ['Languages'],
    title: 'Languages',
    items: ['Python (Primary)', 'C++ (DSA)', 'JavaScript (Web Development)', 'C', 'Java'],
  },
  {
    id: 'tooling',
    lines: ['Developer', 'Tooling'],
    title: 'Developer Tooling & CS',
    items: ['Git & GitHub', 'uv (Python Packaging)', 'VS Code', 'Postman', 'Vercel', 'DSA & OOP', 'Computer Networks', 'Operating Systems'],
  },
];

/* -------------------------------------------------------------------------- */
/* Certifications                                                             */
/* -------------------------------------------------------------------------- */

export const CERTIFICATIONS_INTRO = {
  title: ['Verified Learning.', 'Credentials & Certificates.'],
  lead: 'Courses and badges in RAG, databases, cloud, and data structures — each one opens the original certificate.',
};

const CERT_DIR = '/assets/certificates';

/**
 * Newest first. `image` is the preview, `file` the original certificate,
 * `verify` the public Credly page (only where the certificate has one).
 * Everything here is printed on the certificates themselves.
 */
export const CERTIFICATIONS = [
  {
    id: 'rag-with-mongodb',
    title: 'Building RAG Apps Using MongoDB',
    issuer: 'MongoDB',
    type: 'MongoDB Skill badge',
    date: 'Aug 2026',
    facts: ['RAG with MongoDB'],
    image: `${CERT_DIR}/rag-with-mongodb.webp`,
    file: `${CERT_DIR}/rag-with-mongodb.pdf`,
    verify: 'https://www.credly.com/badges/dba36175-9cb2-4c53-8a32-66444638aebd',
  },
  {
    id: 'aws-academy-cloud-foundations',
    title: 'AWS Academy Graduate — Cloud Foundations',
    issuer: 'AWS Academy',
    type: 'Training badge',
    date: 'Jun 2026',
    facts: ['20 course hours'],
    image: `${CERT_DIR}/aws-academy-cloud-foundations.webp`,
    file: `${CERT_DIR}/aws-academy-cloud-foundations.pdf`,
    verify: 'https://www.credly.com/go/Rn5mkzvs',
  },
  {
    id: 'mongodb-overview',
    title: 'MongoDB Overview: Core Concepts and Architecture',
    issuer: 'MongoDB',
    type: 'MongoDB Skill badge',
    date: 'Nov 2025',
    facts: ['MongoDB Overview'],
    image: `${CERT_DIR}/mongodb-overview.webp`,
    file: `${CERT_DIR}/mongodb-overview.pdf`,
    verify: 'https://www.credly.com/badges/5a58d878-dc5c-4b9b-a6ee-1644833e7394',
  },
    {
    id: 'mern-bootcamp-gfg',
    title: 'MERN Stack Bootcamp',
    issuer: 'GeeksforGeeks',
    type: 'Certificate of Course Completion',
    date: 'Oct 2025', 
    facts: ['MERN Stack'],
    image: `${CERT_DIR}/MERN_BootCamp_GFG.jpg`,
    file: `${CERT_DIR}/MERN_BootCamp_GFG.pdf`,
    verify: 'https://media.geeksforgeeks.org/courses/certificates/621baade5cb0bd2de511affefa4ba6f4.pdf',
  },
  {
    id: 'scaler-dsa-cpp',
    title: 'Data Structures in C++ Course',
    issuer: 'Scaler Topics',
    type: 'Certificate of Excellence',
    date: 'Jun 2024',
    facts: ['100 video tutorials', '13 modules'],
    image: `${CERT_DIR}/scaler-dsa-cpp.webp`,
    file: `${CERT_DIR}/scaler-dsa-cpp.png`,
  },
  {
    id: 'scaler-cpp-essentials',
    title: 'C++ Course: Learn the Essentials',
    issuer: 'Scaler Topics',
    type: 'Certificate of Excellence',
    date: 'Nov 2023',
    facts: ['91 video tutorials', '14 modules', '14 challenges'],
    image: `${CERT_DIR}/scaler-cpp-essentials.webp`,
    file: `${CERT_DIR}/scaler-cpp-essentials.png`,
  },
];

/* -------------------------------------------------------------------------- */
/* Contact                                                                    */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  title: ['Let’s Build', 'Something Real.'],
  lead: 'I’m actively looking for AI/ML engineering internships, RAG development opportunities, and collaborative software projects.',
  links: [
    { label: 'GitHub', href: PROFILE.github },
    { label: 'LinkedIn', href: PROFILE.linkedin },
    { label: 'Substack', href: PROFILE.substack },
  ],
};

/* -------------------------------------------------------------------------- */
/* Ask AI                                                                     */
/* -------------------------------------------------------------------------- */

export const ASK_AI = {
  welcome:
    "Hi! I'm Kuldeep's portfolio RAG assistant. Ask me anything about his projects, skills, education, or availability.",
  // Quick prompts are generated from the navbar headings so chat stays linked to the page
  quickPrompts: [
    { label: 'Projects', prompt: "What are Kuldeep's strongest projects?" },
    { label: 'My Story', prompt: 'What is Kuldeep’s engineering philosophy?' },
    { label: 'Education', prompt: 'Tell me about his education and availability for an AI/ML internship.' },
    { label: 'Skills', prompt: 'What is his experience with RAG and ChromaDB?' },
  ],
  fallback: {
    strongest:
      "Kuldeep's strongest project for AI/RAG roles is the **YouTube RAG Agent** (evaluating at 0.95 MRR using Whisper, LangChain, ChromaDB & FastAPI). His project with the most real-world institutional data is **SAISA**, an academic minor project tested on 18,000+ real records across 430+ students and 40 faculty members.",
    internship:
      'Yes! As of November 2026, Kuldeep is actively seeking **AI/ML Internships and AI Engineer roles** (expected graduation June 2027 from IIST, Indore). You can reach him directly at **kuldeepsoni.dev@gmail.com** or via LinkedIn at linkedin.com/in/justkuldeep.',
    rag: 'Kuldeep has hands-on experience building complete RAG systems: audio extraction via `yt-dlp`, transcription via OpenAI `Whisper`, chunking with `LangChain`, 384-dimensional dense embeddings using `all-MiniLM-L6-v2` / `gemini-embedding-001`, vector search via `ChromaDB` (top_k=5), and grounded FastAPI `/ask` endpoints with measured 0.95 MRR retrieval quality.',
    saisa:
      "**SAISA (Smart Academic & Integrated Student Attendance)** is Kuldeep's academic minor project at IIST. Built with React, Node.js, Express & MongoDB, it manages 472 local user accounts, tracks 18,000+ real attendance records, enforces 75% attendance criteria, and resolves formal student attendance disputes.",
    general:
      'Kuldeep is a final-year B.Tech student in AI & ML at IIST, Indore (CGPA 7.7), specializing in RAG systems, Python/FastAPI, and full-stack web applications. For detailed questions, run the local backend server (`cd agent/backend && uvicorn app.main:app --reload`) or email him directly at **kuldeepsoni.dev@gmail.com**.',
  },
};
