// src/libs/profile.ts
import { prisma } from "@/libs/prisma";
import { createClient } from "@/libs/supabase/server";

export async function getUserProfile(userId: string) {
  // Prisma で profile を取得
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  return profile;
}

/**
 * profileImageUrl から絶対 URL に変換
 * @param profile Prisma Profile | null
 * @returns string
 */
export async function getProfileImageUrl(profile: { profileImageUrl?: string | null; updatedAt?: Date } | null) {
  if (!profile?.profileImageUrl) return "/images/noImg.webp";

  // 外部 URL ならそのまま
  if (profile.profileImageUrl.startsWith("http")) return profile.profileImageUrl;

  // Supabase Storage から public URL を取得
  const supabase = await createClient();
  const { data } = supabase.storage.from("images").getPublicUrl(profile.profileImageUrl);
  let url = data.publicUrl;

  // キャッシュバスター
  if (profile.updatedAt) url += `?v=${profile.updatedAt.getTime()}`;

  return url;
}