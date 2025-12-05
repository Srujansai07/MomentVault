import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const authHelpers = {
    // Sign up new user
    async signUp(email: string, password: string, fullName: string) {
        const { data, error } = await supabase.auth.signUp({
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
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    // Sign out
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Reset password
    async resetPassword(email: string) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { data, error };
    },

    // Get current user
    async getCurrentUser() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        return user;
    },

    // Get current session
    async getSession() {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        return session;
    },
};
