// services/getProfile/core.ts
//import { prisma } from "@/libs/prisma";
import { toRewardsUI } from "src/utils/transform";
import { getUserRewardsWithImageUrl } from "@/libs/reward";
import { getUserProfile, getProfileImageUrl } from "@/libs/profile";
import type { Profile } from "src/types/data";
import { RewardUIModel } from "src/types/data";
//import { unstable_cache } from "next/cache";

export type UserData = {
  profile: Profile;
  rewards: RewardUIModel[];
  userName: string;
  userImage: string | null;
};

// userIdごとにキャッシュ
export const getUserDataCore = async (userId: string, email?: string, name?: string): Promise<UserData> => {
      const [profile, rewardsWithImageUrl] = await Promise.all([
        getUserProfile(userId),
        getUserRewardsWithImageUrl(userId),
      ]);

      if (!profile) {
        throw new Error("Profile not found");
      }

      const rewards = toRewardsUI(rewardsWithImageUrl);
      const userImage = await getProfileImageUrl(profile);

      const userName =
        email === "guest@gmail.com"
          ? "ゲスト"
          : name ?? "";

      return {
        profile,
        rewards,
        userName,
        userImage,
      };
    }