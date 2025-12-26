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

  it("メールアドレスだけ入力してもログインボタンはdisabledのまま", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    fireEvent.change(emailInput, { target: { value: "testuser@gmail.com" } });
    const button = screen.getByRole("button", { name: "ログイン" });
    expect(button).toBeDisabled();
  });

  it("メールアドレスとパスワードを入力するとログインボタンが有効化される", async () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const button = screen.getByRole("button", { name: "ログイン" });

    fireEvent.change(emailInput, { target: { value: "testuser@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });

    // フォーム状態が反映されるのを待つ
    await waitFor(() => expect(button).toBeEnabled());
  });

  it("フォーム送信時に onSign が正しく呼ばれる", async () => {
    const mockOnSign = vi.fn();
    render(<LoginForm onLogin={mockOnSign} />);

    const emailInput = screen.getByPlaceholderText("メールアドレス");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const button = screen.getByRole("button", { name: "ログイン" });

    fireEvent.change(emailInput, { target: { value: "testuser@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });

    await waitFor(() => expect(button).toBeEnabled());
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnSign).toHaveBeenCalledTimes(1);
      expect(mockOnSign).toHaveBeenCalledWith("testuser@gmail.com", "secret123");
    });
  });

  it("ゲストユーザーでログインボタンを押すと onTestSign が呼ばれる", async () => {
    const mockOnGuestSign = vi.fn();
    render(<LoginForm onGuestLogin={mockOnGuestSign} />);

    const GuestButton = screen.getByRole("button", { name: "ゲストユーザーでログイン" });
    fireEvent.click(GuestButton);

    await waitFor(() => {
      expect(mockOnGuestSign).toHaveBeenCalledTimes(1);
    });
  });

  it("isLoading=true のときボタンがdisabledになっている", () => {
    render(<LoginForm isLoading />);
    const button = screen.getByRole("button", { name: "送信中..." });
    expect(button).toBeDisabled();
  });

  it("submitError があるときに alert とメッセージ内容が表示される", () => {
    const message = "メールアドレスまたはパスワードが正しくありません";
  
    render(<LoginForm submitError={message} />);
  
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(message);
  });

  it("エラーメッセージがない場合は、危険系クラスが付与されていない", () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText("メールアドレス");
    expect(emailInput.className).not.toContain("border-(--danger)");
  });
});