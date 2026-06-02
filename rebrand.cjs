const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'index.html',
  'src/components/Admin/AdminDashboard.tsx',
  'src/components/Admin/AdminSettings.tsx',
  'src/components/Admin/PaymentManagement.tsx',
  'src/components/Builder/PaymentModal.tsx',
  'src/components/Builder/ResumeBuilder.tsx',
  'src/components/Dashboard/UserDashboard.tsx',
  'src/components/LandingPage.tsx',
  'src/components/Layout.tsx',
  'src/context/AppContext.tsx',
  'src/data/mockAI.ts'
];

for (const file of filesToUpdate) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Replace exact matches in order of specificity
    content = content.replace(/ResumeForge_AI_Resume/g, "Resume9_Resume");
    content = content.replace(/ResumeForge AI/g, "Resume'9");
    content = content.replace(/ResumeForge/g, "Resume'9");
    content = content.replace(/resumeforge\.ai/g, "resume9.ai");
    content = content.replace(/resumeforge\.com/g, "resume9.com");
    content = content.replace(/resumeforge_payments/g, "resume9_payments");
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
