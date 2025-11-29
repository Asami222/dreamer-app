import type { Meta, StoryObj } from "@storybook/react";
import {
  CloseIcon,
  CloudUploadIcon,
  CancelIcon,
  CheckBoxOutlineBlankIcon,
  CheckBoxIcon,
  PersonIcon,
  PersonOutlineIcon,
  FileUploadIcon,
  AccountCircleIcon,
  DoneOutlineIcon,
  DoneIcon,
  ChecklistIcon,
  TaskAltIcon,
  KeyboardDoubleArrowRightIcon,
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  StarIcon,
  DeleteForeverIcon,
  CancelPresentationIcon,
  CreateIcon,
  NoAccountsIcon,
  LogoutIcon,
  EmojiEventsIcon,
  SettingsIcon,
} from "./index";

// --------------------------------------------------
// Storybook Metadata
// --------------------------------------------------

const meta: Meta = {
  title: "Atoms/Icons",
  component: CloseIcon,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number" },
      description: "アイコンのサイズ(px)",
      defaultValue: 24,
    },
    color: {
      control: "color",
      description: "アイコンの色",
      defaultValue: "#444",
    },
    backgroundColor: {
      control: "color",
      description: "背景色",
    },
    onClick: {
      action: "clicked",
      description: "クリック時のハンドラ",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --------------------------------------------------
// 個別アイコン
// --------------------------------------------------

export const Close: Story = {
  args: { size: 32, color: "#b15555" },
  render: (args) => <CloseIcon {...args} ariaLabel="閉じる"/>,
};

export const CloudUpload: Story = {
  args: { size: 32, color: "#4a90e2" },
  render: (args) => <CloudUploadIcon {...args} ariaLabel="アップロード"/>,
};

export const CheckBox: Story = {
  args: { size: 28, color: "#1e8b00" },
  render: (args) => <CheckBoxIcon {...args} ariaLabel="完了"/>,
};

export const Star: Story = {
  args: { size: 30, color: "#f0b400" },
  render: (args) => <StarIcon {...args} ariaLabel="星マーク"/>,
};

// --------------------------------------------------
// 一覧で表示（全アイコンを比較する用）
// --------------------------------------------------

export const AllIcons: Story = {
  args: { size: 32, color: "#444", "aria-label":"IconName" },
  render: (args) => (
    <div className="flex flex-wrap gap-4 items-center text-[gray]">
      <CloseIcon {...args} />
      <CloudUploadIcon {...args} />
      <CancelIcon {...args} />
      <CheckBoxOutlineBlankIcon {...args} />
      <CheckBoxIcon {...args} />
      <PersonIcon {...args} />
      <PersonOutlineIcon {...args} />
      <FileUploadIcon {...args} />
      <AccountCircleIcon {...args} />
      <DoneOutlineIcon {...args} />
      <DoneIcon {...args} />
      <ChecklistIcon {...args} />
      <TaskAltIcon {...args} />
      <KeyboardDoubleArrowRightIcon {...args} />
      <KeyboardArrowDownIcon {...args} />
      <KeyboardArrowUpIcon {...args} />
      <StarIcon {...args} />
      <DeleteForeverIcon {...args} />
      <CancelPresentationIcon {...args} />
      <CreateIcon {...args} />
      <NoAccountsIcon {...args} />
      <LogoutIcon {...args} />
      <EmojiEventsIcon {...args} />
      <SettingsIcon {...args} />
    </div>
  ),
};