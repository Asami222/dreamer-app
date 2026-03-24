import { createClient } from "@/libs/supabase/server";
import { getUserProfile, getProfileImageUrl } from "@/libs/profile";

// E2E用
const E2E_STARS = Number(process.env.NEXT_PUBLIC_E2E_STARS ?? 5);

export async function getHeaderData() {

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
    };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return {
      profile: null,
      profileImageUrl: null,
    };
  }

  const profile = await getUserProfile(user.id);
  
  const profileImageUrl = profile
    ? await getProfileImageUrl(profile)
    : null;

  return {
    profile,
    profileImageUrl,
  };
}