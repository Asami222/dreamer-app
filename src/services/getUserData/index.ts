// services/getUserData/index.ts
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { getUserDataCore, UserData } from "./core";
import { getProfileImageUrl } from "@/libs/profile";

// E2E用
const E2E_STARS = Number(process.env.NEXT_PUBLIC_E2E_STARS ?? 5);

export async function getUserData( userId: string, email?: string, name?: string ): Promise<UserData | null> {

  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";

  if (isE2E) {
    return {
      profile: {
        id: "profile-1",
        userId: "test-user",
        dream: "テストの夢",
        limit: null,
        displayName: "E2Eユーザー",
        stars: E2E_STARS,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      userName: "E2Eユーザー",
      userImage: "/images/bear01.webp",
      rewards: [
        {
          id: "reward-1",
          title: "旅行",
          star: 6,
          image: "/images/bear01.webp",
        },
      ],
    };
  }

  if (!userId) {
    redirect("/login");
  }

  const data = await getUserDataCore( userId, email, name );

  // ここでURL生成（キャッシュ外）
  const userImage = getProfileImageUrl({
    profileImageUrl: data.profile.profileImageUrl,
    updatedAt: data.profile.updatedAt,
  });

  return {
    ...data,
    userImage,
  };
}