import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "./index";

/**
 * LoginForm コンポーネントの動作テスト
 */
describe("LoginForm", () => {
  it("初期状態ではログインボタンがdisabledになっている", () => {
    render(<LoginForm />);
    const button = screen.getByRole("button", { name: "ログイン" });
    expect(button).toBeDisabled();
  });

  it("ユーザー名だけ入力してもログインボタンはdisabledのまま", async () => {
    render(<LoginForm />);
    const nameInput = screen.getByPlaceholderText("ユーザー名");
    fireEvent.change(nameInput, { target: { value: "testuser" } });
    const button = screen.getByRole("button", { name: "ログイン" });
    expect(button).toBeDisabled();
  });

  it("ユーザー名とパスワードを入力するとログインボタンが有効化される", async () => {
    render(<LoginForm />);
    const nameInput = screen.getByPlaceholderText("ユーザー名");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const button = screen.getByRole("button", { name: "ログイン" });

    fireEvent.change(nameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });

    // フォーム状態が反映されるのを待つ
    await waitFor(() => expect(button).toBeEnabled());
  });

  it("フォーム送信時に onSign が正しく呼ばれる", async () => {
    const mockOnSign = vi.fn();
    render(<LoginForm onLogin={mockOnSign} />);

    const nameInput = screen.getByPlaceholderText("ユーザー名");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const button = screen.getByRole("button", { name: "ログイン" });

    fireEvent.change(nameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });

    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSign).toHaveBeenCalledTimes(1);
      expect(mockOnSign).toHaveBeenCalledWith("testuser", "secret123");
    });
  });

  it("テストユーザーでログインボタンを押すと onTestSign が呼ばれる", async () => {
    const mockOnTestSign = vi.fn();
    render(<LoginForm onGuestLogin={mockOnTestSign} />);

    const testButton = screen.getByRole("button", { name: "テストユーザーでログイン" });
    fireEvent.click(testButton);

    await waitFor(() => {
      expect(mockOnTestSign).toHaveBeenCalledTimes(1);
      expect(mockOnTestSign).toHaveBeenCalledWith("test", "111");
    });
  });

  it("isLoading=true のときボタンがdisabledになっている", () => {
    render(<LoginForm isLoading />);
    const button = screen.getByRole("button", { name: "送信中..." });
    expect(button).toBeDisabled();
  });

  it("submitError があるときにエラーメッセージが表示される", () => {
    render(<LoginForm submitError="ユーザー名またはパスワードが正しくありません" />);
    expect(screen.getByText("ユーザー名またはパスワードが正しくありません")).toBeInTheDocument();
  });

  it("エラーメッセージがない場合は、危険系クラスが付与されていない", () => {
    render(<LoginForm />);
    const nameInput = screen.getByPlaceholderText("ユーザー名");
    expect(nameInput.className).not.toContain("border-(--danger)");
  });
});