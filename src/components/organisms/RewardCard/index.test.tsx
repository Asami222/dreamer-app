import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RewardCard from "./RewardCardUI";

// Next.js の <Image> は JSDOM 環境で動かないためモック
vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt || "mocked image"} />
  ),
}));

describe("RewardCard", () => {
  const defaultProps = {
    rewardId: "1",
    rewardImageUrl: "/test.png",
    reward: "ぬいぐるみ",
    starNum: 10,
    userHasStar: 30,
    isPossible: true,
  };

  it("reward名・starNum・個のテキストが表示される", () => {
    render(<RewardCard {...defaultProps} />);

    expect(screen.getByText("ぬいぐるみ")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("個")).toBeInTheDocument();
  });

  it("画像が正しく表示される", () => {
    render(<RewardCard {...defaultProps} />);
    const image = screen.getByAltText("ご褒美イメージ") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/test.png");
  });

  it("isPossible=false のとき交換ボタンが無効になる", () => {
    render(<RewardCard {...defaultProps}/>);
    const button = screen.getByRole("button", { name: "交換する" });
    expect(button).toBeDisabled();
  });

  it("isLoading=true のとき交換ボタンがローディング状態になる", () => {
    render(<RewardCard {...defaultProps} isLoading={true} />);
    
    // "交換中..." ボタンが無効化されていることを確認
    expect(screen.getByRole("button", { name: "交換中..." })).toBeDisabled();
    expect(screen.getByText("交換中...")).toBeInTheDocument();
  });

  it("交換ボタンをクリックすると onChangeButtonClick が呼ばれる", () => {
    const handleChange = vi.fn();
    render(
      <RewardCard {...defaultProps} onChangeButtonClick={handleChange} />
    );

    const button = screen.getByRole("button", { name: "交換する" });
    fireEvent.click(button);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(1, 10); // rewardId, starNum
  });

  it("削除アイコンをクリックすると onRemoveButtonClick が呼ばれる", () => {
    const handleRemove = vi.fn();
    render(
      <RewardCard {...defaultProps} onRemoveButtonClick={handleRemove} />
    );

    const deleteButton = screen.getByLabelText("ご褒美削除ボタン");
    fireEvent.click(deleteButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith(1);
  });

  it("画像URLがない場合、Imageタグが表示されない", () => {
    render(<RewardCard {...defaultProps} rewardImageUrl={undefined} />);
    expect(screen.queryByAltText("ご褒美イメージ")).not.toBeInTheDocument();
  });
});