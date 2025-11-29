import clsx from "clsx"

export default function Button2({ disabled, children }: { disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        // 共通レイアウト
        "inline-block w-full h-14 leading-[56px] text-center font-normal text-[16px] tracking-widest rounded-[50px] box-border outline-none border-none transition-all duration-100",
        // 色・影・テキスト
        "text-[#EEFEFF] text-shadow-[1px_1px_1px_rgba(76,27,61,0.4)] bg-(--btn1Gra2) shadow-[0_2px_4px_0_rgba(177,88,82,0.25)]",
        // hover時（有効時のみ）
        "enabled:hover:bg-(--btn1Gra2Hover) enabled:hover:text-shadow-none enabled:hover:duration-300",
        // disabled時
        "disabled:opacity-50 disabled:cursor-not-allowed enabled:cursor-pointer"
      )}
    >
      {children}
    </button>
  );
}