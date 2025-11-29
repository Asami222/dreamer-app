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

export async function updateUser(
  prevState: FormState<UserFormInput>,
  formData: FormData,
): Promise<FormState<UserFormInput>> {
  const session = await getServerSession();
  if (!session) return handleError(prevState, errors[401]);

  const userId = session.user.id;

  try {
    const payload = validateFormData(formData, userFormSchema);
    const { image, displayName, dream, limit } = payload;
    const imageUrl = image?.[0]?.src ?? "/images/noImg.webp";

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