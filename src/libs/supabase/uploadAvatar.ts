import { getSupabaseServerClient } from "../supabase/server"; // 既存の実装でOK
import { randomUUID } from "crypto";

export async function uploadAvatar(file: File, userId: string) {
  const supabase = getSupabaseServerClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file, {
      upsert: true,
    });

    console.log("Storage upload result:", data, error);

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}