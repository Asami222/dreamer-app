'use client';

import UserRewardListContainer from 'src/containers/UserRewardListContainer'
import UserProfileContainer from 'src/containers/UserProfileContainer'
import Separator from "src/components/atoms/Separator";
import { useProfile } from "@/hooks/useProfile";
import { useRewards } from "@/hooks/useRewards";
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { useEffect } from "react";

export default function UserClient() {

  const { data: profileData, isLoading: profileLoading } = useProfile()
  const { data: rewards = [], isLoading: rewardsLoading } = useRewards()

  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  
  useEffect(() => {
    setGlobalSpinner(profileLoading || rewardsLoading)
  
      return () => {
        setGlobalSpinner(false)
      }
    }, [profileLoading, rewardsLoading, setGlobalSpinner])


  const profile = profileData?.profile
  const userImage = profileData?.userImage
  const userName = profileData?.userName ?? ""

  return (
      <div className="flex flex-col gap-10 mt-6 mb-16 mx-auto">
        <div>
            <UserProfileContainer profile={profile} userName={userName} userImage={userImage}/>
            <Separator />
        </div>
        <div className="mx-auto">
            <div className="text-center">
              <h2 className="text-(--text) font-normal text-[20px]">ご褒美</h2>
            </div>
            <div>
              <div><UserRewardListContainer rewards={rewards} user={profile}/></div>
            </div>
        </div>
      </div>
  )
}