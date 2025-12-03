import { handleFailed, handleSucceed,path } from "..";
//import type { GotReward } from "src/types/data";
import { GotRewardUIModel } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function ownReward({
  revalidate,
}: Props): Promise<{ gotRewards: GotRewardUIModel[] }> {
  return fetch(path(`/api/gotReward`), {
    next: {
      tags: [`gotRewards`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}