import Spinner from 'src/components/atoms/Spinner'
import { useGlobalSpinnerContext } from 'src/contexts/GlobalSpinnerContext'

/**
 * グローバルスピナー
 */
const GlobalSpinner = () => {
  const isGlobalSpinnerOn = useGlobalSpinnerContext()

  return (
    <>
      {isGlobalSpinnerOn && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-[rgba(247, 242, 242, 0.7)] flex justify-center items-center z-1200'>
          <Spinner isAutoCentering={true} />
        </div>
      )}
    </>
  )
}

export default GlobalSpinner