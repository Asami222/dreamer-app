"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
import { revalidateTag } from "next/cache";
import {
  validateFormData,
  transformFieldErrors,
} from "src/utils/validate";
import {
  handleError,
  errors,
  type FormState,
  handleSuccess,
} from "src/utils/state";
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
    // -----------------------------
    // ① Zod バリデーション
    // -----------------------------
    const payload = validateFormData(formData, userFormSchema);
    const { image, displayName, dream, limit } = payload;

    // image は 1 枚専用 object （配列ではない）
    const img = image; // { id?, src?, file? } | undefined

    // -----------------------------
    // ② FormData から file を取得
    // -----------------------------
    let formFile: File | null = null;

    for (const [key, value] of formData.entries()) {
      // name="image.file" を前提
      if (key === "image.file" && value instanceof File && value.size > 0) {
        formFile = value;
        break;
      }
    }

    // -----------------------------
    // ③ 画像URLの決定
    // -----------------------------
    let imageUrl: string | undefined = undefined;

    if (formFile) {
      // 新しい画像をアップロード
      imageUrl = await uploadAvatar(formFile, userId);

    } else if (img?.src && img.src.startsWith("http")) {
      // 編集時：既存画像
      imageUrl = img.src;

    } else {
      // blob:xxx or fileが無い → 画像更新しない
      imageUrl = undefined;
    }

    // -----------------------------
    // ④ DB更新（必要なものだけ更新）
    // -----------------------------
    const operations = [];

    // profileImageUrl の更新
    if (imageUrl !== undefined) {
      operations.push(
        prisma.user.update({
          where: { id: userId },
          data: { profileImageUrl: imageUrl },
        })
      );
    }

    // プロフィール情報の更新
    operations.push(
      prisma.profile.update({
        where: { userId },
        data: { displayName, dream, limit },
      })
    );

    await prisma.$transaction(operations);

    // -----------------------------
    // ⑤ Revalidate
    // -----------------------------
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