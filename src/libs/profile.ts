// src/libs/profile.ts
import { prisma } from "@/libs/prisma";
//import { createClient } from "@/libs/supabase/server";

/*
export async function getUserProfile(userId: string) {
  // Prisma で profile を取得
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  return profile;
}
*/

export async function getUserProfile(userId: string) {
  return prisma.profile.findUnique({
    where: { userId },
  });
}

/**
 * profileImageUrl から絶対 URL に変換
 * @param profile Prisma Profile | null
 * @returns string
 */
// profileImageUrl → 表示用URL（同期関数）

export  function getProfileImageUrl(
  profile: { profileImageUrl?: string | null; updatedAt?: Date } | null
): string {
  if (!profile?.profileImageUrl) return "/images/noImg.webp";

  const path = profile.profileImageUrl;

  // 外部 URL ならそのまま
  if (path.startsWith("http")) return path;

  /* Supabase Storage から public URL を取得
  const supabase = await createClient();
  const { data } = supabase.storage.from("images").getPublicUrl(profile.profileImageUrl);
  let url = data.publicUrl;
  */
 
  // Supabase Storage public URL（手動生成）
  let url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;


  // キャッシュバスター
  if (profile.updatedAt) url += `?v=${profile.updatedAt.getTime()}`;

  return url;
}