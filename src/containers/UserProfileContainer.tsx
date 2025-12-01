import UserProfile from "src/components/organisms/UserProfile";
import { Profile } from "src/types/data";

interface UserProfileContainerProps {
  userName: string
  userImage: string
  profile?: Profile
}

const UserProfileContainer = ({
  userName,
  userImage,
  profile,
}: UserProfileContainerProps) => {

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