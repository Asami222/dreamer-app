import { DoneIcon } from 'src/components/atoms/IconButton'

interface CheckBoxProps {
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const CheckBox = ({setIsChecked, isChecked}: CheckBoxProps) => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsChecked((isChecked) => !isChecked)
  }

  return (
      <button
        type="button"
        aria-label={isChecked ? "チェックを外す" : "チェックする"} 
        className='w-[48px] h-[48px] border border-[#E2B3B0] bg-(--checkbox) rounded-[5px] flex justify-center items-center cursor-pointer'
        onClick={onClick}
      >
        { isChecked && <DoneIcon size={24} color='var(--borderDash)' ariaLabel='完了ボタン'/> }
      </button>
  )
}

export default CheckBox