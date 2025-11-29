import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import NewDreamForm from "src/components/organisms/NewDreamForm";

describe("NewDreamForm", () => {
  it("入力後にonSaveが呼ばれる", async () => {
    const onSave = vi.fn();
    render(<NewDreamForm onSave={onSave} />);

    await userEvent.type(screen.getByPlaceholderText(/夢を記入/), "世界一周旅行に行く");
    await userEvent.type(screen.getByPlaceholderText(/期限を記入/), "2026年夏まで");

    await userEvent.click(screen.getByRole("button", { name: "登録する" }));

    expect(onSave).toHaveBeenCalledWith({
      dream: "世界一周旅行に行く",
      limit: "2026年夏まで"
    });
  });
});