// app/api/profile/stars/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "src/libs/auth"; // NextAuth なら適宜変更
import { prisma } from "src/libs/prisma";

export async function PATCH(req: Request) {
  const { starNum } = await req.json();
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const profile = await prisma.profile.findUnique({ where: { userId } });
  const userHasStar = profile?.numberOfStars ?? 0;
  const willBe = userHasStar - starNum;
  const newNumber = Math.max(0, willBe);  // マイナスにならない

  const updatedProfile = await prisma.profile.update({
    where: { userId },
    data: { numberOfStars: newNumber},
  });

  return NextResponse.json({ updatedProfile });
}