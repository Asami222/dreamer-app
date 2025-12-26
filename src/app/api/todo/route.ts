import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { toTodosUI } from "src/utils/transform";


export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const userId = user.id;

  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!todos) {
    return Response.json({ message: "Todoがありません" }, { status: 404 });
  }
  
  return Response.json(toTodosUI(todos));
}