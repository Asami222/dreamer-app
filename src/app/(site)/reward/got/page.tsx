import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
//import { ownReward } from "src/services/gotReward";
import { prisma } from "src/libs/prisma";
import { toGotRewardsUI } from "src/utils/transform";
import UserGotRewardListContainer from 'src/containers/UserGotRewardListContainer'
//import type { Metadata } from "next";


const GotReward = async() => {
  
  const session = await getServerSession();
  const userId = session?.user?.id;

  if (!userId) notFound();

  const gotReward = await prisma.gotReward.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  const gotRewards = toGotRewardsUI(gotReward)
  
/*
  const [session, { gotRewards }] = await Promise.all([
    getServerSession(),
    ownReward({revalidate: 10}),
  ]);
  if (!gotRewards || !session?.user) {
    notFound();
  }
*/
  return (
    <>
      <div className="text-center mt-10">
        <h1 className="text-(--text) text-[20px] font-normal">
          ご褒美獲得記録
        </h1>
      </div>
      <div>
        <div>
          <UserGotRewardListContainer userId={session.user.id} gotRewards={gotRewards} />
        </div>
      </div>
    </>
  )
}
/*
export const getStaticPaths: GetStaticPaths = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  const users = await getAllUsers(context)
  const paths = users.map((u) => `/users/${u.id}/reward/get`)

  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }

  if (!params) {
    throw new Error('params is undefined')
  }

  // ユーザー情報と ユーザーの所持する商品を取得し、静的ページを作成
  // 10秒でrevalidateな状態にし、静的ページを更新する
  const userId = Number(params.id)
  const [user, gotrewards] = await Promise.all([
    getUser(context, { id: userId }),
    getAllGotRewards(context, { userId }),
  ])

  return {
    props: {
      id: userId,
      user,
      gotrewards: gotrewards ?? [],
    },
    revalidate: 10,
  }
}
*/
export default GotReward
