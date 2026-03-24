import { createClient } from "@/libs/supabase/server";
import HeaderClient from "./HeaderClient";
import { getHeaderData } from "@/services/getHeaderData";

export const dynamic = "force-dynamic";

const Header = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <HeaderClient profile={null} profileImageUrl={null} />;
  }

  const { profile, profileImageUrl } = await getHeaderData();

  return <HeaderClient profile={profile} profileImageUrl={profileImageUrl} />;
};

export default Header;
