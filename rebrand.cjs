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
    content = content.replace(/Resume9_Resume/g, "ResumeAssistant_Resume");
    content = content.replace(/Resume'9/g, "Resume Assistant");
    content = content.replace(/resume9\.ai/g, "resumeassistant.ai");
    content = content.replace(/resume9\.com/g, "resumeassistant.com");
    content = content.replace(/resume9_payments/g, "resumeassistant_payments");
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
