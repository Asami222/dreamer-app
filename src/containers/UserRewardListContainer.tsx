import { Fragment } from "react";
import RewardCard from 'src/components/organisms/RewardCard';
import clsx from "clsx"
import { Profile, RewardUIModel } from 'src/types/data';

interface UserRewardListContainerProps {
  user: Profile
  rewards: RewardUIModel[]
}

const UserRewardListContainer = ({
  rewards,
  user
}: UserRewardListContainerProps) => {

  return (
    <div className={clsx('flex flex-col gap-8 mt-[32px]',rewards?.length === 0 && 'text-center')}>
      { rewards.length === 0 ?
        <p>ご褒美はまだありません</p>
        : 
        rewards.map((p) => (
          <Fragment key={p.id} >
            <RewardCard
              rewardId={p.id}
              rewardImageUrl={p.image}
              reward={p.title}
              profile={user}
              starNum={p.star ? p.star : 0}
            />
          </Fragment>
      ))}
    </div>
  )
}

export default UserRewardListContainer

