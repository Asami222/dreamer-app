// services/auth.ts
"use client";
import { supabase } from "@/libs/supabase/client";

// -------------------------------
// サインアップ + ログイン
// -------------------------------
export async function signupAndLogin({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error("サインアップに失敗しました");

  const { session } = await res.json();
  if (!session) throw new Error("セッション取得失敗");

  // ★これで onAuthStateChange が即発火
  await supabase.auth.setSession(session);

  return { message: "サインアップ・ログインに成功しました" };
}

// -------------------------------
// ログイン
// -------------------------------
export async function login({ email, password }: { email: string; password: string }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    switch (error.code) {
      case "invalid_credentials":
        throw new Error("メールアドレスまたはパスワードが正しくありません");
      case "email_not_confirmed":
        throw new Error("メールアドレスの確認が完了していません");
      default:
        throw new Error("ログインに失敗しました");
    }
  }

  return { message: "ログインに成功しました", user: data.user };
}

// -------------------------------
// Googleでログイン
// -------------------------------
export async function googleLogin() {
  
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/api/auth/callback`,
    },
  });

  // ここには基本的に戻ってこない
  return;
}

// -------------------------------
// ゲストログイン
// -------------------------------

export async function loginAsGuest() {
  const res = await fetch("/api/auth/guest", { method: "POST" });

  if (!res.ok) {
    throw new Error("ゲストログインが現在利用できません");
  }

  const { session } = await res.json();

  if (!session) {
    throw new Error("セッションが取得できませんでした");
  }

  // ★これが Header を即時ログイン状態にする本体
  await supabase.auth.setSession(session);

  return { message: "ゲストログインに成功しました" };
}

//Reset Password（メール送信用）Schema
export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${location.origin}/auth/reset-password`,
  });

  if (error) {
    throw new Error("パスワード再設定メールの送信に失敗しました");
  }
  

  return { message: "登録されている場合、パスワード再設定メールを送信しました" };
}

// 新しい password を保存
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    switch (error.code) {
      case "weak_password":
        throw new Error("パスワードが簡単すぎます");
      case "session_not_found":
        throw new Error("セッションの有効期限が切れています");
      default:
        throw new Error("パスワードの更新に失敗しました");
    }
  }

  return { message: "パスワード再作成に成功しました" };
}

//日本語エラー共通関数(signup、Login)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function authErrorToJaMessage(error: any, fallback: string) {
  switch (error?.code) {
    case "invalid_credentials":
      return "メールアドレスまたはパスワードが正しくありません";
    case "email_not_confirmed":
      return "メールアドレスの確認が完了していません";
    case "user_already_exists":
      return "すでに登録されているメールアドレスです";
    case "weak_password":
      return "パスワードが簡単すぎます";
    default:
      return fallback;
  }
}