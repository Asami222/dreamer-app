import { handleFailed, handleSucceed,path} from "../";

export function deleteReward(rewardId: string) {
  return fetch(path(`/api/reward/${rewardId}`), {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}