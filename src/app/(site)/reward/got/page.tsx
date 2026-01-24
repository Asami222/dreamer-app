import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { prisma } from "src/libs/prisma";
import { toGotRewardsUI } from "src/utils/transform";
import UserGotRewardListContainer from 'src/containers/UserGotRewardListContainer'
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("獲得したご褒美一覧", "今までに獲得したご褒美の獲得日と内容を見ることができます。", parent);
}

const GotReward = async() => {
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) notFound(); 
  const userId = user.id;

  const gotReward = await prisma.gotReward.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  const gotRewards = toGotRewardsUI(gotReward)
  
  return (
    <>
      <div className="text-center mt-10 mb-16">
        <h1 className="text-(--text) text-[20px] font-normal">
          ご褒美獲得記録
        </h1>
      </div>
      <div>
        <div>
          <UserGotRewardListContainer userId={user.id} gotRewards={gotRewards} />
        </div>
      </div>
    </>
  )
}

export default GotReward
