import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { prisma } from "src/libs/prisma";
import { toGotRewardsUI } from "src/utils/transform";
import UserGotRewardListContainer from 'src/containers/UserGotRewardListContainer'
import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import { useGotRewards } from '@/hooks/useGotRewards';
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
import { useEffect } from "react";


const GotRewardClient = () => {
  
  const { data: gotRewards = [], isLoading } = useGotRewards()
    const setGlobalSpinner = useGlobalSpinnerActionsContext()
  
    useEffect(() => {
      setGlobalSpinner(isLoading)
  
      return () => {
        setGlobalSpinner(false)
      }
    }, [isLoading, setGlobalSpinner])

  return (
    <>
      <div className="text-center mt-10 mb-16">
        <h1 className="text-(--text) text-[20px] font-normal">
          ご褒美獲得記録
        </h1>
      </div>
      <div>
        <div>
          <UserGotRewardListContainer gotRewards={gotRewards} />
        </div>
      </div>
    </>
  )
}

export default GotRewardClient
