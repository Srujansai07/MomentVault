// Script to test login directly using Supabase client
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://rnmsrpqwligboxggnktq.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXNycHF3bGlnYm94Z2dua3RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNTc0NTcsImV4cCI6MjA3OTkzMzQ1N30.08gidOs21JablBogm7kwYAhOYt7uxA_ME77eXOBiogI";

const supabase = createClient(supabaseUrl, anonKey);

async function testLogin() {
    const email = "testuser@momentvault.app";
    const password = "TestPassword123";

    console.log("Testing login with:");
    console.log("  Email:", email);
    console.log("  Password:", password);
    console.log("  URL:", supabaseUrl);
    console.log("");

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    console.log("Response:");
    console.log("  Error:", error);
    console.log("  Session:", data?.session ? "Yes" : "No");
    console.log("  User:", data?.user?.email || "No user");

    if (data?.session) {
        console.log("\n✅ LOGIN SUCCESSFUL!");
        console.log("  Access token:", data.session.access_token.substring(0, 50) + "...");
    } else {
        console.log("\n❌ LOGIN FAILED!");
        console.log("  Error message:", error?.message);
    }
}

testLogin().catch(console.error);
