// services/getProfile/index.ts
import { handleFailed, handleSucceed } from "..";
import type { Profile } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getProfile({
  revalidate,
}: Props = {}): Promise<{ profile: Profile | null }> {
  return fetch("/api/profile/me", {
    ...(revalidate !== undefined && {
      next: {
        tags: ["profile"],
        revalidate,
      },
    }),
  })
    .then(handleSucceed)
    .catch(handleFailed);
}