/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from 'vitest'
import InputImages, { FileData } from "./index";

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
  global.URL.revokeObjectURL = vi.fn();
});


//next/imageをモック化
vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line jsx-a11y/alt-text, @typescript-eslint/no-explicit-any
  default: (props: any) => <img {...props} />,
}));

// Dropzone と ImagePreview をモック化
vi.mock("src/components/molecules/Dropzone", () => ({
  __esModule: true,
  default: ({
    onDrop,
  }: {
    onDrop: (files: File[]) => void;
  }) => (
    <div
      data-testid="mock-dropzone"
      onClick={() => {
        const mockFile = new File(["sample"], "test.png", { type: "image/png" });
        onDrop([mockFile]);
      }}
    >
      Mock Dropzone
    </div>
  ),
}));

vi.mock("src/components/molecules/ImagePreview", () => ({
  __esModule: true,
  default: ({
    src,
    onRemove,
  }: {
    src: string;
    onRemove: (src: string) => void;
  }) => (
    <div data-testid="mock-image">
      <img src={src} alt="イメージ"/>
      <button onClick={() => onRemove(src)}>remove</button>
    </div>
  ),
}));

describe("InputImages Component", () => {
  it("初期状態で Dropzone が表示される", () => {
    const mockOnChange = vi.fn();
    render(<InputImages images={[]} onChange={mockOnChange} />);

    expect(screen.getByTestId("mock-dropzone")).toBeInTheDocument();
  });

  it("Dropzone クリックで onChange が呼ばれる", () => {
    const mockOnChange = vi.fn();
    render(<InputImages images={[]} onChange={mockOnChange} />);

    fireEvent.click(screen.getByTestId("mock-dropzone"));
    expect(mockOnChange).toHaveBeenCalledTimes(1);

    const files = mockOnChange.mock.calls[0][0];
    expect(files[0].file).toBeInstanceOf(File);
    expect(files[0].file.name).toBe("test.png");
    expect(typeof files[0].src).toBe("string");
  });

  it("images があると ImagePreview が表示される", () => {
    const mockOnChange = vi.fn();
    const mockImages: FileData[] = [{ src: "/sample.png" }];

    render(<InputImages images={mockImages} onChange={mockOnChange} />);

    expect(screen.getByTestId("mock-image")).toBeInTheDocument();
    expect(screen.getByAltText("イメージ")).toHaveAttribute("src", "/sample.png");
  });

  it("ImagePreview の remove ボタン押下で onChange が呼ばれる", () => {
    const mockOnChange = vi.fn();
    const mockImages: FileData[] = [{ src: "/sample.png" }];

    render(<InputImages images={mockImages} onChange={mockOnChange} />);

    fireEvent.click(screen.getByText("remove"));
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    const newImages = mockOnChange.mock.calls[0][0];
    expect(newImages).toEqual([]); // 削除後、空配列になる想定
  });

  it("maximumNumber に到達したら Dropzone が非表示になる", () => {
    const mockOnChange = vi.fn();
    const mockImages: FileData[] = [
      { src: "/sample.png" },
      { src: "/sample2.png" },
    ];

    render(
      <InputImages
        images={mockImages}
        onChange={mockOnChange}
        maximumNumber={2}
      />
    );

    // Dropzone コンテナの display: none を確認
    const dropzoneContainer = screen
      .getByTestId("mock-dropzone")
      .parentElement as HTMLElement;

    expect(dropzoneContainer).toHaveStyle("display: none");
  });
});