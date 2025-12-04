import { handleFailed, handleSucceed } from "../";

export function deleteGotReward(rewardId: string): Promise<{ rewardId: string }> {
  return fetch(`/api/gotReward/${rewardId}`, {
    method: "DELETE",
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}