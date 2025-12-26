import type { z, ZodError } from "zod";

export function validateFormData<T extends z.ZodTypeAny>(
  formData: FormData,
  schema: T
): z.infer<T> {

  const obj: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    if (value === "") continue;                  // 🔥 未入力はキーごと消す
    if (value instanceof File && value.size === 0) continue;
    obj[key] = value;
  }

  return schema.parse(obj);
}

export function transformFieldErrors<T>(
  err: ZodError<T>
): Record<string, { message: string }> {
  return Object.fromEntries(
    err.issues.map(({ path, message }) => [String(path[0]), { message }])
  );
}