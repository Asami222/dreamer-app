import { handleFailed, handleSucceed,path } from "..";

export function exchangeReward(rewardId: string) {
  return fetch(path(`/api/reward/exchange/${rewardId}`), {
    method: "POST",
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}