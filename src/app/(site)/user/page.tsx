import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { getUserProfile, getProfileImageUrl } from "@/libs/profile";
import UserRewardListContainer from 'src/containers/UserRewardListContainer'
import UserProfileContainer from 'src/containers/UserProfileContainer'
import Separator from "src/components/atoms/Separator";
import { toRewardsUI } from "src/utils/transform";
import { getUserRewardsWithImageUrl } from "@/libs/reward";
import { RewardUIModel } from "src/types/data";
import type { Profile } from "@prisma/client";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

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

const E2E_REWARDS: RewardUIModel[] = [
  {
    id: 'reward-1',
    title: '旅行',
    star: 6,
    image: '/images/bear01.webp'
  },
];

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";
  if (isE2E) {
    return buildPageMetadata("E2E", "テスト用", parent);
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound();

  const titleName =
    user.email === "guest@gmail.com"
      ? "ゲスト"
      : user.user_metadata?.name ?? "";
  return buildPageMetadata(`${titleName}`, "ユーザーページです。ユーザー情報、獲得した星の合計数、作成したご褒美一覧を見ることができます。", parent);
}

export default async function Page() {
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true"
  let rewards: RewardUIModel[]
  let profile;
  let userName: string;
  let userImage: string | null;

  if (isE2E) {
    // ✅ E2E時：完全スタブ
    rewards = E2E_REWARDS;
    profile = E2E_PROFILE;
    userName = "E2Eユーザー";
    userImage = "/images/bear01.webp"; // 任意
  } else {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) notFound();
  const userId = user.id;

  // ⭐ Prisma を直接呼ぶ
  const [rewardsWithImageUrl, fetchedProfile] = await Promise.all([
    getUserRewardsWithImageUrl(userId),
    getUserProfile(userId),
  ]);

  // profile は auth callback で必ず作られている前提
  if (!fetchedProfile) {
    notFound(); // or throw new Error("Profile not found");
  }

  rewards = toRewardsUI(rewardsWithImageUrl)
  profile = fetchedProfile;
  userImage = await getProfileImageUrl(profile);

  userName = user.email === "guest@gmail.com"
    ? "ゲスト"
    : user.user_metadata?.name ?? "";
  }

  return (
      <div className="flex flex-col gap-[40px] mt-[24px] mb-[56px] mx-auto">
        <div>
            <UserProfileContainer profile={profile} userName={userName} userImage={userImage}/>
            <Separator />
        </div>
        <div className="mx-auto">
            <div className="text-center">
              <h2 className="text-(--text) font-normal text-[20px]">ご褒美</h2>
            </div>
            <div>
              <div><UserRewardListContainer rewards={rewards} user={profile}/></div>
            </div>
        </div>
      </div>
  )
}