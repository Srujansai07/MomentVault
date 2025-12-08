// Script to create a fresh test user using Supabase Admin API
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://rnmsrpqwligboxggnktq.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXNycHF3bGlnYm94Z2dua3RxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM1NzQ1NywiZXhwIjoyMDc5OTMzNDU3fQ.VMmxrQ67RfuWQoyfgtkTu_8fzgZf5LxhuRycrIWsenk";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

async function createTestUser() {
    const email = "testuser@momentvault.app";
    const password = "TestPassword123";
    const fullName = "Test User";

    console.log("Creating test user:", email);

    // Create user with email already confirmed
    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true, // Skip email confirmation
        user_metadata: {
            full_name: fullName,
        },
    });

    if (error) {
        console.error("Error creating user:", error);
        return;
    }

    console.log("User created successfully!");
    console.log("User ID:", data.user.id);
    console.log("Email:", data.user.email);
    console.log("Confirmed:", data.user.email_confirmed_at ? "Yes" : "No");
    console.log("\nLogin credentials:");
    console.log("  Email:", email);
    console.log("  Password:", password);
}

createTestUser().catch(console.error);
