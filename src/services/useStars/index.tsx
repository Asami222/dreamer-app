/* services/updateStars.ts
import { handleFailed, handleSucceed } from "../";

export function buyReward(starNum: number) {
  return fetch(`/api/profile/use-stars`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ starNum }),
    next: { revalidate: 0 },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}
*/