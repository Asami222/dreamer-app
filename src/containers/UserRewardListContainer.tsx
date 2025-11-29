import { Fragment } from "react";
import RewardCard from 'src/components/organisms/RewardCard';
import clsx from "clsx"
import { Profile, Reward } from 'src/types/data';


interface UserRewardListContainerProps {
  user: Profile
  rewards: Reward[]
}

const UserRewardListContainer = ({
  rewards,
  user
}: UserRewardListContainerProps) => {

  /*
  const {myRewards, setReward, removeReward} = useMyRewardsContext()
  useEffect(() => {
    setReward(userRewards)
  }, [setReward, userRewards]);
  */
  return (
    <div className={clsx('flex flex-col gap-8 mt-[32px]',rewards?.length === 0 && 'text-center')}>
      { rewards.length === 0 ?
        <p>ご褒美はまだありません</p>
        : 
        rewards.map((p) => (
          <Fragment key={p.id} >
            <RewardCard
              rewardId={p.id}
              rewardImageUrl={p.image ? p.image : '/images/bear01.webp'}
              reward={p.reward}
              profile={user}
              starNum={p.starPieces ? p.starPieces : 0}
            />
          </Fragment>
      ))}
    </div>
  )
}

export default UserRewardListContainer

