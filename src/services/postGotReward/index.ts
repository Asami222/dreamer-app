import { handleFailed, handleSucceed } from "../";
import type { GotReward } from "src/types/data"

export function postGotReward(payload: {
  reward: string;
  starPieces: number | null;
}): Promise<{ gotReward: GotReward }> {
  return fetch(`/api/gotReward`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    next: { revalidate: 0 }, // 明示的に SSR 更新
  })
    .then(handleSucceed)
    .catch(handleFailed);
}