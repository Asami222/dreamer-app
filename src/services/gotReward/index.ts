import { handleFailed, handleSucceed } from "..";
import type { GotReward } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function ownReward({
  revalidate,
}: Props): Promise<{ gotReward: GotReward[] }> {
  return fetch(`/api/gotReward`, {
    next: {
      tags: [`gotRewards`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}