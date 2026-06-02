const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'index.html',
  'src/components/Logo.tsx',
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
    
    // Fix the logo span specifically
    content = content.replace(
      /Resume<span className="text-violet-600">Forge<\/span> <span className="font-medium text-slate-500 dark:text-slate-400">AI<\/span>/g, 
      'MyResume<span className="text-violet-600">Assistant</span>'
    );
    // Also catch it if it was slightly modified
    content = content.replace(/ResumeForge AI/g, "MyResume Assistant");
    content = content.replace(/ResumeForge/g, "MyResume Assistant");

    // Replace the Resume'9 ones
    content = content.replace(/Resume9_Resume/g, "MyResume_Assistant_Resume");
    content = content.replace(/Resume'9/g, "MyResume Assistant");
    content = content.replace(/resume9\.ai/g, "myresumeassistant.com");
    content = content.replace(/resume9\.com/g, "myresumeassistant.com");
    content = content.replace(/resume9_payments/g, "myresume_payments");
    
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
