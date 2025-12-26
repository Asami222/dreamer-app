// app/api/profile/stars/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
//import { getServerSession } from "src/libs/auth"; // NextAuth なら適宜変更
import { prisma } from "src/libs/prisma";

export async function PATCH(req: Request) {
  const { starNum } = await req.json();
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const userId = user.id;

  const profile = await prisma.profile.findUnique({ where: { userId } });
  const userHasStar = profile?.stars ?? 0;
  const willBe = userHasStar - starNum;
  const newNumber = Math.max(0, willBe);  // マイナスにならない

  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: { stars: newNumber},
  });

  return NextResponse.json({ updatedProfile });
}