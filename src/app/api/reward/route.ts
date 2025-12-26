import { prisma } from "src/libs/prisma";
//import { notFound } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import { toRewardsUI } from "src/utils/transform";


export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user?.id) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  const userId = user.id;

  const reward = await prisma.reward.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });

  if (!reward) {
    return Response.json({ message: "ご褒美がありません" }, { status: 404 });
  }
  
  return Response.json(toRewardsUI(reward));
}