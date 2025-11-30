import type { Prisma } from "@prisma/client";
import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest, { params }: {params: Promise<{ todoId: string}>} ) {
  const session = await getServerSession();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { todoId } = await params;

  try {
    const body = await req.json();
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
      select: { todo: true, starNum: true }
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

      // ⭐ 星数をチェックして加算
      const profile = await tx.profile.findUnique({ where: { userId } });
      const currentStars = profile?.numberOfStars ?? 0;
      const cost = body.check === true ? (todo.starNum ?? 0) : 0;

      await tx.profile.update({
        where: { userId },
        data: {
          numberOfStars: currentStars + cost,
        },
      });

      // 🧹 todoを削除
      await tx.todo.delete({
        where: { id: todoId }
      });
    });

    revalidateTag("todos","auto");
    revalidateTag("profile","auto");

    return NextResponse.json({ message: "Success!",todo: todo.todo });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}