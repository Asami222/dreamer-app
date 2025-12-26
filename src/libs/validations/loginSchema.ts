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
  email: z
    .string()
    .refine(
        (val) => /\S+@\S+\.\S+/.test(val),
        { message: "有効なメールアドレスを入力してください" }
      ),
});

export type SignupSchema = z.infer<typeof signupSchema>;


//login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
  password: z
    .string()
    .min(1, { message: "パスワードを入力してください" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;


//Reset Password（メール送信用）Schema
export const resetPasswordRequestSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスの形式で入力してください"),
});

export type ResetPasswordRequestSchema = z.infer<
  typeof resetPasswordRequestSchema
>;


//Reset Password（新しい password 設定）Schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください"),

    confirmPassword: z
      .string()
      .min(1, "確認用パスワードを入力してください"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
