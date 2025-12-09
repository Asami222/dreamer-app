import { createClient } from "../supabase/server";
import { randomUUID } from "crypto";

export async function uploadAvatar(file: File, userId: string) {
  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  // 👇 ここを getPublicUrl から createSignedUrl に変更！
  const { data: signed } = await supabase.storage
    .from("images")
    .createSignedUrl(fileName, 60 * 60 * 24); // 24時間有効

  return signed?.signedUrl ?? "";
}