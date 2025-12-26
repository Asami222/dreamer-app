// src/utils/isGuestUser.ts
export const GUEST_EMAIL = "guest@gmail.com";

type EmailUser = {
  email?: string | null;
} | null;

export function isGuestUser(user: EmailUser) {
  return user?.email === GUEST_EMAIL;
}