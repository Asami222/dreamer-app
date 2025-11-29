import { handleFailed, handleSucceed } from "..";
import type { Reward } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getReward({
  revalidate,
}: Props): Promise<{ reward: Reward[] }> {
  return fetch(`/api/reward`, {
    next: {
      tags: [`rewards`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}