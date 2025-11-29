import { z } from "zod";

//signin
export const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "ユーザー名は必須です" })
    .min(3, { message: "ユーザー名は3文字以上で入力してください" })
    .max(20, { message: "ユーザー名は20文字以内で入力してください" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "ユーザー名は英数字またはアンダースコアのみ使用できます",
    }),
  password: z
    .string()
    .min(1, { message: "パスワードは必須です" })
    .min(6, { message: "パスワードは6文字以上で入力してください" }),
});

export type SignupSchema = z.infer<typeof signupSchema>;


//login
export const loginSchema = z.object({
  name: z
    .string()
    .min(1, { message: "ユーザー名を入力してください" }),
  password: z
    .string()
    .min(1, { message: "パスワードを入力してください" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;