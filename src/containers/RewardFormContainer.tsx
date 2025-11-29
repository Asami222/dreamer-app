import RewardForm from "src/components/organisms/RewardForm";
import type { RewardInput } from 'src/libs/validations/reward'
import { useAuthContext } from "src/contexts/AuthContext";
import { useGlobalSpinnerActionsContext } from "src/contexts/GlobalSpinnerContext";
//import { useMyRewardsContext } from 'contexts/RewardContext';
import addReward from "src/services/rewards/addReward";
import type { ApiContext, Reward } from "src/types/data";
import { chooseImage, imageData1 } from "src/utils";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

interface RewardFormContainerProps {
  onSave?: (error?: Error, reward?: Reward) => void
}

const RewardFormContainer = ({
  onSave,
}: RewardFormContainerProps) => {
  const { authUser } = useAuthContext()
  const setGlobalSpinner = useGlobalSpinnerActionsContext()
  //const {createReward} = useMyRewardsContext()
  const image = chooseImage(imageData1)

  const handleSave = async(data: RewardInput) => {
    if(!authUser) return

    const reward = {
      image: data.image,
      name: data.reward,
      starPieces: data.starNum,
      imageUrl: image,
      blurDataUrl: '',
      owner: { id: authUser.id, username: authUser.username }
    }

    try {
      setGlobalSpinner(true)
      const ret = await addReward(context, { reward })
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSave && onSave(undefined, ret)
      //createReward(ret)
    } catch (err: unknown) {
      if(err instanceof Error) {
        window.alert(err.message)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      onSave && onSave(err)
      }
    } finally {
      setGlobalSpinner(false)
    }
  }

  return <RewardForm onRewardSave={handleSave}/>
}

export default RewardFormContainer
