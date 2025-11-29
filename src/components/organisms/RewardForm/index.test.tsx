import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RewardForm from "./index";
import userEvent from "@testing-library/user-event";

describe("RewardForm", () => {
  it("未入力では、追加するボタンはdisabledになっている", async () => {
    render(<RewardForm />);

    const submitButton = screen.getByRole("button", { name: "追加する" });
    expect(submitButton).toBeDisabled();

    // reward と starNum のエラーメッセージを確認
   // expect(await screen.findByText("ごほうび名を入力してください")).toBeInTheDocument();
   // expect(await screen.findByText("星の数を入力してください")).toBeInTheDocument();
  });

  it("reward と starNum が入力されると onRewardSave が呼ばれる", async () => {
    const mockSave = vi.fn();
    render(<RewardForm onRewardSave={mockSave} />);

    const rewardInput = screen.getByPlaceholderText("テディベア");
    const starNumInput = screen.getByPlaceholderText("100");
    const submitButton = screen.getByRole("button", { name: "追加する" });

    await userEvent.type(rewardInput, "ぬいぐるみ");
    await userEvent.clear(starNumInput);
    await userEvent.type(starNumInput, "10");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(mockSave).toHaveBeenCalledWith(
        expect.objectContaining({
          reward: "ぬいぐるみ",
          starNum: 10,
          image: [],
        })
      );
    });
  });

  it("starNum が未入力の場合は、追加するボタンはdisabledになっている", async () => {
    const mockSave = vi.fn();
    render(<RewardForm onRewardSave={mockSave} />);

    const rewardInput = screen.getByPlaceholderText("テディベア");
    const submitButton = screen.getByRole("button", { name: "追加する" });

    await userEvent.type(rewardInput, "クマのぬいぐるみ");
    // disabled属性を確認
    expect(submitButton).toBeDisabled();
  });

  it("送信成功時には『追加しました！』メッセージが表示される", async () => {
    const mockSave = vi.fn();
    render(<RewardForm onRewardSave={mockSave} />);

    const rewardInput = screen.getByPlaceholderText("テディベア");
    const starNumInput = screen.getByPlaceholderText("100");
    const submitButton = screen.getByRole("button", { name: "追加する" });

    await userEvent.type(rewardInput, "お菓子");
    await userEvent.clear(starNumInput);
    await userEvent.type(starNumInput, "5");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("追加しました！")).toBeInTheDocument();
    });
  });

  it("isLoading=true の場合はスピナーと『作成中...』が表示される", () => {
    render(<RewardForm isLoading={true} />);
    expect(screen.getByText("作成中...")).toBeInTheDocument();
    // "作成中..." ボタンが無効化されていることを確認
    expect(screen.getByRole("button", { name: "作成中..." })).toBeDisabled();
  });

  it("submitError がある場合は赤文字のエラーメッセージが表示される", () => {
    render(<RewardForm submitError="エラーが発生しました" />);
    expect(screen.getByText("エラーが発生しました")).toBeInTheDocument();
  });
});