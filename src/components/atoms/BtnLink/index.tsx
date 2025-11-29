import Link from "next/link";
import clsx from "clsx"
import Spinner from "../Spinner"
import { color } from "storybook/internal/theming";

type BtnLinkProps = {
  href: string
  loading?: boolean;
  disabled?: boolean
  loadingMessage?: string
  children: React.ReactNode
  className?: string;
}

export default function BtnLink ({href,loading = false, disabled,loadingMessage,children,className}: BtnLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-block w-full h-[56px] leading-[56px] cursor-pointer outline-none border-none",
        "text-(--textMenu) text-[18px] font-medium text-center tracking-widest",
        "text-shadow-[1px_1px_1px_rgba(76,27,61,0.4)]",
        "rounded-[50px] box-border transition-all duration-100",
        "shadow-[0_2px_4px_rgba(177,88,82,0.25)]",
        "hover:bg-[linear-gradient(90deg,rgba(240,234,197,0.5)_0%,rgba(234,175,116,0.5)_44%,rgba(243,226,148,0.5)_100%)] hover:text-shadow-none",
        disabled && loading && "opacity-100",
        className
      )}
      style={{color: "#EEFEFF"}}
    >
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          <Spinner size={16} strokeWidth={2} />
          {loadingMessage && <span>{loadingMessage}</span>}
        </div>
      ) : (
        children
      )}
    </Link>
  );
};