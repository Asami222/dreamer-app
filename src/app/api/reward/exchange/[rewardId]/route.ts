// /api/reward/purchase/[rewardId]/route.ts
import { prisma } from "src/libs/prisma";
import { getServerSession } from "src/libs/auth";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ rewardId: string}> }
) {
  const session = await getServerSession();
  const userId = session?.user?.id;
  const { rewardId } = await params;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
      select: { reward: true, starPieces: true }
    });

    if (!reward) {
      return NextResponse.json({ message: "Reward not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      // ⭐ 星数をチェックして減算
      const profile = await tx.profile.findUnique({ where: { userId } });
      const currentStars = profile?.numberOfStars ?? 0;
      const cost = reward.starPieces ?? 0;

      if (currentStars < cost) {
        throw new Error("Not enough stars");
      }

      await tx.profile.update({
        where: { 
          userId 
        },
        data: {
          numberOfStars: currentStars - cost,
        },
      });

      // 🎁 gotRewardへ登録
      await tx.gotReward.create({
        data: {
          reward: reward.reward,
          starPieces: reward.starPieces,
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

    revalidateTag("rewards","auto");
    revalidateTag("profile","auto");
    revalidateTag("gotRewards","auto");

    return NextResponse.json({ message: "Success!",reward: reward.reward });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}