// services/updateStars.ts
import { handleFailed, handleSucceed,path } from "../";

export function buyReward(starNum: number) {
  return fetch(path(`/api/profile/use-stars`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ starNum }),
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}