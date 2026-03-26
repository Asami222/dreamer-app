import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import UserClient from "./UserClient";
import { getUserData } from "@/services/getUserData";


export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";
  if (isE2E) {
    return buildPageMetadata("E2E", "テスト用", parent);
  }
  return buildPageMetadata("ユーザーページ", "ユーザー情報ページです", parent);
}


export default async function Page() {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound();

  const userdata = await getUserData(user.id, user.email, user.user_metadata?.name);

  return <UserClient initialData={userdata}/>
}