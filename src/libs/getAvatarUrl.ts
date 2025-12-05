// src/lib/getAvatarUrl.ts
"use client";

import { client } from "@/libs/supabase/client";

export async function getAvatarUrl() {
  const supabase = client;

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const filePath = `${user.id}/avatar.png`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(filePath, 60 * 60); // 1時間

  if (error) return null;

  return data?.signedUrl ?? null;
}