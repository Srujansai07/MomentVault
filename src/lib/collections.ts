import { supabase } from "./supabase";

export const collectionHelpers = {
    // Add moment to collection
    async addMomentToCollection(collectionId: string, momentId: string, position: number = 0) {
        const { error } = await supabase
            .from("collection_moments")
            .insert({ collection_id: collectionId, moment_id: momentId, position });
        return { error };
    },

    // Remove moment from collection
    async removeMomentFromCollection(collectionId: string, momentId: string) {
        const { error } = await supabase
            .from("collection_moments")
            .delete()
            .eq("collection_id", collectionId)
            .eq("moment_id", momentId);
        return { error };
    },

    // Get moments in collection
    async getCollectionMoments(collectionId: string) {
        const { data, error } = await supabase
            .from("collection_moments")
            .select(`
        *,
        moments (*)
      `)
            .eq("collection_id", collectionId)
            .order("position");
        return { data: data?.map((cm: any) => cm.moments), error };
    },

    // Update collection
    async updateCollection(collectionId: string, updates: any) {
        const { error } = await supabase
            .from("collections")
            .update(updates)
            .eq("id", collectionId);
        return { error };
    },

    // Delete collection
    async deleteCollection(collectionId: string) {
        const { error } = await supabase
            .from("collections")
            .delete()
            .eq("id", collectionId);
        return { error };
    },
};
