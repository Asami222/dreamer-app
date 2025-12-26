import { prisma } from "src/libs/prisma";
import { createClient } from "@/libs/supabase/server";
import { revalidateTag } from "next/cache";
import { copyImage } from "src/libs/supabase/copyImage";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ todoId: string}> }
) {
  const { todoId } =  await params;
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const userId = user.id;

  const originalTodo = await prisma.todo.findUnique({
    where: { id:todoId },
  });

  if (!originalTodo) return new Response("Not Found", { status: 404 });

  let imagePath = originalTodo.image;

  if (originalTodo.image) {
    imagePath = await copyImage(
      originalTodo.image,
      userId,
      "todo",
    );
  }

  // userIdを強制的にログインユーザーへ
  const copied = await prisma.todo.create({
    data: {
      userId,
      category: originalTodo.category,
      title: originalTodo.title,
      limit: originalTodo.limit,
      detail: originalTodo.detail,
      description: originalTodo.description,
      image: imagePath,
      star: originalTodo.star, // ★は通常リセットするケース多い
    },
  });
  revalidateTag("todos","auto");
  return Response.json(copied);
}