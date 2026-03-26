import type { User } from "@supabase/supabase-js";
import Header from "@/components/organisms/Header";


export default async function HeaderWrapper({ user }: { user: User | null }) {
  return <Header user={user}/>;
}