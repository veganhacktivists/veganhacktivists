/*
  Warnings:

  - The primary key for the `DiscordMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `messageId` on the `DiscordMessage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(19)`.
  - You are about to alter the column `channelId` on the `DiscordMessage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(19)`.

*/
-- AlterTable
ALTER TABLE "DiscordMessage" DROP CONSTRAINT "DiscordMessage_pkey",
ALTER COLUMN "messageId" SET DATA TYPE CHAR(19),
ALTER COLUMN "channelId" SET DATA TYPE CHAR(19),
ADD CONSTRAINT "DiscordMessage_pkey" PRIMARY KEY ("messageId", "channelId");
