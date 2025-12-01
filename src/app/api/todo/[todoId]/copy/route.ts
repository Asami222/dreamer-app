import { prisma } from "src/libs/prisma";
import { getServerSession } from "src/libs/auth";
import { revalidateTag } from "next/cache";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ todoId: string}> }
) {
  const { todoId } =  await params;
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const originalTodo = await prisma.todo.findUnique({
    where: { id:todoId },
  });

  if (!originalTodo) return new Response("Not Found", { status: 404 });

  // userIdを強制的にログインユーザーへ
  const copied = await prisma.todo.create({
    data: {
      userId,
      category: originalTodo.category,
      title: originalTodo.title,
      limit: originalTodo.limit,
      detail: originalTodo.detail,
      description: originalTodo.description,
      image: originalTodo.image,
      star: originalTodo.star, // ★は通常リセットするケース多い
    },
  });
  revalidateTag("todos","auto");
  return Response.json(copied);
}