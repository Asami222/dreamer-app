"use client";

import { useEffect, useState } from "react";
import { getProfile } from "src/services/getProfile";
import type { Profile } from "src/types/data";

export default function useUserProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        const { profile } = await getProfile();
        if (mounted) {
          setProfile(profile);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  return {
    profile,
    isLoading,
    error,
  };
}