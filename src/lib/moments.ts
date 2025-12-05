import { supabase } from "./supabase";

export const momentHelpers = {
    // Update moment
    async updateMoment(momentId: string, updates: any) {
        const { error } = await supabase
            .from("moments")
            .update(updates)
            .eq("id", momentId);
        return { error };
    },

    // Delete moment
    async deleteMoment(momentId: string) {
        const { error } = await supabase
            .from("moments")
            .delete()
            .eq("id", momentId);
        return { error };
    },

    // Toggle favorite
    async toggleFavorite(momentId: string, isFavorite: boolean) {
        const { error } = await supabase
            .from("moments")
            .update({ is_favorite: !isFavorite })
            .eq("id", momentId);
        return { error };
    },

    // Get moment by ID
    async getMoment(momentId: string) {
        const { data, error } = await supabase
            .from("moments")
            .select(`
        *,
        media (*),
        moment_tags (
          tags (*)
        )
      `)
            .eq("id", momentId)
            .single();
        return { data, error };
    },
};
