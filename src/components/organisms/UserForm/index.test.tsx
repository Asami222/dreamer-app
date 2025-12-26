import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import UserForm from "./index";

describe("UserForm", () => {
  it("全て未入力のときは『変更する』ボタンがdisabledになっている", () => {
    render(<UserForm />);
    const submitButton = screen.getByRole("button", { name: "変更する" });
    expect(submitButton).toBeDisabled();
  });

  it("name と dream, limit を入力すると onSave が呼ばれる", async () => {
    const mockSave = vi.fn();
    render(<UserForm />);

    const nameInput = screen.getByPlaceholderText("表示名");
    const dreamInput = screen.getByPlaceholderText("夢や目標を記入してください");
    const limitInput = screen.getByPlaceholderText("いつまでに叶えたいですか");
    const submitButton = screen.getByRole("button", { name: "変更する" });

    await userEvent.type(nameInput, "あさみ");
    await userEvent.type(dreamInput, "素敵なアプリを作る");
    await userEvent.type(limitInput, "2025年中");

    // ボタンが有効化されている
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(mockSave).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "あさみ",
          dream: "素敵なアプリを作る",
          limit: "2025年中",
          image: undefined,
        })
      );
    });
  });

  it("isLoading=true の場合はスピナーと『作成中...』が表示される", () => {
    render(<UserForm />);
    expect(screen.getByText("作成中...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "作成中..." })).toBeDisabled();
  });

  it("submitError がある場合は赤文字のエラーメッセージが表示される", () => {
    render(<UserForm />);
    expect(screen.getByText("送信エラーが発生しました")).toBeInTheDocument();
  });

  it("フォーム全体のエラー（_form）がある場合、エラーメッセージが表示される", async () => {
    // react-hook-formのバリデーションを通さず強制的に_errorを与えるケースの代替
    render(
      <UserForm />
    );
    expect(screen.getByText("フォーム全体に問題があります")).toBeInTheDocument();
  });
});