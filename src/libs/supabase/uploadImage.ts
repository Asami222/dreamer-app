import { supabaseAdmin } from "./admin";
import { randomUUID } from "crypto";

export async function uploadImage(
  file: File,
  userId: string,
  category: "avatar" | "reward" | "todo",
) {
  const fileExt = "webp";

  let filePath: string;

  if (category === "avatar") {
    // 常に1枚だけ
    filePath = `${userId}/avatar.${fileExt}`;
  } else {
    // reward, todo は毎回新規
    const id = randomUUID();
    filePath = `${userId}/${category}/${id}.${fileExt}`;
  }

  const { error } = await supabaseAdmin.storage
    .from("images")
    .upload(filePath, file, {
      upsert: category === "avatar",
      contentType: "image/webp",
    });

  if (error) throw error;

  // DB には path のみ
  return filePath;
}