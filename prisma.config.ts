import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    // ここで環境変数を読み込む
    url: env("DATABASE_URL"), 
  },
  schema: "prisma",
  migrations: {
    path: "prisma/migrations",
  },
});