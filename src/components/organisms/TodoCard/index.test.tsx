import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Todo from "./index";

// Next.js の <Image> は JSDOM 環境で動かないためモック
vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt || "mocked image"} />
  ),
}));

describe("Todo", () => {
  const defaultProps = {
    id: 1,
    imageUrl: "/todo.png",
    todo: "日記を書く",
    limit: [9, 18],
    limitDetail: "自宅で",
    rate: 4,
    description: "毎日少しずつでも構わないので続けよう。",
  };

  it("todo名と期限情報が表示される", () => {
    render(<Todo {...defaultProps} />);

    expect(screen.getByText("日記を書く")).toBeInTheDocument();
    expect(
      screen.getByText(/期限.*9時から.*18時まで.*自宅で/)
    ).toBeInTheDocument();
  });

  it("画像が正しく表示される", () => {
    render(<Todo {...defaultProps} />);
    const image = screen.getByAltText("Todoイメージ") as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain("/todo.png");
  });

  it("画像URLがない場合、Imageタグが表示されない", () => {
    render(<Todo {...defaultProps} imageUrl={undefined} />);
    expect(screen.queryByAltText("Todoイメージ")).not.toBeInTheDocument();
  });

  it("onCopyTextClick がクリックで呼ばれる", () => {
    const handleCopy = vi.fn();
    render(<Todo {...defaultProps} onCopyTextClick={handleCopy} />);

    const copyButton = screen.getByText("コピー");
    fireEvent.click(copyButton);

    expect(handleCopy).toHaveBeenCalledTimes(1);
    expect(handleCopy).toHaveBeenCalledWith(1);
  });

  it("onRemoveTextClick がクリックで呼ばれる（未チェック時）", () => {
    const handleRemove = vi.fn();
    render(<Todo {...defaultProps} onRemoveTextClick={handleRemove} />);

    const removeButton = screen.getByText("完了");
    fireEvent.click(removeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith(1, 4, false);
  });

  it("詳細ボタンをクリックすると説明文が表示される", async () => {
    render(<Todo {...defaultProps} />);

    const detailButton = screen.getByRole("button", { name: "詳細" });

    // 初期状態では詳細文は高さ0
    const detailText = screen.getByText(
      "毎日少しずつでも構わないので続けよう。"
    );
    expect(detailText).toHaveClass("h-0");

    // 詳細ボタンをクリック → 展開
    fireEvent.click(detailButton);

    // 展開後にh-0クラスが外れていることを確認
    await waitFor(() => {
      expect(detailText).not.toHaveStyle("height: 0px");
    });
  });

  it("descriptionがない場合、詳細ボタンが無効になる", () => {
    render(<Todo {...defaultProps} description={undefined} />);
    const detailButton = screen.getByRole("button", { name: "詳細" });
    expect(detailButton).toBeDisabled();
  });
});