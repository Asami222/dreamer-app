import { createClient } from "@/libs/supabase/server";

export async function uploadImage(file: File, userId: string, category: "avatar" | "reward" | "todo") {
  const supabase = await createClient();

  const ext = "webp";
  const path =
    category === "avatar"
      ? `${userId}/avatar.${ext}`
      : `${userId}/${category}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage.from("images").upload(path, file, {
    upsert: category === "avatar",
    contentType: "image/webp",
  });

  if (error) throw error;
  return path;
}