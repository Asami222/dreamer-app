-- CreateEnum
CREATE TYPE "TodoCategory" AS ENUM ('year', 'month', 'week', 'day', 'time');

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL,
    "reward" TEXT NOT NULL,
    "starPieces" INTEGER,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GotReward" (
    "id" TEXT NOT NULL,
    "reward" TEXT NOT NULL,
    "starPieces" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "GotReward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" "TodoCategory" NOT NULL,
    "todo" TEXT NOT NULL,
    "limit" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "detail" TEXT,
    "description" TEXT,
    "image" TEXT,
    "starNum" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reward_id_userId_key" ON "Reward"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "GotReward_id_userId_key" ON "GotReward"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Todo_id_userId_key" ON "Todo"("id", "userId");

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GotReward" ADD CONSTRAINT "GotReward_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
