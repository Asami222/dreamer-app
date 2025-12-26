// src/libs/reward/deleteRewardImage.ts
import { createClient } from "@/libs/supabase/server";

export async function deleteRewardImage(imagePath?: string | null) {
  if (!imagePath) return;

  const supabase = await createClient();

  const { error } = await supabase
    .storage
    .from("images")
    .remove([imagePath]);

  if (error) {
    console.error("Failed to delete reward image:", error);
    // 画像削除失敗で全体を落としたくなければ throw しない
  }
}