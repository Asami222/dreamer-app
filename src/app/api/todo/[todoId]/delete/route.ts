import type { Prisma } from "@prisma/client";
import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/libs/supabase/admin";

export async function DELETE(req: NextRequest, { params }: {params: { todoId: string}} ) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const userId = user.id;
  const { todoId } = await params;

  try {
    const body = await req.json();
  console.log("DELETE TODO BODY:", body);
    const todo = await prisma.todo.findUnique({
      where: { id: todoId },
      select: { title: true, star: true, image: true }
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

      // ⭐ 星数をチェックして加算
      const profile = await tx.profile.findUnique({ where: { userId } });
      const currentStars = profile?.stars ?? 0;
      const cost = body.isChecked === true ? (todo.star ?? 0) : 0;
      await tx.profile.update({
        where: { userId },
        data: {
          stars: currentStars + cost,
        },
      });

      // 🧹 todoを削除
      await tx.todo.delete({
        where: { id: todoId }
      });
    });

    // transaction の外で storage 削除
    if (todo.image) {
      await supabaseAdmin.storage
        .from("images")
        .remove([todo.image]);
    }

    revalidateTag("todos","auto");
    revalidateTag("user-data","auto");

    return NextResponse.json({ message: "Success!",todo: todo.title });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}