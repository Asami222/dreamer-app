import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { StarRating1, StarRating2 } from "./index";

vi.mock("./Star2", () => ({
  __esModule: true,
  Star2: ({ selected }: { selected: boolean }) => (
    <button aria-label="星をつける" data-selected={selected}></button>
  ),
}));

describe("StarRatingコンポーネント", () => {

  it("StarRating1: クリックで値が変更される", () => {
    let value = 2;
    const setValue: React.Dispatch<React.SetStateAction<number>> = (v) => {
      // v が関数か数値かを両対応
      value = typeof v === "function" ? v(value) : v;
    };

    render(<StarRating1 value={value} setValue={setValue} />);
    const stars = screen.getAllByRole("button", { name: "星をつける" });

    expect(stars.length).toBe(7);
    fireEvent.click(stars[4]); // 5番目をクリック
    expect(value).toBe(5);
  });

  it("StarRating2: 選択された星と未選択星が正しい数で表示される", () => {
    render(<StarRating2 num={3} />);
    const stars = screen.getAllByRole("button", { name: "星をつける" });
    expect(stars.length).toBe(7);

    const selectedStars = stars.filter((s) => s.dataset.selected === "true");
    const unselectedStars = stars.filter((s) => s.dataset.selected === "false");

    expect(selectedStars.length).toBe(3);
    expect(unselectedStars.length).toBe(4);
  });
});