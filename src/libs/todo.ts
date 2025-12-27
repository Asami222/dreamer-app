// src/libs/reward.ts
import { prisma } from "@/libs/prisma";
import { createClient } from "@/libs/supabase/server";
import type { Todo } from "@prisma/client"

export async function getUserTodos(userId: string) {
  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return todos;
}

/**
 * Reward.image (storage path) → 表示用 URL
 */
export async function getTodoImageUrl(
  todo: Pick<Todo, "image" | "createdAt">,
) {
  // image が無い場合（保険）
  if (!todo.image) return "";

  // todo は外部 URL を持たない前提
  const supabase = await createClient();
  const { data } = supabase
    .storage
    .from("images")
    .getPublicUrl(todo.image);

  let url = data.publicUrl;

  // todo は更新されない想定なので createdAt を使う
  url += `?v=${todo.createdAt.getTime()}`;

  return url;
}

export async function getUserTodosWithImageUrl(userId: string) {
  const todos = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  const supabase = await createClient();

  return todos.map((todo) => {
    if (!todo.image) return todo;

    const { data } = supabase
      .storage
      .from("images")  // ← bucket は images
      .getPublicUrl(todo.image);

      console.log("IMAGE URL:", data.publicUrl);

    return {
      ...todo,
      imageUrl: `${data.publicUrl}?v=${todo.createdAt.getTime()}`,
    };
  });
}