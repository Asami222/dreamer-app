"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import { validateFormData, transformFieldErrors } from "src/utils/validate";
import { handleError, errors, type FormState, handleSuccess } from "src/utils/state";
import { userFormSchema } from "./schema";
import type { UserFormInput } from "./schema";
import { uploadAvatar } from "src/libs/supabase/uploadAvatar";

export async function updateUser(
  prevState: FormState<UserFormInput>,
  formData: FormData,
): Promise<FormState<UserFormInput>> {
  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    // ★ Zod バリデーション
    const payload = validateFormData(formData, userFormSchema);
    const { image, displayName, dream, limit } = payload;

    let imageUrl: string | undefined = undefined; // 未入力時は更新しない

    // ----------------------------------------------------
    // ① image の先頭情報を取得（InputImages が array を送信する形式）
    // ----------------------------------------------------
    const first = image?.[0];

    // ----------------------------------------------------
    // ② file 情報を FormData から直接取得
    // ※ FieldName は "image[0].file" などになるので find で取る
    // ----------------------------------------------------
    let formFile: File | Blob | null = null;

    for (const [key, value] of formData.entries()) {
      if (key.includes("image") && value instanceof File) {
        formFile = value;
      }
    }

    // ----------------------------------------------------
    // ③ ファイルアップロードの判定
    // ----------------------------------------------------
    if (formFile && (formFile as File).size > 0) {
      // Supabase Storage にアップロード
      imageUrl = await uploadAvatar(formFile as File, userId);
    } else if (first?.src && first.src.startsWith("http")) {
      // 既存画像をそのまま使う
      imageUrl = first.src;
    }
    // blob:xxx の場合は無視 → 画像更新しない

    // ----------------------------------------------------
    // ④ DB 更新
    // ----------------------------------------------------
    const operations = [];

    // profileImageUrl を更新する場合のみ
    if (imageUrl !== undefined) {
      operations.push(
        prisma.user.update({
          where: { id: userId },
          data: { profileImageUrl: imageUrl },
        })
      );
    }

    operations.push(
      prisma.profile.update({
        where: { userId },
        data: { displayName, dream, limit },
      })
    );

    await prisma.$transaction(operations);

    revalidateTag("profile", "max");
    revalidateTag("user", "max");

    return handleSuccess(prevState);

  } catch (err) {
    if (err instanceof ZodError) {
      return handleError(prevState, {
        ...errors[400],
        fieldErrors: transformFieldErrors(err),
      });
    }
    console.error(err);
    return handleError(prevState, errors[500]);
  }
}