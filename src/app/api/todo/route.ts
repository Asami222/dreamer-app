import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
import { toTodosUI } from "src/utils/transform";


export async function GET() {
  const session = await getServerSession();
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!todos) {
    return Response.json({ message: "Todoがありません" }, { status: 404 });
  }
  
  return Response.json(toTodosUI(todos));
}