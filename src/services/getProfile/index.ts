// services/getProfile/index.ts
import { redirect } from "next/navigation"
//import { handleFailed, handleSucceed } from "..";
import type { Profile } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getProfile({
  revalidate,
}: Props = {}): Promise<{ profile: Profile | null }> {
  const res =  await fetch("/api/profile", {
    ...(revalidate !== undefined && {
      next: {
        tags: ["profile"],
        revalidate,
      },
    }),
  })

  if (res.status === 401) {
    redirect("/login")
  }

  if (!res.ok) {
    throw new Error("Failed to fetch profile")
  }

  return res.json()
    
}