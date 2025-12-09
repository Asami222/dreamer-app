// src/libs/supabase/uploadImage.ts

import { createClient } from "../supabase/server";
import { randomUUID } from "crypto";

/**
 * 共通アップロード関数
 * category: "avatar" | "todo" | "reward" など用途名
 */
export async function uploadImage(
  file: File,
  userId: string,
  category: string // avatar / todo / reward / その他用途
) {
  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${category}-${randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("images") // バケットは1つだけ
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  // private → 常に signed URL を返す
  const { data: signed } = await supabase.storage
    .from("images")
    .createSignedUrl(fileName, 60 * 60 * 24); // 24時間

  return signed?.signedUrl ?? "";
}