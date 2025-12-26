import type { Meta, StoryObj } from "@storybook/react";
import ShapeImage from "./index";

const meta: Meta<typeof ShapeImage> = {
  title: "Atoms/ShapeImage",
  component: ShapeImage,
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: "radio",
      options: ["circle", "square"],
      description: "画像の形状を指定します",
    },
    width: {
      control: "text",
      description: "画像の幅(pxまたは%)",
    },
    height: {
      control: "text",
      description: "画像の高さ(pxまたは%)",
    },
    src: {
      control: "text",
      description: "画像のURL",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------------------------------
// デフォルト（四角形）
export const Default: Story = {
  args: {
    src: "/sample.png",
    shape: "square",
    width: 100,
    height: 100,
  },
  render: (args) => (
    <div style={{ display: "grid", placeItems: "center", width: "400px", height: "400px", margin: "0 auto" }}>
      <ShapeImage {...args} />
    </div>
  ),
};

// --------------------------------------------------
// 円形
export const Circle: Story = {
  args: {
    src: "/sample.png",
    shape: "circle",
    width: 100,
    height: 100,
  },
  render: (args) => (
    <div style={{ display: "grid", placeItems: "center", width: "400px", height: "400px", margin: "0 auto" }}>
      <ShapeImage {...args} />
    </div>
  ),
};