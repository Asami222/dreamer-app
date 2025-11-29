
import { prisma } from "src/libs/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "src/libs/auth";
import { revalidateTag } from "next/cache";

export async function DELETE(req: NextRequest, { params }: {params: Promise<{ rewardId: string}>}) {
  const session = await getServerSession();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const { rewardId } = await params;

  const deleted = await prisma.reward.deleteMany({
    where: {
      id: rewardId,
      userId: userId,
    },
  });

  if (deleted.count === 0) {
    return NextResponse.json({ message: "Not Found or Not Owner" }, { status: 404 });
  }

  revalidateTag("rewards", "auto");

  return NextResponse.json({ message: "Deleted successfully", rewardId });
}