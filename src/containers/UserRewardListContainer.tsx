import { Fragment } from "react";
import RewardCard from 'src/components/organisms/RewardCard';
import clsx from "clsx"
import { Profile, RewardUIModel } from 'src/types/data';
import Spinner from "@/components/atoms/Spinner";

interface UserRewardListContainerProps {
  user: Profile
  rewards: RewardUIModel[]
  isLoading?: boolean
}

const UserRewardListContainer = ({
  rewards,
  user,
  isLoading
}: UserRewardListContainerProps) => {

  if (isLoading) return (
    <div className="flex items-center justify-center mt-8">
      <Spinner />
    </div>
  )
  return (
      <div className={clsx('flex flex-col gap-8 mt-8',rewards?.length === 0 && 'text-center')}>
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

