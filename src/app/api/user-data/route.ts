//import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { toRewardsUI } from "src/utils/transform";
import { getUserRewardsWithImageUrl } from "@/libs/reward";
import { RewardUIModel } from "@/types/data";
import { NextResponse } from "next/server";
import { getUserProfile, getProfileImageUrl } from "@/libs/profile";
import type { Profile } from "@prisma/client";

//profile
const E2E_STARS = Number(process.env.NEXT_PUBLIC_E2E_STARS ?? 5);
const E2E_PROFILE: Profile = {
  id: "profile-1",
  userId: "test-user",
  dream: "テストの夢",
  limit: null,
  displayName: "E2Eユーザー",
  stars: E2E_STARS,
  profileImageUrl: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

//rewards
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

  //profile
  let profile;
  let userName: string;
  let userImage: string | null;

  if (isE2E) {
    profile = E2E_PROFILE;
    userName = "E2Eユーザー";
    userImage = "/images/bear01.webp"; // 任意
    return Response.json({ profile, userImage, userName});
  } 

  //rewards
  let rewards: RewardUIModel[]

  if (isE2E) {
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

  const [fetchedProfile, rewardsWithImageUrl] = await Promise.all([
    getUserProfile(user.id),
    getUserRewardsWithImageUrl(user.id)
  ])

  // profile は auth callback で必ず作られている前提
    if (!fetchedProfile) {
      //throw new Error("Profile not found");
      return NextResponse.json(
      { message: "Profile not found" },
      { status: 404 }
      );
    }

  profile = fetchedProfile;
  rewards = toRewardsUI(rewardsWithImageUrl)
  userImage = await getProfileImageUrl(profile);

  userName = user.email === "guest@gmail.com" ? "ゲスト" : user.user_metadata?.name ?? "";

  if (!rewards) {
    return Response.json({ message: "ご褒美がありません" }, { status: 404 });
  }
  
  return Response.json({
    profile,
    userImage,
    userName,
    rewards
  });
}