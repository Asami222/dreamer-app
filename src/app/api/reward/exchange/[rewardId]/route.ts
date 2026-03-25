// /api/reward/purchase/[rewardId]/route.ts
import type { Prisma } from "@prisma/client";
import { prisma } from "src/libs/prisma";
import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { deleteRewardImage } from "@/libs/supabase/deleteRewardImage";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ rewardId: string}> }
) {
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

  try {
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
      select: { title: true, star: true, image: true }
    });

    if (!reward) {
      return NextResponse.json({ message: "Reward not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // ⭐ 星数をチェックして減算
      const profile = await tx.profile.findUnique({ where: { userId } });
      const currentStars = profile?.stars ?? 0;
      const cost = reward.star ?? 0;

      if (currentStars < cost) {
        throw new Error("Not enough stars");
      }

      await tx.profile.update({
        where: { 
          userId 
        },
        data: {
          stars: currentStars - cost,
        },
      });

      // 🎁 gotRewardへ登録
      await tx.gotReward.create({
        data: {
          title: reward.title,
          star: reward.star,
          userId
        },
      });

      // 🧹 rewardを削除
      await tx.reward.delete({
        where: {
          id: rewardId,
        },
      });
    });

    await deleteRewardImage(reward.image);

    revalidateTag(`user-data-${userId}`, "max");
    revalidateTag(`rewards-${userId}`, "max");
    //revalidateTag("profile","auto");
    revalidateTag("gotRewards","max");

    return NextResponse.json({ message: "Success!",reward: reward.title });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}