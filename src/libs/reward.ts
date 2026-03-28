// src/libs/reward.ts
import { prisma } from "@/libs/prisma";
//import { createClient } from "@/libs/supabase/server";
import type { Reward } from "@prisma/client"
//import { unstable_cache } from "next/cache";

export async function getUserRewards(userId: string) {
  const rewards = await prisma.reward.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return rewards;
}

/**
 * Reward.image (storage path) → 表示用 URL
 */
export function getRewardImageUrl(
  reward: Pick<Reward, "image" | "createdAt">,
) {

  const path = reward.image;
  // image が無い場合（保険）
  if (!path) return "";

  /* reward は外部 URL を持たない前提
  const supabase = await createClient();
  const { data } = supabase
    .storage
    .from("images")
    .getPublicUrl(reward.image);

  let url = data.publicUrl;
  */
  // Supabase Storage public URL（手動生成）
  let url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${path}`;

  // reward は更新されない想定なので createdAt を使う
  url += `?v=${reward.createdAt.getTime()}`;

  return url;
}

export const getUserRewardsWithImageUrl = async (userId: string) => {
  
    const rewards = await prisma.reward.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return rewards.map((reward) => {
      return {
        ...reward,
        imageUrl: getRewardImageUrl(reward),
      };
    });
}