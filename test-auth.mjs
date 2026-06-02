import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ijraggrkxgifrtzwhdjq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcmFnZ3JreGdpZnJ0endoZGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMjU4MDIsImV4cCI6MjA5NTcwMTgwMn0.j2UNJj0QVxfeM8EcYWPvJmj2MLBByx2b9OGb-erXa6w';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFullAuthFlow() {
  const dummyEmail = `dummy_${Date.now()}@test.com`;
  const dummyPass = 'SecurePass123!';
  
  console.log(`\n1. Attempting to SIGN UP with: ${dummyEmail}`);
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: dummyEmail,
    password: dummyPass,
    options: {
      data: { name: 'Dummy User' }
    }
  });

  if (signUpError) {
    console.error("❌ SIGNUP FAILED:", signUpError.message);
    return;
  }
  console.log("✅ SIGNUP SUCCESSFUL!");

  console.log(`\n2. Attempting to LOG IN with: ${dummyEmail}`);
  const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
    email: dummyEmail,
    password: dummyPass
  });

  if (signInError) {
    console.error("❌ LOGIN FAILED:", signInError.message);
    if (signInError.message.includes("Email not confirmed")) {
      console.log("⚠️ REASON: 'Confirm Email' is STILL TURNED ON in your Supabase Dashboard!");
    }
  } else {
    console.log("✅ LOGIN SUCCESSFUL! The user was able to log in immediately.");
    console.log("This proves 'Confirm Email' is successfully turned OFF.");
  }
}

testFullAuthFlow();
