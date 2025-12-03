import { handleFailed, handleSucceed,path } from "..";
//import type { Reward } from "src/types/data";
import { RewardUIModel } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getReward({
  revalidate,
}: Props): Promise<{ rewards: RewardUIModel[] }> {
  return fetch(path(`/api/reward`), {
    next: {
      tags: [`rewards`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}