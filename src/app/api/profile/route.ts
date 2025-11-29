import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";


export async function GET() {
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.upsert({
    where: { userId },
    update: {},
    create: { userId: userId, numberOfStars: 0,}
  });

  if (!profile) {
    return Response.json({ message: "プロフィールが見つかりません" }, { status: 404 });
  }
  
  return Response.json({ profile });
}