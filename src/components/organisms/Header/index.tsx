import HeaderClient from "./HeaderClient";
//import { getHeaderData } from "@/services/getHeaderData";
import type { User } from "@supabase/supabase-js";


const Header = async ({ user }: { user: User | null }) => {
/*
  if (!user) {
    return <HeaderClient profile={null} profileImageUrl={null} />;
  }
*/
  //const { profile, profileImageUrl } = await getHeaderData(user.id);

  return <HeaderClient user={user}/>;
};

export default Header;
