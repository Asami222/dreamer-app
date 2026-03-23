//import { handleFailed, handleSucceed } from "..";
//import type { GotReward } from "src/types/data";
import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation"
import { getGotRewards } from "./core";

export const ownReward = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) redirect("/login");

  const gotRewards = await getGotRewards(user.id);

  return gotRewards;
};

/*
type Props = {
  revalidate?: number;
};

export async function ownReward({
  revalidate,
}: Props = {}): Promise<{ gotRewards: GotRewardUIModel[] }> {
  const res = await fetch(`/api/gotReward`, {
    next: {
      tags: [`gotRewards`],
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
*/