import type { z, ZodError } from "zod";

export function validateFormData<T extends z.ZodTypeAny>(
  formData: FormData,
  schema: T
): z.infer<T> {
  return schema.parse(Object.fromEntries(formData)) as z.infer<T>;
}

export function transformFieldErrors<T>(
  err: ZodError<T>
): Record<string, { message: string }> {
  return Object.fromEntries(
    err.issues.map(({ path, message }) => [String(path[0]), { message }])
  );
}