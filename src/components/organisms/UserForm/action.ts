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
import { resizeImage } from "@/libs/image/resizeImage";
import { uploadImage } from "src/libs/supabase/uploadImage";
import { createClient } from "src/libs/supabase/server";
import { isGuestUser } from "src/utils/isGuestUser";

export async function updateUser(
  prevState: FormState<UserFormInput>,
  formData: FormData,
): Promise<FormState<UserFormInput>> {
  //e2e playwrightテスト用
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";

  if (isE2E) {
    // フォームの値だけ軽くバリデーションして即成功
    try {
      validateFormData(formData, userFormSchema);
      return handleSuccess(prevState);
    } catch (err) {
      if (err instanceof ZodError) {
        return handleError(prevState, {
          ...errors[400],
          fieldErrors: transformFieldErrors(err),
        });
      }
      return handleError(prevState, errors[500]);
    }
  }

  // ① NextAuth セッション（ユーザー ID 確認用）
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return handleError(prevState, errors[401]);

  const userId = user.id;

  // ② Supabase セッション（Storage 用 JWT 取得）
  const {
    data: { session: spsession },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log("Supabase session:", spsession);
  console.log("Supabase session error:", sessionError);

  const supabaseAccessToken = spsession?.access_token;
  if (!supabaseAccessToken) {
    console.error("Supabase JWT が取得できません");
    return handleError(prevState, errors[500]);
  }

  try {
    // -------------------------------------
    // 画像アップロード
    // -------------------------------------
    const imageFile = formData.get("image.file") as File | null;
    //let imagePath: string | null = null;
    // ① 現在の画像取得
    const currentProfile = await prisma.profile.findUnique({
      where: { userId },
      select: { profileImageUrl: true },
    });
    const oldImagePath = currentProfile?.profileImageUrl;

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

    // ② upload
    let imagePath: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const resized = await resizeImage(imageFile);
      imagePath = await uploadImage(resized, userId, "avatar");
    }

    // ③ 古い画像削除
    if (
      imagePath &&
      oldImagePath &&
      oldImagePath !== "/images/noImg.webp" &&
      oldImagePath.startsWith(`${userId}/avatar`)
    ) {
      await supabase.storage.from("images").remove([oldImagePath]);
    }

    // -------------------------------------
    // Zod バリデーション
    // -------------------------------------
    const payload = validateFormData(formData, userFormSchema);

    console.log("payload", payload)

    // ゲストなら displayName を強制的に固定
    const displayName = isGuestUser(user)
    ? "ゲスト"
    : payload.displayName;

    const updateData: {
      displayName?: string;
      dream?: string | null;
      limit?: string | null;
      profileImageUrl?: string;
    } = {};
    
    // displayName
    if (displayName !== undefined && displayName !== "") {
      updateData.displayName = displayName;
    }
    
    // dream
    if (payload.dream !== undefined) {
      updateData.dream = payload.dream;
    }
    
    // limit
    if (payload.limit !== undefined) {
      updateData.limit = payload.limit;
    }
    
    // image
    if (imagePath) {
      updateData.profileImageUrl = imagePath;
    }
    
    await prisma.profile.update({
      where: { userId },
      data: updateData,
    });

    // -------------------------------------
    // Revalidate
    // -------------------------------------
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