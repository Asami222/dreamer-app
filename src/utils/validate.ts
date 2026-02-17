import type { z, ZodError } from "zod";


export function validateFormData<T extends z.ZodTypeAny>(
  formData: FormData,
  schema: T
): z.infer<T> {

  const obj: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    if (value === "") continue;
    if (value instanceof File && value.size === 0) continue;

    // 数値変換を削除
    obj[key] = value;
  }

  return schema.parse(obj);
}

export function transformFieldErrors<T>(
  err: ZodError<T>
): Record<string, { message: string }> {

  const result: Record<string, { message: string }> = {};

  for (const issue of err.issues) {
    const key = String(issue.path[0]);

    // NaN 型エラーを日本語に差し替え(現在変換不可能)　対処法検討中
    if (
      issue.code === "invalid_type" &&
      typeof issue.input === "number" &&
      Number.isNaN(issue.input)
    ) {
      result[key] = { message: "数字を入力してください" };
      continue;
    }

    result[key] = { message: issue.message };
  }

  return result;
}