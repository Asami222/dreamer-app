"use client";

import { Fragment } from 'react';
import GotRewardCard from "src/components/organisms/GotRewardCard";
//import useSearch from "services/rewards/use-gotsearch";
//import { useGotRewardContext } from "src/contexts/GotRewardContext";
//import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
//import { useRouter } from 'next/navigation';
//import deleteGotReward from "services/rewards/deleteGotRewards";
import clsx from "clsx"
import type { GotRewardUIModel } from 'src/types/data';
//import { deleteGotReward } from 'src/services/deleteGotReward';
import toast from "react-hot-toast";
import { useDeleteGotReward } from "@/hooks/useDeleteGotReward";

interface UserGotRewardListContainerProps {
  gotRewards?: GotRewardUIModel[]
}

const UserGotRewardListContainer = ({
  gotRewards
}: UserGotRewardListContainerProps) => {
  
  //const router = useRouter();
  //const setGlobalSpinner = useGlobalSpinnerActionsContext()
  const deleteMutation = useDeleteGotReward()
  
  //const { gotRewards, removegotRewardFromPage, setgotRewardToPage } =useGotRewardContext()
  
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

  return (
    <div className={clsx('flex flex-col gap-4 mt-8', gotRewards?.length === 0 && "mt-8 text-center")}>
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

