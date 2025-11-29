import { notFound } from "next/navigation";
//import { SITE_NAME } from "src/constants";
import { getServerSession } from "src/libs/auth";
import UserForm from "src/components/organisms/UserForm";

const UserSetting = async() => {
  const session = await getServerSession();

  if ( !session || !session.user) {
    notFound();
  }

  return (
      <div className="mt-4 mb-[80px]">
        <UserForm />
      </div>
  )
}

export default UserSetting
