/*
  Warnings:

  - You are about to drop the column `displayName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dream` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `limit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfStars` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "displayName",
DROP COLUMN "dream",
DROP COLUMN "limit",
DROP COLUMN "numberOfStars";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "dream" TEXT,
    "limit" TEXT,
    "displayName" TEXT,
    "numberOfStars" INTEGER DEFAULT 0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
