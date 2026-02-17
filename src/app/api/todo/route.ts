
import { createClient } from "@/libs/supabase/server";
import { toTodosUI } from "src/utils/transform";
import { getUserTodosWithImageUrl } from "@/libs/todo";
import { TodoUIModel } from "src/types/data";

const E2E_TODOS: TodoUIModel[] = [
  {
    id: "todo-1",
    title: "テストTodo",
    description: "詳細テキスト",
    category: "day",
    star: 3,
    image: '',
    limit: [10],
    detail: '',
  },
];

export async function GET() {

  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true"
  let todos: TodoUIModel[]

  if (isE2E) {
      // E2E時：認証・DBを完全スキップ
      todos = E2E_TODOS
      return Response.json(todos);
    } 

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  
    const todosWithImageUrl = await getUserTodosWithImageUrl(user.id)
    todos = toTodosUI(todosWithImageUrl)

    if (!todos) {
    return Response.json({ message: "Todoがありません" }, { status: 404 });
  }
  
  return Response.json(todos);
 }