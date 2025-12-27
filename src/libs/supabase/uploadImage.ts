import { createClient } from "@/libs/supabase/server";

export async function uploadImage(
  file: File,
  userId: string,
  category: "avatar" | "reward" | "todo",
) {
  const supabase = await createClient(); // ← セッション付き

  const fileExt = "webp";

  let filePath: string;
  if (category === "avatar") {
    filePath = `${userId}/avatar.${fileExt}`;
  } else {
    const id = crypto.randomUUID();
    filePath = `${userId}/${category}/${id}.${fileExt}`;
  }

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      upsert: category === "avatar",
      contentType: "image/webp",
    });

  if (error) throw error;

  return filePath;
}