import { createClient } from "./supabase/client";

// Create a singleton client for use in client components
const supabase = createClient();

export { supabase };

// Auth helper functions
export const authHelpers = {
    // Sign up new user
    async signUp(email: string, password: string, fullName: string) {
        const supabaseClient = createClient();
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });
        return { data, error };
    },

    // Sign in existing user
    async signIn(email: string, password: string) {
        const supabaseClient = createClient();
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    // Sign out
    async signOut() {
        const supabaseClient = createClient();
        const { error } = await supabaseClient.auth.signOut();
        return { error };
    },

    // Reset password
    async resetPassword(email: string) {
        const supabaseClient = createClient();
        const { data, error } = await supabaseClient.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { data, error };
    },

    // Get current user
    async getCurrentUser() {
        const supabaseClient = createClient();
        const {
            data: { user },
        } = await supabaseClient.auth.getUser();
        return user;
    },

    // Get current session
    async getSession() {
        const supabaseClient = createClient();
        const {
            data: { session },
        } = await supabaseClient.auth.getSession();
        return session;
    },
};
