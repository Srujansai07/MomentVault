// Script to set user password directly using Supabase Admin API
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://rnmsrpqwligboxggnktq.supabase.co";
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubXNycHF3bGlnYm94Z2dua3RxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDM1NzQ1NywiZXhwIjoyMDc5OTMzNDU3fQ.VMmxrQ67RfuWQoyfgtkTu_8fzgZf5LxhuRycrIWsenk";

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

async function setUserPassword() {
    const userEmail = "srujan.sai@iitgn.ac.in";
    const newPassword = "Password123"; // Simple password without special chars

    console.log("Looking up user:", userEmail);

    // First, get the user by email
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

    if (listError) {
        console.error("Error listing users:", listError);
        return;
    }

    const user = users.find((u) => u.email === userEmail);

    if (!user) {
        console.error("User not found:", userEmail);
        return;
    }

    console.log("Found user:", user.id, user.email);

    // Update the user's password
    const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
        password: newPassword,
        email_confirm: true,
    });

    if (error) {
        console.error("Error updating password:", error);
        return;
    }

    console.log("Password updated successfully for:", data.user.email);
    console.log("New password:", newPassword);
}

setUserPassword().catch(console.error);
