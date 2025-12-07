"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
//import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { transformFieldErrors } from "src/utils/validate";
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

  for (const [key, value] of formData.entries()) {
    console.log("FD:", key, value);
  }

  try {
    //const payload = validateFormData(formData, userFormSchema);
    // ------------------------------------
    // ⭐ ここで FormData を Zod 用の payload へ変換
    // ------------------------------------
    const files = formData.getAll("image") as File[];
    const imagePayload =
      files.length > 0
        ? files.map((file) => ({
            src: URL.createObjectURL(file), // 適当な値でもOK、Zod は形式だけ見ている
            file,
          }))
        : undefined;

    const payload = userFormSchema.parse({
      image: imagePayload,
      displayName: formData.get("displayName")?.toString(),
      dream: formData.get("dream")?.toString(),
      limit: formData.get("limit")?.toString(),
    });

    const { image, displayName, dream, limit } = payload;
    let imageUrl = "/images/noImg.webp";

     // ⭐ file が存在する場合 Supabase Storage にアップロード
     if (image && image[0]?.file) {
      imageUrl = await uploadAvatar(image[0].file, userId);
    } else if (image && image[0]?.src) {
      // 既存の URL をそのまま使う
      imageUrl = image[0].src;
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { profileImageUrl: imageUrl },
      }),
      prisma.profile.update({
        where: { userId },
        data: { displayName, dream, limit },
      }),
    ]);

    revalidateTag("profile", "max");
    revalidateTag("user", "max");
    return handleSuccess(prevState);

    //return handleSuccess(prevState);
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
