// services/getProfile/core.ts
//import { prisma } from "@/libs/prisma";
import { toRewardsUI } from "src/utils/transform";
import { getUserRewardsWithImageUrl } from "@/libs/reward";
import { getUserProfile, getProfileImageUrl } from "@/libs/profile";
import type { Profile } from "src/types/data";
import { RewardUIModel } from "src/types/data";
import { unstable_cache } from "next/cache";

export type UserData = {
  profile: Profile;
  rewards: RewardUIModel[];
  userName: string;
  userImage: string;
};

// userIdごとにキャッシュ
export const getUserDataCore = (userId: string, email?: string, name?: string) => 
  unstable_cache(
   async() => {
      const [profile, rewardsWithImageUrl] = await Promise.all([
        getUserProfile(userId),
        getUserRewardsWithImageUrl(userId),
      ]);

      if (!profile) {
        throw new Error("Profile not found");
      }

      const rewards = toRewardsUI(rewardsWithImageUrl);
      //const userImage = await getProfileImageUrl(profile);

      const userName =
        email === "guest@gmail.com"
          ? "ゲスト"
          : name ?? "";

      return {
        profile,
        rewards,
        userName,
        userImagePath: profile.profileImageUrl ?? null,
      };
    },
    [`user-data-${userId}`],
    {
      tags: [`user-data-${userId}`],
      revalidate: 60,
    }  // 60秒キャッシュ
  )();