import { supabaseAdmin } from "./admin";
import { randomUUID } from "crypto";

export async function copyImage(
  originalPath: string,
  userId: string,
  category: "todo",
) {
  const ext = originalPath.split(".").pop() ?? "webp";
  const newPath = `${userId}/${category}/${randomUUID()}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from("images")
    .copy(originalPath, newPath);

  if (error) throw error;

  return newPath;
}