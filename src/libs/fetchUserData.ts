// lib/fetchUserData.ts
export const fetchUserData = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch user data')
  }

  return res.json()
}