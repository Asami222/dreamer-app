import { handleFailed, handleSucceed,path } from "..";
import type { Profile } from "src/types/data";

type Props = {
  revalidate?: number;
};

export async function getProfile({
  revalidate,
}: Props): Promise<{ profile: Profile }> {
  return fetch(`/api/profile`, {
    next: {
      tags: [`profile`],
      ...(revalidate !== undefined && { revalidate }),
    },
  })
    .then(handleSucceed)
    .catch(handleFailed);
}