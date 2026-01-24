import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import UserForm from "src/components/organisms/UserForm";
import { isGuestUser } from "src/utils/isGuestUser";
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

const E2E_USER = {
  id: "e2e-user",
  email: "e2e@test.com",
  app_metadata: {},
  user_metadata: {},
};

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ユーザー編集", "ユーザー情報を編集できます。アプリで使用する名前、夢、叶える期限などを登録、編集できます。", parent);
}

const UserSetting = async() => {
  const isE2E = process.env.NEXT_PUBLIC_E2E_TEST === "true";

  let user;

  if (isE2E) {
    user = E2E_USER;            // 認証完全スキップ
  } else {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  if (!user) notFound();

  return (
      <div className="mt-10 mb-[80px]">
        <UserForm isGuest={isGuestUser(user)}/>
      </div>
  )
}

export default UserSetting
