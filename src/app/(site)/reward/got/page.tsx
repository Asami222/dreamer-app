import type { ResolvingMetadata } from "next";
import { buildPageMetadata } from "@/libs/metadata";
import GotRewardClient from "./GotRewardClient";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata
) {
  return buildPageMetadata("獲得したご褒美一覧", "今までに獲得したご褒美の獲得日と内容を見ることができます。", parent);
}

const GotReward = async() => {
  
  return <GotRewardClient />
}

export default GotReward
