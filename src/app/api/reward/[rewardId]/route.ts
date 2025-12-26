
import { prisma } from "src/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";
import { revalidateTag } from "next/cache";
import { deleteRewardImage } from "@/libs/supabase/deleteRewardImage";

export async function DELETE(req: NextRequest, { params }: {params: Promise<{ rewardId: string}>}) {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const userId = user.id;

  const { rewardId } = await params;

  // 先に reward を取得
  const reward = await prisma.reward.findFirst({
    where: {
      id: rewardId,
      userId,
    },
    select: {
      image: true,
    },
  });

  if (!reward) {
    return NextResponse.json(
      { message: "Not Found or Not Owner" },
      { status: 404 }
    );
  }

  // DB削除
  await prisma.reward.delete({
    where: { id: rewardId },
  });

  // ⭐ storage 削除
  await deleteRewardImage(reward.image);
  /*
  if (deleted.count === 0) {
    return NextResponse.json({ message: "Not Found or Not Owner" }, { status: 404 });
  }
  */
  revalidateTag("rewards", "auto");

  return NextResponse.json({ message: "Deleted successfully", rewardId });
}