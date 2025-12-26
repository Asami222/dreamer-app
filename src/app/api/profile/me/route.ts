// app/api/profile/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { getUserProfile, getProfileImageUrl } from "@/libs/profile";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) {
    return NextResponse.json(
      { profile: null, profileImageUrl: null },
      { status: 200 }
    );
  }

  const profile = await getUserProfile(user.id);
  const profileImageUrl = await getProfileImageUrl(profile);

  return NextResponse.json({
    profile,
    profileImageUrl,
  });
}