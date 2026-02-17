import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import UserClient from "./UserClient";


export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";
  if (isE2E) {
    return buildPageMetadata("E2E", "テスト用", parent);
  }
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound();

  const titleName =
    user.email === "guest@gmail.com"
      ? "ゲスト"
      : user.user_metadata?.name ?? "";
  return buildPageMetadata(`${titleName}`, "ユーザーページです。ユーザー情報、獲得した星の合計数、作成したご褒美一覧を見ることができます。", parent);
}

export default async function Page() {
  return <UserClient />
}