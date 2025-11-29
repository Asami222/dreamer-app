import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
import { toRewardsUI } from "src/utils/transform";


export async function GET() {
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const reward = await prisma.reward.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!reward) {
    return Response.json({ message: "ご褒美がありません" }, { status: 404 });
  }
  
  return Response.json(toRewardsUI(reward));
}