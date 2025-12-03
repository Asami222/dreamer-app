declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email?: string | null;
    provider?: string | null;
    profileImageUrl?: string | null;
    createdAt?: string | null;
    password?: string | null;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      profileImageUrl?: string | null;
      profile?: {
        displayName?: string | null;
        stars?: number | null;
        dream?: string | null;
        limit?: string | null;
      };
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    profileImageUrl?: string | null;
    provider?: string | null;
    profile?: {
      displayName?: string | null;
      stars?: number | null;
      dream?: string | null;
      limit?: string | null;
    };
  }
}

export {};