"use client";

import { Fragment } from 'react';
import GotRewardCard from "src/components/organisms/GotRewardCard";
//import useSearch from "services/rewards/use-gotsearch";
//import { useGotRewardContext } from "src/contexts/GotRewardContext";
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { useRouter } from 'next/navigation';
//import deleteGotReward from "services/rewards/deleteGotRewards";
import clsx from "clsx"
import type { GotRewardUIModel } from 'src/types/data';
import { deleteGotReward } from 'src/services/deleteGotReward';
import toast from "react-hot-toast";

interface UserGotRewardListContainerProps {
  userId: string
  gotRewards?: GotRewardUIModel[]
}

const UserGotRewardListContainer = ({
  gotRewards
}: UserGotRewardListContainerProps) => {
  
  const router = useRouter();
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  
  //const { gotRewards, removegotRewardFromPage, setgotRewardToPage } =useGotRewardContext()
  
  const handleRemoveButtonClick = async(id: string) => {

    try {
      setGlobalSpinner(true)
      await deleteGotReward(id)
      router.refresh();
    } catch (err: unknown) {
      if(err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return (
    <div className={clsx('flex flex-col gap-4 mt-[32px]', gotRewards?.length === 0 && "mt-[32px] text-center")}>
      { gotRewards?.length === 0 ?
      <p>獲得したご褒美はまだありません</p>
      : 
      gotRewards?.map((p) => (
        <Fragment key={p.id} >
          <GotRewardCard
          id={p.id}
          title={p.title}
          star={p.star}
          onRemoveButtonClick={handleRemoveButtonClick}
          createdAt={p.createdAt}
          />
        </Fragment>
      ))}
    </div>
  )
}

export default UserGotRewardListContainer

