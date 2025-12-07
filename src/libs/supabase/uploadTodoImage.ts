import { createClient } from "../supabase/server"; // avatar と同じ
import { randomUUID } from "crypto";

export async function uploadTodoImage(file: File, userId: string) {
  const supabase = await createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${randomUUID()}.${fileExt}`;

  // アップロード（private bucket "todos"）
  const { data, error } = await supabase.storage
    .from("todos")
    .upload(fileName, file, {
      upsert: true,
    });

  console.log("Todo Storage upload result:", data, error);

  if (error) throw error;

  // private bucket でも getPublicUrl() はパスを返すだけ（署名なし）
  const { data: urlData } = supabase.storage
    .from("todos")
    .getPublicUrl(fileName);

  return urlData.publicUrl; // ← avatar と完全同じ返り値
}