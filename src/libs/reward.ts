// src/libs/reward.ts
import { prisma } from "@/libs/prisma";
import { createClient } from "@/libs/supabase/server";
import type { Reward } from "@prisma/client"

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
export async function getRewardImageUrl(
  reward: Pick<Reward, "image" | "createdAt">,
) {
  // image が無い場合（保険）
  if (!reward.image) return "";

  // reward は外部 URL を持たない前提
  const supabase = await createClient();
  const { data } = supabase
    .storage
    .from("images")
    .getPublicUrl(reward.image);

  let url = data.publicUrl;

  // reward は更新されない想定なので createdAt を使う
  url += `?v=${reward.createdAt.getTime()}`;

  return url;
}

export async function getUserRewardsWithImageUrl(userId: string) {
  const rewards = await prisma.reward.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const supabase = await createClient();

  return rewards.map((reward) => {
    if (!reward.image) {
      return reward;
    }

    const { data } = supabase
      .storage
      .from("images")
      .getPublicUrl(reward.image);

    return {
      ...reward,
      imageUrl: `${data.publicUrl}?v=${reward.createdAt.getTime()}`,
    };
  });
}