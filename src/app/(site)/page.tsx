import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import { redirect } from "next/navigation";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("ホーム", "ホーム画面です", parent);
}

export default function Home() {
  redirect("/user");
}
