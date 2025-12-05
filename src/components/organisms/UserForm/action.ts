"use server";

import { getServerSession } from "src/libs/auth";
import { prisma } from "src/libs/prisma";
import { ZodError } from "zod";
//import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { validateFormData, transformFieldErrors } from "src/utils/validate";
import { handleError, errors, type FormState, handleSuccess } from "src/utils/state";
import { userFormSchema } from "./schema";
import type { UserFormInput } from "./schema";
import { uploadAvatarBase64 } from "src/libs/supabase/uploadAvatarBase64"

export async function updateUser(
  prevState: FormState<UserFormInput>,
  formJson: {
    displayName: string;
    dream: string;
    limit: string;
    base64Image: string | null;
  },
): Promise<FormState<UserFormInput>> {
  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    
    
    let imageUrl = "/images/noImg.webp";

    if (formJson.base64Image) {
      imageUrl = await uploadAvatarBase64(formJson.base64Image, userId);
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { profileImageUrl: imageUrl },
      }),
      prisma.profile.update({
        where: { userId },
        data: {
          displayName: formJson.displayName,
          dream: formJson.dream,
          limit: formJson.limit,
        },
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