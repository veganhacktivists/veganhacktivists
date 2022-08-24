/*
  Warnings:

  - You are about to alter the column `title` on the `PlaygroundRequest` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(55)`.
*/

-- First, truncate existing title to fit
UPDATE "PlaygroundRequest" SET "title" = SUBSTRING("title", 0, 55);

-- AlterTable
ALTER TABLE "PlaygroundRequest" ALTER COLUMN "title" SET DATA TYPE VARCHAR(55);
