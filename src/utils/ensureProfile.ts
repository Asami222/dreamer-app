import { prisma } from "src/libs/prisma";

export async function ensureProfile(userId: string) {
  return prisma.profile.upsert({
    where: { userId },
    update: {},
    create: { userId, stars: 0 },
  });
}