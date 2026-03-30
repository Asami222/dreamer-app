"use server";

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
import { uploadImage } from "src/libs/supabase/uploadImage";
import { createClient } from "src/libs/supabase/server";
import { isGuestUser } from "src/utils/isGuestUser";

export async function updateUser(
  prevState: FormState<UserFormInput>,
  formData: FormData,
): Promise<FormState<UserFormInput>> {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return handleError(prevState, errors[401]);

  const userId = user.id;

  try {
    // -----------------------
    // ① バリデーション
    // -----------------------
    const payload = validateFormData(formData, userFormSchema);

    const imageFile = formData.get("image.file") as File | null;

    const MAX_SIZE = 1 * 1024 * 1024;
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > MAX_SIZE) {
        return handleError(prevState, {
          ...errors[400],
          message: "画像サイズは1MB以内にしてください",
        });
      }

      if (!ALLOWED_TYPES.includes(imageFile.type)) {
        return handleError(prevState, {
          ...errors[400],
          message: "jpg / png / webp のみアップロードできます",
        });
      }
    }

    // -----------------------
    // ② 現在の画像取得
    // -----------------------
    const currentProfile = await prisma.profile.findUnique({
      where: { userId },
      select: { profileImageUrl: true },
    });

    const oldImagePath = currentProfile?.profileImageUrl;

    // -----------------------
    // ③ DB更新（画像以外）
    // -----------------------
    const displayName = isGuestUser(user)
      ? "ゲスト"
      : payload.displayName;

    await prisma.profile.update({
      where: { userId },
      data: {
        displayName,
        dream: payload.dream,
        limit: payload.limit,
      },
    });

    // -----------------------
    // ④ 画像アップロード
    // -----------------------
    let imagePath: string | null = null;

    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile, userId, "avatar");
    }

    // -----------------------
    // ⑤ DB更新（画像）
    // -----------------------
    if (imagePath) {
      await prisma.profile.update({
        where: { userId },
        data: {
          profileImageUrl: imagePath,
        },
      });
    }

    // -----------------------
    // ⑥ 古い画像削除
    // -----------------------
    /*
    if (
      imagePath &&
      oldImagePath &&
      oldImagePath !== "/images/noImg.webp" &&
      oldImagePath.startsWith(`${userId}/avatar`)
    ) {
        await supabase.storage.from("images").remove([oldImagePath]);
    }
    */
    return handleSuccess(prevState);

  } catch (err) {
    console.error(err);
    return handleError(prevState, errors[500]);
  }
}