import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { toRewardsUI } from "src/utils/transform";
import { getUserRewardsWithImageUrl } from "@/libs/reward";
import { RewardUIModel } from "@/types/data";

const E2E_REWARDS: RewardUIModel[] = [
  {
    id: 'reward-1',
    title: '旅行',
    star: 6,
    image: '/images/bear01.webp'
  },
];

export async function GET() {

  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true"
  let rewards: RewardUIModel[]

  if (isE2E) {
      // ✅ E2E時：完全スタブ
   rewards = E2E_REWARDS;
   return Response.json(rewards);
  } 

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const rewardsWithImageUrl = await getUserRewardsWithImageUrl(user.id)
  rewards = toRewardsUI(rewardsWithImageUrl)

  if (!rewards) {
    return Response.json({ message: "ご褒美がありません" }, { status: 404 });
  }
  
  return Response.json(rewards);
}