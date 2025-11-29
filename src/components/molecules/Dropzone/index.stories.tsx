import type { Meta, StoryObj } from "@storybook/react";
import Dropzone from "./index"; // コンポーネントの相対パスに合わせて変更
import React, { useState } from "react";

const meta: Meta<typeof Dropzone> = {
  title: "Molecules/Dropzone",
  component: Dropzone,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    radius: { control: "boolean" },
    hasError: { control: "boolean" },
    onDrop: { action: "dropped" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropzone>;

/**
 * ✅ 基本のDropzone（ファイル未選択状態）
 */
export const Default: Story = {
  args: {
    width: "120px",
    height: "120px",
    radius: false,
    hasError: false,
  },
};

/**
 * ✅ 丸型Dropzone
 */
export const WithRadius: Story = {
  args: {
    width: "120px",
    height: "120px",
    radius: true,
  },
};

/**
 * ✅ エラー時のDropzone
 */
export const ErrorState: Story = {
  args: {
    width: "120px",
    height: "120px",
    radius: false,
    hasError: true,
  },
};

/**
 * ✅ ファイル追加時の動作テスト
 * （Storybook内で簡易的に useState を使ってファイル名を表示）
 */
export const WithFileUploadPreview: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [files, setFiles] = useState<File[]>([]);

      return (
        <div className="flex flex-col items-center gap-4">
          <Dropzone
            {...args}
            value={files}
            onChange={(newFiles) => {
              setFiles(newFiles);
              args.onChange?.(newFiles);
            }}
          />
          {files.length > 0 && (
            <ul className="text-sm text-gray-700">
              {files.map((file, i) => (
                <li key={i}>{file.name}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }
    return <Wrapper />
  },
  args: {
    width: "150px",
    height: "150px",
    radius: true,
  },
};