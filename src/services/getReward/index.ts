//import { handleFailed, handleSucceed} from "..";
//import type { Reward } from "src/types/data";
import { redirect } from "next/navigation"
import { RewardUIModel } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getReward({
  revalidate,
}: Props): Promise<{ rewards: RewardUIModel[] }> {
  const res =  await fetch(`/api/reward`, {
    next: {
      tags: [`rewards`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })

  if (res.status === 401) {
      redirect("/login")
    }
    
  if (!res.ok) {
    throw new Error("Failed")
  }

  return res.json()
}