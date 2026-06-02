export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "beat-the-ats-robot-2026",
    title: "How to Beat the ATS Robot in 2026",
    excerpt: "Over 75% of resumes are rejected by Applicant Tracking Systems before a human ever sees them. Learn the exact formatting rules to get past the filters.",
    author: "Career Team",
    date: "June 2, 2026",
    readTime: "5 min read",
    category: "Resume Optimization",
    imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      ## The Rise of the ATS
      Applicant Tracking Systems (ATS) are software applications that enable the electronic handling of recruitment needs. In 2026, almost every company uses an ATS to filter through thousands of applications.
      
      If your resume isn't formatted correctly, the ATS won't be able to read it, and you will be instantly rejected.
      
      ## 1. Avoid Complex Formatting
      The biggest mistake job seekers make is using complex, multi-column designs with custom graphics. While they look pretty to a human, a robot cannot parse the text out of those complex layouts. 
      - Stick to a single-column layout for ATS submissions.
      - Do not put important information in headers or footers.
      - Avoid tables and text boxes.
      
      ## 2. Use Standard Section Headings
      Don't try to be clever with your section titles. Use standard headings like "Work Experience", "Education", and "Skills". The ATS is programmed to look for these exact phrases.
      
      ## 3. Keyword Optimization is King
      The ATS scores your resume based on how well it matches the job description. You must include the exact keywords from the job posting in your resume. 
      
      Using a tool like **MyResume Assistant** allows you to paste the job description and instantly see your ATS match score, helping you add the missing keywords before you apply!
    `
  },
  {
    id: "perfect-software-engineer-resume",
    title: "The Perfect Software Engineer Resume Structure",
    excerpt: "Tech recruiters spend an average of 6 seconds looking at a resume. Discover the structure that instantly proves your technical competence.",
    author: "Tech Hiring Manager",
    date: "May 28, 2026",
    readTime: "4 min read",
    category: "Engineering",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      ## Keep it to One Page
      Unless you have 10+ years of highly relevant experience, your software engineering resume should be exactly one page. Recruiters do not want to read a novel.
      
      ## The Golden Structure
      Here is the exact order your sections should follow:
      
      1. **Contact Info & Links**: Name, Phone, Email, GitHub, LinkedIn, Portfolio.
      2. **Skills Summary**: Group your skills by category (Languages, Frameworks, Tools, Cloud).
      3. **Experience**: Your actual work experience, listed in reverse chronological order.
      4. **Projects**: If you are a junior developer, put this above Experience. Showcase complex technical projects.
      5. **Education**: Keep it brief at the bottom.
      
      ## Use the XYZ Formula for Bullet Points
      Google's former VP of People Operations famously recommended this formula: 
      *"Accomplished [X] as measured by [Y], by doing [Z]."*
      
      Instead of writing: "Wrote backend code for a new feature."
      Write: "Reduced API response time by 40% (X) resulting in 10k more daily active users (Y) by rewriting the core authentication service in Go (Z)."
      
      Use **MyResume Assistant's** AI bullet point generator to automatically format your experience into the XYZ structure!
    `
  },
  {
    id: "ai-cover-letters-getting-hired",
    title: "Why AI Cover Letters Are Getting People Hired Faster",
    excerpt: "Writing custom cover letters for every application is exhausting. See how modern AI is creating highly personalized letters that convert.",
    author: "Growth Team",
    date: "May 15, 2026",
    readTime: "6 min read",
    category: "Job Search",
    imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      ## The Death of the Generic Cover Letter
      "To Whom It May Concern..." 
      If your cover letter starts like this, the recruiter has already thrown it in the trash. Generic cover letters are worse than not submitting a cover letter at all because they show a lack of effort.
      
      However, spending 45 minutes writing a perfectly customized letter for a job that gets 2,000 applicants is a terrible return on your time.
      
      ## Enter AI Generation
      The solution is AI. By feeding an AI model your resume data and the specific job description, it can write a highly targeted, compelling cover letter in 3 seconds.
      
      - It automatically maps your skills to their requirements.
      - It adopts a professional yet enthusiastic tone.
      - It highlights the exact projects from your past that prove you can solve their current problems.
      
      ## Quantity + Quality
      The job hunt is a numbers game. By using the AI Cover Letter Generator built right into **MyResume Assistant**, you can apply to 50 jobs a day, each with a unique, 100% customized cover letter. This drastically increases your interview callback rate.
    `
  }
];
