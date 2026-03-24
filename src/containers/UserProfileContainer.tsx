import UserProfile from "src/components/organisms/UserProfile";
import { Profile } from "src/types/data";
import Spinner from "@/components/atoms/Spinner";

interface UserProfileContainerProps {
  userName: string
  userImage: string
  profile?: Profile
  isLoading?: boolean
}

const UserProfileContainer = ({
  userName,
  userImage,
  profile,
  isLoading
}: UserProfileContainerProps) => {

  if (isLoading) return <Spinner />

  return (
      <UserProfile
        username={profile?.displayName ? profile?.displayName : userName}
        profileImageUrl={userImage}
        numberOfStars={profile?.stars ? profile.stars : 0}
        dream={profile?.dream ? profile.dream : ''}
        limit={profile?.limit ? profile.limit : ''}
      />
  )
}

export default UserProfileContainer