// app/api/GotReward/[rewardId]/route.ts
import { prisma } from "src/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
//import { getServerSession } from "src/libs/auth";
import { revalidateTag } from "next/cache";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ rewardId: string}> }) {
  const supabase = await createClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user?.id) {
  return new Response(
    JSON.stringify({ message: "Unauthorized" }),
    { status: 401, headers: { "Content-Type": "application/json" } }
  );
}

const userId = user.id;

  const { rewardId } = await params;

  const deleted = await prisma.gotReward.deleteMany({
    where: {
      id: rewardId,
      userId: userId,
    },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ message: "Not Found or Not Owner" }, { status: 404 });
  }

  //revalidateTag("gotRewards", "auto");

  return NextResponse.json({ message: "Deleted successfully", gotRewardId: rewardId });
}