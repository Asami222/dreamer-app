"use client";

import UserGotRewardListContainer from 'src/containers/UserGotRewardListContainer'
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
