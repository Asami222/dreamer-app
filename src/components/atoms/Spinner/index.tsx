"use client";

type SpinnerProps = {
  size?: number;
  strokeWidth?: number;
  isAutoCentering?: boolean;
  color?: string;
};

/**
 * スピナー（Tailwind版）
 */
const Spinner = ({
  size = 50,
  strokeWidth = 4,
  isAutoCentering = false,
  color='var(--borderDash)'
}: SpinnerProps) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={`animate-[rotate_2s_linear_infinite]`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: isAutoCentering ? `-${size / 2}px 0 0 -${size / 2}px` : undefined,
        color
      }}
    >
      <circle
        className="path animate-[dash_1.5s_ease-in-out_infinite] stroke-current"
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - strokeWidth / 2}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <style jsx>{`
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
    </svg>
  );
};

export default Spinner;