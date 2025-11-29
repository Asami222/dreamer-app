import clsx from "clsx"
import Spinner from "../Spinner"

type SelectColor = "Red" | "Pink"
type ButtonGradProps = {
  hasError?: boolean
  hasBorder?: boolean
  selectcolor?: SelectColor
  disabled?: boolean
  loading?: boolean;
  loadingMessage?: string 
  onClick?: () => void;
  children: React.ReactNode
  className?: string;
  type?: "submit" | "reset" | "button";
};

export default function ButtonGrad({
  hasError,
  selectcolor = "Red",
  disabled,
  loading = false,
  loadingMessage,
  children,
  onClick,
  className,
  type = "submit",
}: ButtonGradProps) {
  
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        "relative w-[223px] h-[62px] z-0 inline-flex items-center justify-center gap-2 rounded-full text-white text-[16px] leading-[62px] enabled:cursor-pointer font-medium tracking-[0.25em] text-center bg-transparent box-border transition-all duration-100 select-none outline-none border-none overflow-hidden enabled:hover:transition-all enabled:hover:duration-300",
        // before
        "before:content-[''] before:absolute before:top-0 before:left-0 before:z-[-1] before:w-full before:h-[62px] before:rounded-full before:transition-all before:duration-100 before:shadow-[inset_0_2px_2px_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.2)] before:enabled:hover:shadow-[inset_0_1px_3px_rgba(255,255,255,0.7),0_6px_8px_rgba(0,0,0,0.25)]",
        // after
        "after:content-[''] after:absolute after:top-0 after:left-0 after:z-[-2] after:w-[223px] after:h-[62px] after:rounded-full after:bg-(--btn2GraBack) after:transition-all after:duration-100",
        // 状態ごとに条件付け
        disabled && "opacity-50 cursor-not-allowed",
        disabled && loading && "opacity-100",
        hasError
          ? "before:border before:border-(--danger) after:hidden"
          : "before:border-0 after:block",
        selectcolor === "Red"
          ? "before:bg-[linear-gradient(90deg,rgba(245,169,169,0.63)_0%,rgba(210,43,43,0.63)_100%)] enabled:hover:before:bg-[linear-gradient(90deg,rgba(253,218,255,0.63)_0%,rgba(210,43,96,0.63)_100%)]"
          : "before:bg-[linear-gradient(90deg,rgba(245,169,169,0.63)_0%,rgba(228,103,103,0.63)_100%)] enabled:hover:before:bg-[linear-gradient(90deg,rgba(237,200,176,0.63)_0%,rgba(227,76,114,0.63)_100%)]",
          className
      )}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <Spinner size={16} strokeWidth={2} color={"var(--white)"}/>
          {loadingMessage && <span>{loadingMessage}</span>}
        </div>
      ) : (
        children
      )}
    </button>
  )
}