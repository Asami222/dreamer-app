// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { getUserProfile, getProfileImageUrl } from "@/libs/profile";
import type { Profile } from "@prisma/client";

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

export async function GET() {
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true"
  let profile;
  let userName: string;
  let userImage: string | null;

  if (isE2E) {
      // ✅ E2E時：完全スタブ
    profile = E2E_PROFILE;
    userName = "E2Eユーザー";
    userImage = "/images/bear01.webp"; // 任意
    return Response.json({ profile, userImage, userName});
  } 

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

 if (!user?.id) {
  return NextResponse.json(
    { message: "Unauthorized" },
    { status: 401 }
  );
}

  const fetchedProfile = await getUserProfile(user.id);

  // profile は auth callback で必ず作られている前提
    if (!fetchedProfile) {
      //throw new Error("Profile not found");
      return NextResponse.json(
      { message: "Profile not found" },
      { status: 404 }
      );
    }

  profile = fetchedProfile;
  userImage = await getProfileImageUrl(profile);

  userName = user.email === "guest@gmail.com"
    ? "ゲスト"
    : user.user_metadata?.name ?? "";

  return NextResponse.json({
    profile,
    userImage,
    userName
  });
}