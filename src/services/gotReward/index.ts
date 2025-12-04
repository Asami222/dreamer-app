import { handleFailed, handleSucceed } from "..";
//import type { GotReward } from "src/types/data";
import { GotRewardUIModel } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function ownReward({
  revalidate,
}: Props): Promise<{ gotRewards: GotRewardUIModel[] }> {
  return fetch(`/api/gotReward`, {
    next: {
      tags: [`gotRewards`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}