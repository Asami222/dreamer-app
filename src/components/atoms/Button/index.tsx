import clsx from "clsx"
import Spinner from "../Spinner"

type SelectColor = 'Orange' | 'Yellow' | 'Pink'

export type ButtonProps = {
  selectcolor?: SelectColor
  disabled?: boolean
  loading?: boolean;
  loadingMessage?: string 
  onClick?: () => void;
  children: React.ReactNode
  className?: string;
  type?: "submit" | "reset" | "button" | undefined
} 

export default function Button({
  selectcolor = "Orange",
  disabled,
  loading = false,
  loadingMessage,
  onClick,
  children,
  className,
  type = "submit",
}: ButtonProps) {
  const isDisabled = disabled || loading;
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      className={clsx(
        "relative inline-flex items-center justify-center gap-2 font-normal text-center no-underline px-2 py-1 transition-all duration-500 outline-none rounded-[5px] enabled:cursor-pointer shadow-[0_2px_4px_0_rgba(177,88,82,0.25)] enabled:hover:transition-all enabled:hover:duration-100",
        // 状態ごとに条件付け
        disabled && "opacity-50 cursor-not-allowed",
        disabled && loading && "opacity-100",
        selectcolor === "Orange" && "bg-(--btnSimpleOrange) enabled:hover:bg-(--btnSimpleOrangeHover) text-(--icon) border-none",
        selectcolor === "Yellow" && "bg-(--btnSimpleYellow) enabled:hover:bg-(--btnSimpleYellowHover) text-(--icon) border-none",
        selectcolor === "Pink" && "bg-[#DA726D] enabled:hover:bg-[#d87974de] text-(--white) border border-(--secondary)",
        className
      )}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <Spinner size={16} strokeWidth={2} color={selectcolor === "Pink" ? "var(--white)" : "var(--text)"}/>
          {loadingMessage && <span>{loadingMessage}</span>}
        </div>
      ) : (
        children
      )}
    </button>
  )
}