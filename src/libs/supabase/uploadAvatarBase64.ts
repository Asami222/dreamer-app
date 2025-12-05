import { client } from "./client";

export async function uploadAvatarBase64(base64: string, userId: string) {
  const supabase = client;
  const fileName = `avatars/${userId}.webp`;

  const { data, error } = await supabase.storage
    .from("profile")
    .upload(fileName, Buffer.from(base64.split(",")[1], "base64"), {
      contentType: "image/webp",
      upsert: true,
    });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("profile").getPublicUrl(fileName);

  return publicUrl;
}