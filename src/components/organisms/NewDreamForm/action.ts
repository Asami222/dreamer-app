"use server";

import { prisma } from "src/libs/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSession } from "src/libs/auth";
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
  const session = await getServerSession();
  if (!session) {
    return { message: "未認証です。再度ログインしてください" };
  }
  try {
    const { dream, limit } = validateFormData(formData);
    const userId = session.user.id;
    // ユーザー情報とプロフィール情報をまとめて更新
    await prisma.profile.upsert({
      where: { userId },
      update: { dream, limit },
      create: {
        user: { connect: { id: userId }},
        dream,
        limit,
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