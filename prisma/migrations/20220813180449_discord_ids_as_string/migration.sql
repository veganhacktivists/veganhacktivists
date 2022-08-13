/*
  Warnings:

  - You are about to drop the column `discordMessageId` on the `PlaygroundRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlaygroundRequest" DROP COLUMN "discordMessageId",
ADD COLUMN     "discordMessageIds" TEXT[] DEFAULT ARRAY[]::TEXT[];
