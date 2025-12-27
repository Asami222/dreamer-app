// src/libs/image/resizeImage.ts
export const resizeImage = async (file: File): Promise<File> => {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const max = 600;

  const scale = Math.min(max / bitmap.width, max / bitmap.height, 1);
  canvas.width = bitmap.width * scale;
  canvas.height = bitmap.height * scale;

  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise<Blob>((resolve) =>
    canvas.toBlob((b) => resolve(b!), "image/webp", 0.8)
  );

  return new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
    type: "image/webp",
  });
};