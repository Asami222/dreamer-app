import { signIn } from "next-auth/react";

interface SignupAndLoginParams {
  name: string;
  password: string;
}

/**
 * サインアップして自動でログインする共通関数
 */
export async function signupAndLogin({ name, password }: SignupAndLoginParams) {
  // --- サインアップリクエスト ---
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "サインアップに失敗しました");
  }

  // --- 自動ログイン ---
  const loginRes = await signIn("credentials", {
    redirect: false,
    name,
    password,
  });

  if (loginRes?.error) {
    throw new Error(loginRes.error || "ログインに失敗しました");
  }

  return {
    message: "サインアップ・ログインに成功しました",
    user: data.user, // API から返るユーザー情報をそのまま返す
  };
}

/**
 * ゲストログイン用の共通関数
 */
export async function loginAsGuest() {
  // --- サーバー側でゲストユーザーを生成 or 再利用 ---
  const res = await fetch("/api/auth/guest", { method: "POST" });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "ゲストユーザーの作成に失敗しました");
  }

  // --- 自動ログイン ---
  const loginRes = await signIn("credentials", {
    redirect: false,
    name: "guest",
    password: "guestpass",
  });

  if (loginRes?.error) {
    throw new Error(loginRes.error || "ゲストログインに失敗しました");
  }

  return {
    message: "ゲストログインに成功しました",
  };
}

// ログインのみ
export async function login({ name, password }: SignupAndLoginParams) {
  const res = await signIn("credentials", {
    redirect: false,
    name,
    password,
  });

  if (res?.error) {
    throw new Error(res.error);
  }

  return { message: "ログインに成功しました" };
}

export async function googleLogin() {
  const res = await signIn("google");

  if (res?.error) {
    throw new Error(res.error);
  }

  return { message: "ログインに成功しました" };
}

