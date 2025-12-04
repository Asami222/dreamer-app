import { handleFailed, handleSucceed } from "..";

export function exchangeReward(rewardId: string) {
  return fetch(`/api/reward/exchange/${rewardId}`, {
    method: "POST",
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}