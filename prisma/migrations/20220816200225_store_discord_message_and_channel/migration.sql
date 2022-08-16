/*
  Warnings:

  - You are about to drop the column `discordMessageIds` on the `PlaygroundRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlaygroundRequest" DROP COLUMN "discordMessageIds";

-- CreateTable
CREATE TABLE "DiscordMessage" (
    "messageId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "playgroundRequestId" TEXT NOT NULL,

    CONSTRAINT "DiscordMessage_pkey" PRIMARY KEY ("messageId","channelId")
);

-- AddForeignKey
ALTER TABLE "DiscordMessage" ADD CONSTRAINT "DiscordMessage_playgroundRequestId_fkey" FOREIGN KEY ("playgroundRequestId") REFERENCES "PlaygroundRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
