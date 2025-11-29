import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SignupForm from "./index";

/**
 * NewSigninForm コンポーネントの動作テスト
 */
describe("NewSignupForm", () => {
  it("ユーザー名とパスワードが未入力のとき、サインインボタンはdisabledになっている", () => {
    render(<SignupForm />);

    // サインインボタンを取得
    const button = screen.getByRole("button", { name: "サインイン" });

    // disabled属性を確認
    expect(button).toBeDisabled();
  });

  it("フォーム送信時に onSign が正しく呼ばれる", async () => {
    const mockOnSign = vi.fn();
    render(<SignupForm onSign={mockOnSign} />);

    // 入力フィールドを取得
    const nameInput = screen.getByPlaceholderText("ユーザー名") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("パスワード") as HTMLInputElement;
    const button = screen.getByRole("button", { name: "サインイン" });

    // 入力値を設定
    fireEvent.change(nameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });

    // 状態反映を待つ
    await waitFor(() => expect(button).not.toBeDisabled());
    fireEvent.click(button);

    // onSign が呼ばれたか確認
    await waitFor(() => { // handleSubmit の完了を待つ
      expect(mockOnSign).toHaveBeenCalledTimes(1);
      expect(mockOnSign).toHaveBeenCalledWith("testuser", "secret123");
    });
  });

  it("ユーザー名入力だけでは、サインインボタンはdisabledになっている", async () => {
    const mockOnSign = vi.fn();
    render(<SignupForm onSign={mockOnSign} />);
  
    // 入力フィールドを取得
    const nameInput = screen.getByPlaceholderText("ユーザー名") as HTMLInputElement;
  
    // 入力値を設定
    fireEvent.change(nameInput, { target: { value: "testuser" } });

    // サインインボタンを取得
    const button = screen.getByRole("button", { name: "サインイン" });
  
    // disabled属性を確認
    expect(button).toBeDisabled();
  });

  it("エラーメッセージが表示されない場合は、クラス名が hasError=false 相当である", () => {
    render(<SignupForm />);

    const nameInput = screen.getByPlaceholderText("ユーザー名");
    expect(nameInput.className).not.toContain("border-(--danger)");
  });

  it("ユーザー名とパスワードを入力するとボタンが有効になる", async () => {
    render(<SignupForm />);
  
    const nameInput = screen.getByPlaceholderText("ユーザー名");
    const passwordInput = screen.getByPlaceholderText("パスワード");
    const button = screen.getByRole("button", { name: "サインイン" });
  
    // 入力
    fireEvent.change(nameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "secret123" } });
  
    // バリデーションの反映を待つ
    await screen.findByDisplayValue("testuser");
  
    // ボタンが有効化されていることを確認
    expect(button).toBeEnabled();
  });
});