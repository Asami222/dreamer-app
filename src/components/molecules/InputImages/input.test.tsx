/* eslint-disable @next/next/no-img-element */
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeAll } from "vitest";
import InputImage, { FileData } from "./index";
import { useForm } from "react-hook-form";

beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => "blob:mock-url");
  global.URL.revokeObjectURL = vi.fn();
});

// next/image をモック
vi.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, jsx-a11y/alt-text
  default: (props: any) => <img {...props} />,
}));

// Dropzone モック
vi.mock("src/components/molecules/Dropzone", () => ({
  __esModule: true,
  default: ({ onDrop }: { onDrop: (files: File[]) => void }) => (
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

// ImagePreview モック
vi.mock("src/components/molecules/ImagePreview", () => ({
  __esModule: true,
  default: ({
    src,
    onRemove,
  }: {
    src: string;
    onRemove: () => void;
  }) => (
    <div data-testid="mock-image">
      <img src={src} alt="イメージ" />
      <button onClick={onRemove}>remove</button>
    </div>
  ),
}));

// RHF wrapper
const Wrapper = ({
  image,
  onChange,
}: {
  image?: FileData;
  onChange?: (img?: FileData) => void;
}) => {
  const { register } = useForm<{ image: File }>();
  return (
    <InputImage
      name="image"
      image={image}
      register={register}
      onChange={onChange}
    />
  );
};

describe("InputImage Component", () => {
  it("初期状態で Dropzone が表示される", () => {
    render(<Wrapper />);
    expect(screen.getByTestId("mock-dropzone")).toBeInTheDocument();
  });

  it("Dropzone クリックで onChange が呼ばれる", () => {
    const mockOnChange = vi.fn();
    render(<Wrapper onChange={mockOnChange} />);

    fireEvent.click(screen.getByTestId("mock-dropzone"));

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    const fileData = mockOnChange.mock.calls[0][0] as FileData;

    expect(fileData.file).toBeInstanceOf(File);
    expect(fileData.file?.name).toBe("test.png");
    expect(typeof fileData.src).toBe("string");
  });

  it("image があると ImagePreview が表示される", () => {
    const mockImage: FileData = { src: "/sample.png" };
    render(<Wrapper image={mockImage} />);

    expect(screen.getByTestId("mock-image")).toBeInTheDocument();
    expect(screen.getByAltText("イメージ")).toHaveAttribute("src", "/sample.png");
  });

  it("remove ボタン押下で onChange(undefined) が呼ばれる", () => {
    const mockOnChange = vi.fn();
    const mockImage: FileData = { src: "/sample.png" };

    render(<Wrapper image={mockImage} onChange={mockOnChange} />);

    fireEvent.click(screen.getByText("remove"));
    expect(mockOnChange).toHaveBeenCalledWith(undefined);
  });
});