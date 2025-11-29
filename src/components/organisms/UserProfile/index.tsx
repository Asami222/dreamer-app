//import { useEffect } from 'react'
import ShapeImage from "src/components/atoms/ShapeImage";
import { StarIcon } from "src/components/atoms/IconButton";
//import { useTotalStarContext } from "src/contexts/TotalStarContext";
//import { useTotalStarContext } from 'contexts/TotalStarContext';
//import { useTotalStarContext, useTotalStarActionsContext } from "contexts/TotalStarContext";


interface UserProfileProps {
  username: string
  profileImageUrl: string
  numberOfStars: number
  dream?: string
  limit?: string
}

const UserProfile = ({
  username,
  profileImageUrl,
  numberOfStars,
  dream,
  limit
}: UserProfileProps) => {
/*
  const { totalStar, setStar } = useTotalStarContext()

  useEffect(() => {
  setStar(numberOfStars)
  }, [numberOfStars, setStar]);
*/
  return (
    <div className='flex flex-col gap-6 items-center mb-2'>
      <div className='flex items-center gap-4'>
          <ShapeImage
            src={profileImageUrl ? profileImageUrl : 'images/noImg.webp'}
            shape='circle'
            width="100px"
            height="98px"
          />
        <div className='flex flex-col items-center gap-2'>
          <p className='font-medium text-[20px] leading-[24px] text-(--text)'>
            {username}
          </p>
          <div className='flex items-center gap-1'>
            <StarIcon size={20} color="var(--starLight)" ariaLabel='星'/>
            <p className='text-[16px] text-(--text)'>x{numberOfStars}</p>
          </div>
        </div>
      </div>
      <div className='text-center'>
        <p className='text-[20px] text-(--text) m-0'>{dream? dream : ''}</p>
        <p className='text-[16px] text-(--text) m-0'>{limit?`（${limit}）`: ''}</p>
      </div>
    </div>
  )
}

export default UserProfile