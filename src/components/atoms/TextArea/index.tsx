import React, { useState } from "react";

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  maxRows?: number;
  hasError?: boolean;
  hasBorder?: boolean;
}

/**
 * テキストエリア（Tailwind + CSS変数対応版）
 */
const TextArea = ({
  rows = 3,
  minRows = 3,
  maxRows = 10,
  hasError,
  hasBorder,
  onChange,
  ...rest
}: TextAreaProps) => {
  const [textareaRows, setTextareaRows] = useState(Math.min(rows, minRows));

  console.assert(!(rows < minRows), "TextArea: rows should be greater than minRows.");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textareaLineHeight = 24;
    const previousRows = e.target.rows;

    e.target.rows = minRows; // 一旦リセット

    const currentRows = Math.floor(e.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      e.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      e.target.rows = maxRows;
      e.target.scrollTop = e.target.scrollHeight;
    }

    setTextareaRows(currentRows < maxRows ? currentRows : maxRows);

    onChange?.(e);
  };

  return (
    <textarea
      onChange={handleChange}
      aria-label={rest.placeholder}
      rows={textareaRows}
      className={[
        "w-full box-border resize-none overflow-auto outline-none px-3 py-2.5",
        "leading-[24px]",
        "bg-[rgba(244,240,240,0.65)] placeholder-[rgba(225,136,131,1)]",
        hasBorder
          ? `border-[3px] border-dashed rounded-[20px] px-4 py-2.5 ${
              hasError ? "border-(--danger)" : "border-(--borderDash)"
            }`
          : "border-none rounded-[5px] px-3 py-2.5",
      ].join(" ")}
      style={{ color: "var(--inputText)", fontSize: "var(--smallMedium)", padding: "9px 16px 10px 16px",}}
      {...rest}
    />
  );
};

export default TextArea;