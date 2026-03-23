import { unstable_cache } from "next/cache";
import { prisma } from "src/libs/prisma";
import { toGotRewardsUI } from "src/utils/transform";


export const getGotRewards = (userId: string) =>
  unstable_cache(
    async () => {
      const gotReward = await prisma.gotReward.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      return toGotRewardsUI(gotReward);
    },
    ['gotRewards', userId], // 👈 ユーザーごと
    {
      tags: ['gotRewards'],
    }
  )();
  