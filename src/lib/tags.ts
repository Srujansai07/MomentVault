import { supabase } from "./supabase";

export interface Tag {
    id: string;
    name: string;
    color: string;
    user_id: string;
}

export const tagHelpers = {
    // Create a new tag
    async createTag(userId: string, name: string, color: string = "#6366f1") {
        const { data, error } = await supabase
            .from("tags")
            .insert({ user_id: userId, name, color })
            .select()
            .single();
        return { data, error };
    },

    // Get all tags for a user
    async getUserTags(userId: string) {
        const { data, error } = await supabase
            .from("tags")
            .select("*")
            .eq("user_id", userId)
            .order("name");
        return { data, error };
    },

    // Add tag to moment
    async addTagToMoment(momentId: string, tagId: string) {
        const { error } = await supabase
            .from("moment_tags")
            .insert({ moment_id: momentId, tag_id: tagId });
        return { error };
    },

    // Remove tag from moment
    async removeTagFromMoment(momentId: string, tagId: string) {
        const { error } = await supabase
            .from("moment_tags")
            .delete()
            .eq("moment_id", momentId)
            .eq("tag_id", tagId);
        return { error };
    },

    // Get tags for a moment
    async getMomentTags(momentId: string) {
        const { data, error } = await supabase
            .from("moment_tags")
            .select("tags (*)")
            .eq("moment_id", momentId);
        return { data: data?.map((mt: any) => mt.tags), error };
    },
};
