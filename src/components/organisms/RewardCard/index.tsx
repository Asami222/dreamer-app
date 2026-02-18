"use client";

//import { useState } from 'react';
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import RewardCardUI from 'src/components/organisms/RewardCard/RewardCardUI';
import { Profile } from 'src/types/data';
//import { exchangeReward } from 'src/services/exchangeReward';
//import { deleteReward } from 'src/services/deleteReward';
//import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
import { useExchangeReward } from "@/hooks/useExchangeReward";
import { useDeleteReward } from "@/hooks/useDeleteReward";


interface RewardCardProps {
  rewardId: string
  profile: Profile
  rewardImageUrl?: string
  reward: string
  starNum: number
}

export default function RewardCard({
  rewardId,
  rewardImageUrl,
  reward,
  starNum,
  profile,
}: RewardCardProps) {

  const exchangeMutation = useExchangeReward()
  const deleteMutation = useDeleteReward()
    
  //const setGlobalSpinner = useGlobalSpinnerActionsContext();
  //const router = useRouter();
  //const [isLoading, setIsLoading] = useState(false);
  const userHasStar = profile.stars ? profile.stars : 0
  
  //ご褒美GET!
  const handleChangeButtonClick = async (id: string) => {

    try {
      //setIsLoading(true)
      await exchangeMutation.mutateAsync(id)
      //toast.success(`「${res.reward}」を獲得しました！`);
      //router.refresh(); next: { revalidate: 0 }を指定してるのでrouter.refresh();は無しでok
    } catch (err: unknown) {
      if(err instanceof Error) {
        toast.error("獲得に失敗しました");
      }
    } 
  };

  //ご褒美削除
  const handleRemoveButtonClick = async(id: string) => {
    
   deleteMutation.mutate(
      id,
      {
        onError: (err: unknown) => {
          if (err instanceof Error) {
            toast.error(err.message)
          }
        },
      }
    )
  }

  const isExchanging =
    exchangeMutation.isPending &&
    exchangeMutation.variables === rewardId

  return (
    <RewardCardUI
      rewardId={rewardId}
      rewardImageUrl={rewardImageUrl}
      reward={reward}
      starNum={starNum}
      //isLoading={isLoading}
      userHasStar={userHasStar}
      onChangeButtonClick={handleChangeButtonClick}
      onRemoveButtonClick={handleRemoveButtonClick}
      isExchanging={isExchanging}
    />
  );
}