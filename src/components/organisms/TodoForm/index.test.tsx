import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoForm from "./index";
//import type { TodoInput } from "src/libs/validations/todo";

// --- モック化 ---
vi.mock("src/components/atoms/ButtonGrad", () => ({
  default: ({
    children,
    onClick,
    disabled,
    loading,
    loadingMessage,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label="追加する"
    >
      {loading ? loadingMessage : children}
    </button>
  ),
}));

vi.mock("src/components/atoms/Input", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ value, onChange, placeholder, ...rest }: any) => (
    <input
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
      {...rest}
    />
  ),
}));

vi.mock("src/components/atoms/TextArea", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ value, onChange, placeholder }: any) => (
    <textarea
      placeholder={placeholder}
      value={value ?? ""}
      onChange={onChange}
    />
  ),
}));

vi.mock("src/components/molecules/InputImages", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ onChange }: any) => (
    <div>
      <button aria-label="add-image" onClick={() => onChange([{ src: "mock-image" }])}>
        画像追加
      </button>
    </div>
  ),
}));

vi.mock("src/components/molecules/StarRating", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  StarRating1: ({ value, setValue }: any) => (
    <div>
      <button aria-label="increase-star" onClick={() => setValue(value + 1)}>
        ★{value}
      </button>
    </div>
  ),
}));

// --- テスト開始 ---
describe("TodoForm", () => {
  //let mockOnTodoSave: ReturnType<typeof vi.fn>;
  let setValue: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    //mockOnTodoSave = vi.fn();
    setValue = vi.fn();
  });
/*
  it("todoを入力して送信すると onTodoSave が呼ばれる", async () => {
    render(
      <TodoForm
        title="年"
        value={2}
        setValue={setValue}
        onTodoSave={mockOnTodoSave}
      />
    );

    // todo入力
    fireEvent.change(screen.getByPlaceholderText("todo"), {
      target: { value: "新しいTodo" },
    });

    // 期限入力
    fireEvent.change(screen.getByPlaceholderText("1"), {
      target: { value: "3" },
    });

    // 詳細入力
    fireEvent.change(screen.getByPlaceholderText("例）20XX年までに"), {
      target: { value: "2026年までに達成" },
    });

    // 送信
    fireEvent.click(screen.getByRole("button", { name: "追加する" }));

    await waitFor(() => {
      expect(mockOnTodoSave).toHaveBeenCalledTimes(1);
      const arg = mockOnTodoSave.mock.calls[0][0] as TodoInput;
      expect(arg.todo).toBe("新しいTodo");
      expect(arg.limit1).toEqual([3]);
    });
  });

  it("todo未入力でバリデーションエラーが表示される", async () => {
    render(
      <TodoForm title="年" value={0} setValue={setValue} onTodoSave={mockOnTodoSave} />
    );

    fireEvent.click(screen.getByRole("button", { name: "追加する" }));

    await screen.findByText("todoを入力してください");
    expect(mockOnTodoSave).not.toHaveBeenCalled();
  });

  it("isLoading=trueのとき、作成中...が表示される", () => {
    render(
      <TodoForm
        title="年"
        value={1}
        setValue={setValue}
        isLoading={true}
        onTodoSave={mockOnTodoSave}
      />
    );

    expect(screen.getByRole("button", { name: "submit-button" })).toHaveTextContent(
      "作成中..."
    );
  });
*/
  it("submitErrorがあるとエラーメッセージが表示される", () => {
    render(
      <TodoForm
        title="月"
        value={1}
        setValue={setValue}
        submitError="サーバーエラー"
      />
    );

    expect(screen.getByText("サーバーエラー")).toBeInTheDocument();
  });

  it("星ボタンをクリックすると setValue が呼ばれる", async () => {
    render(<TodoForm title="年" value={2} setValue={setValue} />);

    const starButton = screen.getByRole("button", { name: "increase-star" });
    expect(starButton).toHaveTextContent("★2");

    // 星をクリック
    fireEvent.click(starButton);

    await waitFor(() => {
      expect(setValue).toHaveBeenCalledTimes(1);
      expect(setValue).toHaveBeenCalledWith(3);
    });
  });
});