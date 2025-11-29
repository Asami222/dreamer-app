import { notFound } from "next/navigation";
import { getServerSession } from "src/libs/auth";
import RewardForm from "src/components/organisms/RewardForm";

const NewReward = async() => {

  const session = await getServerSession();

  if ( !session || !session.user) {
    notFound();
  }

  return (
    <>
      <div className="text-center mt-6 mb-4">
        <h1 className="text(--text) text-[20px] font-normal">
          ご褒美設定
        </h1>
      </div>
      <RewardForm />
    </>
  )
}

export default NewReward