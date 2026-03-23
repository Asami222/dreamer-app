// services/getUserData/index.ts
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { getUserDataCore, UserData } from "./core";

// E2E用
const E2E_STARS = Number(process.env.NEXT_PUBLIC_E2E_STARS ?? 5);

export async function getUserData(): Promise<UserData | null> {

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

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) {
    redirect("/login");
  }

  return getUserDataCore(
    user.id,
    user.email,
    user.user_metadata?.name
  );
}