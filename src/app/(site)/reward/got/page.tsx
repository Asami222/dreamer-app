import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { prisma } from "src/libs/prisma";
import { toGotRewardsUI } from "src/utils/transform";
import UserGotRewardListContainer from 'src/containers/UserGotRewardListContainer'
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
