// src/libs/supabase/uploadRewardImage.ts
import { createClient } from "../supabase/server";
import { nanoid } from "nanoid";

export async function uploadRewardImage(file: File, userId: string) {
  const supabase = await createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}/${nanoid()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("rewards") // ← bucket 名
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  // private のため signedURL を返す
  const { data: signed } = await supabase.storage
    .from("rewards")
    .createSignedUrl(data.path, 60 * 60 * 24); // 24時間

  return signed?.signedUrl ?? "";
}