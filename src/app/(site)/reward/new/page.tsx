import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import RewardForm from "src/components/organisms/RewardForm";
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
  return buildPageMetadata("ご褒美作成", "ご褒美を作成して、獲得した星と交換しましょう。", parent);
}

const NewReward = async() => {

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
    <>
      <div className="text-center mt-10 mb-10">
        <h1 className="text(--text) text-[20px] font-normal">
          ご褒美設定
        </h1>
      </div>
      <RewardForm />
    </>
  )
}

export default NewReward