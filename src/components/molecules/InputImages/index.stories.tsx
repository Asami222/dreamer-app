import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import InputImages, { FileData } from "./index";

const meta: Meta<typeof InputImages> = {
  title: "Molecules/InputImages",
  component: InputImages,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    radius: { control: "boolean" },
    hasError: { control: "boolean" },
    maximumNumber: { control: "number" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof InputImages>;

/**
 * ✅ 基本のInputImages
 */
export const Default: Story = {

  render: (args) => {
    const Wrapper = () => {
    const [images, setImages] = useState<FileData[]>([]);

    return (
      <InputImages
        {...args}
        images={images}
        onChange={(newImages) => {
          // `InputImages` の仕様上、新規画像のみが渡ってくるため merge が必要
          setImages((prev) => [...prev, ...newImages]);
          args.onChange?.(newImages);
        }}
      />
    );
  }
  return <Wrapper />
},
  args: {
    width: "120px",
    height: "120px",
    maximumNumber: 3,
    radius: false,
    hasError: false,
  },
};

/**
 * ✅ 丸型バージョン
 */
export const Radius: Story = {
  render: Default.render,
  args: {
    width: "120px",
    height: "120px",
    radius: true,
    maximumNumber: 3,
  },
};

/**
 * ✅ エラーステート
 */
export const ErrorState: Story = {
  render: Default.render,
  args: {
    width: "120px",
    height: "120px",
    hasError: true,
  },
};

/**
 * ✅ 既存の画像がある状態
 */
export const WithInitialImages: Story = {
  render: (args) => {
    const Wrapper = () => {
      const [images, setImages] = useState<FileData[]>([
        { src: "/sample.png", selected: false },
        { src: "/sample2.png", selected: false },
      ]);

      return (
        <InputImages
          {...args}
          images={images}
          onChange={(newImages) => {
            setImages((prev) => [...prev, ...newImages]);
            args.onChange?.(newImages);
          }}
        />
      );
    }
    return <Wrapper />
  },
  args: {
    width: "100px",
    height: "100px",
    radius: false,
  },
};