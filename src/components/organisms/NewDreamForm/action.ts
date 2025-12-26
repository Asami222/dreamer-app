"use server";

import { prisma } from "src/libs/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/libs/supabase/server";
import type { FormState } from "./state";

function validateFormData(formData: FormData) {
  const dream = formData.get("dream");
  const limit = formData.get("limit");
  if (
    typeof dream !== "string" ||
    typeof limit !== "string" 
  ) {
    throw new Error("Validation error");
  }
  return { dream, limit };
}

export async function createDream(
  _: FormState,
  formData: FormData,
): Promise<FormState> {
  // 誰から送られたリクエストかを特定する
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { message: "未認証です。再度ログインしてください" };
  }
  try {
    const { dream, limit } = validateFormData(formData);
    const userId = user.id;
    // ユーザー情報とプロフィール情報をまとめて更新
    await prisma.profile.upsert({
      where: { userId },
      update: { dream, limit },
      create: {
        userId,
        dream,
        limit,
        stars: 0,
      },
    });
    // ユーザーIDに紐づいたキャッシュを Reavalidate
    revalidatePath(`/dream`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { message: "エラーが発生しました" };
  }
  redirect("/newTodo");
}