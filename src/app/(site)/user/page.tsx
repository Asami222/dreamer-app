import { prisma } from "src/libs/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
import { SITE_NAME } from "src/constants";
import type { Metadata } from "next";
import UserRewardListContainer from 'src/containers/UserRewardListContainer'
import UserProfileContainer from 'src/containers/UserProfileContainer'
//import { getReward } from "src/services/getReward";
//import { getProfile } from "src/services/getProfile";
import Separator from "src/components/atoms/Separator";


export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession();
  if (!session) {
    notFound();
  }
  return { title: `${SITE_NAME} | ${session.user.name}` };
}

export default async function Page() {
  /*
  const [session, { reward }, {profile}] = await Promise.all([
    getServerSession(),
    getReward({revalidate: 10}),
    getProfile({revalidate: 10})
  ]);
  if (!getReward || !getProfile || !session?.user) {
    notFound();
  }
*/
  const session = await getServerSession();
  const userId = session?.user?.id;

  if (!userId) notFound();

  // ⭐ Prisma を直接呼ぶ
  const [reward, profile] = await Promise.all([
    prisma.reward.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.profile.upsert({
      where: { userId },
      update: {},
      create: { userId, stars: 0 },
    }),
  ]);

  return (
      <div className="flex flex-col gap-[40px] mt-[24px] mb-[64px] mx-auto">
        <div>
            <UserProfileContainer profile={profile} userName={session.user.name} userImage={session.user.profileImageUrl ? session.user.profileImageUrl : ""}/>
            <Separator />
        </div>
        <div className="mx-auto">
            <div className="text-center">
              <h2 className="text-(--text) font-normal text-[20px]">ご褒美</h2>
            </div>
            <div>
              <div><UserRewardListContainer rewards={reward} user={profile}/></div>
            </div>
        </div>
      </div>
  )
}