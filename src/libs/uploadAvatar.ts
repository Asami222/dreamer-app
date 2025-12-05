// src/lib/uploadAvatar.ts
"use client";

import { client } from "@/libs/supabase/client";

export async function uploadAvatar(file: File) {
  const supabase = client;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("ログインが必要です");

  const filePath = `${user.id}/avatar.png`;

  // Storage にアップロード（上書き可能）
  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      upsert: true,
    });

  if (error) throw error;

  return filePath;
}