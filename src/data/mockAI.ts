import { Resume, ATSScoreReport, JobMatchReport, Skill, Experience, Education, Project, Certification } from '../types';

// Dictionary of weak input phrases mapped to professional, high-impact, metrics-driven bullet points
export const REWRITE_DICTIONARY: Record<string, { professional: string; technical: string; business: string }> = {
  "worked on website": {
    professional: "Spearheaded the redesign and optimization of the core customer-facing web application, improving page load speed by 35% and boost SEO rankings.",
    technical: "Developed and maintained a responsive web application using React and TypeScript, incorporating Tailwind CSS and Framer Motion for enhanced visual fidelity, increasing mobile traffic by 40%.",
    business: "Led the front-end overhaul of the company portal, directly resulting in a 25% increase in user engagement and onboarding 1,500+ monthly active customers."
  },
  "wrote code": {
    professional: "Authored clean, maintainable, and highly tested codebase architectures, reducing software defects by 20% and improving release reliability.",
    technical: "Engineered scalable modular components in TypeScript, utilizing modern hooks and state management systems, accelerating software development cycles by 15%.",
    business: "Streamlined coding standards and review pipelines, resulting in a 30% reduction in average feature development turnaround times."
  },
  "helped customers": {
    professional: "Delivered premium technical support and advisory solutions, maintaining an exceptional customer satisfaction rating of 99.2%.",
    technical: "Administered customer ticket queues, identifying root-cause infrastructure bugs and coordinating hotfixes with core systems engineering teams to reduce resolution latency by 45%.",
    business: "Cultivated a loyal client support culture, helping retain high-value enterprise accounts valued at $450K+ annually and reducing churn by 12%."
  },
  "did marketing": {
    professional: "Orchestrated targeted digital marketing campaigns across multi-channel platforms, achieving a significant boost in traffic and brand presence.",
    technical: "Leveraged analytics tools (Google Analytics, SEO crawlers) to profile user actions and optimize ad campaigns, boosting target conversion efficiencies by 28%.",
    business: "Managed a $15,000 monthly marketing budget, generating a 3.5x return on ad spend (ROAS) and securing 2,200+ qualified business leads."
  },
  "managed project": {
    professional: "Directed agile product teams through full-lifecycle product phases, aligning business deliverables with technical roadmaps to guarantee on-time delivery.",
    technical: "Coordinated sprints, backlog pruning, and retrospective workflows for a 10-person engineering team, successfully shipping 4 enterprise product releases.",
    business: "Optimized operational project allocations, delivering key milestone results 2 weeks ahead of schedule and saving $18,000 in dev overheads."
  },
  "built API": {
    professional: "Architected secure and high-performance server integrations, supporting concurrent application processes without performance degradation.",
    technical: "Built high-throughput RESTful APIs using Node.js, Express, and MongoDB, implementing JWT authentication and Redis caching to handle 50,000+ daily requests with 99.9% uptime.",
    business: "Refactored legacy backend web integrations, saving $12,000 in yearly cloud database infrastructure expenses through optimized queries."
  },
  "did database": {
    professional: "Supervised and refactored enterprise database nodes, implementing query tuning structures to safeguard mission-critical business transactions.",
    technical: "Optimized relational indexing structures, table indexing, and database caching in SQL/NoSQL systems, boosting execution speed of financial records by 48%.",
    business: "Managed secure automated backups and migrations for 4.5M+ records, ensuring 100% compliance with corporate and GDPR security audits."
  },
  "made design": {
    professional: "Created premium user-centric visual architectures, aligning functional UI mockups with direct user feedback and brand style guidelines.",
    technical: "Translated Figma UI prototypes into production-ready Tailwind/CSS frontend layouts, maintaining strict responsive pixel-perfect parity across devices.",
    business: "Conducted collaborative A/B usability test panels, refining critical checkout pathways to decrease user purchase-friction drop-offs by 18%."
  },
  "learned coding": {
    professional: "Acquired rigorous technical proficiencies in software paradigms, applying data structures and object-oriented algorithms to design robust applications.",
    technical: "Completed intensive training in JavaScript, React, and databases, building 6 portfolio web apps and submitting 80+ contributions to GitHub.",
    business: "Demonstrated rapid technology adoption, transforming academic principles into operational tools to contribute directly to product sprints."
  }
};

// Fallback suggestions generator based on matching keywords
export const generateSmartAIPhrase = (text: string, style: 'professional' | 'technical' | 'business' = 'technical'): string => {
  const cleanInput = text.toLowerCase().trim();
  
  // Direct match in dictionary
  for (const [key, val] of Object.entries(REWRITE_DICTIONARY)) {
    if (cleanInput.includes(key) || key.includes(cleanInput)) {
      return val[style];
    }
  }

  // Action verbs dictionary
  const verbs = ["Spearheaded", "Architected", "Engineered", "Orchestrated", "Designed", "Formulated", "Accelerated", "Pioneered"];
  const metrics = ["by 25%", "resulting in a 30% efficiency gain", "saving 15 hours of weekly manual work", "growing active user engagement by 40%", "reducing system latencies by 35%"];
  
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
  const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];

  if (cleanInput.length < 5) {
    return "Refined and structured professional accomplishments to emphasize quantitative achievements and business outcomes.";
  }

  // Capitalize first letter of user input
  const formattedInput = text.charAt(0).toLowerCase() + text.slice(1);
  return `${randomVerb} and optimized systems to ${formattedInput}, ${randomMetric}.`;
};

// Mock Dictionary of Jobs and their required keywords
export const MOCK_JOBS_REGISTRY: Record<string, { title: string; keywords: string[]; skills: string[]; description: string }> = {
  "software_engineer": {
    title: "Software Engineer / Web Developer",
    keywords: ["React", "TypeScript", "Node.js", "MongoDB", "REST API", "Git", "Docker", "AWS", "CI/CD", "Unit Testing", "Agile"],
    skills: ["Next.js", "GraphQL", "Redux", "SQL", "Tailwind CSS", "Kubernetes", "Express.js"],
    description: "Looking for a Software Engineer with solid experience in building responsive web applications. Essential stack includes React, TypeScript, and Node.js. Experience with cloud deployments, databases, and CI/CD operations is highly preferred."
  },
  "frontend_engineer": {
    title: "Frontend Developer",
    keywords: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "HTML5", "CSS3", "JavaScript", "REST API", "Git", "Redux"],
    skills: ["Next.js", "Jest", "CSS Grid", "Responsive Design", "SEO", "UI/UX Design", "Webpack"],
    description: "Seeking a passionate Frontend Developer to design and implement premium interactive dashboards. Must be highly skilled in React, Tailwind CSS, and TypeScript. Framer Motion and animations experience is a big plus."
  },
  "backend_engineer": {
    title: "Backend Engineer",
    keywords: ["Node.js", "Express.js", "MongoDB", "SQL", "REST API", "Redis", "JWT", "Docker", "AWS", "Microservices", "Git"],
    skills: ["PostgreSQL", "GraphQL", "Mongoose", "CI/CD", "Security Protocols", "Python", "Kubernetes"],
    description: "Hiring a Backend Developer responsible for building robust backend business architectures. Focus will be SQL/NoSQL databases, security standards (JWT, OAuth), RESTful APIs, and containerized deployments via Docker."
  },
  "business_analyst": {
    title: "Business & Financial Analyst",
    keywords: ["Excel", "SQL", "Tableau", "Power BI", "Data Modeling", "KPI", "Market Research", "Reporting", "Financial Modeling", "Agile"],
    skills: ["Python", "SAS", "Risk Assessment", "Requirements Analysis", "Data Mining", "Presentation"],
    description: "We are hiring a Business Analyst to bridge the gap between business needs and technical solutions. Must possess robust analytical skills, proficiency in SQL, Tableau/PowerBI, and Excel modeling. Strong communication is key."
  },
  "marketing_manager": {
    title: "Digital Marketing Specialist",
    keywords: ["SEO", "Google Analytics", "SaaS", "Content Strategy", "Social Media", "ROAS", "A/B Testing", "CRM", "Email Marketing", "Brand Strategy"],
    skills: ["Copywriting", "Paid Ads", "SEM", "Lead Generation", "HubSpot", "Visual Design"],
    description: "Seeking an experienced Digital Marketing Professional to grow organic and paid acquisition pathways. Expertise in SEO optimization, Google Analytics, social media frameworks, and managing advertising budgets to maximize ROAS."
  }
};

// Function that analyzes job descriptions, extracts matching keywords, and computes stats
export const analyzeJobDescriptionMatch = (resume: Resume, jobDescriptionText: string): JobMatchReport => {
  const text = jobDescriptionText.toLowerCase();
  
  // Choose standard target keywords based on JD contents, or fallback to general tech
  let targetKeywords = MOCK_JOBS_REGISTRY.software_engineer.keywords;
  let targetSkills = MOCK_JOBS_REGISTRY.software_engineer.skills;

  // Smart checking to match JD to specific registry
  for (const [key, job] of Object.entries(MOCK_JOBS_REGISTRY)) {
    if (text.includes(key.replace('_', ' ')) || text.includes(job.title.toLowerCase()) || job.keywords.some(k => text.includes(k.toLowerCase()))) {
      targetKeywords = job.keywords;
      targetSkills = job.skills;
      break;
    }
  }

  // Extract all text content from the resume to check keyword presence
  const resumeText = JSON.stringify(resume).toLowerCase();
  
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetKeywords.forEach(kw => {
    if (resumeText.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const suggestedSkills = targetSkills.filter(skill => !resumeText.includes(skill.toLowerCase()));

  // Math calculation
  const totalKeywords = targetKeywords.length;
  const matchedCount = matchedKeywords.length;
  const keywordRatio = totalKeywords > 0 ? (matchedCount / totalKeywords) : 0;
  
  // Add other scores (e.g. skills count, experience presence)
  let score = Math.round(keywordRatio * 80 + 20); // Scale score between 20 and 100
  if (score > 100) score = 100;
  if (score < 0) score = 0;

  const improvements: string[] = [];
  if (missingKeywords.length > 0) {
    improvements.push(`Incorporate high-priority missing technical keywords: ${missingKeywords.slice(0, 3).join(', ')}.`);
  }
  if (suggestedSkills.length > 0) {
    improvements.push(`Consider adding these trending related skills to highlight expertise: ${suggestedSkills.slice(0, 3).join(', ')}.`);
  }
  if (!resume.personalInfo.linkedin) {
    improvements.push("Add your LinkedIn Profile URL in the Contact section to boost professional credibility.");
  }
  if (resume.experience.length === 0) {
    improvements.push("Add at least one professional work experience or internship item to establish a career timeline.");
  }

  return {
    score,
    matchedKeywords,
    missingKeywords,
    suggestedSkills,
    improvements: improvements.length > 0 ? improvements : ["Your resume matches this job description beautifully! Optimize minor formatting to submit."]
  };
};

// Generates dynamic real-time ATS Score checking reports
export const calculateATSScore = (resume: Resume): ATSScoreReport => {
  let contactScore = 0;
  let skillsScore = 0;
  let experienceScore = 0;
  let projectsScore = 0;
  let formattingScore = 80; // Baseline formatting score

  const strengths: string[] = [];
  const improvements: string[] = [];

  // 1. Personal Information Completeness
  const info = resume.personalInfo;
  if (info.name) contactScore += 30;
  if (info.email && info.phone) contactScore += 30;
  if (info.location) contactScore += 10;
  if (info.linkedin || info.github) {
    contactScore += 30;
    strengths.push("Excellent contact registry; professional social profiles attached.");
  } else {
    improvements.push("Add professional URLs (LinkedIn, GitHub) to help recruiters verify your profile.");
  }
  contactScore = Math.min(contactScore, 100);

  // 2. Skills completeness
  const skillsCount = resume.skills.length;
  if (skillsCount >= 8) {
    skillsScore = 100;
    strengths.push("Highly robust skills inventory with diverse technical classifications.");
  } else if (skillsCount >= 4) {
    skillsScore = 75;
    strengths.push("Adequate skills section provided.");
    improvements.push("Expand your technical keywords. Add at least 8 specific skills or proficiencies.");
  } else {
    skillsScore = 40;
    improvements.push("Crucial skills shortage detected. List core skills to bypass automated ATS filters.");
  }

  // 3. Experience Quality
  const expCount = resume.experience.length;
  const internshipCount = resume.internships.length;
  const totalCareerNodes = expCount + internshipCount;

  if (totalCareerNodes >= 3) {
    experienceScore = 100;
    strengths.push("Exceptional professional tenure; robust timeline nodes present.");
  } else if (totalCareerNodes >= 1) {
    experienceScore = 80;
    strengths.push("Clear work or internship timelines present.");
    improvements.push("Add quantifiable metrics to your experience descriptors (e.g., % growth, hours saved).");
  } else {
    experienceScore = 30;
    improvements.push("Empty professional history. Add work history, academic research, or internships.");
  }

  // 4. Projects completeness
  const projCount = resume.projects.length;
  if (projCount >= 3) {
    projectsScore = 100;
    strengths.push("Stellar projects representation illustrating hands-on capability.");
  } else if (projCount >= 1) {
    projectsScore = 75;
    strengths.push("Solid portfolio project entries attached.");
    improvements.push("Highlight technical stack usage inside project titles (e.g. 'Project Alpha (React/Node)').");
  } else {
    projectsScore = 20;
    improvements.push("Add projects to showcase practical application of your listed skills.");
  }

  // 5. Formatting checks
  const summaryLength = resume.summary.trim().length;
  if (summaryLength > 50 && summaryLength < 350) {
    formattingScore += 10;
    strengths.push("Professional summary length is perfectly optimized (1-3 sentences).");
  } else if (summaryLength === 0) {
    formattingScore -= 10;
    improvements.push("Create an engaging professional summary at the top to highlight key strengths.");
  } else {
    formattingScore -= 5;
    improvements.push("Summary is either too brief or too wordy. Keep it under 300 characters.");
  }

  // Resume length bounds
  const totalLength = JSON.stringify(resume).length;
  if (totalLength > 10000) {
    formattingScore -= 10;
    improvements.push("Resume data is extremely dense. Prune content to maintain a sleek 1-2 page presentation.");
  }

  formattingScore = Math.min(Math.max(formattingScore, 30), 100);

  // Overall Score Calculation
  const score = Math.round(
    contactScore * 0.2 +
    skillsScore * 0.25 +
    experienceScore * 0.3 +
    projectsScore * 0.15 +
    formattingScore * 0.1
  );

  return {
    score,
    strengths: strengths.length > 0 ? strengths : ["Good standard document skeleton structure."],
    improvements: improvements.length > 0 ? improvements : ["Optimize minor margins to print."],
    details: {
      contactInfo: { score: contactScore, feedback: contactScore === 100 ? "Complete profile details." : "Add professional websites." },
      skillsScore: { score: skillsScore, feedback: skillsCount + " skills registered." },
      experienceScore: { score: experienceScore, feedback: totalCareerNodes + " career nodes listed." },
      projectsScore: { score: projectsScore, feedback: projCount + " projects published." },
      formattingScore: { score: formattingScore, feedback: "Aesthetic checks validated." }
    }
  };
};

// Mock Interview Questions Database grouped by industry profiles
export const MOCK_INTERVIEW_REGISTRY: Record<string, Array<{ id: string; type: 'tech' | 'hr' | 'behavioral'; question: string; points: string[]; answer: string }>> = {
  "software_engineer": [
    {
      id: "se_q1",
      type: "tech",
      question: "What is the difference between client-side rendering (CSR) and server-side rendering (SSR), and how do you decide which to use?",
      points: ["CSR uses browser to compile JavaScript (SPA)", "SSR compiles HTML on server for SEO and initial load speed", "Vite/React is usually CSR, Next.js supports SSR"],
      answer: "Client-side rendering (CSR) compiles the application inside the user's browser, enabling extremely fast sub-page loading and responsive user interactions. Server-side rendering (SSR) generates full HTML files on the server for each request, which makes initial page loads faster and significantly improves SEO indexes. I choose SSR (e.g. Next.js) for landing pages and public-facing content sites where SEO is vital, and CSR (e.g. standard React + Vite) for secure dashboards and SaaS applications."
    },
    {
      id: "se_q2",
      type: "behavioral",
      question: "Describe a time when you had to debug a critical production bug under intense time pressure. How did you proceed?",
      points: ["Isolate variables & check logs", "Reproduce bug in sandbox environment", "Implement minimal risk hotfix", "Conduct code review & deploy monitor"],
      answer: "In a previous project, a backend API routing error blocked checkout services. Under high pressure, I first isolated variables by analyzing logs (e.g. CloudWatch) to find the crash traceback. Next, I reproduced the bug in a local sandbox to avoid production modifications. I discovered a null-pointer error on user session profiles, added defensive checks, ran tests, pushed a targeted hotfix, and successfully restored operation within 25 minutes, saving customer checkout pipelines."
    },
    {
      id: "se_q3",
      type: "hr",
      question: "Why do you want to join our engineering team and how do you keep your technical skills current?",
      points: ["Alignment with modern stack", "Passion for solving scale problems", "Technical blogs, open source, and building side projects"],
      answer: "I want to join your team because of your high technical standards and focus on building high-performance products. I thrive in responsive technical environments. I keep my skills sharp by reading tech newsletters (e.g., TLDR, Hacker News), participating in open-source challenges, and continuously building interactive side projects like Resume'9 to experiment with advanced state management and styling layers."
    }
  ],
  "frontend_engineer": [
    {
      id: "fe_q1",
      type: "tech",
      question: "How do you optimize a React application's rendering performance when dealing with large lists or frequent updates?",
      points: ["Use React.memo and useCallback/useMemo", "Implement virtualized lists (windowing)", "Debounce inputs and prune global state updates"],
      answer: "Performance optimization involves several layers. First, I use `React.memo` to skip unnecessary component renders, alongside `useCallback` and `useMemo` to keep references stable. For large datasets, I implement list virtualization (e.g., `react-window`) to only render items visible in the viewport. I also debounce high-frequency events like text inputs and partition complex states to prevent global cascading tree redraws."
    }
  ],
  "generic": [
    {
      id: "g_q1",
      type: "hr",
      question: "Tell me about yourself, your core professional journey, and what makes you a great fit for this position.",
      points: ["Brief background summary", "Core skills highlighted", "Alignment of passion with position objectives"],
      answer: "I am a dedicated professional with a strong foundation in modern web technologies and a passion for creating high-quality, user-friendly digital tools. Over my journey, I have developed expertise in front-end design, responsive layout development, and analytical problem-solving. What makes me a great fit for this position is my blend of technical engineering skills, design aesthetics, and a customer-centric mindset, allowing me to build solutions that not only compile clean code but deliver measurable business value."
    }
  ]
};

// Mock LinkedIn Profile Suggestions Generator
export const generateLinkedInOptimization = (resume: Resume) => {
  const name = resume.personalInfo.name || "Professional";
  const title = resume.personalInfo.title || "Software Engineer / Professional";
  
  // Custom headline variations
  const headlines = [
    `${title} | Specializing in React, TypeScript & Node.js | Building Scalable High-Performance Web Applications`,
    `${title} | Passionate about UI/UX, Cloud Operations, and Solving Complex Algorithmic Challenges`,
    `${title} | Translating Client Requirements into Clean, Modern Responsive Codebases`
  ];

  const aboutSummary = `Passionate and performance-driven ${title} with a proven track record of engineering responsive, high-fidelity applications. Highly skilled in core technologies including ${resume.skills.slice(0, 5).map(s => s.name).join(', ') || 'React, TypeScript, JavaScript, HTML, and CSS'}. Experienced in implementing agile, metrics-focused workflows to boost user engagement and streamline coding pipelines. Seeking to leverage analytical engineering skills to solve large-scale infrastructure challenges.`;

  return {
    headlines,
    aboutSummary,
    experienceSection: "Ensure your LinkedIn experience nodes match your resume verbatim. Include bullet lists that lead with impactful action verbs (Spearheaded, Architected, Formulated) and conclude with numeric benchmarks (e.g. 'improved speeds by 30%').",
    skillsEndorsements: resume.skills.slice(0, 3).map(s => s.name),
    profileChecklist: [
      { id: "lic_1", label: "Customize Profile URL", desc: "Change standard linkedin.com/in/user-12345 to matching linkedin.com/in/username.", checked: false },
      { id: "lic_2", label: "Include Featured Section", desc: "Link to your outstanding portfolio repos or live deployments.", checked: false },
      { id: "lic_3", label: "Toggle 'Open To Work' Badge", desc: "Configure settings to highlight visibility for corporate recruiters.", checked: true },
      { id: "lic_4", label: "Sync Skills to Core Endorsements", desc: `Publish your primary resume skills: ${resume.skills.slice(0, 3).map(s => s.name).join(', ') || 'technical stack'} at the top.`, checked: false }
    ]
  };
};

export const parseResumeFromText = (text: string): Partial<Resume> => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const fullTextLower = text.toLowerCase();
  
  // Extract Name (First non-empty line, if not a contact line)
  let name = '';
  for (const line of lines) {
    if (!line.includes('@') && !line.includes('http') && !line.match(/\d{4,}/) && line.length < 40) {
      name = line;
      break;
    }
  }

  // Extract Email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const email = emailMatch ? emailMatch[0] : '';

  // Extract Phone
  const phoneMatch = text.match(/(\+?\d{1,4}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  const phone = phoneMatch ? phoneMatch[0] : '';

  // Extract Links (GitHub, LinkedIn, Website)
  const urls = text.match(/(https?:\/\/[^\s]+)/gi) || [];
  let github = '';
  let linkedin = '';
  let website = '';

  urls.forEach(url => {
    const urlLower = url.toLowerCase();
    if (urlLower.includes('github.com')) github = url;
    else if (urlLower.includes('linkedin.com')) linkedin = url;
    else if (!website) website = url;
  });

  // Extract Location (City, ST or Country)
  const locationMatch = text.match(/([A-Z][a-zA-Z\s]+),\s([A-Z]{2}|[A-Za-z]+)/);
  const location = locationMatch ? locationMatch[0] : '';

  // Extract Title
  let title = '';
  const titlesList = [
    "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Engineer",
    "Data Scientist", "Product Manager", "Business Analyst", "Marketing Specialist",
    "UI/UX Designer", "DevOps Engineer", "Project Manager"
  ];
  for (const t of titlesList) {
    if (fullTextLower.includes(t.toLowerCase())) {
      title = t;
      break;
    }
  }

  // Extract Skills
  const knownSkills = [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Languages" },
    { name: "Node.js", category: "Backend" },
    { name: "JavaScript", category: "Languages" },
    { name: "Python", category: "Languages" },
    { name: "SQL", category: "Databases" },
    { name: "MongoDB", category: "Databases" },
    { name: "Docker", category: "DevOps" },
    { name: "AWS", category: "DevOps" },
    { name: "Git", category: "Version Control" },
    { name: "HTML5", category: "Frontend" },
    { name: "CSS3", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Figma", category: "Frontend" },
    { name: "PostgreSQL", category: "Databases" },
    { name: "GraphQL", category: "Backend" },
    { name: "Redux", category: "Frontend" }
  ];
  const skills: Skill[] = [];
  knownSkills.forEach((sk, idx) => {
    if (fullTextLower.includes(sk.name.toLowerCase())) {
      skills.push({
        id: `sk_parsed_${idx}_${Date.now()}`,
        name: sk.name,
        category: sk.category,
        level: 4
      });
    }
  });

  // Extract Summary
  let summary = '';
  const summaryHeaders = ["summary", "objective", "professional summary", "profile", "about me", "professional profile"];
  let foundSummary = false;
  let summaryLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineLower = lines[i].toLowerCase();
    if (summaryHeaders.some(h => lineLower.includes(h) && lineLower.length < 30)) {
      foundSummary = true;
      continue;
    }
    if (foundSummary) {
      if (lines[i].length < 30 && (lines[i].match(/^[A-Z][A-Za-z\s]+$/) || lines[i].endsWith(':'))) {
        break;
      }
      summaryLines.push(lines[i]);
      if (summaryLines.length >= 3) break;
    }
  }

  if (summaryLines.length > 0) {
    summary = summaryLines.join(' ');
  } else {
    // Generate a professional, high-impact summary instead of parsing random lines
    const parsedName = name || 'Professional Candidate';
    const parsedTitle = title || 'Software Engineer';
    const skillsListStr = skills.slice(0, 4).map(s => s.name).join(', ');
    summary = `Results-oriented ${parsedTitle} with a proven track record of designing, building, and deploying responsive modern applications. Skilled in ${skillsListStr || 'web development frameworks, state management, and API design'}. Focused on writing clean, scalable code and delivering high-impact business products.`;
  }

  // Generic Section Extractor
  const extractSectionText = (keywords: string[]) => {
    const startIndex = lines.findIndex(l => keywords.some(k => l.toLowerCase().includes(k)) && l.length < 40);
    if (startIndex === -1) return '';
    let endIndex = lines.length;
    for (let i = startIndex + 1; i < lines.length; i++) {
      const l = lines[i].toLowerCase();
      if (l.length < 40 && (l.includes('education') || l.includes('experience') || l.includes('project') || l.includes('skill') || l.includes('certif') || l.includes('competencies'))) {
        endIndex = i;
        break;
      }
    }
    return lines.slice(startIndex + 1, endIndex).join('\n').trim();
  };

  const expText = extractSectionText(['experience', 'employment', 'history', 'work']);
  const eduText = extractSectionText(['education', 'academic', 'university']);
  const projText = extractSectionText(['project', 'open-source', 'portfolio']);
  const certText = extractSectionText(['certif', 'license', 'award']);

  const experience: Experience[] = [];
  if (expText) {
    const expLines = expText.split('\n').map(l => l.trim()).filter(Boolean);
    let currentJob: Partial<Experience> | null = null;
    
    for (let i = 0; i < expLines.length; i++) {
      const line = expLines[i];
      const dateMatch = line.match(/(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{4})[-—\s]+(?:Present|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December|\d{4})/i);
      const isJobHeader = dateMatch || (line.length < 80 && line.includes(',') && !line.includes('.') && !/^(developed|built|created|engineered|spearheaded|designed|implemented|worked|led)/i.test(line));
      
      if (isJobHeader) {
        if (currentJob && (currentJob.company || currentJob.position)) {
          experience.push({
            id: `exp_parsed_${experience.length}_${Date.now()}`,
            company: currentJob.company || 'Extracted Work',
            position: currentJob.position || title || 'Professional Role',
            location: currentJob.location || location || 'Remote',
            startDate: currentJob.startDate || '2020-01',
            endDate: currentJob.endDate || 'Present',
            current: currentJob.current || false,
            description: currentJob.description || ''
          });
        }
        
        let company = 'Extracted Company';
        let pos = title || 'Professional Role';
        let loc = location || '';
        let startD = '2020-01';
        let endD = 'Present';
        let curr = true;
        
        let cleanLine = line;
        if (dateMatch) {
          const dateStr = dateMatch[0];
          const dateParts = dateStr.split(/[-—\s]+/);
          startD = dateParts[0] || '2020-01';
          endD = dateParts[1] || 'Present';
          curr = endD.toLowerCase() === 'present';
          cleanLine = line.replace(dateStr, '').trim();
        }
        
        const splitParts = cleanLine.split(/[,|\-—]/);
        if (splitParts.length >= 2) {
          company = splitParts[0].trim();
          pos = splitParts[1].trim();
          if (splitParts.length >= 3) {
            loc = splitParts[2].trim();
          }
        } else {
          company = cleanLine.trim();
        }
        
        company = company.replace(/[.,\s\-]+$/, '');
        pos = pos.replace(/[.,\s\-]+$/, '');
        
        currentJob = {
          company: company || 'Extracted Company',
          position: pos || title || 'Professional Role',
          location: loc || location || 'Remote',
          startDate: startD,
          endDate: endD,
          current: curr,
          description: ''
        };
      } else {
        if (currentJob) {
          currentJob.description = currentJob.description 
            ? currentJob.description + '\n' + line 
            : line;
        } else {
          currentJob = {
            company: 'Extracted Work',
            position: title || 'Professional Role',
            location: location || 'Remote',
            startDate: '2020-01',
            endDate: 'Present',
            current: true,
            description: line
          };
        }
      }
    }
    
    if (currentJob && (currentJob.company || currentJob.position)) {
      experience.push({
        id: `exp_parsed_${experience.length}_${Date.now()}`,
        company: currentJob.company || 'Extracted Work',
        position: currentJob.position || title || 'Professional Role',
        location: currentJob.location || location || 'Remote',
        startDate: currentJob.startDate || '2020-01',
        endDate: currentJob.endDate || 'Present',
        current: currentJob.current || false,
        description: currentJob.description || ''
      });
    }
  }

  const parsedEducation: Education[] = [];
  if (eduText) {
    const eduParts = eduText.split(/(?:%\s*,|%\s*\n|\s*\n)/).map(p => p.trim()).filter(Boolean);
    eduParts.forEach((part, idx) => {
      if (part.endsWith('.')) part = part.substring(0, part.length - 1);
      
      let institution = 'Extracted Education';
      let degree = 'Degree';
      let field = 'Field of Study';
      let locationVal = '';
      let startDate = '2016';
      let endDate = '2020';
      let gpa = '';

      const dateMatch = part.match(/(\d{4})[-—\s]+(?:Present|\d{4})/i);
      if (dateMatch) {
        const fullMatch = dateMatch[0];
        const parts = fullMatch.split(/[-—\s]+/);
        startDate = parts[0] || '2016';
        endDate = parts[1] || '2020';
        part = part.replace(fullMatch, '');
      }

      const gpaMatch = part.match(/(?:percentage|gpa)\s*:?\s*([0-9.]+\s*%?)/i);
      if (gpaMatch) {
        gpa = gpaMatch[1];
        if (!gpa.includes('%') && !gpa.includes('/')) gpa += '%';
        part = part.replace(gpaMatch[0], '');
      }

      const degreeSplitKeywords = ['degree in', 'degree of', 'degree', 'certificate', 'matriculation'];
      let splitKeyword = '';
      for (const kw of degreeSplitKeywords) {
        if (part.toLowerCase().includes(kw)) {
          splitKeyword = kw;
          break;
        }
      }

      if (splitKeyword) {
        const splitIdx = part.toLowerCase().indexOf(splitKeyword);
        institution = part.substring(0, splitIdx).trim();
        let degreeFieldText = part.substring(splitIdx).trim();
        
        if (institution.endsWith(',')) institution = institution.slice(0, -1).trim();

        const locMatch = institution.match(/(?:Trichy|Namakkal|Tamil Nadu|Tamilnadu|India)/i);
        if (locMatch) {
          locationVal = institution.substring(institution.indexOf(locMatch[0])).trim();
          institution = institution.substring(0, institution.indexOf(locMatch[0])).trim();
          if (institution.endsWith(',')) institution = institution.slice(0, -1).trim();
          if (locationVal.startsWith(',')) locationVal = locationVal.slice(1).trim();
        }

        let fullDegree = degreeFieldText;
        if (degreeFieldText.toLowerCase().startsWith('degree in ')) {
          fullDegree = degreeFieldText.substring(10).trim();
        } else if (degreeFieldText.toLowerCase().startsWith('degree of ')) {
          fullDegree = degreeFieldText.substring(10).trim();
        } else if (degreeFieldText.toLowerCase().startsWith('degree ')) {
          fullDegree = degreeFieldText.substring(7).trim();
        }
        
        degree = fullDegree;
        if (fullDegree.toLowerCase().includes('computer applications')) {
          degree = 'Master of Computer Applications';
          field = 'Computer Applications';
        } else if (fullDegree.toLowerCase().includes('mathematics')) {
          degree = 'Bachelor of Science';
          field = 'Mathematics';
        } else if (fullDegree.toLowerCase().includes('secondary certificate') || fullDegree.toLowerCase().includes('secondary school')) {
          degree = 'Higher Secondary Certificate';
          field = 'BIO-MAT';
        } else {
          field = 'General Studies';
        }
      } else {
        const commaParts = part.split(',');
        if (commaParts.length >= 2) {
          institution = commaParts[0].trim();
          degree = commaParts[1].trim();
        } else {
          institution = part.trim();
        }
      }

      institution = institution.replace(/\s+/g, ' ').replace(/[.,\s\-]+$/, '');
      degree = degree.replace(/\s+/g, ' ').replace(/[.,\s\-]+$/, '');
      field = field.replace(/\s+/g, ' ').replace(/[.,\s\-]+$/, '');

      parsedEducation.push({
        id: `edu_parsed_${idx}_${Date.now()}`,
        institution: institution || 'Extracted Education',
        degree: degree || 'Degree',
        field: field || 'Field of Study',
        location: locationVal || location || '',
        startDate,
        endDate,
        current: endDate.toLowerCase() === 'present',
        gpa,
        description: ''
      });
    });
  }

  const parsedProjects: Project[] = [];
  if (projText) {
    const projLines = projText.split('\n').map(l => l.trim()).filter(Boolean);
    let currentProj: Partial<Project> | null = null;
    
    for (let i = 0; i < projLines.length; i++) {
      const line = projLines[i];
      const isActionVerb = /^(developed|built|created|engineered|spearheaded|designed|implemented|worked|led)/i.test(line);
      const hasProjectSeparator = line.includes('|') || line.includes('—') || line.includes(':');
      
      if (line.length < 75 && (!isActionVerb || hasProjectSeparator)) {
        if (currentProj && currentProj.name) {
          parsedProjects.push({
            id: `proj_parsed_${parsedProjects.length}_${Date.now()}`,
            name: currentProj.name,
            description: currentProj.description || '',
            technologies: currentProj.technologies || [],
            link: currentProj.link || ''
          });
        }
        
        let nameVal = line;
        let linkVal = '';
        
        if (line.includes('|')) {
          const parts = line.split('|');
          nameVal = parts[0].trim();
          const linkPart = parts[1].trim().toLowerCase();
          if (linkPart.includes('link') || linkPart.includes('http')) {
            linkVal = linkPart.includes('http') ? parts[1].trim() : 'https://github.com';
          }
        }
        
        nameVal = nameVal.replace(/[|:—\-]+$/, '').trim();
        
        currentProj = {
          name: nameVal,
          description: '',
          technologies: [],
          link: linkVal
        };
      } else {
        if (currentProj) {
          currentProj.description = currentProj.description 
            ? currentProj.description + '\n' + line 
            : line;
          
          const techKeywords = ['React', 'TypeScript', 'Node.js', 'MongoDB', 'SQL', 'Python', 'CNN', 'deep learning', 'image segmentation', 'Express', 'HTML5', 'CSS3'];
          techKeywords.forEach(tech => {
            if (line.toLowerCase().includes(tech.toLowerCase()) && !currentProj?.technologies?.includes(tech)) {
              currentProj?.technologies?.push(tech);
            }
          });
        } else {
          currentProj = {
            name: 'Project Entry',
            description: line,
            technologies: [],
            link: ''
          };
        }
      }
    }
    
    if (currentProj && currentProj.name) {
      parsedProjects.push({
        id: `proj_parsed_${parsedProjects.length}_${Date.now()}`,
        name: currentProj.name,
        description: currentProj.description || '',
        technologies: currentProj.technologies || [],
        link: currentProj.link || ''
      });
    }
  }

  const parsedCertifications: Certification[] = [];
  if (certText) {
    parsedCertifications.push({
      id: `cert_parsed_${Date.now()}`,
      name: certText.substring(0, 100).replace(/\n/g, ' - '),
      issuer: 'See details in text',
      date: '',
      link: ''
    });
  }

  // Fallback if absolutely no headers found
  if (!expText && !eduText && !projText && !certText) {
    experience.push({
      id: `exp_parsed_fallback_${Date.now()}`,
      company: 'Raw Extracted Data',
      position: title || 'Unparsed Content',
      location: location || 'Please reformat manually',
      startDate: '2020-01',
      endDate: 'Present',
      current: true,
      description: `We couldn't perfectly identify your sections. Here is the raw text so you don't lose it:\n\n${text.substring(0, 3000)}...`
    });
  }

  return {
    personalInfo: {
      name: name || 'Parsed Candidate',
      title: title || 'Professional Resume',
      email,
      phone,
      location: location || 'City, Country',
      website,
      github,
      linkedin,
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80',
      showPhoto: false
    },
    summary: summary || 'Experienced professional specializing in modern competencies and scalable software deliverables.',
    skills,
    experience,
    education: parsedEducation,
    projects: parsedProjects,
    certifications: parsedCertifications
  };
};
