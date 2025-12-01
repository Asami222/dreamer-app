import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { toGotRewardsUI } from "src/utils/transform";


export async function GET() {
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const gotReward = await prisma.gotReward.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!gotReward) {
    return Response.json({ message: "ご褒美記録はありません" }, { status: 404 });
  }
  
  return Response.json(toGotRewardsUI(gotReward));
}


export async function POST(req: NextRequest) {

  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const gotReward = await prisma.gotReward.create({
      data: {
        title: body.title,
        star: body.starPieces,
        userId
      },
    });

    revalidateTag("gotRewards","auto");

    return Response.json({ gotReward }, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}